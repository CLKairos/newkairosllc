"use client";

import { useActionState } from "react";
import { submitPartnership } from "@/app/actions";
import PartnerList from "@/app/components/PartnerList";

export default function Partnerships() {
    const [state, action] = useActionState(submitPartnership, null);

    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@400;500;600&display=swap');
        .partnerships-page { font-family: 'DM Sans', sans-serif; }

        .partnerships-hero {
          position: relative; overflow: hidden; background: #0f1a1a;
          padding: 100px 48px 80px;
        }
        .partnerships-hero-bg {
          position: absolute; inset: 0;
          background: radial-gradient(ellipse 55% 70% at 80% 40%, rgba(61,107,107,0.16) 0%, transparent 70%);
          pointer-events: none;
        }
        .partnerships-hero-grid {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(61,107,107,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(61,107,107,0.06) 1px, transparent 1px);
          background-size: 48px 48px; pointer-events: none;
        }
        .partnerships-eyebrow {
          position: relative; font-size: 11px; font-weight: 700; letter-spacing: 3px;
          text-transform: uppercase; color: #5fa8a8; display: flex; align-items: center;
          gap: 12px; margin-bottom: 24px; opacity: 0; animation: fadeUp 0.6s ease 0.1s forwards;
        }
        .partnerships-eyebrow::before { content: ''; display: block; width: 28px; height: 1px; background: #5fa8a8; }
        .partnerships-hero-title {
          position: relative; font-family: 'DM Serif Display', serif;
          font-size: clamp(38px, 5vw, 68px); color: #f0f4f4; line-height: 1.08;
          max-width: 640px; margin-bottom: 24px;
          opacity: 0; animation: fadeUp 0.7s ease 0.2s forwards;
        }
        .partnerships-hero-title em { font-style: italic; color: #5fa8a8; }
        .partnerships-hero-sub {
          position: relative; font-size: 17px; color: rgba(240,244,244,0.5);
          max-width: 480px; line-height: 1.75;
          opacity: 0; animation: fadeUp 0.7s ease 0.35s forwards;
        }

        .partners-list-section { max-width: 1200px; margin: 0 auto; padding: 72px 48px; }
        .partners-section-label {
          font-size: 11px; font-weight: 700; letter-spacing: 3px; text-transform: uppercase;
          color: #3d6b6b; margin-bottom: 32px; display: flex; align-items: center; gap: 10px;
        }
        .partners-section-label::before { content: ''; display: block; width: 24px; height: 2px; background: #3d6b6b; }

        .partnerships-form-section {
          background: #f7f9f9; padding: 80px 48px; display: flex; justify-content: center;
        }
        @media (prefers-color-scheme: dark) { .partnerships-form-section { background: #111820; } }

        .partnerships-form-wrap { width: 100%; max-width: 520px; }
        .partnerships-form-title {
          font-family: 'DM Serif Display', serif; font-size: clamp(28px, 3vw, 40px);
          color: #1a2e2e; margin-bottom: 8px;
        }
        @media (prefers-color-scheme: dark) { .partnerships-form-title { color: #ddeaea; } }
        .partnerships-form-sub { font-size: 15px; color: #556666; margin-bottom: 36px; line-height: 1.6; }
        @media (prefers-color-scheme: dark) { .partnerships-form-sub { color: #7a9ea0; } }

        .form-field { display: flex; flex-direction: column; gap: 8px; margin-bottom: 20px; }
        .form-label { font-size: 13px; font-weight: 600; color: #2f4f4f; }
        @media (prefers-color-scheme: dark) { .form-label { color: #8ab0b0; } }
        .form-input {
          padding: 12px 16px; border: 1px solid #d0dede; border-radius: 8px;
          font-size: 15px; font-family: 'DM Sans', sans-serif;
          background: #fff; color: #1a2e2e;
          transition: border-color 0.15s, box-shadow 0.15s;
        }
        @media (prefers-color-scheme: dark) {
          .form-input { background: #161f1f; border-color: #1e3030; color: #ddeaea; }
        }
        .form-input:focus { outline: none; border-color: #3d6b6b; box-shadow: 0 0 0 3px rgba(61,107,107,0.15); }
        .form-input::placeholder { color: #aac0c0; }

        .form-check { display: flex; align-items: center; gap: 12px; margin-bottom: 28px; }
        .form-check input { width: 17px; height: 17px; accent-color: #3d6b6b; cursor: pointer; }
        .form-check label { font-size: 14px; color: #556666; cursor: pointer; user-select: none; }
        @media (prefers-color-scheme: dark) { .form-check label { color: #7a9ea0; } }

        .form-submit {
          width: 100%; padding: 14px; background: #3d6b6b; color: #fff;
          border: none; border-radius: 8px; font-size: 15px; font-weight: 600;
          font-family: 'DM Sans', sans-serif; cursor: pointer;
          transition: background 0.2s, transform 0.15s;
        }
        .form-submit:hover { background: #4a8080; transform: translateY(-1px); }
        .form-success {
          background: rgba(74,222,128,0.1); border: 1px solid rgba(74,222,128,0.3);
          color: #4ade80; border-radius: 8px; padding: 12px 16px; font-size: 14px; margin-bottom: 20px;
        }
        .form-error {
          background: rgba(248,113,113,0.1); border: 1px solid rgba(248,113,113,0.3);
          color: #f87171; border-radius: 8px; padding: 12px 16px; font-size: 14px; margin-bottom: 20px;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 768px) {
          .partnerships-hero { padding: 72px 24px 60px; }
          .partners-list-section { padding: 48px 24px; }
          .partnerships-form-section { padding: 56px 24px; }
        }
      `}</style>

            <div className="partnerships-page">
                <section className="partnerships-hero">
                    <div className="partnerships-hero-bg" />
                    <div className="partnerships-hero-grid" />
                    <p className="partnerships-eyebrow">Partnerships</p>
                    <h1 className="partnerships-hero-title">Companies we<br /><em>work with.</em></h1>
                    <p className="partnerships-hero-sub">We partner with businesses who need reliable dev work and want a team they can count on, not a revolving door of contractors.</p>
                </section>

                <div className="partners-list-section">
                    <p className="partners-section-label">Current partners</p>
                    <PartnerList />
                </div>

                <div className="partnerships-form-section">
                    <div className="partnerships-form-wrap">
                        <h2 className="partnerships-form-title">Become a partner</h2>
                        <p className="partnerships-form-sub">Tell us what you need built. We'll get back to you within 48 hours to talk scope, timeline, and pricing.</p>

                        {state?.success && <p className="form-success">Proposal submitted. We'll be in touch soon.</p>}
                        {state?.error && <p className="form-error">{state.error}</p>}

                        <form action={action}>
                            <div className="form-field">
                                <label className="form-label" htmlFor="email">Email address</label>
                                <input className="form-input" type="email" id="email" name="email" placeholder="you@company.com" required />
                            </div>
                            <div className="form-field">
                                <label className="form-label" htmlFor="website">Website URL</label>
                                <input className="form-input" type="url" id="website" name="website" placeholder="https://yoursite.com" />
                            </div>
                            <div className="form-field">
                                <label className="form-label" htmlFor="project">What do you need help with?</label>
                                <input className="form-input" type="text" id="project" name="project" placeholder="e.g., Website, mobile app, software..." />
                            </div>
                            <div className="form-check">
                                <input type="checkbox" id="usBased" name="usBased" value="true" />
                                <label htmlFor="usBased">We are a US-based company</label>
                            </div>
                            <button type="submit" className="form-submit">Submit proposal</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}