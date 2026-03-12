// app/dashboard/project/[id]/page.tsx
import { connectDB } from "@/app/lib/db";
import { Schema, models, model, Types } from "mongoose";
import { getSession } from "@/app/session";
import { redirect, notFound } from "next/navigation";
import EditProjectForm from "@/app/components/EditProjectForm";
import ManageAssociations from "@/app/components/ManageAssociations";

const AccountSchema = new Schema({
    email:    { type: String },
    username: { type: String },
    type:     { type: String, default: "user" },
    createdAt:{ type: Date, default: Date.now },
});

const ProjectSchema = new Schema({
    ownerId:       { type: Types.ObjectId, required: true, ref: "Account" },
    title:         { type: String, required: true },
    description:   { type: String, default: "" },
    status:        { type: String, enum: ["not_started", "in_progress", "review", "complete"], default: "not_started" },
    deadline:      { type: Date, default: null },
    associatedIds: { type: [Types.ObjectId], default: [] },
    createdAt:     { type: Date, default: Date.now },
    updatedAt:     { type: Date, default: Date.now },
});

const Account = models.Account || model("Account", AccountSchema);
const Project = models.Project || model("Project", ProjectSchema);

const STATUS_LABELS = {
    not_started: "Not Started",
    in_progress: "In Progress",
    review:      "In Review",
    complete:    "Complete",
} as const;

const STATUS_COLOR = {
    not_started: "#475569",
    in_progress: "#5fa8a8",
    review:      "#f59e0b",
    complete:    "#4ade80",
} as const;

const formatDate = (date: Date) =>
    date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });

export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
    const user = await getSession();
    if (!user) redirect("/login");

    const { id } = await params;

    await connectDB();

    const project = await Project.findById(id).lean() as any;
    if (!project) notFound();

    const isOwner      = user.id === project.ownerId.toString();
    const isAssociated = (project.associatedIds ?? []).some((aid: any) => aid.toString() === user.id);

    if (user.type !== "admin" && !isOwner && !isAssociated) redirect("/dashboard");

    const owner = await Account.findById(project.ownerId).lean() as any;

    const associatedAccounts = project.associatedIds?.length
        ? await Account.find({ _id: { $in: project.associatedIds } }).lean() as any[]
        : [];

    const deadline   = project.deadline ? new Date(project.deadline) : null;
    const now        = new Date();
    const daysLeft   = deadline ? Math.ceil((deadline.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)) : null;
    const overdue    = daysLeft !== null && daysLeft < 0 && project.status !== "complete";
    const deadlineInputValue = deadline ? deadline.toISOString().split("T")[0] : null;
    const statusColor = STATUS_COLOR[project.status as keyof typeof STATUS_COLOR];

    return (
        <div className="project-page">
            <a href="/dashboard" className="project-back-link">← Back to dashboard</a>

            {overdue && <div className="overdue-banner">This project is overdue.</div>}

            <div className="project-header">
                <h1 className="project-title">{project.title}</h1>
                <div className="project-header-actions">
                    <span
                        className="status-badge"
                        style={{
                            color:      statusColor,
                            background: statusColor + "18",
                            border:     `1px solid ${statusColor}44`,
                        }}
                    >
                        {STATUS_LABELS[project.status as keyof typeof STATUS_LABELS]}
                    </span>
                    {(isOwner || user.type === "admin") && (
                        <EditProjectForm
                            id={id}
                            initial={{
                                title:       project.title,
                                description: project.description || "",
                                status:      project.status,
                                deadline:    deadlineInputValue,
                            }}
                        />
                    )}
                    {user.type === "admin" && (
                        <ManageAssociations
                            projectId={id}
                            current={associatedAccounts.map((a: any) => a.email)}
                        />
                    )}
                </div>
            </div>

            <div className="meta-grid">
                <div className="meta-card">
                    <div className="meta-label">Owner</div>
                    <div className="meta-value" style={{ color: "#5fa8a8" }}>@{owner?.username || "unknown"}</div>
                    {owner?.email && <div style={{ color: "#475569", fontSize: 12, marginTop: 4 }}>{owner.email}</div>}
                </div>

                <div className="meta-card">
                    <div className="meta-label">Deadline</div>
                    <div className="meta-value" style={{ color: overdue ? "#f87171" : daysLeft !== null && daysLeft <= 7 ? "#f59e0b" : "#cbd5e1" }}>
                        {deadline ? formatDate(deadline) : "None"}
                    </div>
                    {daysLeft !== null && !overdue && deadline && (
                        <div style={{ color: "#475569", fontSize: 12, marginTop: 4 }}>{daysLeft}d remaining</div>
                    )}
                </div>

                <div className="meta-card">
                    <div className="meta-label">Created</div>
                    <div className="meta-value">{formatDate(new Date(project.createdAt))}</div>
                </div>

                <div className="meta-card">
                    <div className="meta-label">Last Updated</div>
                    <div className="meta-value">{formatDate(new Date(project.updatedAt))}</div>
                </div>

                {associatedAccounts.length > 0 && (
                    <div className="meta-card" style={{ gridColumn: "1 / -1" }}>
                        <div className="meta-label">Associated Accounts</div>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 4 }}>
                            {associatedAccounts.map((a: any) => (
                                <span key={a._id.toString()} style={{
                                    background: "#1e2330", border: "1px solid #2d3748",
                                    borderRadius: 4, padding: "3px 10px",
                                    fontSize: 12, color: "#94a3b8",
                                    fontFamily: "'Courier New', monospace",
                                }}>
                                    @{a.username}
                                    <span style={{ color: "#475569", marginLeft: 6 }}>{a.email}</span>
                                </span>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {project.description && (
                <div className="description-section">
                    <div className="description-label">Description</div>
                    <p className="description-text">{project.description}</p>
                </div>
            )}
        </div>
    );
}