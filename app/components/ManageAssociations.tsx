"use client";

import { useState } from "react";
import { updateProjectAssociations } from "@/app/actions";

interface Props {
    projectId: string;
    current:   string[];
}

export default function ManageAssociations({ projectId, current }: Props) {
    const [open, setOpen]     = useState(false);
    const [input, setInput]   = useState(current.join("\n"));
    const [saving, setSaving] = useState(false);
    const [result, setResult] = useState<{ added: string[]; notFound: string[] } | null>(null);
    const [error, setError]   = useState("");

    async function handleSave() {
        setSaving(true);
        setError("");
        setResult(null);
        try {
            const emails = input.split(/[\n,]+/).map((e) => e.trim()).filter(Boolean);
            const res    = await updateProjectAssociations(projectId, emails);
            setResult(res);
        } catch (e: any) {
            setError(e.message || "Something went wrong.");
        } finally {
            setSaving(false);
        }
    }

    return (
        <>
            <button className="assoc-btn" onClick={() => { setOpen(true); setResult(null); }}>
                Manage Associations
            </button>

            {open && (
                <div className="modal-overlay" onClick={() => setOpen(false)}>
                    <div className="assoc-modal" onClick={(e) => e.stopPropagation()}>
                        <p className="assoc-title">Associated Accounts</p>
                        <p className="assoc-sub">Enter one email per line. These accounts can view this project without being the owner. Saving replaces the entire list.</p>

                        <textarea
                            className="assoc-textarea"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder={"user@example.com\nother@example.com"}
                        />

                        {error && <p className="assoc-error">{error}</p>}

                        {result && (
                            <div className="assoc-result">
                                {result.added.length    > 0 && <p className="assoc-result-added">Saved: {result.added.join(", ")}</p>}
                                {result.notFound.length > 0 && <p className="assoc-result-missing">No account found for: {result.notFound.join(", ")}</p>}
                            </div>
                        )}

                        <div className="assoc-actions">
                            <button className="assoc-cancel" onClick={() => setOpen(false)} disabled={saving}>Cancel</button>
                            <button className="assoc-save"   onClick={handleSave}           disabled={saving}>{saving ? "Saving..." : "Save"}</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}