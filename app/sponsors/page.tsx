"use client";

import { useActionState } from "react";
import { submitSponsorship } from "../actions";
import SponsorList from "@/app/components/SponsorList";

export default function Sponsors() {
    const [state, action] = useActionState(submitSponsorship, null);

    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@400;500;600&display=swap');
        .sponsors-page { font-family: 'DM Sans', sans-serif; }

        .sponsors-hero {
          position: relative; overflow: hidden; background: #0f1a1a;
          padding: 100px 48px 80px;
        }
        .sponsors-hero-bg {
          position: absolute; inset: 0;
          background: radial-gradient(ellipse 55% 70% at 75% 35%, rgba(61,107,107,0.16) 0%, transparent 70%);
          pointer-events: none;
        }
        .sponsors-hero-grid {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(61,107,107,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(61,107,107,0.06) 1px, transparent 1px);
          background-size: 48px 48px; pointer-events: none;
        }
        .sponsors-eyebrow {
          position: relative; font-size: 11px; font-weight: 700; letter-spacing: 3px;
          text-transform: uppercase; color: #5fa8a8; display: flex; align-items: center;
          gap: 12px; margin-bottom: 24px; opacity: 0; animation: fadeUp 0.6s ease 0.1s forwards;
        }
        .sponsors-eyebrow::before { content: ''; display: block; width: 28px; height: 1px; background: #5fa8a8; }
        .sponsors-hero-title {
          position: relative; font-family: 'DM Serif Display', serif;
          font-size: clamp(38px, 5vw, 68px); color: #f0f4f4; line-height: 1.08;
          max-width: 640px; margin-bottom: 24px;
          opacity: 0; animation: fadeUp 0.7s ease 0.2s forwards;
        }
        .sponsors-hero-title em { font-style: italic; color: #5fa8a8; }
        .sponsors-hero-sub {
          position: relative; font-size: 17px; color: rgba(240,244,244,0.5);
          max-width: 480px; line-height: 1.75;
          opacity: 0; animation: fadeUp 0.7s ease 0.35s forwards;
        }

        .sponsors-list-section {
          max-width: 1200px; margin: 0 auto; padding: 72px 48px;
        }
        .sponsors-section-label {
          font-size: 11px; font-weight: 700; letter-spacing: 3px; text-transform: uppercase;
          color: #3d6b6b; margin-bottom: 32px; display: flex; align-items: center; gap: 10px;
        }
        .sponsors-section-label::before { content: ''; display: block; width: 24px; height: 2px; background: #3d6b6b; }

        .sponsors-form-section {
          background: #f7f9f9; padding: 80px 48px;
          display: flex; justify-content: center;
        }
        @media (prefers-color-scheme: dark) { .sponsors-form-section { background: #111820; } }

        .sponsors-form-wrap {
          width: 100%; max-width: 520px;
        }
        .sponsors-form-title {
          font-family: 'DM Serif Display', serif; font-size: clamp(28px, 3vw, 40px);
          color: #1a2e2e; margin-bottom: 8px;
        }
        @media (prefers-color-scheme: dark) { .sponsors-form-title { color: #ddeaea; } }
        .sponsors-form-sub { font-size: 15px; color: #556666; margin-bottom: 36px; line-height: 1.6; }
        @media (prefers-color-scheme: dark) { .sponsors-form-sub { color: #7a9ea0; } }

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
        .form-submit:active { transform: translateY(0); }

        .form-success {
          background: rgba(74,222,128,0.1); border: 1px solid rgba(74,222,128,0.3);
          color: #4ade80; border-radius: 8px; padding: 12px 16px;
          font-size: 14px; margin-bottom: 20px;
        }
        .form-error {
          background: rgba(248,113,113,0.1); border: 1px solid rgba(248,113,113,0.3);
          color: #f87171; border-radius: 8px; padding: 12px 16px;
          font-size: 14px; margin-bottom: 20px;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 768px) {
          .sponsors-hero { padding: 72px 24px 60px; }
          .sponsors-list-section { padding: 48px 24px; }
          .sponsors-form-section { padding: 56px 24px; }
        }
      `}</style>

            <div className="sponsors-page">
                <section className="sponsors-hero">
                    <div className="sponsors-hero-bg" />
                    <div className="sponsors-hero-grid" />
                    <p className="sponsors-eyebrow">Sponsors</p>
                    <h1 className="sponsors-hero-title">The people who<br /><em>back us.</em></h1>
                    <p className="sponsors-hero-sub">Our sponsors make it possible to keep pricing low and quality high. We're grateful for every one of them.</p>
                </section>

                <div className="sponsors-list-section">
                    <p className="sponsors-section-label">Current sponsors</p>
                    <SponsorList />
                </div>

                <div className="sponsors-form-section">
                    <div className="sponsors-form-wrap">
                        <h2 className="sponsors-form-title">Become a sponsor</h2>
                        <p className="sponsors-form-sub">Fill out the form below and we'll get back to you within 48 hours to talk through what a partnership looks like.</p>

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
                                <label className="form-label" htmlFor="proposal">What will you provide?</label>
                                <input className="form-input" type="text" id="proposal" name="proposal" placeholder="e.g., Financial support, equipment..." />
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