"use server";
"use server";

import { revalidatePath } from "next/cache";
import { connectDB } from "@/app/lib/db";
import { Schema, models, model } from "mongoose";

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

const Sponsorship = models.Sponsorship || model("Sponsorship", SponsorshipSchema);
const Partnership = models.Partnership || model("Partnership", PartnershipSchema);

type Status = "accepted" | "denied";
type Collection = "sponsorship" | "partnership";

export async function updateStatus(id: string, collection: Collection, status: Status) {
    await connectDB();
    const Model = collection === "sponsorship" ? Sponsorship : Partnership;
    await Model.findByIdAndUpdate(id, { status });
    revalidatePath("/dashboard");
}
type ActionState = { success: boolean; error: string | null } | null;

export async function submitSponsorship(prevState: ActionState, formData: FormData): Promise<ActionState> {
    try {
        await connectDB();

        const email = formData.get("email")?.toString();

        if (!email) {
            return { success: false, error: "Email is required." };
        }

        await Sponsorship.create({
            email,
            website:  formData.get("website")?.toString() || "",
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

        if (!email) {
            return { success: false, error: "Email is required." };
        }

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