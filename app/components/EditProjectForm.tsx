// app/dashboard/project/[id]/EditProjectForm.tsx
"use client";

import { useState } from "react";
import { updateProject } from "@/app/actions";

interface Props {
    id: string;
    initial: {
        title: string;
        description: string;
        status: string;
        deadline: string | null;
    };
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
            await updateProject(id, {
                title:       title.trim(),
                description: description.trim(),
                status,
                deadline:    deadline || null,
            });
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
                            <input
                                className="field-input"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>

                        <div className="field">
                            <label className="field-label">Description</label>
                            <textarea
                                className="field-input field-textarea"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                rows={4}
                            />
                        </div>

                        <div className="field">
                            <label className="field-label">Status</label>
                            <select
                                className="field-input field-select"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                            >
                                <option value="not_started">Not Started</option>
                                <option value="in_progress">In Progress</option>
                                <option value="review">In Review</option>
                                <option value="complete">Complete</option>
                            </select>
                        </div>

                        <div className="field">
                            <label className="field-label">Deadline</label>
                            <input
                                type="date"
                                className="field-input"
                                value={deadline}
                                onChange={(e) => setDeadline(e.target.value)}
                            />
                        </div>

                        {error && <p className="field-error">{error}</p>}

                        <div className="modal-actions">
                            <button className="btn-cancel" onClick={() => setOpen(false)} disabled={saving}>
                                Cancel
                            </button>
                            <button className="btn-save" onClick={handleSave} disabled={saving}>
                                {saving ? "Saving..." : "Save"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <style>{`
        .edit-btn {
          font-family: 'Courier New', monospace;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 1px;
          text-transform: uppercase;
          padding: 8px 20px;
          border-radius: 4px;
          border: 1px solid #1e4a4a;
          background: #0d2e2e;
          color: #5fa8a8;
          cursor: pointer;
          transition: background 0.15s, color 0.15s;
        }
        .edit-btn:hover { background: #5fa8a8; color: #0f1117; }
        .modal-overlay {
          position: fixed; inset: 0;
          background: #0008;
          display: flex; align-items: center; justify-content: center;
          z-index: 100;
        }
        .modal {
          background: #161b27;
          border: 1px solid #1e2330;
          border-radius: 10px;
          padding: 36px 40px;
          width: 100%;
          max-width: 500px;
        }
        .modal-title {
          font-size: 18px;
          font-weight: 700;
          color: #f8fafc;
          margin: 0 0 28px;
          font-family: 'Courier New', monospace;
        }
        .field { margin-bottom: 20px; }
        .field-label {
          display: block;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: #475569;
          margin-bottom: 8px;
          font-family: 'Courier New', monospace;
        }
        .field-input {
          width: 100%;
          background: #0f1117;
          border: 1px solid #1e2330;
          border-radius: 4px;
          color: #e2e8f0;
          font-family: 'Courier New', monospace;
          font-size: 14px;
          padding: 10px 12px;
          box-sizing: border-box;
          outline: none;
          transition: border-color 0.15s;
        }
        .field-input:focus { border-color: #5fa8a8; }
        .field-textarea { resize: vertical; }
        .field-select { cursor: pointer; }
        .field-error {
          color: #f87171;
          font-size: 12px;
          margin: -8px 0 16px;
          font-family: 'Courier New', monospace;
        }
        .modal-actions {
          display: flex;
          gap: 12px;
          justify-content: flex-end;
          margin-top: 28px;
        }
        .btn-cancel {
          font-family: 'Courier New', monospace;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 1px;
          text-transform: uppercase;
          padding: 8px 20px;
          border-radius: 4px;
          border: 1px solid #1e2330;
          background: transparent;
          color: #475569;
          cursor: pointer;
        }
        .btn-cancel:hover:not(:disabled) { color: #e2e8f0; border-color: #475569; }
        .btn-save {
          font-family: 'Courier New', monospace;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 1px;
          text-transform: uppercase;
          padding: 8px 20px;
          border-radius: 4px;
          border: 1px solid #14532d88;
          background: #14532d33;
          color: #4ade80;
          cursor: pointer;
        }
        .btn-save:hover:not(:disabled) { background: #166534; color: #fff; }
        .btn-save:disabled, .btn-cancel:disabled { opacity: 0.4; cursor: not-allowed; }
      `}</style>
        </>
    );
}