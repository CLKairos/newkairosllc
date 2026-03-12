"use client";

import { useActionState } from "react";
import { submitPartnership } from "@/app/actions";
import PartnerList from "@/app/components/PartnerList";

export default function Partnerships() {
    const [state, action] = useActionState(submitPartnership, null);

    return (
        <div>
            <section className="page-hero">
                <div className="hero-grid" />
                <p className="hero-eyebrow">Partnerships</p>
                <h1 className="hero-title">Companies we<br /><em>work with.</em></h1>
                <p className="hero-sub">We partner with businesses who need reliable dev work and want a team they can count on, not a revolving door of contractors.</p>
            </section>

            <div className="subs-list-section">
                <p className="subs-section-label">Current partners</p>
                <PartnerList />
            </div>

            <div className="subs-form-section">
                <div className="subs-form-wrap">
                    <h2 className="subs-form-title">Become a partner</h2>
                    <p className="subs-form-sub">Tell us what you need built. We'll get back to you within 48 hours to talk scope, timeline, and pricing.</p>

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
    );
}