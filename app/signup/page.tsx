"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signUp } from "@/app/actions";
import { GoogleSignInButton } from "@/app/components/GoogleSignInButton";

export default function Signup() {
    const [state, action] = useActionState(signUp, null);
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
                    <p className="auth-left-tag">Get started</p>
                    <h1 className="auth-left-title">Your ideas,<br /><em>production-ready.</em></h1>
                    <p className="auth-left-sub">Create an account to track your projects, manage proposals, and stay in sync with our team.</p>
                </div>

                <div className="auth-left-perks">
                    {[
                        { icon: "⚡", text: "Fast onboarding — up and running in minutes" },
                        { icon: "🔒", text: "Your data stays private and secure" },
                        { icon: "📦", text: "Track every project from proposal to launch" },
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
                    <h2 className="auth-form-heading">Create your account</h2>
                    <p className="auth-form-sub">Already have one? <a href="/login">Sign in</a></p>

                    <GoogleSignInButton mode="signup" />

                    <div className="auth-divider">
                        <div className="auth-divider-line" />
                        <span className="auth-divider-text">or</span>
                        <div className="auth-divider-line" />
                    </div>

                    {state?.error && <p className="auth-error">{state.error}</p>}

                    <form action={action}>
                        <div className="auth-field">
                            <label className="auth-label" htmlFor="username">Username</label>
                            <input className="auth-input" type="text" id="username" name="username" placeholder="christianlarsen" required />
                        </div>
                        <div className="auth-field">
                            <label className="auth-label" htmlFor="email">Email address</label>
                            <input className="auth-input" type="email" id="email" name="email" placeholder="you@company.com" required />
                        </div>
                        <div className="auth-divider-gap" />
                        <div className="auth-field">
                            <label className="auth-label" htmlFor="password">Password</label>
                            <input className="auth-input" type="password" id="password" name="password" placeholder="••••••••••••" required />
                        </div>
                        <div className="auth-field" style={{ marginBottom: 28 }}>
                            <label className="auth-label" htmlFor="confirmPassword">Confirm password</label>
                            <input className="auth-input" type="password" id="confirmPassword" name="confirmPassword" placeholder="••••••••••••" required />
                        </div>
                        <button type="submit" className="auth-submit">Create account →</button>
                        <p className="auth-terms">By creating an account you agree to our terms of service and privacy policy.</p>
                    </form>
                </div>
            </div>
        </div>
    );
}