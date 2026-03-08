"use server"

import { connectDB } from "./lib/db";
import mongoose, { Schema, models, model } from "mongoose";

const SponsorshipSchema = new Schema({
    email:    { type: String, required: true },
    website:  { type: String },
    proposal: { type: String },
    usBased:  { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
});

const PartnershipSchema = new Schema({
    email:    { type: String, required: true },
    website:  { type: String },
    project: { type: String },
    usBased:  { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
});

const Sponsorship = models.Sponsorship || model("Sponsorship", SponsorshipSchema);
const Partnership = models.Partnership || model("Partnership", PartnershipSchema);


export async function submitSponsorship(prevState: any, formData: FormData) {
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

export async function submitPartnership(prevState: any, formData: FormData) {
    try {
        await connectDB();

        const email = formData.get("email")?.toString();

        if (!email) {
            return { success: false, error: "Email is required." };
        }

        await Partnership.create({
            email,
            website:  formData.get("website")?.toString() || "",
            project: formData.get("project")?.toString() || "",
            usBased:  formData.get("usBased") === "true",
        });

        return { success: true, error: null };
    } catch (err) {
        console.error("submitPartnership error:", err);
        return { success: false, error: "Submission failed. Please try again." };
    }
}