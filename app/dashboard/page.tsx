import { connectDB } from "@/app/lib/db";
import { Schema, models, model } from "mongoose";
import StatusButtons from "../components/StatusButtons";

// --- Schemas ---

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

const Sponsorship = models.Sponsorship || model("Sponsorship", SponsorshipSchema);
const Partnership = models.Partnership || model("Partnership", PartnershipSchema);

// --- Types ---

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

// --- Data fetching ---

async function getData(): Promise<{ sponsorships: Submission[]; partnerships: Submission[] }> {
    await connectDB();
    const [sponsorships, partnerships] = await Promise.all([
        Sponsorship.find().sort({ createdAt: -1 }).lean(),
        Partnership.find().sort({ createdAt: -1 }).lean(),
    ]);

    const serialize = (docs: any[]): Submission[] =>
        docs.map((d) => ({
            _id: d._id.toString(),
            email: d.email,
            website: d.website || "",
            proposal: d.proposal || "",
            project: d.project || "",
            usBased: d.usBased,
            status: d.status ?? "pending",
            createdAt: new Date(d.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
            }),
        }));

    return {
        sponsorships: serialize(sponsorships as any[]),
        partnerships: serialize(partnerships as any[]),
    };
}

// --- Sub-components ---

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

// --- Page ---

export default async function Dashboard() {
    const { sponsorships, partnerships } = await getData();

    const all      = [...sponsorships, ...partnerships];
    const accepted = all.filter((r) => r.status === "accepted").length;
    const denied   = all.filter((r) => r.status === "denied").length;
    const pending  = all.filter((r) => r.status === "pending").length;

    return (
        <>
            <div className="dash">
                <div className="dash-header">
                    <h1 className="dash-title">KairosLLC Dashboard</h1>
                    <span className="dash-badge">Admin</span>
                </div>

                <div className="stats-row">
                    <StatCard label="Total" value={all.length} />
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
            </div>
        </>
    );
}