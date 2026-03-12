// app/dashboard/project/[id]/page.tsx
import { connectDB } from "@/app/lib/db";
import { Schema, models, model, Types } from "mongoose";
import { getSession } from "@/app/session";
import { redirect, notFound } from "next/navigation";
import EditProjectForm from "@/app/components/EditProjectForm";

const AccountSchema = new Schema({
    email:     { type: String },
    username:  { type: String },
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
    date.toLocaleDateString("en-US", {
        year: "numeric", month: "short", day: "numeric",
    });

export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
    const user = await getSession();
    if (!user) redirect("/login");

    const { id } = await params;

    await connectDB();

    const project = await Project.findById(id).lean() as any;
    if (!project) notFound();

    // Non-admins can only view their own projects
    if (user.type !== "admin" && project.ownerId.toString() !== user.id) {
        redirect("/dashboard");
    }

    const owner = await Account.findById(project.ownerId).lean() as any;

    const deadline = project.deadline ? new Date(project.deadline) : null;
    const now = new Date();
    const daysLeft = deadline
        ? Math.ceil((deadline.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
        : null;
    const overdue = daysLeft !== null && daysLeft < 0 && project.status !== "complete";

    const deadlineInputValue = deadline
        ? deadline.toISOString().split("T")[0]
        : null;

    const isOwner = user.id === project.ownerId.toString();

    const statusColor = STATUS_COLOR[project.status as keyof typeof STATUS_COLOR];

    return (
        <>
            <style>{`
        body { background: #0f1117; margin: 0; }
        .page {
          min-height: 100vh;
          background: #0f1117;
          color: #e2e8f0;
          font-family: 'Courier New', monospace;
          padding: 48px 40px;
          max-width: 860px;
          margin: 0 auto;
        }
        .back-link {
          display: inline-block;
          color: #475569;
          font-size: 12px;
          text-decoration: none;
          letter-spacing: 1px;
          text-transform: uppercase;
          margin-bottom: 32px;
        }
        .back-link:hover { color: #5fa8a8; }
        .project-header {
          border-bottom: 1px solid #1e2330;
          padding-bottom: 24px;
          margin-bottom: 40px;
        }
        .project-title {
          font-size: 28px;
          font-weight: 700;
          color: #f8fafc;
          margin: 0 0 12px;
          letter-spacing: -0.5px;
        }
        .status-badge {
          display: inline-block;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1px;
          text-transform: uppercase;
          padding: 3px 10px;
          border-radius: 20px;
        }
        .meta-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 20px;
          margin-bottom: 40px;
          min-width: 720px;
        }
        .meta-card {
          background: #161b27;
          border: 1px solid #1e2330;
          border-radius: 8px;
          padding: 20px 24px;
        }
        .meta-label {
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: #475569;
          margin-bottom: 8px;
        }
        .meta-value {
          font-size: 15px;
          color: #cbd5e1;
          font-weight: 500;
        }
        .description-section {
          background: #161b27;
          border: 1px solid #1e2330;
          border-radius: 8px;
          padding: 28px 32px;
        }
        .section-label {
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          color: #475569;
          margin-bottom: 16px;
        }
        .description-text {
          color: #94a3b8;
          font-size: 14px;
          line-height: 1.7;
          white-space: pre-wrap;
        }
        .overdue-banner {
          background: #7f1d1d22;
          border: 1px solid #7f1d1d88;
          border-radius: 8px;
          padding: 12px 20px;
          color: #f87171;
          font-size: 13px;
          margin-bottom: 28px;
          letter-spacing: 0.5px;
        }
      `}</style>

            <div className="page">
                <a href="/dashboard" className="back-link">← Back to dashboard</a>

                {overdue && (
                    <div className="overdue-banner">This project is overdue.</div>
                )}

                <div className="project-header">
                    <h1 className="project-title">{project.title}</h1>
                    <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 12 }}>
    <span
        className="status-badge"
        style={{
            color: statusColor,
            background: statusColor + "18",
            border: `1px solid ${statusColor}44`,
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
                    </div>
                </div>

                <div className="meta-grid">
                    <div className="meta-card">
                        <div className="meta-label">Owner</div>
                        <div className="meta-value" style={{ color: "#5fa8a8" }}>
                            @{owner?.username || "unknown"}
                        </div>
                        {owner?.email && (
                            <div style={{ color: "#475569", fontSize: 12, marginTop: 4 }}>
                                {owner.email}
                            </div>
                        )}
                    </div>

                    <div className="meta-card">
                        <div className="meta-label">Deadline</div>
                        <div
                            className="meta-value"
                            style={{
                                color: overdue ? "#f87171" : daysLeft !== null && daysLeft <= 7 ? "#f59e0b" : "#cbd5e1",
                            }}
                        >
                            {deadline ? formatDate(deadline) : "None"}
                        </div>
                        {daysLeft !== null && !overdue && deadline && (
                            <div style={{ color: "#475569", fontSize: 12, marginTop: 4 }}>
                                {daysLeft}d remaining
                            </div>
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
                </div>

                {project.description && (
                    <div className="description-section">
                        <div className="section-label">Description</div>
                        <p className="description-text">{project.description}</p>
                    </div>
                )}
            </div>
        </>
    );
}