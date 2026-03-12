"use client";

import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/app/lib/firebase";

export default function ForgotPassword() {
    const [email, setEmail]   = useState("");
    const [sent, setSent]     = useState(false);
    const [error, setError]   = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit() {
        setError("");
        if (!email.trim()) { setError("Email is required."); return; }
        setLoading(true);
        try {
            await sendPasswordResetEmail(auth, email.trim(), {
                url: "https://kairosllc.org/login",
            });
            setSent(true);
        } catch (err: any) {
            setError(err?.message ?? "Failed to send reset email.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@400;500;600;700&display=swap');
                .fp-page {
                    font-family: 'DM Sans', sans-serif; min-height: 100vh;
                    background: #070e0e; display: flex; align-items: center; justify-content: center;
                    padding: 48px 24px;
                }
                .fp-card {
                    width: 100%; max-width: 420px;
                    background: #0f1a1a; border: 1px solid rgba(61,107,107,0.2);
                    border-radius: 12px; padding: 48px 40px;
                }
                .fp-logo {
                    font-size: 16px; font-weight: 700; color: #e0eeee;
                    text-decoration: none; display: flex; align-items: center;
                    gap: 8px; margin-bottom: 36px;
                }
                .fp-logo-dot {
                    width: 7px; height: 7px; border-radius: 50%; background: #5fa8a8;
                }
                .fp-heading {
                    font-family: 'DM Serif Display', serif;
                    font-size: 28px; color: #f0f4f4; margin-bottom: 8px;
                }
                .fp-sub {
                    font-size: 14px; color: rgba(240,244,244,0.4);
                    margin-bottom: 32px; line-height: 1.6;
                }
                .fp-field { display: flex; flex-direction: column; gap: 7px; margin-bottom: 20px; }
                .fp-label {
                    font-size: 12px; font-weight: 600; letter-spacing: 0.5px;
                    text-transform: uppercase; color: rgba(240,244,244,0.45);
                }
                .fp-input {
                    padding: 12px 16px; background: #0a1212;
                    border: 1px solid rgba(61,107,107,0.25); border-radius: 8px;
                    font-size: 15px; font-family: 'DM Sans', sans-serif; color: #e0eeee;
                    transition: border-color 0.15s, box-shadow 0.15s; outline: none;
                }
                .fp-input::placeholder { color: rgba(224,238,238,0.2); }
                .fp-input:focus { border-color: #3d6b6b; box-shadow: 0 0 0 3px rgba(61,107,107,0.18); }
                .fp-submit {
                    width: 100%; padding: 14px; background: #3d6b6b; color: #fff;
                    border: none; border-radius: 8px; font-size: 15px; font-weight: 700;
                    font-family: 'DM Sans', sans-serif; cursor: pointer;
                    transition: background 0.2s, transform 0.15s; margin-bottom: 16px;
                }
                .fp-submit:hover:not(:disabled) { background: #4a8080; transform: translateY(-1px); }
                .fp-submit:disabled { opacity: 0.5; cursor: not-allowed; }
                .fp-error {
                    background: rgba(248,113,113,0.08); border: 1px solid rgba(248,113,113,0.25);
                    color: #f87171; border-radius: 8px; padding: 12px 16px;
                    font-size: 14px; margin-bottom: 20px;
                }
                .fp-success {
                    background: rgba(74,222,128,0.08); border: 1px solid rgba(74,222,128,0.25);
                    color: #4ade80; border-radius: 8px; padding: 16px;
                    font-size: 14px; line-height: 1.6;
                }
                .fp-back {
                    display: block; text-align: center; margin-top: 20px;
                    font-size: 13px; color: rgba(240,244,244,0.35);
                    text-decoration: none; transition: color 0.15s;
                }
                .fp-back:hover { color: #5fa8a8; }
            `}</style>

            <div className="fp-page">
                <div className="fp-card">
                    <a href="/" className="fp-logo">
                        <span className="fp-logo-dot" />
                        KairosLLC
                    </a>

                    <h1 className="fp-heading">Reset your password</h1>
                    <p className="fp-sub">
                        Enter your email and we'll send you a link to reset your password.
                    </p>

                    {sent ? (
                        <div className="fp-success">
                            Reset email sent to {email}. Check your inbox and follow the link to set a new password.
                        </div>
                    ) : (
                        <>
                            {error && <p className="fp-error">{error}</p>}
                            <div className="fp-field">
                                <label className="fp-label">Email address</label>
                                <input
                                    className="fp-input"
                                    type="email"
                                    placeholder="you@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                                />
                            </div>
                            <button className="fp-submit" onClick={handleSubmit} disabled={loading}>
                                {loading ? "Sending..." : "Send reset email →"}
                            </button>
                        </>
                    )}

                    <a href="/login" className="fp-back">Back to sign in</a>
                </div>
            </div>
        </>
    );
}