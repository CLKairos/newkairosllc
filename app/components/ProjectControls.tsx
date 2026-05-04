"use client";

import { useActionState, useTransition } from "react";
import { createProject, updateProjectStatus, deleteProject, logout } from "@/app/actions";

type ProjectStatus = "not_started" | "in_progress" | "review" | "complete";
type ActionState   = { success: boolean; error: string | null } | null;

const STATUS_OPTIONS: { value: ProjectStatus; label: string }[] = [
    { value: "not_started", label: "Not started" },
    { value: "in_progress", label: "In progress" },
    { value: "review",      label: "In review" },
    { value: "complete",    label: "Complete" },
];

// ── Logout button ──────────────────────────────────────────────────────────────
function LogoutButton() {
    const [pending, startTransition] = useTransition();

    return (
        <button
            type="button"
            className="ud-logout-btn"
            disabled={pending}
            onClick={() => startTransition(() => logout())}
        >
            {pending ? "Signing out..." : "Sign out"}
        </button>
    );
}

// ── Status + delete controls on each card ─────────────────────────────────────
function CardControls({
                          projectId,
                          currentStatus
                      }: {
    projectId: string;
    currentStatus: ProjectStatus;
}) {
    const [pending, startTransition] = useTransition();

    function handleStatus(e: React.ChangeEvent<HTMLSelectElement>) {
        const next = e.target.value as ProjectStatus;
        startTransition(() => updateProjectStatus(projectId, next));
    }

    function handleDelete() {
        if (!confirm("Delete this project? This can't be undone.")) return;
        startTransition(() => deleteProject(projectId));
    }

    return (
        <div className="ud-card-controls">
            <select
                className="ud-select"
                value={currentStatus}
                onChange={handleStatus}
                disabled={pending}
            >
                {STATUS_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>
                        {o.label}
                    </option>
                ))}
            </select>

            <button
                type="button"
                onClick={handleDelete}
                disabled={pending}
                className="ud-delete-btn"
            >
                Delete
            </button>
        </div>
    );
}

// ── New project form ───────────────────────────────────────────────────────────
function NewProjectForm() {
    const [state, action] = useActionState(createProject, null);

    return (
        <form action={action}>
            {state?.error   && <p className="ud-form-error">{state.error}</p>}
            {state?.success && <p className="ud-form-success">Project created.</p>}

            <div className="ud-form-grid">
                <div className="ud-field">
                    <label className="ud-label" htmlFor="title">Project title</label>
                    <input
                        className="ud-input"
                        type="text"
                        id="title"
                        name="title"
                        placeholder="e.g. Company website"
                        required
                    />
                </div>

                <div className="ud-field">
                    <label className="ud-label" htmlFor="deadline">Deadline (optional)</label>
                    <input
                        className="ud-input"
                        type="date"
                        id="deadline"
                        name="deadline"
                    />
                </div>

                <div className="ud-field full">
                    <label className="ud-label" htmlFor="description">Description (optional)</label>
                    <textarea
                        className="ud-textarea"
                        id="description"
                        name="description"
                        placeholder="What do you need built?"
                    />
                </div>
            </div>

            <div className="ud-form-actions">
                <button type="submit" className="ud-submit">
                    Create project →
                </button>
            </div>
        </form>
    );
}

// ── Main export — mode switch ──────────────────────────────────────────────────
interface Props {
    mode: "logout" | "form" | "card";
    projectId?: string;
    currentStatus?: ProjectStatus;
}

export default function ProjectControls({
                                            mode,
                                            projectId,
                                            currentStatus
                                        }: Props) {
    if (mode === "logout") return <LogoutButton />;
    if (mode === "form")   return <NewProjectForm />;
    if (mode === "card" && projectId && currentStatus)
        return <CardControls projectId={projectId} currentStatus={currentStatus} />;

    return null;
}