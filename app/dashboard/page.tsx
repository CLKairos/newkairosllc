import { connectDB } from "@/app/lib/db";
import { Schema, models, model, Types } from "mongoose";
import StatusButtons from "../components/StatusButtons";
import DashTabs from "../components/DashTabs";

// ─── Schemas ───────────────────────────────────────────────────────────────────

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

const AccountSchema = new Schema({
    email:     { type: String },
    username:  { type: String },
    type:      { type: String, default: "user" },
    createdAt: { type: Date, default: Date.now },
});

const ProjectSchema = new Schema({
    ownerId:     { type: Types.ObjectId, required: true },
    title:       { type: String, required: true },
    description: { type: String, default: "" },
    status:      { type: String, enum: ["not_started", "in_progress", "review", "complete"], default: "not_started" },
    deadline:    { type: Date, default: null },
    createdAt:   { type: Date, default: Date.now },
    updatedAt:   { type: Date, default: Date.now },
});

const Sponsorship = models.Sponsorship || model("Sponsorship", SponsorshipSchema);
const Partnership = models.Partnership || model("Partnership", PartnershipSchema);
const Account     = models.Account     || model("Account",     AccountSchema);
const Project     = models.Project     || model("Project",     ProjectSchema);

// ─── Types ─────────────────────────────────────────────────────────────────────

interface Submission {
    _id: string;
    email: string;
    website?: string;
    proposal?: string;
    project?: string;
    usBased: boolean;
    status: "pending" | "accepted" | "denied";
    createdAt: string;
}

export interface ProjectRow {
    id: string;
    title: string;
    description: string;
    ownerUsername: string;
    ownerEmail: string;
    status: "not_started" | "in_progress" | "review" | "complete";
    deadline: string | null;
    daysLeft: number | null;
    overdue: boolean;
    createdAt: string;
}

// ─── Data fetching ─────────────────────────────────────────────────────────────

async function getData() {
    await connectDB();

    const [sponsorships, partnerships, projects, accounts] = await Promise.all([
        Sponsorship.find().sort({ createdAt: -1 }).lean(),
        Partnership.find().sort({ createdAt: -1 }).lean(),
        Project.find().sort({ createdAt: -1 }).lean(),
        Account.find().lean(),
    ]);

    const accountMap = new Map(
        (accounts as any[]).map((a) => [a._id.toString(), { username: a.username || "unknown", email: a.email || "" }])
    );

    const serializeSubmission = (docs: any[]): Submission[] =>
        docs.map((d) => ({
            _id:      d._id.toString(),
            email:    d.email,
            website:  d.website  || "",
            proposal: d.proposal || "",
            project:  d.project  || "",
            usBased:  d.usBased,
            status:   d.status ?? "pending",
            createdAt: new Date(d.createdAt).toLocaleDateString("en-US", {
                year: "numeric", month: "short", day: "numeric",
            }),
        }));

    const serializeProjects = (docs: any[]): ProjectRow[] =>
        docs.map((d) => {
            const deadline = d.deadline ? new Date(d.deadline) : null;
            const now = new Date();
            const daysLeft = deadline
                ? Math.ceil((deadline.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
                : null;
            const owner = accountMap.get(d.ownerId?.toString()) ?? { username: "unknown", email: "" };
            return {
                id:            d._id.toString(),
                title:         d.title,
                description:   d.description || "",
                ownerUsername: owner.username,
                ownerEmail:    owner.email,
                status:        d.status,
                deadline:      deadline
                    ? deadline.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
                    : null,
                daysLeft,
                overdue: daysLeft !== null && daysLeft < 0 && d.status !== "complete",
                createdAt: new Date(d.createdAt).toLocaleDateString("en-US", {
                    year: "numeric", month: "short", day: "numeric",
                }),
            };
        });

    return {
        sponsorships: serializeSubmission(sponsorships as any[]),
        partnerships: serializeSubmission(partnerships as any[]),
        projects:     serializeProjects(projects as any[]),
    };
}

// ─── Sub-components ────────────────────────────────────────────────────────────

function StatCard({ label, value, accent }: { label: string; value: number; accent?: string }) {
    return (
        <div className="stat-card">
            <span className="stat-value" style={accent ? { color: accent } : undefined}>{value}</span>
            <span className="stat-label">{label}</span>
        </div>
    );
}

function SubmissionRow({ row, type }: { row: Submission; type: "sponsorship" | "partnership" }) {
    return (
        <tr className={`submission-row row-${row.status}`}>
            <td>{row.email}</td>
            <td>
                {row.website
                    ? <a href={row.website} target="_blank" rel="noreferrer">{row.website}</a>
                    : "—"}
            </td>
            <td>{type === "sponsorship" ? row.proposal || "—" : row.project || "—"}</td>
            <td>
        <span className={`badge ${row.usBased ? "badge-yes" : "badge-no"}`}>
          {row.usBased ? "Yes" : "No"}
        </span>
            </td>
            <td>{row.createdAt}</td>
            <td>
                <StatusButtons id={row._id} collection={type} status={row.status} />
            </td>
        </tr>
    );
}

const STATUS_LABELS = {
    not_started: "Not started",
    in_progress: "In progress",
    review:      "In review",
    complete:    "Complete",
} as const;

const STATUS_COLOR = {
    not_started: "#475569",
    in_progress: "#5fa8a8",
    review:      "#f59e0b",
    complete:    "#4ade80",
} as const;

function ProjectsTable({ projects }: { projects: ProjectRow[] }) {
    if (projects.length === 0) {
        return <p className="empty">No projects yet.</p>;
    }
    return (
        <table>
            <thead>
            <tr>
                <th>User</th>
                <th>Title</th>
                <th>Status</th>
                <th>Deadline</th>
                <th>Created</th>
            </tr>
            </thead>
            <tbody>
            {projects.map((p) => (
                <tr key={p.id} className={`submission-row ${p.overdue ? "row-denied" : p.status === "complete" ? "row-accepted" : "row-pending"}`}>
                    <td>
                        <span style={{ color: "#5fa8a8", fontWeight: 600 }}>@{p.ownerUsername}</span>
                        {p.ownerEmail && <span style={{ color: "#475569", fontSize: 12, display: "block" }}>{p.ownerEmail}</span>}
                    </td>
                    <td>
                        <span style={{ color: "#e2e8f0", fontWeight: 500 }}>{p.title}</span>
                        {p.description && (
                            <span style={{ color: "#475569", fontSize: 12, display: "block", marginTop: 2 }}>
                  {p.description.slice(0, 60)}{p.description.length > 60 ? "…" : ""}
                </span>
                        )}
                    </td>
                    <td>
              <span
                  className="status-badge"
                  style={{
                      color:       STATUS_COLOR[p.status],
                      background:  STATUS_COLOR[p.status] + "18",
                      border:      `1px solid ${STATUS_COLOR[p.status]}44`,
                  }}
              >
                {STATUS_LABELS[p.status]}
              </span>
                    </td>
                    <td>
                        {p.deadline ? (
                            <span style={{ color: p.overdue ? "#f87171" : p.daysLeft !== null && p.daysLeft <= 7 ? "#f59e0b" : "#94a3b8" }}>
                  {p.deadline}
                                {p.daysLeft !== null && !p.overdue && ` (${p.daysLeft}d)`}
                                {p.overdue && " · Overdue"}
                </span>
                        ) : "—"}
                    </td>
                    <td style={{ color: "#475569" }}>{p.createdAt}</td>
                </tr>
            ))}
            </tbody>
        </table>
    );
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default async function Dashboard() {
    const { sponsorships, partnerships, projects } = await getData();

    const allSubs   = [...sponsorships, ...partnerships];
    const accepted  = allSubs.filter((r) => r.status === "accepted").length;
    const denied    = allSubs.filter((r) => r.status === "denied").length;
    const pending   = allSubs.filter((r) => r.status === "pending").length;

    const projActive   = projects.filter((p) => p.status === "in_progress").length;
    const projComplete = projects.filter((p) => p.status === "complete").length;
    const projOverdue  = projects.filter((p) => p.overdue).length;

    const submissionsPanel = (
        <>
            <div className="stats-row">
                <StatCard label="Total"        value={allSubs.length} />
                <StatCard label="Pending"      value={pending}   accent="#94a3b8" />
                <StatCard label="Accepted"     value={accepted}  accent="#4ade80" />
                <StatCard label="Denied"       value={denied}    accent="#f87171" />
                <StatCard label="Sponsorships" value={sponsorships.length} />
                <StatCard label="Partnerships" value={partnerships.length} />
            </div>

            <div className="section">
                <h2 className="section-title">Sponsorships</h2>
                <div className="table-wrap">
                    {sponsorships.length === 0 ? (
                        <p className="empty">No sponsorship submissions yet.</p>
                    ) : (
                        <table>
                            <thead>
                            <tr>
                                <th>Email</th><th>Website</th><th>Proposal</th>
                                <th>US Based</th><th>Date</th><th>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {sponsorships.map((row) => (
                                <SubmissionRow key={row._id} row={row} type="sponsorship" />
                            ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>

            <div className="section">
                <h2 className="section-title">Partnerships</h2>
                <div className="table-wrap">
                    {partnerships.length === 0 ? (
                        <p className="empty">No partnership submissions yet.</p>
                    ) : (
                        <table>
                            <thead>
                            <tr>
                                <th>Email</th><th>Website</th><th>Project</th>
                                <th>US Based</th><th>Date</th><th>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {partnerships.map((row) => (
                                <SubmissionRow key={row._id} row={row} type="partnership" />
                            ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </>
    );

    const projectsPanel = (
        <>
            <div className="stats-row">
                <StatCard label="Total projects" value={projects.length} />
                <StatCard label="In progress"    value={projActive}   accent="#5fa8a8" />
                <StatCard label="Complete"       value={projComplete} accent="#4ade80" />
                <StatCard label="Overdue"        value={projOverdue}  accent={projOverdue > 0 ? "#f87171" : undefined} />
            </div>

            <div className="section">
                <h2 className="section-title">All Projects</h2>
                <div className="table-wrap">
                    <ProjectsTable projects={projects} />
                </div>
            </div>
        </>
    );

    return (
        <>
            <style>{`
        .dash {
          min-height: 100vh;
          background: #0f1117;
          color: #e2e8f0;
          font-family: 'Courier New', monospace;
          padding: 48px 40px;
        }
        .dash-header {
          display: flex; align-items: baseline; gap: 16px;
          margin-bottom: 32px;
          border-bottom: 1px solid #1e2330;
          padding-bottom: 24px;
        }
        .dash-title { font-size: 28px; font-weight: 700; color: #f8fafc; letter-spacing: -0.5px; margin: 0; }
        .dash-badge {
          font-size: 11px; padding: 3px 10px;
          background: #c0392b22; color: #e74c3c;
          border: 1px solid #c0392b44; border-radius: 20px;
          letter-spacing: 1.5px; text-transform: uppercase;
        }
        .stats-row { display: flex; gap: 20px; margin-bottom: 40px; flex-wrap: wrap; }
        .stat-card {
          background: #161b27; border: 1px solid #1e2330; border-radius: 8px;
          padding: 24px 32px; display: flex; flex-direction: column; gap: 4px; min-width: 130px;
        }
        .stat-value { font-size: 40px; font-weight: 700; color: #3d6b6b; line-height: 1; }
        .stat-label { font-size: 12px; color: #64748b; text-transform: uppercase; letter-spacing: 1px; }
        .section { margin-bottom: 56px; }
        .section-title {
          font-size: 13px; text-transform: uppercase; letter-spacing: 2px; color: #64748b;
          margin: 0 0 16px; display: flex; align-items: center; gap: 10px;
        }
        .section-title::after { content: ""; flex: 1; height: 1px; background: #1e2330; }
        .table-wrap { overflow-x: auto; border: 1px solid #1e2330; border-radius: 8px; }
        table { width: 100%; border-collapse: collapse; font-size: 14px; }
        thead tr { background: #161b27; }
        th {
          text-align: left; padding: 12px 16px; font-size: 11px;
          text-transform: uppercase; letter-spacing: 1.5px; color: #475569;
          font-weight: 600; border-bottom: 1px solid #1e2330;
        }
        .submission-row td {
          padding: 13px 16px; color: #cbd5e1;
          border-bottom: 1px solid #1a2030; vertical-align: middle;
        }
        .submission-row:last-child td { border-bottom: none; }
        .submission-row:hover td { background: #161b27; }
        .row-accepted td:first-child { border-left: 3px solid #4ade80; }
        .row-denied   td:first-child { border-left: 3px solid #f87171; }
        .row-pending  td:first-child { border-left: 3px solid #475569; }
        .submission-row a { color: #3d6b6b; text-decoration: none; word-break: break-all; }
        .submission-row a:hover { text-decoration: underline; }
        .badge { display: inline-block; padding: 2px 10px; border-radius: 20px; font-size: 11px; letter-spacing: 0.5px; font-weight: 600; }
        .badge-yes { background: #14532d33; color: #4ade80; border: 1px solid #14532d88; }
        .badge-no  { background: #7f1d1d33; color: #f87171; border: 1px solid #7f1d1d88; }
        .empty { padding: 40px; text-align: center; color: #475569; font-size: 14px; }
        .action-btn {
          font-family: 'Courier New', monospace; font-size: 11px; font-weight: 700;
          letter-spacing: 1px; text-transform: uppercase; padding: 5px 14px;
          border-radius: 4px; border: 1px solid transparent; cursor: pointer;
          transition: background 0.15s, color 0.15s, opacity 0.15s;
        }
        .action-btn:disabled { opacity: 0.4; cursor: not-allowed; }
        .btn-accept { background: #14532d33; color: #4ade80; border-color: #14532d88; }
        .btn-accept:hover:not(:disabled) { background: #166534; color: #fff; }
        .btn-deny   { background: #7f1d1d33; color: #f87171; border-color: #7f1d1d88; }
        .btn-deny:hover:not(:disabled) { background: #991b1b; color: #fff; }
        .status-badge {
          font-size: 11px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase;
          padding: 3px 10px; border-radius: 20px;
        }
        .status-accepted { background: #14532d33; color: #4ade80; border: 1px solid #14532d88; }
        .status-denied   { background: #7f1d1d33; color: #f87171; border: 1px solid #7f1d1d88; }
      `}</style>

            <div className="dash">
                <div className="dash-header">
                    <h1 className="dash-title">KairosLLC Dashboard</h1>
                    <span className="dash-badge">Admin</span>
                </div>

                <DashTabs
                    submissionsPanel={submissionsPanel}
                    projectsPanel={projectsPanel}
                />
            </div>
        </>
    );
}