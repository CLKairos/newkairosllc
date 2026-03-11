import { cookies } from "next/headers";
import { connectDB } from "@/app/lib/db";
import { models, model, Schema } from "mongoose";

const AccountSchema = new Schema({
    email:     { type: String },
    username:  { type: String },
    password:  { type: String },
    type:      { type: String, default: "user" },
    createdAt: { type: Date, default: Date.now },
});

const Account = models.Account || model("Account", AccountSchema);

export interface SessionUser {
    id: string;
    email: string;
    username: string;
    type: "user" | "admin";
}

export async function getSession(): Promise<SessionUser | null> {
    try {
        const cookieStore = await cookies();
        const uid = cookieStore.get("session_uid")?.value;
        if (!uid) return null;

        await connectDB();
        const account = await Account.findById(uid).lean() as any;
        if (!account) return null;

        return {
            id:       account._id.toString(),
            email:    account.email,
            username: account.username,
            type:     account.type ?? "user",
        };
    } catch {
        return null;
    }
}

export async function requireSession(): Promise<SessionUser> {
    const user = await getSession();
    if (!user) throw new Error("Unauthorized");
    return user;
}

export async function requireAdmin(): Promise<SessionUser> {
    const user = await requireSession();
    if (user.type !== "admin") throw new Error("Forbidden");
    return user;
}
