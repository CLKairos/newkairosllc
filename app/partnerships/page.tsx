import PartnerList from "@/app/components/PartnerList";

export default function Partnerships(){
    return(
        <div className={"body"}>
            <div className={"partnerlist"}>
                <PartnerList />
            </div>
            <br/>
            <section className="sponsor-section">
                <div className="form-container">
                    <form className="sponsor-form">
                        <h2>Become a Partner!</h2>

                        <div className="input-group">
                            <label htmlFor="email">Email Address</label>
                            <input type="email" id="email" placeholder="email@company.com" required />
                        </div>

                        <div className="input-group">
                            <label htmlFor="website">Website URL</label>
                            <input type="url" id="website" placeholder="https://example.com" />
                        </div>

                        <div className="input-group">
                            <label htmlFor="proposal">What would like our help with?</label>
                            <input type="text" id="proposal" placeholder="e.g., Website, Software..." />
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