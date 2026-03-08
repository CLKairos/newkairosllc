"use client"
import { submitSponsorship } from "../actions";
import SponsorList from "@/app/components/SponsorList";

export default function Sponsors(){
    return(
        <div className={"body"}>
            <SponsorList />
            <section className="sponsor-section">
                <div className="form-container">
                    <form action={submitSponsorship} className="sponsor-form">
                        <h2>Become a Sponsor!</h2>

                        <div className="input-group">
                            <label htmlFor="email">Email Address</label>
                            <input type="email" id="email" placeholder="email@company.com" required />
                        </div>

                        <div className="input-group">
                            <label htmlFor="website">Website URL</label>
                            <input type="url" id="website" placeholder="https://example.com" />
                        </div>

                        <div className="input-group">
                            <label htmlFor="proposal">What will you provide to us?</label>
                            <input type="text" id="proposal" placeholder="e.g., Financial support, equipment..." />
                        </div>

                        <div className="checkbox-group">
                            <input type="checkbox" id="us-based" />
                            <label htmlFor="us-based">Are you a US based company?</label>
                        </div>

                        <button type="submit" className="submit-btn">Submit Proposal</button>
                    </form>
                </div>
            </section>
        </div>
    );
}