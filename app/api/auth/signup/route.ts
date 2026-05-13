import { NextRequest, NextResponse } from "next/server";
import { adminAuth }                 from "@/app/lib/firebase-admin";
import { connectDB }                 from "@/app/lib/db";
import { Schema, models, model }     from "mongoose";
import bcrypt                        from "bcryptjs";

const AccountSchema = new Schema({
    email:         { type: String, required: true, unique: true },
    username:      { type: String, required: true, unique: true },
    password:      { type: String, default: "" },
    type:          { type: String, default: "user" },
    emailVerified: { type: Boolean, default: false },
    createdAt:     { type: Date, default: Date.now },
});
const Account = models.Account || model("Account", AccountSchema);

export async function POST(req: NextRequest) {
    try {
        const { email, username, password } = await req.json();

        if (!email)    return NextResponse.json({ error: "Email is required." },    { status: 400 });
        if (!username) return NextResponse.json({ error: "Username is required." }, { status: 400 });
        if (!password) return NextResponse.json({ error: "Password is required." }, { status: 400 });
        if (password.length < 8)
            return NextResponse.json({ error: "Password must be at least 8 characters." }, { status: 400 });

        await connectDB();

        const existing = await Account.findOne({
            $or: [{ email: email.toLowerCase() }, { username }],
        }).lean() as any;

        if (existing?.email    === email.toLowerCase())
            return NextResponse.json({ error: "An account with that email already exists." }, { status: 409 });
        if (existing?.username === username)
            return NextResponse.json({ error: "That username is taken." }, { status: 409 });

        // Create the user in Firebase so we can send a verification email
        const firebaseUser = await adminAuth.createUser({
            email,
            password,
            displayName: username,
        });

        // Generate an email verification link
        const verificationLink = await adminAuth.generateEmailVerificationLink(email, {
            url: `${process.env.NEXT_PUBLIC_APP_URL}/login?verified=true`,
        });

        // Send the verification email via Firebase
        // Firebase does not send the email automatically from Admin SDK.
        // Use a transactional email service here (e.g. Resend, SendGrid).
        // The verificationLink is ready to embed in your email template.
        // Example with Resend:
        //
        // import { Resend } from "resend";
        // const resend = new Resend(process.env.RESEND_API_KEY);
        // await resend.emails.send({
        //   from: "no-reply@yourdomain.com",
        //   to: email,
        //   subject: "Verify your email",
        //   html: `<p>Click <a href="${verificationLink}">here</a> to verify your email.</p>`,
        // });

        console.info("Verification link for", email, ":", verificationLink);

        // Save the account in MongoDB
        await Account.create({
            email:         email.toLowerCase(),
            username,
            password:      bcrypt.hashSync(password, 12),
            type: "user",
            emailVerified: false,
            firebaseUid:   firebaseUser.uid,
        });

        return NextResponse.json({ success: true, message: "Account created. Check your email to verify." });
    } catch (err: any) {
        console.error("signup route error:", err);

        // Surface clean Firebase errors
        if (err?.code === "auth/email-already-exists")
            return NextResponse.json({ error: "An account with that email already exists." }, { status: 409 });

        return NextResponse.json({ error: "Signup failed. Please try again." }, { status: 500 });
    }
}