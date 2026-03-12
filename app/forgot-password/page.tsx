"use client";

import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/app/lib/firebase";

export default function ForgotPassword() {
    const [email, setEmail]     = useState("");
    const [sent, setSent]       = useState(false);
    const [error, setError]     = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit() {
        setError("");
        if (!email.trim()) { setError("Email is required."); return; }
        setLoading(true);
        try {
            await sendPasswordResetEmail(auth, email.trim(), { url: "https://kairosllc.org/login" });
            setSent(true);
        } catch (err: any) {
            setError(err?.message ?? "Failed to send reset email.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="fp-page">
            <div className="fp-card">
                <a href="/" className="fp-logo">
                    <span className="fp-logo-dot" />
                    KairosLLC
                </a>

                <h1 className="fp-heading">Reset your password</h1>
                <p className="fp-sub">Enter your email and we'll send you a link to reset your password.</p>

                {sent ? (
                    <div className="fp-success">
                        Reset email sent to {email}. Check your inbox and follow the link to set a new password.
                    </div>
                ) : (
                    <>
                        {error && <p className="auth-error">{error}</p>}
                        <div className="auth-field">
                            <label className="auth-label">Email address</label>
                            <input
                                className="auth-input"
                                type="email"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                            />
                        </div>
                        <button className="auth-submit" onClick={handleSubmit} disabled={loading}>
                            {loading ? "Sending..." : "Send reset email →"}
                        </button>
                    </>
                )}

                <a href="/login" className="fp-back">Back to sign in</a>
            </div>
        </div>
    );
}