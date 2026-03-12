"use client";

import { useState, type ReactNode } from "react";

interface Props {
    submissionsPanel: ReactNode;
    projectsPanel:    ReactNode;
    profilePanel:     ReactNode;
    isAdmin:          boolean;
}

export default function DashTabs({ submissionsPanel, projectsPanel, profilePanel, isAdmin }: Props) {
    const [tab, setTab] = useState<"submissions" | "projects" | "profile">(
        isAdmin ? "submissions" : "projects"
    );

    return (
        <>
            <div className="tabs">
                {isAdmin && (
                    <button
                        className={`tab-btn ${tab === "submissions" ? "active" : ""}`}
                        onClick={() => setTab("submissions")}
                    >
                        Submissions
                    </button>
                )}
                <button
                    className={`tab-btn ${tab === "projects" ? "active" : ""}`}
                    onClick={() => setTab("projects")}
                >
                    Projects
                </button>
                <button
                    className={`tab-btn ${tab === "profile" ? "active" : ""}`}
                    onClick={() => setTab("profile")}
                >
                    Profile
                </button>
            </div>

            {tab === "submissions" && isAdmin && submissionsPanel}
            {tab === "projects"    && projectsPanel}
            {tab === "profile"     && profilePanel}
        </>
    );
}