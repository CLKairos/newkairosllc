"use client";

import { useActionState } from "react";
import { submitSponsorship } from "../actions";
import SponsorList from "@/app/components/SponsorList";

export default function Sponsors() {
    const [state, action] = useActionState(submitSponsorship, null);

    return (
        <div>
            <section className="page-hero">
                <div className="hero-grid" />
                <p className="hero-eyebrow">Sponsors</p>
                <h1 className="hero-title">The people who<br /><em>back us.</em></h1>
                <p className="hero-sub">Our sponsors make it possible to keep pricing low and quality high. We're grateful for every one of them.</p>
            </section>

            <div className="subs-list-section">
                <p className="subs-section-label">Current sponsors</p>
                <SponsorList />
            </div>

            <div className="subs-form-section">
                <div className="subs-form-wrap">
                    <h2 className="subs-form-title">Become a sponsor</h2>
                    <p className="subs-form-sub">Fill out the form below and we'll get back to you within 48 hours to talk through what a partnership looks like.</p>

                    {state?.success && <p className="form-success">Proposal submitted. We'll be in touch soon.</p>}
                    {state?.error   && <p className="form-error">{state.error}</p>}

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
    );
}