"use client";

import { useActionState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/app/actions";
import { GoogleSignInButton } from "../components/GoogleSignInButton";

type ActionState = { success: boolean; error: string | null } | null;

export default function Login() {
    const [state, action] = useActionState(login, null);
    const router = useRouter();

    useEffect(() => {
        if (state?.success) {
            router.push("/dashboard");
        }
    }, [state]);

    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@400;500;600;700&display=swap');

        .login-page {
          font-family: 'DM Sans', sans-serif;
          min-height: 100vh;
          display: flex;
          align-items: stretch;
        }

        /* ── Left panel ── */
        .login-left {
          flex: 1;
          position: relative;
          background: #0f1a1a;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 48px;
          overflow: hidden;
        }
        .login-left-bg {
          position: absolute; inset: 0;
          background:
            radial-gradient(ellipse 70% 60% at 80% 20%, rgba(61,107,107,0.2) 0%, transparent 65%),
            radial-gradient(ellipse 50% 70% at 10% 90%, rgba(47,79,79,0.25) 0%, transparent 60%);
          pointer-events: none;
        }
        .login-left-grid {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(61,107,107,0.07) 1px, transparent 1px),
            linear-gradient(90deg, rgba(61,107,107,0.07) 1px, transparent 1px);
          background-size: 48px 48px;
          pointer-events: none;
        }

        .login-left-logo {
          position: relative;
          font-size: 18px; font-weight: 700; color: #e0eeee;
          text-decoration: none; display: flex; align-items: center; gap: 8px;
        }
        .login-left-logo-dot {
          width: 7px; height: 7px; border-radius: 50%; background: #5fa8a8;
          animation: blink 3s ease infinite;
        }
        @keyframes blink { 0%,100%{opacity:1;} 50%{opacity:0.3;} }

        .login-left-content { position: relative; }
        .login-left-tag {
          font-size: 11px; font-weight: 700; letter-spacing: 3px; text-transform: uppercase;
          color: #5fa8a8; display: flex; align-items: center; gap: 10px; margin-bottom: 20px;
        }
        .login-left-tag::before { content: ''; display: block; width: 24px; height: 1px; background: #5fa8a8; }
        .login-left-title {
          font-family: 'DM Serif Display', serif;
          font-size: clamp(32px, 3.5vw, 52px); color: #f0f4f4; line-height: 1.1; margin-bottom: 20px;
        }
        .login-left-title em { font-style: italic; color: #5fa8a8; }
        .login-left-sub {
          font-size: 15px; color: rgba(240,244,244,0.45); line-height: 1.75; max-width: 360px;
        }

        .login-left-perks { position: relative; display: flex; flex-direction: column; gap: 14px; }
        .login-perk { display: flex; align-items: center; gap: 12px; }
        .login-perk-icon {
          width: 32px; height: 32px; border-radius: 8px;
          background: rgba(61,107,107,0.2); border: 1px solid rgba(61,107,107,0.35);
          display: flex; align-items: center; justify-content: center;
          font-size: 14px; flex-shrink: 0;
        }
        .login-perk-text { font-size: 13px; color: rgba(240,244,244,0.55); }

        /* ── Right panel ── */
        .login-right {
          width: 460px; flex-shrink: 0;
          background: #070e0e;
          display: flex; align-items: center; justify-content: center;
          padding: 48px 52px;
          border-left: 1px solid rgba(61,107,107,0.15);
        }

        .login-form-wrap {
          width: 100%;
          opacity: 0;
          animation: fadeUp 0.6s ease 0.1s forwards;
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .login-form-heading {
          font-family: 'DM Serif Display', serif;
          font-size: 28px; color: #f0f4f4; margin-bottom: 6px;
        }
        .login-form-sub {
          font-size: 14px; color: rgba(240,244,244,0.4);
          margin-bottom: 36px; line-height: 1.6;
        }
        .login-form-sub a { color: #5fa8a8; text-decoration: none; font-weight: 600; }
        .login-form-sub a:hover { text-decoration: underline; }

        .lf-field { display: flex; flex-direction: column; gap: 7px; margin-bottom: 18px; }
        .lf-label {
          font-size: 12px; font-weight: 600; letter-spacing: 0.5px;
          text-transform: uppercase; color: rgba(240,244,244,0.45);
        }
        .lf-input {
          padding: 12px 16px;
          background: #0f1a1a;
          border: 1px solid rgba(61,107,107,0.25);
          border-radius: 8px;
          font-size: 15px; font-family: 'DM Sans', sans-serif; color: #e0eeee;
          transition: border-color 0.15s, box-shadow 0.15s;
        }
        .lf-input::placeholder { color: rgba(224,238,238,0.2); }
        .lf-input:focus {
          outline: none; border-color: #3d6b6b;
          box-shadow: 0 0 0 3px rgba(61,107,107,0.18);
        }

        /* Google button */
        .lf-google {
          width: 100%; padding: 12px 16px;
          background: #0f1a1a;
          border: 1px solid rgba(61,107,107,0.3);
          border-radius: 8px;
          font-size: 14px; font-weight: 600; font-family: 'DM Sans', sans-serif;
          color: #e0eeee; cursor: pointer;
          display: flex; align-items: center; justify-content: center; gap: 10px;
          transition: background 0.15s, border-color 0.15s;
          margin-bottom: 20px;
        }
        .lf-google:hover { background: #162424; border-color: #5fa8a8; }
        .lf-google-icon {
          width: 18px; height: 18px; flex-shrink: 0;
        }

        .lf-divider {
          display: flex; align-items: center; gap: 12px;
          margin-bottom: 20px;
        }
        .lf-divider-line { flex: 1; height: 1px; background: rgba(61,107,107,0.15); }
        .lf-divider-text { font-size: 11px; color: rgba(240,244,244,0.25); text-transform: uppercase; letter-spacing: 1px; }

        .lf-forgot {
          display: flex; justify-content: flex-end; margin-top: -10px; margin-bottom: 18px;
        }
        .lf-forgot a {
          font-size: 12px; color: rgba(240,244,244,0.35); text-decoration: none;
          transition: color 0.15s;
        }
        .lf-forgot a:hover { color: #5fa8a8; }

        .lf-submit {
          width: 100%; padding: 14px;
          background: #3d6b6b; color: #fff;
          border: none; border-radius: 8px;
          font-size: 15px; font-weight: 700; font-family: 'DM Sans', sans-serif;
          cursor: pointer; letter-spacing: 0.3px;
          transition: background 0.2s, transform 0.15s;
          margin-bottom: 16px;
        }
        .lf-submit:hover { background: #4a8080; transform: translateY(-1px); }
        .lf-submit:active { transform: translateY(0); }

        .lf-error {
          background: rgba(248,113,113,0.08); border: 1px solid rgba(248,113,113,0.25);
          color: #f87171; border-radius: 8px; padding: 12px 16px; font-size: 14px; margin-bottom: 20px;
        }

        @media (max-width: 900px) {
          .login-page { flex-direction: column; }
          .login-left { padding: 40px 28px 52px; }
          .login-left-perks { display: none; }
          .login-right { width: 100%; padding: 48px 28px; border-left: none; border-top: 1px solid rgba(61,107,107,0.15); }
        }
      `}</style>

            <div className="login-page">
                {/* Left */}
                <div className="login-left">
                    <div className="login-left-bg" />
                    <div className="login-left-grid" />

                    <a href="/" className="login-left-logo">
                        <span className="login-left-logo-dot" />
                        KairosLLC
                    </a>

                    <div className="login-left-content">
                        <p className="login-left-tag">Welcome back</p>
                        <h1 className="login-left-title">Good to see<br /><em>you again.</em></h1>
                        <p className="login-left-sub">Sign in to manage your projects, track progress, and communicate with our team.</p>
                    </div>

                    <div className="login-left-perks">
                        {[
                            { icon: "📁", text: "All your projects in one place" },
                            { icon: "💬", text: "Direct line to our dev team" },
                            { icon: "📅", text: "Deadlines and milestones at a glance" },
                        ].map((p) => (
                            <div className="login-perk" key={p.text}>
                                <span className="login-perk-icon">{p.icon}</span>
                                <span className="login-perk-text">{p.text}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right */}
                <div className="login-right">
                    <div className="login-form-wrap">
                        <h2 className="login-form-heading">Sign in</h2>
                        <p className="login-form-sub">
                            No account? <a href="/signup">Create one</a>
                        </p>

                        {state?.error && <p className="lf-error">{state.error}</p>}

                        {/* Google */}
                        <GoogleSignInButton mode={"login"}/>

                        <div className="lf-divider">
                            <div className="lf-divider-line" />
                            <span className="lf-divider-text">or</span>
                            <div className="lf-divider-line" />
                        </div>

                        <form action={action}>
                            <div className="lf-field">
                                <label className="lf-label" htmlFor="email">Email address</label>
                                <input className="lf-input" type="email" id="email" name="email" placeholder="you@company.com" required />
                            </div>

                            <div className="lf-field">
                                <label className="lf-label" htmlFor="password">Password</label>
                                <input className="lf-input" type="password" id="password" name="password" placeholder="••••••••••••" required />
                            </div>

                            <div className="lf-forgot">
                                <a href="/forgot-password">Forgot password?</a>
                            </div>

                            <button type="submit" className="lf-submit">Sign in →</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}