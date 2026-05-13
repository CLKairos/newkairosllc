"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { connectDB } from "@/app/lib/db";
import { Schema, models, model, Types } from "mongoose";
import bcrypt from "bcryptjs";
import { getSession } from "@/app/session";
// ─── Schemas ───────────────────────────────────────────────────────────────────

const AccountSchema = new Schema({
    email:     { type: String, required: true, unique: true },
    username:  { type: String, required: true, unique: true },
    password:  { type: String, required: true },
    type:      { type: String, default: "user" },
    createdAt: { type: Date, default: Date.now },
});

const ProjectSchema = new Schema({
    ownerId:     { type: Types.ObjectId, required: true, ref: "Account" },
    title:       { type: String, required: true },
    description: { type: String, default: "" },
    status:      { type: String, enum: ["not_started", "in_progress", "review", "complete"], default: "not_started" },
    deadline:    { type: Date, default: null },
    createdAt:   { type: Date, default: Date.now },
    updatedAt:   { type: Date, default: Date.now },
});

const SponsorshipSchema = new Schema({
    email:     { type: String, required: true },
    website:   { type: String },
    proposal:  { type: String },
    usBased:   { type: Boolean, default: false },
    status:    { type: String, enum: ["pending", "accepted", "denied"], default: "pending" },
    createdAt: { type: Date, default: Date.now },
});

const PartnershipSchema = new Schema({
    email:     { type: String, required: true },
    website:   { type: String },
    project:   { type: String },
    usBased:   { type: Boolean, default: false },
    status:    { type: String, enum: ["pending", "accepted", "denied"], default: "pending" },
    createdAt: { type: Date, default: Date.now },
});

const Account     = models.Account     || model("Account",     AccountSchema);
const Project     = models.Project     || model("Project",     ProjectSchema);
const Sponsorship = models.Sponsorship || model("Sponsorship", SponsorshipSchema);
const Partnership = models.Partnership || model("Partnership", PartnershipSchema);

// ─── Types ─────────────────────────────────────────────────────────────────────

type ActionState = { success: boolean; error: string | null } | null;
type Status      = "accepted" | "denied";
type Collection  = "sponsorship" | "partnership";

// ─── Auth helpers ───────────────────────────────────────────────────────────────

function hashPassword(raw: string): string {
    return bcrypt.hashSync(raw, 12);
}

function verifyPassword(raw: string, stored: string): boolean {
    if (!stored) return false;
    return bcrypt.compareSync(raw, stored);
}

async function getUid(): Promise<string | null> {
    const cookieStore = await cookies();
    return cookieStore.get("session_uid")?.value ?? null;
}

// ─── Auth actions ───────────────────────────────────────────────────────────────

export async function signUp(prevState: ActionState, formData: FormData): Promise<ActionState> {
    try {
        await connectDB();
        const email           = formData.get("email")?.toString().trim().toLowerCase();
        const username        = formData.get("username")?.toString().trim();
        const password        = formData.get("password")?.toString();
        const confirmPassword = formData.get("confirmPassword")?.toString();

        if (!email)    return { success: false, error: "Email is required." };
        if (!username) return { success: false, error: "Username is required." };
        if (!password) return { success: false, error: "Password is required." };
        if (!confirmPassword) return { success: false, error: "Please confirm your password." };
        if (password !== confirmPassword) return { success: false, error: "Passwords do not match." };
        if (password.length < 8) return { success: false, error: "Password must be at least 8 characters." };

        const existing = await Account.findOne({ $or: [{ email }, { username }] }).lean() as any;
        if (existing?.email    === email)    return { success: false, error: "An account with that email already exists." };
        if (existing?.username === username) return { success: false, error: "That username is taken." };

        await Account.create({ email, username, password: hashPassword(password) });
        return { success: true, error: null };
    } catch (err) {
        console.error("signUp error:", err);
        return { success: false, error: "Signup failed. Please try again." };
    }
}

export async function login(prevState: ActionState, formData: FormData): Promise<ActionState> {
    try {
        await connectDB();
        const email    = formData.get("email")?.toString().trim().toLowerCase();
        const password = formData.get("password")?.toString();

        if (!email)    return { success: false, error: "Email is required." };
        if (!password) return { success: false, error: "Password is required." };

        const account = await Account.findOne({ email }).lean();
        if (!account)                          return { success: false, error: "No account found with that email." };
        if (!verifyPassword(password, account.password)) return { success: false, error: "Incorrect password." };

        const cookieStore = await cookies();
        cookieStore.set("session_uid", account._id.toString(), {
            httpOnly: true,
            secure:   process.env.NODE_ENV === "production",
            sameSite: "lax",
            path:     "/",
            maxAge:   60 * 60 * 24,
        });

        revalidatePath("/");
        return { success: true, error: null };
    } catch (err) {
        console.error("login error:", err);
        return { success: false, error: "Login failed. Please try again." };
    }
}

export async function logout(): Promise<void> {
    const cookieStore = await cookies();
    cookieStore.delete("session_uid");
    revalidatePath("/");
    redirect("/login");
}

// ─── Project actions ────────────────────────────────────────────────────────────

export async function createProject(prevState: ActionState, formData: FormData): Promise<ActionState> {
    try {
        const uid = await getUid();
        if (!uid) return { success: false, error: "Not logged in." };

        await connectDB();
        const title    = formData.get("title")?.toString().trim();
        const desc     = formData.get("description")?.toString().trim() || "";
        const deadline = formData.get("deadline")?.toString() || null;

        if (!title) return { success: false, error: "Project title is required." };

        await Project.create({
            ownerId:     new Types.ObjectId(uid),
            title,
            description: desc,
            deadline:    deadline ? new Date(deadline) : null,
        });

        revalidatePath("/dashboard");
        return { success: true, error: null };
    } catch (err) {
        console.error("createProject error:", err);
        return { success: false, error: "Failed to create project." };
    }
}

export async function updateProjectStatus(
    id: string,
    status: "not_started" | "in_progress" | "review" | "complete"
): Promise<void> {
    const uid = await getUid();
    if (!uid) throw new Error("Not logged in.");

    await connectDB();
    await Project.findOneAndUpdate(
        { _id: id, ownerId: new Types.ObjectId(uid) },
        { status, updatedAt: new Date() }
    );
    revalidatePath("/dashboard");
}

export async function deleteProject(id: string): Promise<void> {
    const uid = await getUid();
    if (!uid) throw new Error("Not logged in.");

    await connectDB();
    await Project.findOneAndDelete({ _id: id, ownerId: new Types.ObjectId(uid) });
    revalidatePath("/dashboard");
}

// ─── Admin actions ──────────────────────────────────────────────────────────────

export async function updateStatus(id: string, collection: Collection, status: Status) {
    await connectDB();
    const Model = collection === "sponsorship" ? Sponsorship : Partnership;
    await Model.findByIdAndUpdate(id, { status });
    revalidatePath("/dashboard");
}

// ─── Form actions ───────────────────────────────────────────────────────────────

export async function submitSponsorship(prevState: ActionState, formData: FormData): Promise<ActionState> {
    try {
        await connectDB();
        const email = formData.get("email")?.toString();
        if (!email) return { success: false, error: "Email is required." };
        await Sponsorship.create({
            email,
            website:  formData.get("website")?.toString()  || "",
            proposal: formData.get("proposal")?.toString() || "",
            usBased:  formData.get("usBased") === "true",
        });
        return { success: true, error: null };
    } catch (err) {
        console.error("submitSponsorship error:", err);
        return { success: false, error: "Submission failed. Please try again." };
    }
}

export async function submitPartnership(prevState: ActionState, formData: FormData): Promise<ActionState> {
    try {
        await connectDB();
        const email = formData.get("email")?.toString();
        if (!email) return { success: false, error: "Email is required." };
        await Partnership.create({
            email,
            website: formData.get("website")?.toString() || "",
            project: formData.get("project")?.toString() || "",
            usBased: formData.get("usBased") === "true",
        });
        return { success: true, error: null };
    } catch (err) {
        console.error("submitPartnership error:", err);
        return { success: false, error: "Submission failed. Please try again." };
    }
}

// Add this to the bottom of @/app/actions.ts

export async function updateProject(id: string, data: {
    title: string;
    description: string;
    status: string;
    deadline: string | null;
}): Promise<void> {
    const user = await getSession();
    if (!user) throw new Error("Unauthorized");

    await connectDB();

    const project = await Project.findById(id).lean() as any;
    if (!project) throw new Error("Project not found");

    const isOwner = project.ownerId.toString() === user.id;
    const isAdmin = user.type === "admin";
    if (!isOwner && !isAdmin) throw new Error("Forbidden");

    await Project.findByIdAndUpdate(id, {
        title:       data.title,
        description: data.description,
        status:      data.status,
        deadline:    data.deadline ? new Date(data.deadline) : null,
        updatedAt:   new Date(),
    });

    revalidatePath(`/dashboard/project/${id}`);
    revalidatePath("/dashboard");
}
export async function updateUsername(username: string): Promise<ActionState> {
    try {
        const user = await getSession();
        if (!user) return { success: false, error: "Not logged in." };

        const trimmed = username.trim();
        if (!trimmed) return { success: false, error: "Username is required." };
        if (trimmed.length < 2) return { success: false, error: "Username must be at least 2 characters." };

        await connectDB();

        const taken = await Account.findOne({ username: trimmed, _id: { $ne: user.id } }).lean();
        if (taken) return { success: false, error: "That username is already taken." };

        await Account.findByIdAndUpdate(user.id, { username: trimmed });
        revalidatePath("/dashboard");
        return { success: true, error: null };
    } catch (err) {
        console.error("updateUsername error:", err);
        return { success: false, error: "Failed to update username." };
    }
}

export async function updatePasswordDB(newPassword: string): Promise<ActionState> {
    try {
        const user = await getSession();
        if (!user) return { success: false, error: "Not logged in." };
        if (newPassword.length < 8) return { success: false, error: "Password must be at least 8 characters." };

        await connectDB();
        await Account.findByIdAndUpdate(user.id, { password: hashPassword(newPassword) });
        return { success: true, error: null };
    } catch (err) {
        console.error("updatePasswordDB error:", err);
        return { success: false, error: "Failed to update password." };
    }
}

export async function updateEmailDB(newEmail: string): Promise<ActionState> {
    try {
        const user = await getSession();
        if (!user) return { success: false, error: "Not logged in." };

        const email = newEmail.trim().toLowerCase();
        if (!email) return { success: false, error: "Email is required." };

        await connectDB();
        const taken = await Account.findOne({ email, _id: { $ne: user.id } }).lean();
        if (taken) return { success: false, error: "That email is already in use." };

        await Account.findByIdAndUpdate(user.id, { email, emailVerified: false });
        revalidatePath("/dashboard");
        return { success: true, error: null };
    } catch (err) {
        console.error("updateEmailDB error:", err);
        return { success: false, error: "Failed to update email." };
    }
}

export async function markEmailVerified(): Promise<ActionState> {
    try {
        const user = await getSession();
        if (!user) return { success: false, error: "Not logged in." };

        await connectDB();
        await Account.findByIdAndUpdate(user.id, { emailVerified: true });
        revalidatePath("/dashboard");
        return { success: true, error: null };
    } catch (err) {
        console.error("markEmailVerified error:", err);
        return { success: false, error: "Failed to mark email as verified." };
    }
}

export async function updateProjectAssociations(
    projectId: string,
    emails: string[]
): Promise<{ added: string[]; notFound: string[] }> {
    const user = await getSession();
    if (!user || user.type !== "admin") throw new Error("Forbidden");

    await connectDB();

    const accounts = await Account.find({
        email: { $in: emails.map((e) => e.toLowerCase().trim()) },
    }).lean() as any[];

    const foundEmails = accounts.map((a) => a.email);
    const notFound    = emails.filter((e) => !foundEmails.includes(e.toLowerCase().trim()));
    const ids         = accounts.map((a) => a._id);

    await Project.findByIdAndUpdate(projectId, {
        associatedIds: ids,
        updatedAt:     new Date(),
    });

    revalidatePath(`/dashboard/project/${projectId}`);
    revalidatePath("/dashboard");

    return { added: foundEmails, notFound };
}
