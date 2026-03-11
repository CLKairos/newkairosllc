"use client";

import { useState, type ReactNode } from "react";

interface Props {
    submissionsPanel: ReactNode;
    projectsPanel: ReactNode;
}

export default function DashTabs({ submissionsPanel, projectsPanel }: Props) {
    const [tab, setTab] = useState<"submissions" | "projects">("submissions");

    return (
        <>
            <style>{`
        .tabs {
          display: flex;
          gap: 0;
          margin-bottom: 36px;
          border-bottom: 1px solid #1e2330;
        }
        .tab-btn {
          font-family: 'Courier New', monospace;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          padding: 10px 28px;
          background: none;
          border: none;
          border-bottom: 2px solid transparent;
          color: #475569;
          cursor: pointer;
          transition: color 0.15s, border-color 0.15s;
          margin-bottom: -1px;
        }
        .tab-btn:hover { color: #94a3b8; }
        .tab-btn.active { color: #e2e8f0; border-bottom-color: #3d6b6b; }
      `}</style>

            <div className="tabs">
                <button
                    className={`tab-btn ${tab === "submissions" ? "active" : ""}`}
                    onClick={() => setTab("submissions")}
                >
                    Submissions
                </button>
                <button
                    className={`tab-btn ${tab === "projects" ? "active" : ""}`}
                    onClick={() => setTab("projects")}
                >
                    Projects
                </button>
            </div>

            {tab === "submissions" ? submissionsPanel : projectsPanel}
        </>
    );
}