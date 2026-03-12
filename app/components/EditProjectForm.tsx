"use client";

import { useState } from "react";
import { updateProject } from "@/app/actions";

interface Props {
    id:      string;
    initial: { title: string; description: string; status: string; deadline: string | null; };
}

export default function EditProjectForm({ id, initial }: Props) {
    const [open, setOpen]               = useState(false);
    const [title, setTitle]             = useState(initial.title);
    const [description, setDescription] = useState(initial.description);
    const [status, setStatus]           = useState(initial.status);
    const [deadline, setDeadline]       = useState(initial.deadline ?? "");
    const [saving, setSaving]           = useState(false);
    const [error, setError]             = useState("");

    async function handleSave() {
        if (!title.trim()) { setError("Title is required."); return; }
        setSaving(true);
        setError("");
        try {
            await updateProject(id, { title: title.trim(), description: description.trim(), status, deadline: deadline || null });
            setOpen(false);
        } catch (e: any) {
            setError(e.message || "Something went wrong.");
        } finally {
            setSaving(false);
        }
    }

    return (
        <>
            <button className="edit-btn" onClick={() => setOpen(true)}>Edit Project</button>

            {open && (
                <div className="modal-overlay" onClick={() => setOpen(false)}>
                    <div className="modal" onClick={(e) => e.stopPropagation()}>
                        <h2 className="modal-title">Edit Project</h2>

                        <div className="field">
                            <label className="field-label">Title</label>
                            <input className="field-input" value={title} onChange={(e) => setTitle(e.target.value)} />
                        </div>

                        <div className="field">
                            <label className="field-label">Description</label>
                            <textarea className="field-input field-textarea" value={description} onChange={(e) => setDescription(e.target.value)} rows={4} />
                        </div>

                        <div className="field">
                            <label className="field-label">Status</label>
                            <select className="field-input field-select" value={status} onChange={(e) => setStatus(e.target.value)}>
                                <option value="not_started">Not Started</option>
                                <option value="in_progress">In Progress</option>
                                <option value="review">In Review</option>
                                <option value="complete">Complete</option>
                            </select>
                        </div>

                        <div className="field">
                            <label className="field-label">Deadline</label>
                            <input type="date" className="field-input" value={deadline} onChange={(e) => setDeadline(e.target.value)} />
                        </div>

                        {error && <p className="field-error">{error}</p>}

                        <div className="modal-actions">
                            <button className="btn-cancel" onClick={() => setOpen(false)} disabled={saving}>Cancel</button>
                            <button className="btn-save"   onClick={handleSave}           disabled={saving}>{saving ? "Saving..." : "Save"}</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}