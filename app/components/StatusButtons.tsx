"use client";

import { useTransition } from "react";
import { updateStatus } from "../actions";

interface Props {
    id: string;
    collection: "sponsorship" | "partnership";
    status: "pending" | "accepted" | "denied";
}

export default function StatusButtons({ id, collection, status }: Props) {
    const [isPending, startTransition] = useTransition();

    function handle(next: "accepted" | "denied") {
        startTransition(() => {
            updateStatus(id, collection, next);
        });
    }

    if (status === "accepted") {
        return (
            <div className="action-cell">
                <span className="status-badge status-accepted">Accepted</span>
                <button
                    className="action-btn btn-deny"
                    onClick={() => handle("denied")}
                    disabled={isPending}
                >
                    Deny
                </button>
            </div>
        );
    }

    if (status === "denied") {
        return (
            <div className="action-cell">
                <span className="status-badge status-denied">Denied</span>
                <button
                    className="action-btn btn-accept"
                    onClick={() => handle("accepted")}
                    disabled={isPending}
                >
                    Accept
                </button>
            </div>
        );
    }

    return (
        <div className="action-cell">
            <button
                className="action-btn btn-accept"
                onClick={() => handle("accepted")}
                disabled={isPending}
            >
                {isPending ? "..." : "Accept"}
            </button>
            <button
                className="action-btn btn-deny"
                onClick={() => handle("denied")}
                disabled={isPending}
            >
                {isPending ? "..." : "Deny"}
            </button>
        </div>
    );
}