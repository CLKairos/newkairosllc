import { NextRequest, NextResponse } from "next/server";
import { cookies }                   from "next/headers";
import { adminAuth }                 from "@/app/lib/firebase-admin";
import { connectDB }                 from "@/app/lib/db";
import { models, model, Schema }     from "mongoose";

// Updated: handles both Google login and Google signup, syncs emailVerified

// Reuse the Account model safely
const AccountSchema = new Schema({
    email:         { type: String, required: true, unique: true },
    username:      { type: String, required: true, unique: true },
    password:      { type: String, default: "" },
    type:          { type: String, default: "user" },
    emailVerified: { type: Boolean, default: false },
    firebaseUid:   { type: String, default: "" },
    createdAt:     { type: Date, default: Date.now },
});
const Account = models.Account || model("Account", AccountSchema);

export async function POST(req: NextRequest) {
    try {
        const { idToken } = await req.json();
        if (!idToken) {
            return NextResponse.json({ error: "ID token is required." }, { status: 400 });
        }

        const decoded = await adminAuth.verifyIdToken(idToken);

        if (!decoded.email_verified)
            return NextResponse.json({ error: "Email is not verified." }, { status: 403 });

        await connectDB();

        let account = await Account.findOne({ email: decoded.email }).lean() as any;

        if (!account) {
            const base     = (decoded.name ?? decoded.email?.split("@")[0] ?? "user")
                .replace(/\s+/g, "_")
                .toLowerCase()
                .slice(0, 30);
            const taken    = await Account.findOne({ username: base }).lean();
            const username = taken ? `${base}_${Date.now()}` : base;

            account = await Account.create({
                email:         decoded.email,
                username,
                password:      "",
                emailVerified: true,
                firebaseUid:   decoded.uid,
            });
        } else if (!account.emailVerified) {
            await Account.findByIdAndUpdate(account._id, { emailVerified: true, firebaseUid: decoded.uid });
        }

        // Set the session cookie
        const cookieStore = await cookies();
        cookieStore.set("session_uid", account._id.toString(), {
            httpOnly: true,
            secure:   process.env.NODE_ENV === "production",
            sameSite: "lax",
            path:     "/",
            maxAge:   60 * 60 * 24 * 7,
        });

        return NextResponse.json({ success: true });
    } catch (err: any) {
        console.error("Google auth route error:", err);
        return NextResponse.json(
            { error: err?.message ?? "Authentication failed." },
            { status: 401 }
        );
    }
}