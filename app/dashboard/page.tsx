// app/dashboard/page.tsx
import { connectDB } from "@/app/lib/db";
import StatusButtons from "../components/StatusButtons";
import DashTabs from "../components/DashTabs";
import { getSession } from "@/app/session";
import { redirect } from "next/navigation";
import { Schema, models, model, Types } from "mongoose";
import ProfilePanel from "@/app/components/ProfilePanel";
import ProjectControls from "../components/ProjectControls";

// ─── Schemas ───────────────────────────────────────────────────────────────────

const AccountSchema = new Schema({
    email:     { type: String, required: true, unique: true },
    username:  { type: String, required: true, unique: true },
    password:  { type: String, required: true },
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

const Account     = models.Account     || model("Account",     AccountSchema);
const Project     = models.Project     || model("Project",     ProjectSchema);
const Sponsorship = models.Sponsorship || model("Sponsorship", SponsorshipSchema);
const Partnership = models.Partnership || model("Partnership", PartnershipSchema);


// Types
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

// Data fetching
async function getData(userId: string, isAdmin: boolean) {
    await connectDB();

    const projectQuery = isAdmin
        ? {}
        : { $or: [{ ownerId: new Types.ObjectId(userId) }, { associatedIds: new Types.ObjectId(userId) }] };

    const [sponsorships, partnerships, projects, accounts] = await Promise.all([
        Sponsorship.find().sort({ createdAt: -1 }).lean(),
        Partnership.find().sort({ createdAt: -1 }).lean(),
        Project.find(projectQuery).sort({ createdAt: -1 }).lean(),
        Account.find().lean(),
    ]);

    const accountMap = new Map(
        (accounts as any[]).map((a) => [
            a._id.toString(),
            { username: a.username || "unknown", email: a.email || "" },
        ])
    );

    const formatDate = (date: Date) =>
        date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });

    const serializeSubmission = (docs: any[]): Submission[] =>
        docs.map((d) => ({
            _id: d._id.toString(),
            email: d.email,
            website: d.website || "",
            proposal: d.proposal || "",
            project: d.project || "",
            usBased: d.usBased,
            status: d.status ?? "pending",
            createdAt: formatDate(new Date(d.createdAt)),
        }));

    const serializeProjects = (docs: any[]): ProjectRow[] =>
        docs.map((d) => {
            const deadline = d.deadline ? new Date(d.deadline) : null;
            const now = new Date();
            const daysLeft = deadline
                ? Math.ceil(
                    (deadline.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
                )
                : null;
            const owner = accountMap.get(d.ownerId?.toString()) ?? {
                username: "unknown",
                email: "",
            };
            return {
                id: d._id.toString(),
                title: d.title,
                description: d.description || "",
                ownerUsername: owner.username,
                ownerEmail: owner.email,
                status: d.status,
                deadline: deadline ? formatDate(deadline) : null,
                daysLeft,
                overdue: daysLeft !== null && daysLeft < 0 && d.status !== "complete",
                createdAt: formatDate(new Date(d.createdAt)),
            };
        });

    return {
        sponsorships: serializeSubmission(sponsorships as any[]),
        partnerships: serializeSubmission(partnerships as any[]),
        projects: serializeProjects(projects as any[]),
    };
}

// Sub-components
function StatCard({
                      label,
                      value,
                      accent,
                  }: {
    label: string;
    value: number;
    accent?: string;
}) {
    return (
        <div className="stat-card">
      <span
          className="stat-value"
          style={accent ? { color: accent } : undefined}
      >
        {value}
      </span>
            <span className="stat-label">{label}</span>
        </div>
    );
}
function SubmissionRow({
                           row,
                           type,
                       }: {
    row: Submission;
    type: "sponsorship" | "partnership";
}) {
    return (
        <tr className={`submission-row row-${row.status}`}>
            <td>{row.email}</td>
            <td>
                {row.website ? (
                    <a href={row.website} target="_blank" rel="noreferrer">
                        {row.website}
                    </a>
                ) : (
                    "—"
                )}
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
    review: "In review",
    complete: "Complete",
} as const;

const STATUS_COLOR = {
    not_started: "#475569",
    in_progress: "#5fa8a8",
    review: "#f59e0b",
    complete: "#4ade80",
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
                <tr
                    key={p.id}
                    className={`submission-row ${
                        p.overdue
                            ? "row-denied"
                            : p.status === "complete"
                                ? "row-accepted"
                                : "row-pending"
                    }`}
                >
                    <td>
              <span style={{ color: "#5fa8a8", fontWeight: 600 }}>
                @{p.ownerUsername}
              </span>
                        {p.ownerEmail && (
                            <span
                                style={{ color: "#475569", fontSize: 12, display: "block" }}
                            >
                  {p.ownerEmail}
                </span>
                        )}
                    </td>
                        <td>
                            <a
                            href={`/dashboard/project/${p.id}`}
                            target="_blank"
                            rel="noreferrer"
                            style={{ color: "#e2e8f0", fontWeight: 500, textDecoration: "none" }}
                            >
                            {p.title}
                        </a>
                        {p.description && (
                            <span
                                style={{
                                    color: "#475569",
                                    fontSize: 12,
                                    display: "block",
                                    marginTop: 2,
                                }}
                            >
          {p.description.slice(0, 60)}
                                {p.description.length > 60 ? "…" : ""}
        </span>
                        )}
                    </td>
                    <td>
              <span
                  className="status-badge"
                  style={{
                      color: STATUS_COLOR[p.status],
                      background: STATUS_COLOR[p.status] + "18",
                      border: `1px solid ${STATUS_COLOR[p.status]}44`,
                  }}
              >
                {STATUS_LABELS[p.status]}
              </span>
                    </td>
                    <td>
                        {p.deadline ? (
                            <span
                                style={{
                                    color: p.overdue
                                        ? "#f87171"
                                        : p.daysLeft !== null && p.daysLeft <= 7
                                            ? "#f59e0b"
                                            : "#94a3b8",
                                }}
                            >
                  {p.deadline}
                                {p.daysLeft !== null && !p.overdue && ` (${p.daysLeft}d)`}
                                {p.overdue && " · Overdue"}
                </span>
                        ) : (
                            "—"
                        )}
                    </td>
                    <td style={{ color: "#475569" }}>{p.createdAt}</td>
                </tr>
            ))}
            </tbody>
        </table>
    );
}

// Page
export default async function Dashboard() {
    // Auth check first, before any DB work
    const user = await getSession();
    if (!user) redirect("/login");

    const { sponsorships, partnerships, projects } = await getData(user.id, user.type === "admin");

    const allSubs = [...sponsorships, ...partnerships];
    const accepted = allSubs.filter((r) => r.status === "accepted").length;
    const denied = allSubs.filter((r) => r.status === "denied").length;
    const pending = allSubs.filter((r) => r.status === "pending").length;

    const projActive = projects.filter((p) => p.status === "in_progress").length;
    const projComplete = projects.filter((p) => p.status === "complete").length;
    const projOverdue = projects.filter((p) => p.overdue).length;

    const submissionsPanel = (
        <>
            <div className="stats-row">
                <StatCard label="Total" value={allSubs.length} />
                <StatCard label="Pending" value={pending} accent="#94a3b8" />
                <StatCard label="Accepted" value={accepted} accent="#4ade80" />
                <StatCard label="Denied" value={denied} accent="#f87171" />
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
                                <th>Email</th>
                                <th>Website</th>
                                <th>Proposal</th>
                                <th>US Based</th>
                                <th>Date</th>
                                <th>Action</th>
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
                                <th>Email</th>
                                <th>Website</th>
                                <th>Project</th>
                                <th>US Based</th>
                                <th>Date</th>
                                <th>Action</th>
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
                <StatCard label="In progress" value={projActive} accent="#5fa8a8" />
                <StatCard label="Complete" value={projComplete} accent="#4ade80" />
                <StatCard
                    label="Overdue"
                    value={projOverdue}
                    accent={projOverdue > 0 ? "#f87171" : undefined}
                />
            </div>

            <div className="section">
                <h2 className="section-title">New Project</h2>
                <ProjectControls mode="form" />
            </div>

            <div className="section">
                <h2 className="section-title">All Projects</h2>
                <div className="table-wrap">
                    <ProjectsTable projects={projects} />
                </div>
            </div>
        </>
    );

    const profilePanel = (
        <ProfilePanel user={{
            id:            user.id,
            email:         user.email,
            username:      user.username,
            emailVerified: user.emailVerified,
            firebaseUid:   user.firebaseUid,
        }} />
    );

    return (
        <div className="dash">
            <div className="dash-header">
                <h1 className="dash-title">KairosLLC Dashboard</h1>
                <span className="dash-badge">{user.username}</span>
            </div>
            <DashTabs
                submissionsPanel={submissionsPanel}
                projectsPanel={projectsPanel}
                profilePanel={profilePanel}
                isAdmin={user.type === "admin"}
            />
        </div>
    );
}