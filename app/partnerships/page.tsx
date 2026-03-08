"use client";

import { useActionState } from "react";
import { submitPartnership } from "@/app/actions";
import PartnerList from "@/app/components/PartnerList";

export default function Partnerships() {
    const [state, action] = useActionState(submitPartnership, null);

    return (
        <div className="body">
            <PartnerList />
            <br />
            <section className="sponsor-section">
                <div className="form-container">
                    <form action={action} className="sponsor-form">
                        <h2>Become a Partner!</h2>

                        {state?.success && <p className="success-msg">Proposal submitted!</p>}
                        {state?.error && <p className="error-msg">{state.error}</p>}

                        <div className="input-group">
                            <label htmlFor="email">Email Address</label>
                            <input type="email" id="email" name="email" placeholder="email@company.com" required />
                        </div>

                        <div className="input-group">
                            <label htmlFor="website">Website URL</label>
                            <input type="url" id="website" name="website" placeholder="https://example.com" />
                        </div>

                        <div className="input-group">
                            <label htmlFor="project">What would you like our help with?</label>
                            <input type="text" id="project" name="project" placeholder="e.g., Website, Software..." />
                        </div>

                        <div className="checkbox-group">
                            <input type="checkbox" id="us-based" name="usBased" value="true" />
                            <label htmlFor="us-based">Are you a US based company?</label>
                        </div>

                        <button type="submit" className="submit-btn">Submit Proposal</button>
                    </form>
                </div>
            </section>
        </div>
    );
}