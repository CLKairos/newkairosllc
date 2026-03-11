"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signUp } from "@/app/actions";
import {GoogleSignInButton} from "@/app/components/GoogleSignInButton";

type ActionState = { success: boolean; error: string | null } | null;

export default function Signup() {
    const [state, action] = useActionState(signUp, null);
    const router = useRouter();

    useEffect(() => {
        if (state?.success) router.push("/dashboard");
    }, [state]);

    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@400;500;600;700&display=swap');
        .signup-page {
          font-family: 'DM Sans', sans-serif; min-height: 100vh; display: flex; align-items: stretch;
        }
        .signup-left {
          flex: 1; position: relative; background: #0f1a1a;
          display: flex; flex-direction: column; justify-content: space-between;
          padding: 48px; overflow: hidden;
        }
        .signup-left-bg {
          position: absolute; inset: 0;
          background:
            radial-gradient(ellipse 70% 60% at 80% 20%, rgba(61,107,107,0.2) 0%, transparent 65%),
            radial-gradient(ellipse 50% 70% at 10% 90%, rgba(47,79,79,0.25) 0%, transparent 60%);
          pointer-events: none;
        }
        .signup-left-grid {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(61,107,107,0.07) 1px, transparent 1px),
            linear-gradient(90deg, rgba(61,107,107,0.07) 1px, transparent 1px);
          background-size: 48px 48px; pointer-events: none;
        }
        .signup-left-logo {
          position: relative; font-size: 18px; font-weight: 700; color: #e0eeee;
          text-decoration: none; display: flex; align-items: center; gap: 8px;
        }
        .signup-left-logo-dot {
          width: 7px; height: 7px; border-radius: 50%; background: #5fa8a8;
          animation: blink 3s ease infinite;
        }
        @keyframes blink { 0%,100%{opacity:1;} 50%{opacity:0.3;} }
        .signup-left-content { position: relative; }
        .signup-left-tag {
          font-size: 11px; font-weight: 700; letter-spacing: 3px; text-transform: uppercase;
          color: #5fa8a8; display: flex; align-items: center; gap: 10px; margin-bottom: 20px;
        }
        .signup-left-tag::before { content: ''; display: block; width: 24px; height: 1px; background: #5fa8a8; }
        .signup-left-title {
          font-family: 'DM Serif Display', serif;
          font-size: clamp(32px, 3.5vw, 52px); color: #f0f4f4; line-height: 1.1; margin-bottom: 20px;
        }
        .signup-left-title em { font-style: italic; color: #5fa8a8; }
        .signup-left-sub {
          font-size: 15px; color: rgba(240,244,244,0.45); line-height: 1.75; max-width: 360px;
        }
        .signup-left-perks { position: relative; display: flex; flex-direction: column; gap: 14px; }
        .signup-perk { display: flex; align-items: center; gap: 12px; }
        .signup-perk-icon {
          width: 32px; height: 32px; border-radius: 8px;
          background: rgba(61,107,107,0.2); border: 1px solid rgba(61,107,107,0.35);
          display: flex; align-items: center; justify-content: center;
          font-size: 14px; flex-shrink: 0;
        }
        .signup-perk-text { font-size: 13px; color: rgba(240,244,244,0.55); }
        .signup-right {
          width: 460px; flex-shrink: 0; background: #070e0e;
          display: flex; align-items: center; justify-content: center;
          padding: 48px 52px;
          border-left: 1px solid rgba(61,107,107,0.15);
        }
        .signup-form-wrap { width: 100%; opacity: 0; animation: fadeUp 0.6s ease 0.1s forwards; }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .signup-form-heading {
          font-family: 'DM Serif Display', serif; font-size: 28px; color: #f0f4f4; margin-bottom: 6px;
        }
        .signup-form-sub {
          font-size: 14px; color: rgba(240,244,244,0.4); margin-bottom: 28px; line-height: 1.6;
        }
        .signup-form-sub a { color: #5fa8a8; text-decoration: none; font-weight: 600; }
        .signup-form-sub a:hover { text-decoration: underline; }

        .sf-google {
          width: 100%; padding: 12px 16px; background: #0f1a1a;
          border: 1px solid rgba(61,107,107,0.3); border-radius: 8px;
          font-size: 14px; font-weight: 600; font-family: 'DM Sans', sans-serif;
          color: #e0eeee; cursor: pointer;
          display: flex; align-items: center; justify-content: center; gap: 10px;
          transition: background 0.15s, border-color 0.15s; margin-bottom: 20px;
        }
        .sf-google:hover { background: #162424; border-color: #5fa8a8; }
        .sf-google-icon { width: 18px; height: 18px; flex-shrink: 0; }
        .sf-divider {
          display: flex; align-items: center; gap: 12px; margin-bottom: 20px;
        }
        .sf-divider-line { flex: 1; height: 1px; background: rgba(61,107,107,0.15); }
        .sf-divider-text { font-size: 11px; color: rgba(240,244,244,0.25); text-transform: uppercase; letter-spacing: 1px; }

        .sf-field { display: flex; flex-direction: column; gap: 7px; margin-bottom: 18px; }
        .sf-label {
          font-size: 12px; font-weight: 600; letter-spacing: 0.5px;
          text-transform: uppercase; color: rgba(240,244,244,0.45);
        }
        .sf-input {
          padding: 12px 16px; background: #0f1a1a; border: 1px solid rgba(61,107,107,0.25);
          border-radius: 8px; font-size: 15px; font-family: 'DM Sans', sans-serif; color: #e0eeee;
          transition: border-color 0.15s, box-shadow 0.15s;
        }
        .sf-input::placeholder { color: rgba(224,238,238,0.2); }
        .sf-input:focus { outline: none; border-color: #3d6b6b; box-shadow: 0 0 0 3px rgba(61,107,107,0.18); }
        .sf-divider-gap { height: 1px; background: rgba(61,107,107,0.15); margin: 4px 0 20px; }
        .sf-submit {
          width: 100%; padding: 14px; background: #3d6b6b; color: #fff;
          border: none; border-radius: 8px; font-size: 15px; font-weight: 700;
          font-family: 'DM Sans', sans-serif; cursor: pointer; letter-spacing: 0.3px;
          transition: background 0.2s, transform 0.15s; margin-bottom: 16px;
        }
        .sf-submit:hover { background: #4a8080; transform: translateY(-1px); }
        .sf-submit:active { transform: translateY(0); }
        .sf-terms { font-size: 12px; color: rgba(240,244,244,0.25); text-align: center; line-height: 1.6; }
        .sf-error {
          background: rgba(248,113,113,0.08); border: 1px solid rgba(248,113,113,0.25);
          color: #f87171; border-radius: 8px; padding: 12px 16px; font-size: 14px; margin-bottom: 20px;
        }
        @media (max-width: 900px) {
          .signup-page { flex-direction: column; }
          .signup-left { padding: 40px 28px 52px; }
          .signup-left-perks { display: none; }
          .signup-right { width: 100%; padding: 48px 28px; border-left: none; border-top: 1px solid rgba(61,107,107,0.15); }
        }
      `}</style>

            <div className="signup-page">
                <div className="signup-left">
                    <div className="signup-left-bg" />
                    <div className="signup-left-grid" />
                    <a href="/" className="signup-left-logo">
                        <span className="signup-left-logo-dot" />
                        KairosLLC
                    </a>
                    <div className="signup-left-content">
                        <p className="signup-left-tag">Get started</p>
                        <h1 className="signup-left-title">Your ideas,<br /><em>production-ready.</em></h1>
                        <p className="signup-left-sub">Create an account to track your projects, manage proposals, and stay in sync with our team.</p>
                    </div>
                    <div className="signup-left-perks">
                        {[
                            { icon: "⚡", text: "Fast onboarding — up and running in minutes" },
                            { icon: "🔒", text: "Your data stays private and secure" },
                            { icon: "📦", text: "Track every project from proposal to launch" },
                        ].map((p) => (
                            <div className="signup-perk" key={p.text}>
                                <span className="signup-perk-icon">{p.icon}</span>
                                <span className="signup-perk-text">{p.text}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="signup-right">
                    <div className="signup-form-wrap">
                        <h2 className="signup-form-heading">Create your account</h2>
                        <p className="signup-form-sub">Already have one? <a href="/login">Sign in</a></p>

                        <GoogleSignInButton mode={"signup"} />

                        <div className="sf-divider">
                            <div className="sf-divider-line" />
                            <span className="sf-divider-text">or</span>
                            <div className="sf-divider-line" />
                        </div>

                        {state?.error && <p className="sf-error">{state.error}</p>}

                        <form action={action}>
                            <div className="sf-field">
                                <label className="sf-label" htmlFor="username">Username</label>
                                <input className="sf-input" type="text" id="username" name="username" placeholder="christianlarsen" required />
                            </div>
                            <div className="sf-field">
                                <label className="sf-label" htmlFor="email">Email address</label>
                                <input className="sf-input" type="email" id="email" name="email" placeholder="you@company.com" required />
                            </div>
                            <div className="sf-divider-gap" />
                            <div className="sf-field">
                                <label className="sf-label" htmlFor="password">Password</label>
                                <input className="sf-input" type="password" id="password" name="password" placeholder="••••••••••••" required />
                            </div>
                            <div className="sf-field" style={{ marginBottom: 28 }}>
                                <label className="sf-label" htmlFor="confirmPassword">Confirm password</label>
                                <input className="sf-input" type="password" id="confirmPassword" name="confirmPassword" placeholder="••••••••••••" required />
                            </div>
                            <button type="submit" className="sf-submit">Create account →</button>
                            <p className="sf-terms">By creating an account you agree to our terms of service and privacy policy.</p>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}