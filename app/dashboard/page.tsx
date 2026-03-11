import { redirect } from "next/navigation";
import { getSession } from "@/app/session";
import { connectDB } from "@/app/lib/db";
import { Schema, models, model, Types } from "mongoose";
import ProjectControls from "../components/ProjectControls";

// ─── Schema (mirrors actions.ts) ───────────────────────────────────────────────

const ProjectSchema = new Schema({
    ownerId:     { type: Types.ObjectId, required: true },
    title:       { type: String, required: true },
    description: { type: String, default: "" },
    status:      { type: String, enum: ["not_started", "in_progress", "review", "complete"], default: "not_started" },
    deadline:    { type: Date, default: null },
    createdAt:   { type: Date, default: Date.now },
    updatedAt:   { type: Date, default: Date.now },
});

const Project = models.Project || model("Project", ProjectSchema);

// ─── Types ─────────────────────────────────────────────────────────────────────

export interface ProjectRow {
    id: string;
    title: string;
    description: string;
    status: "not_started" | "in_progress" | "review" | "complete";
    deadline: string | null;
    createdAt: string;
    daysLeft: number | null;
    overdue: boolean;
}

// ─── Helpers ───────────────────────────────────────────────────────────────────

const STATUS_LABELS: Record<ProjectRow["status"], string> = {
    not_started: "Not started",
    in_progress: "In progress",
    review:      "In review",
    complete:    "Complete",
};

const STATUS_COLOR: Record<ProjectRow["status"], string> = {
    not_started: "#475569",
    in_progress: "#5fa8a8",
    review:      "#f59e0b",
    complete:    "#4ade80",
};

// ─── Data ──────────────────────────────────────────────────────────────────────

async function getProjects(uid: string): Promise<ProjectRow[]> {
    await connectDB();
    const docs = await Project.find({ ownerId: new Types.ObjectId(uid) })
        .sort({ createdAt: -1 })
        .lean();

    return (docs as any[]).map((d) => {
        const deadline = d.deadline ? new Date(d.deadline) : null;
        const now = new Date();
        const daysLeft = deadline
            ? Math.ceil((deadline.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
            : null;

        return {
            id:          d._id.toString(),
            title:       d.title,
            description: d.description || "",
            status:      d.status,
            deadline:    deadline
                ? deadline.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
                : null,
            createdAt:   new Date(d.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }),
            daysLeft,
            overdue:     daysLeft !== null && daysLeft < 0 && d.status !== "complete",
        };
    });
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default async function UserDashboard() {
    const user = await getSession();
    if (!user) redirect("/login");

    const projects = await getProjects(user.id);

    const total    = projects.length;
    const active   = projects.filter((p) => p.status === "in_progress").length;
    const complete = projects.filter((p) => p.status === "complete").length;
    const overdue  = projects.filter((p) => p.overdue).length;

    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@400;500;600;700&display=swap');

        .ud {
          min-height: 100vh;
          background: #0a1212;
          color: #e2eeee;
          font-family: 'DM Sans', sans-serif;
        }

        /* ── Top bar ── */
        .ud-topbar {
          background: #0f1a1a;
          border-bottom: 1px solid rgba(61,107,107,0.2);
          padding: 0 40px;
          height: 64px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: sticky;
          top: 0;
          z-index: 100;
        }
        .ud-topbar-left {
          display: flex; align-items: center; gap: 20px;
        }
        .ud-logo {
          font-size: 16px; font-weight: 700; color: #e0eeee;
          text-decoration: none; display: flex; align-items: center; gap: 7px;
        }
        .ud-logo-dot {
          width: 6px; height: 6px; border-radius: 50%; background: #5fa8a8;
          animation: blink 3s ease infinite;
        }
        @keyframes blink { 0%,100%{opacity:1;} 50%{opacity:0.3;} }
        .ud-topbar-sep { width: 1px; height: 24px; background: rgba(61,107,107,0.25); }
        .ud-topbar-title { font-size: 14px; color: rgba(224,238,238,0.5); }
        .ud-topbar-right { display: flex; align-items: center; gap: 12px; }
        .ud-user-chip {
          font-size: 13px; color: rgba(224,238,238,0.6);
          background: rgba(61,107,107,0.12); border: 1px solid rgba(61,107,107,0.2);
          padding: 5px 14px; border-radius: 20px;
        }
        .ud-user-chip span { color: #5fa8a8; font-weight: 600; }
        .ud-logout-btn {
          font-size: 12px; font-weight: 600; color: rgba(224,238,238,0.4);
          background: none; border: 1px solid rgba(61,107,107,0.2);
          border-radius: 6px; padding: 6px 14px; cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          transition: color 0.15s, border-color 0.15s;
        }
        .ud-logout-btn:hover { color: #f87171; border-color: rgba(248,113,113,0.3); }

        /* ── Body ── */
        .ud-body { padding: 40px; max-width: 1300px; margin: 0 auto; }

        /* ── Stats ── */
        .ud-stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
          margin-bottom: 40px;
        }
        .ud-stat {
          background: #0f1a1a;
          border: 1px solid rgba(61,107,107,0.18);
          border-radius: 10px;
          padding: 22px 26px;
          display: flex; flex-direction: column; gap: 4px;
        }
        .ud-stat-num {
          font-family: 'DM Serif Display', serif;
          font-size: 36px; line-height: 1; margin-bottom: 4px;
        }
        .ud-stat-label {
          font-size: 11px; font-weight: 700; letter-spacing: 1.5px;
          text-transform: uppercase; color: rgba(224,238,238,0.35);
        }

        /* ── Section header ── */
        .ud-section-head {
          display: flex; align-items: center; justify-content: space-between;
          margin-bottom: 20px;
        }
        .ud-section-title {
          font-family: 'DM Serif Display', serif;
          font-size: 22px; color: #e8f4f4;
        }

        /* ── Project cards ── */
        .ud-projects {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          margin-bottom: 48px;
        }

        .ud-project-card {
          background: #0f1a1a;
          border: 1px solid rgba(61,107,107,0.18);
          border-radius: 12px;
          padding: 24px;
          display: flex; flex-direction: column; gap: 12px;
          position: relative;
          overflow: hidden;
          transition: border-color 0.2s;
        }
        .ud-project-card:hover { border-color: rgba(61,107,107,0.45); }
        .ud-project-card.overdue { border-color: rgba(248,113,113,0.3); }
        .ud-project-card.overdue::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px;
          background: #f87171;
        }
        .ud-project-card.complete::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px;
          background: #4ade80;
        }

        .ud-project-top { display: flex; align-items: flex-start; justify-content: space-between; gap: 8px; }
        .ud-project-title {
          font-size: 16px; font-weight: 600; color: #e0eeee; line-height: 1.3; flex: 1;
        }
        .ud-status-dot {
          width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; margin-top: 5px;
        }

        .ud-project-desc {
          font-size: 13px; color: rgba(224,238,238,0.4); line-height: 1.6;
          display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
        }

        .ud-project-meta {
          display: flex; flex-direction: column; gap: 6px; margin-top: auto;
        }
        .ud-meta-row {
          display: flex; align-items: center; justify-content: space-between;
        }
        .ud-meta-label { font-size: 11px; color: rgba(224,238,238,0.3); text-transform: uppercase; letter-spacing: 1px; }
        .ud-meta-value { font-size: 12px; font-weight: 600; color: rgba(224,238,238,0.6); }
        .ud-meta-value.overdue { color: #f87171; }
        .ud-meta-value.soon { color: #f59e0b; }
        .ud-meta-value.ok { color: #4ade80; }

        .ud-status-badge {
          display: inline-flex; align-items: center; gap: 6px;
          font-size: 11px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase;
          padding: 3px 10px; border-radius: 20px;
          border: 1px solid transparent;
        }

        /* ── Empty state ── */
        .ud-empty {
          grid-column: 1 / -1;
          background: #0f1a1a;
          border: 1px dashed rgba(61,107,107,0.25);
          border-radius: 12px;
          padding: 60px 40px;
          text-align: center;
          display: flex; flex-direction: column; align-items: center; gap: 12px;
        }
        .ud-empty-icon { font-size: 40px; opacity: 0.4; }
        .ud-empty-title { font-family: 'DM Serif Display', serif; font-size: 20px; color: rgba(224,238,238,0.5); }
        .ud-empty-sub { font-size: 14px; color: rgba(224,238,238,0.3); }

        /* ── New project form ── */
        .ud-new-project {
          background: #0f1a1a;
          border: 1px solid rgba(61,107,107,0.2);
          border-radius: 12px;
          padding: 32px;
        }
        .ud-new-title {
          font-family: 'DM Serif Display', serif;
          font-size: 20px; color: #e8f4f4; margin-bottom: 24px;
        }
        .ud-form-grid {
          display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px;
        }
        .ud-field { display: flex; flex-direction: column; gap: 7px; }
        .ud-field.full { grid-column: 1 / -1; }
        .ud-label {
          font-size: 11px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase;
          color: rgba(224,238,238,0.35);
        }
        .ud-input, .ud-textarea {
          padding: 11px 14px;
          background: #0a1212;
          border: 1px solid rgba(61,107,107,0.2);
          border-radius: 8px;
          font-size: 14px; font-family: 'DM Sans', sans-serif; color: #e0eeee;
          transition: border-color 0.15s, box-shadow 0.15s;
        }
        .ud-textarea { resize: vertical; min-height: 80px; }
        .ud-input::placeholder, .ud-textarea::placeholder { color: rgba(224,238,238,0.2); }
        .ud-input:focus, .ud-textarea:focus {
          outline: none; border-color: #3d6b6b; box-shadow: 0 0 0 3px rgba(61,107,107,0.15);
        }
        .ud-input[type="date"]::-webkit-calendar-picker-indicator { filter: invert(0.5); }

        .ud-form-actions { display: flex; justify-content: flex-end; margin-top: 20px; }
        .ud-submit {
          padding: 11px 28px; background: #3d6b6b; color: #fff;
          border: none; border-radius: 8px; font-size: 14px; font-weight: 700;
          font-family: 'DM Sans', sans-serif; cursor: pointer;
          transition: background 0.2s, transform 0.15s;
        }
        .ud-submit:hover { background: #4a8080; transform: translateY(-1px); }
        .ud-form-error {
          background: rgba(248,113,113,0.08); border: 1px solid rgba(248,113,113,0.25);
          color: #f87171; border-radius: 8px; padding: 10px 14px; font-size: 13px; margin-bottom: 16px;
        }
        .ud-form-success {
          background: rgba(74,222,128,0.08); border: 1px solid rgba(74,222,128,0.25);
          color: #4ade80; border-radius: 8px; padding: 10px 14px; font-size: 13px; margin-bottom: 16px;
        }

        @media (max-width: 1024px) {
          .ud-projects { grid-template-columns: repeat(2, 1fr); }
          .ud-stats    { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 640px) {
          .ud-body     { padding: 24px 16px; }
          .ud-projects { grid-template-columns: 1fr; }
          .ud-stats    { grid-template-columns: repeat(2, 1fr); }
          .ud-form-grid { grid-template-columns: 1fr; }
          .ud-topbar   { padding: 0 20px; }
          .ud-topbar-sep, .ud-topbar-title { display: none; }
        }
      `}</style>

            <div className="ud">
                {/* Top bar */}
                <div className="ud-topbar">
                    <div className="ud-topbar-left">
                        <a href="/" className="ud-logo">
                            <span className="ud-logo-dot" />
                            KairosLLC
                        </a>
                        <div className="ud-topbar-sep" />
                        <span className="ud-topbar-title">My Dashboard</span>
                    </div>
                    <div className="ud-topbar-right">
                        <span className="ud-user-chip">Signed in as <span>@{user.username}</span></span>
                        <ProjectControls mode="logout" />
                    </div>
                </div>

                <div className="ud-body">
                    {/* Stats */}
                    <div className="ud-stats">
                        {[
                            { num: total,    label: "Total projects",    color: "#5fa8a8" },
                            { num: active,   label: "In progress",       color: "#5fa8a8" },
                            { num: complete, label: "Complete",          color: "#4ade80" },
                            { num: overdue,  label: "Overdue",           color: overdue > 0 ? "#f87171" : "#475569" },
                        ].map((s) => (
                            <div className="ud-stat" key={s.label}>
                                <span className="ud-stat-num" style={{ color: s.color }}>{s.num}</span>
                                <span className="ud-stat-label">{s.label}</span>
                            </div>
                        ))}
                    </div>

                    {/* Projects */}
                    <div className="ud-section-head">
                        <h2 className="ud-section-title">Your projects</h2>
                    </div>

                    <div className="ud-projects">
                        {projects.length === 0 ? (
                            <div className="ud-empty">
                                <span className="ud-empty-icon">📁</span>
                                <p className="ud-empty-title">No projects yet</p>
                                <p className="ud-empty-sub">Create your first project below to get started.</p>
                            </div>
                        ) : (
                            projects.map((p) => (
                                <div
                                    key={p.id}
                                    className={`ud-project-card ${p.overdue ? "overdue" : ""} ${p.status === "complete" ? "complete" : ""}`}
                                >
                                    <div className="ud-project-top">
                                        <span className="ud-project-title">{p.title}</span>
                                        <span className="ud-status-dot" style={{ background: STATUS_COLOR[p.status] }} />
                                    </div>

                                    {p.description && <p className="ud-project-desc">{p.description}</p>}

                                    <div className="ud-project-meta">
                                        <div className="ud-meta-row">
                                            <span className="ud-meta-label">Status</span>
                                            <span
                                                className="ud-status-badge"
                                                style={{
                                                    color:       STATUS_COLOR[p.status],
                                                    background:  STATUS_COLOR[p.status] + "18",
                                                    borderColor: STATUS_COLOR[p.status] + "44",
                                                }}
                                            >
                        {STATUS_LABELS[p.status]}
                      </span>
                                        </div>

                                        {p.deadline && (
                                            <div className="ud-meta-row">
                                                <span className="ud-meta-label">Deadline</span>
                                                <span
                                                    className={`ud-meta-value ${
                                                        p.overdue ? "overdue" :
                                                            p.daysLeft !== null && p.daysLeft <= 7 ? "soon" : "ok"
                                                    }`}
                                                >
                          {p.deadline}
                                                    {p.daysLeft !== null && !p.overdue && ` (${p.daysLeft}d left)`}
                                                    {p.overdue && " · Overdue"}
                        </span>
                                            </div>
                                        )}

                                        <div className="ud-meta-row">
                                            <span className="ud-meta-label">Created</span>
                                            <span className="ud-meta-value">{p.createdAt}</span>
                                        </div>
                                    </div>

                                    {/* Status controls + delete */}
                                    <ProjectControls mode="card" projectId={p.id} currentStatus={p.status} />
                                </div>
                            ))
                        )}
                    </div>

                    {/* New project form */}
                    <div className="ud-new-project">
                        <h3 className="ud-new-title">New project</h3>
                        <ProjectControls mode="form" />
                    </div>
                </div>
            </div>
        </>
    );
}