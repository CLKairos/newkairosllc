// app/actions.js
"use server"
import clientPromise from "@/lib/mongodb";

export async function submitSponsorship(formData) {
    try {
        const client = await clientPromise;
        const db = client.db("sponsors"); // Replace with your DB name

        const submission = {
            email: formData.get("email"),
            website: formData.get("website"),
            proposal: formData.get("proposal"),
            isUsBased: formData.get("us-based") === "on",
            submittedAt: new Date(),
        };

        // Insert into the "sponsors" collection
        const result = await db.collection("sponsors").insertOne(submission);

        console.log("Success! ID:", result.insertedId);
        return { success: true, id: result.insertedId.toString() };
    } catch (error) {
        console.error("Database Error:", error);
        return { success: false, error: "Failed to submit proposal." };
    }
}

export async function submitPartnership(formData) {
    try {
        const client = await clientPromise;
        const db = client.db("partners"); // Replace with your DB name

        const submission = {
            email: formData.get("email"),
            website: formData.get("website"),
            proposal: formData.get("proposal"),
            isUsBased: formData.get("us-based") === "on",
            submittedAt: new Date(),
        };

        // Insert into the "sponsors" collection
        const result = await db.collection("sponsors").insertOne(submission);

        console.log("Success! ID:", result.insertedId);
        return { success: true, id: result.insertedId.toString() };
    } catch (error) {
        console.error("Database Error:", error);
        return { success: false, error: "Failed to submit proposal." };
    }
}
