export default function Contact() {
    const contacts = [
        { label: "Business Email", value: "christianlarsen@kairosllc.org", href: "mailto:christianlarsen@kairosllc.org", note: "Best for project inquiries" },
        { label: "Personal Email", value: "christi9nl9rsen@gmail.com",      href: "mailto:christi9nl9rsen@gmail.com",      note: "For general questions" },
        { label: "Phone",          value: "+1 (469) 742-3710",              href: "tel:+14697423710",                      note: "Text only, please" },
    ];

    return (
        <div>
            <section className="page-hero">
                <div className="hero-grid" />
                <p className="hero-eyebrow">Get in touch</p>
                <h1 className="hero-title">Let's build something<br /><em>together.</em></h1>
                <p className="hero-sub">Whether you have a project in mind or just want to talk, reach out through any of the channels below.</p>
            </section>

            <div className="contact-cards-wrap">
                {contacts.map((c) => (
                    <a key={c.label} href={c.href} className="contact-card">
                        <span className="contact-card-label">{c.label}</span>
                        <span className="contact-card-value">{c.value}</span>
                        <span className="contact-card-note">{c.note}</span>
                        <span className="contact-card-action">Reach out →</span>
                    </a>
                ))}
            </div>

            <div className="contact-cta">
                <h2 className="contact-cta-title">Ready to start a project?</h2>
                <p className="contact-cta-sub">Sponsorships and partnerships have dedicated pages with a form to submit your proposal.</p>
                <a href="/partnerships" className="contact-cta-btn">View partnership options</a>
            </div>
        </div>
    );
}