export default function Contact() {
    const contacts = [
        { label: "Business Email", value: "christianlarsen@kairosllc.org", href: "mailto:christianlarsen@kairosllc.org", note: "Best for project inquiries" },
        { label: "Personal Email", value: "christi9nl9rsen@gmail.com", href: "mailto:christi9nl9rsen@gmail.com", note: "For general questions" },
        { label: "Phone", value: "+1 (469) 742-3710", href: "tel:+14697423710", note: "Text only, please" },
    ];

    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@400;500;600&display=swap');
        .contact-page { font-family: 'DM Sans', sans-serif; }

        .contact-hero {
          position: relative; overflow: hidden; background: #0f1a1a;
          padding: 100px 48px 80px;
        }
        .contact-hero-bg {
          position: absolute; inset: 0;
          background: radial-gradient(ellipse 60% 80% at 70% 40%, rgba(61,107,107,0.16) 0%, transparent 70%);
          pointer-events: none;
        }
        .contact-hero-grid {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(61,107,107,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(61,107,107,0.06) 1px, transparent 1px);
          background-size: 48px 48px; pointer-events: none;
        }
        .contact-eyebrow {
          position: relative; font-size: 11px; font-weight: 700; letter-spacing: 3px;
          text-transform: uppercase; color: #5fa8a8; display: flex; align-items: center;
          gap: 12px; margin-bottom: 24px; opacity: 0; animation: fadeUp 0.6s ease 0.1s forwards;
        }
        .contact-eyebrow::before { content: ''; display: block; width: 28px; height: 1px; background: #5fa8a8; }
        .contact-hero-title {
          position: relative; font-family: 'DM Serif Display', serif;
          font-size: clamp(38px, 5vw, 68px); color: #f0f4f4; line-height: 1.08;
          max-width: 640px; margin-bottom: 24px;
          opacity: 0; animation: fadeUp 0.7s ease 0.2s forwards;
        }
        .contact-hero-title em { font-style: italic; color: #5fa8a8; }
        .contact-hero-sub {
          position: relative; font-size: 17px; color: rgba(240,244,244,0.5);
          max-width: 460px; line-height: 1.75;
          opacity: 0; animation: fadeUp 0.7s ease 0.35s forwards;
        }

        .contact-cards-wrap {
          max-width: 1100px; margin: 0 auto;
          padding: 80px 48px; display: grid;
          grid-template-columns: repeat(3, 1fr); gap: 24px;
        }

        .contact-card {
          background: #fff; border: 1px solid #e4eded; border-radius: 12px;
          padding: 36px 32px; border-top: 3px solid #3d6b6b;
          display: flex; flex-direction: column; gap: 12px;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          text-decoration: none;
        }
        .contact-card:hover { transform: translateY(-4px); box-shadow: 0 12px 32px rgba(47,79,79,0.12); }
        @media (prefers-color-scheme: dark) {
          .contact-card { background: #111f1f; border-color: #1a2e2e; }
        }

        .contact-card-label {
          font-size: 10px; font-weight: 700; letter-spacing: 2.5px; text-transform: uppercase;
          color: #5fa8a8;
        }
        .contact-card-value {
          font-family: 'DM Serif Display', serif; font-size: 20px; color: #1a2e2e; line-height: 1.3;
        }
        @media (prefers-color-scheme: dark) { .contact-card-value { color: #ddeaea; } }
        .contact-card-note { font-size: 13px; color: #8aa4a4; margin-top: auto; }
        .contact-card-action {
          font-size: 12px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase;
          color: #3d6b6b; display: flex; align-items: center; gap: 6px;
          margin-top: 8px; transition: gap 0.2s;
        }
        .contact-card:hover .contact-card-action { gap: 10px; }

        .contact-cta {
          background: #f7f9f9; padding: 72px 48px; text-align: center;
        }
        @media (prefers-color-scheme: dark) { .contact-cta { background: #111820; } }
        .contact-cta-title {
          font-family: 'DM Serif Display', serif; font-size: clamp(28px, 3vw, 42px);
          color: #1a2e2e; margin-bottom: 16px;
        }
        @media (prefers-color-scheme: dark) { .contact-cta-title { color: #ddeaea; } }
        .contact-cta-sub { font-size: 16px; color: #556666; margin-bottom: 32px; }
        @media (prefers-color-scheme: dark) { .contact-cta-sub { color: #7a9ea0; } }
        .contact-cta-btn {
          display: inline-block; padding: 14px 36px; background: #3d6b6b; color: #fff;
          border-radius: 6px; font-size: 15px; font-weight: 600; text-decoration: none;
          transition: background 0.2s, transform 0.2s;
        }
        .contact-cta-btn:hover { background: #4a8080; transform: translateY(-2px); }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 900px) {
          .contact-cards-wrap { grid-template-columns: 1fr; padding: 48px 24px; }
          .contact-hero { padding: 72px 24px 60px; }
          .contact-cta { padding: 56px 24px; }
        }
      `}</style>

            <div className="contact-page">
                <section className="contact-hero">
                    <div className="contact-hero-bg" />
                    <div className="contact-hero-grid" />
                    <p className="contact-eyebrow">Get in touch</p>
                    <h1 className="contact-hero-title">Let's build something<br /><em>together.</em></h1>
                    <p className="contact-hero-sub">Whether you have a project in mind or just want to talk, reach out through any of the channels below.</p>
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
        </>
    );
}