"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/app/actions";
import { GoogleSignInButton } from "../components/GoogleSignInButton";

export default function Login() {
    const [state, action] = useActionState(login, null);
    const router = useRouter();

    useEffect(() => {
        if (state?.success) router.push("/dashboard");
    }, [state]);

    return (
        <div className="auth-page">
            <div className="auth-left">
                <div className="auth-left-bg" />
                <div className="auth-left-grid" />

                <a href="/" className="auth-left-logo">
                    <span className="auth-left-logo-dot" />
                    CLKairos
                </a>

                <div className="auth-left-content">
                    <p className="auth-left-tag">Welcome back</p>
                    <h1 className="auth-left-title">Good to see<br /><em>you again.</em></h1>
                    <p className="auth-left-sub">Sign in to manage your projects, track progress, and communicate with our team.</p>
                </div>

                <div className="auth-left-perks">
                    {[
                        { icon: "📁", text: "All your projects in one place" },
                        { icon: "💬", text: "Direct line to our dev team" },
                        { icon: "📅", text: "Deadlines and milestones at a glance" },
                    ].map((p) => (
                        <div className="auth-perk" key={p.text}>
                            <span className="auth-perk-icon">{p.icon}</span>
                            <span className="auth-perk-text">{p.text}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="auth-right">
                <div className="auth-form-wrap">
                    <h2 className="auth-form-heading">Sign in</h2>
                    <p className="auth-form-sub">No account? <a href="/signup">Create one</a></p>

                    {state?.error && <p className="auth-error">{state.error}</p>}

                    <GoogleSignInButton mode="login" />

                    <div className="auth-divider">
                        <div className="auth-divider-line" />
                        <span className="auth-divider-text">or</span>
                        <div className="auth-divider-line" />
                    </div>

                    <form action={action}>
                        <div className="auth-field">
                            <label className="auth-label" htmlFor="email">Email address</label>
                            <input className="auth-input" type="email" id="email" name="email" placeholder="you@company.com" required />
                        </div>
                        <div className="auth-field">
                            <label className="auth-label" htmlFor="password">Password</label>
                            <input className="auth-input" type="password" id="password" name="password" placeholder="••••••••••••" required />
                        </div>
                        <div className="auth-forgot">
                            <a href="/forgot-password">Forgot password?</a>
                        </div>
                        <button type="submit" className="auth-submit">Sign in →</button>
                    </form>
                </div>
            </div>
        </div>
    );
}