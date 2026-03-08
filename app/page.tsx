import Card from "./components/Card";

export default function Home() {
    const faqs = [
        {
            title: "Who are we?",
            info: "A for-profit dev group run by Christian Larsen IV. We help people and businesses get web and software ideas into production — fast and reliably.",
        },
        {
            title: "What do we do?",
            info: "Website and software development. If you need a site built or a program developed, we get it done with better quality and better pricing than most big agencies.",
        },
        {
            title: "Why should I trust you?",
            info: "Our partners and sponsors can vouch for us. We have a track record of delivering above expectations. Check the Partners, Sponsors, and Projects pages for proof.",
        },
        {
            title: "How do I get in touch?",
            info: "Head to the Contact page. You'll find everything you need to start a partnership or kick off a project.",
        },
        {
            title: "How can I sponsor you?",
            info: "Visit the Sponsors page and scroll to the bottom. Fill out the form and we'll be in touch.",
        },
        {
            title: "Where can I learn more?",
            info: "The About page has everything in detail — who we are, what we've built, and where we're headed.",
        },
    ];

    const projects = [
        {
            label: "Kairos Task Manager",
            href: "https://todo.kairosllc.org",
            description: "A clean, fast task management tool built in-house.",
            tag: "Productivity",
        },
        {
            label: "Anna HS SkillsUSA",
            href: "https://annaskillsusa.kairosllc.org",
            description: "Official site for Anna High School's SkillsUSA chapter.",
            tag: "Education",
        },
        {
            label: "AHS StuCo Newsletter",
            href: "https://ahsstuconewsletter.kairosllc.org",
            description: "Student Council newsletter platform for Anna High School.",
            tag: "Education",
        },
    ];

    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@400;500;600&display=swap');

        .home {
          font-family: 'DM Sans', sans-serif;
        }

        /* ── Hero ── */
        .hero {
          position: relative;
          overflow: hidden;
          background: #0f1a1a;
          padding: 110px 48px 100px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 28px;
        }

        .hero-bg {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 60% 80% at 80% 50%, rgba(61,107,107,0.18) 0%, transparent 70%),
            radial-gradient(ellipse 40% 60% at 10% 80%, rgba(47,79,79,0.22) 0%, transparent 60%);
          pointer-events: none;
        }

        .hero-grid-lines {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(61,107,107,0.07) 1px, transparent 1px),
            linear-gradient(90deg, rgba(61,107,107,0.07) 1px, transparent 1px);
          background-size: 48px 48px;
          pointer-events: none;
        }

        .hero-eyebrow {
          position: relative;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: #5fa8a8;
          display: flex;
          align-items: center;
          gap: 12px;
          opacity: 0;
          animation: fadeUp 0.6s ease 0.1s forwards;
        }

        .hero-eyebrow::before {
          content: '';
          display: block;
          width: 32px;
          height: 1px;
          background: #5fa8a8;
        }

        .hero-headline {
          position: relative;
          font-family: 'DM Serif Display', serif;
          font-size: clamp(44px, 6vw, 88px);
          line-height: 1.05;
          color: #f0f4f4;
          max-width: 780px;
          opacity: 0;
          animation: fadeUp 0.7s ease 0.25s forwards;
        }

        .hero-headline em {
          font-style: italic;
          color: #5fa8a8;
        }

        .hero-sub {
          position: relative;
          font-size: 18px;
          color: rgba(240,244,244,0.55);
          max-width: 480px;
          line-height: 1.7;
          opacity: 0;
          animation: fadeUp 0.7s ease 0.4s forwards;
        }

        .hero-cta-row {
          position: relative;
          display: flex;
          gap: 14px;
          flex-wrap: wrap;
          opacity: 0;
          animation: fadeUp 0.7s ease 0.55s forwards;
        }

        .hero-cta {
          display: inline-block;
          padding: 14px 32px;
          border-radius: 6px;
          font-size: 15px;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.2s ease;
        }

        .hero-cta.solid {
          background: #3d6b6b;
          color: #fff;
          border: 2px solid #3d6b6b;
        }
        .hero-cta.solid:hover {
          background: #4a8080;
          border-color: #4a8080;
          transform: translateY(-2px);
        }

        .hero-cta.outline {
          background: transparent;
          color: rgba(240,244,244,0.8);
          border: 2px solid rgba(240,244,244,0.2);
        }
        .hero-cta.outline:hover {
          border-color: rgba(240,244,244,0.5);
          color: #f0f4f4;
          transform: translateY(-2px);
        }

        /* ── Section ── */
        .home-section {
          padding: 80px 48px;
        }

        .home-section.alt {
          background: #f7f9f9;
        }

        @media (prefers-color-scheme: dark) {
          .home-section.alt {
            background: #111820;
          }
        }

        .section-label {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: #3d6b6b;
          margin-bottom: 12px;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .section-label::before {
          content: '';
          display: block;
          width: 24px;
          height: 2px;
          background: #3d6b6b;
        }

        .section-heading {
          font-family: 'DM Serif Display', serif;
          font-size: clamp(28px, 3.5vw, 44px);
          color: #1a2e2e;
          margin-bottom: 48px;
          line-height: 1.2;
        }

        @media (prefers-color-scheme: dark) {
          .section-heading { color: #e2e8e8; }
        }

        /* ── FAQ Grid ── */
        .faq-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          max-width: 1200px;
        }

        .faq-card {
          background: #fff;
          border: 1px solid #e4eded;
          border-radius: 10px;
          padding: 28px 32px;
          border-top: 3px solid #3d6b6b;
          transition: box-shadow 0.2s ease, transform 0.2s ease;
        }

        .faq-card:hover {
          box-shadow: 0 8px 28px rgba(47,79,79,0.12);
          transform: translateY(-3px);
        }

        @media (prefers-color-scheme: dark) {
          .faq-card {
            background: #161f1f;
            border-color: #1e2e2e;
          }
        }

        .faq-q {
          font-family: 'DM Serif Display', serif;
          font-size: 20px;
          color: #1a2e2e;
          margin-bottom: 12px;
          line-height: 1.3;
        }

        @media (prefers-color-scheme: dark) {
          .faq-q { color: #ddeaea; }
        }

        .faq-a {
          font-size: 14px;
          color: #556666;
          line-height: 1.75;
        }

        @media (prefers-color-scheme: dark) {
          .faq-a { color: #8aa4a4; }
        }

        /* ── Projects ── */
        .projects-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          max-width: 1200px;
        }

        .project-card {
          position: relative;
          background: #0f1a1a;
          border: 1px solid #1e3030;
          border-radius: 12px;
          padding: 36px 32px 32px;
          text-decoration: none;
          display: flex;
          flex-direction: column;
          gap: 12px;
          overflow: hidden;
          transition: border-color 0.2s, transform 0.2s;
          group: true;
        }

        .project-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, #3d6b6b, #5fa8a8);
          opacity: 0;
          transition: opacity 0.2s;
        }

        .project-card:hover {
          border-color: #3d6b6b;
          transform: translateY(-4px);
        }

        .project-card:hover::before {
          opacity: 1;
        }

        .project-tag {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #5fa8a8;
          background: rgba(61,107,107,0.15);
          border: 1px solid rgba(61,107,107,0.3);
          padding: 3px 10px;
          border-radius: 20px;
          width: fit-content;
        }

        .project-name {
          font-family: 'DM Serif Display', serif;
          font-size: 22px;
          color: #e8f0f0;
          line-height: 1.25;
        }

        .project-desc {
          font-size: 14px;
          color: #5a8080;
          line-height: 1.65;
          flex: 1;
        }

        .project-arrow {
          font-size: 13px;
          color: #3d6b6b;
          font-weight: 600;
          letter-spacing: 0.5px;
          margin-top: 8px;
          display: flex;
          align-items: center;
          gap: 6px;
          transition: gap 0.2s;
        }

        .project-card:hover .project-arrow {
          gap: 10px;
        }

        /* ── Stats strip ── */
        .stats-strip {
          background: #3d6b6b;
          padding: 52px 48px;
          display: flex;
          gap: 0;
          justify-content: center;
          flex-wrap: wrap;
        }

        .strip-stat {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 0 56px;
          border-right: 1px solid rgba(255,255,255,0.15);
          gap: 6px;
        }

        .strip-stat:last-child {
          border-right: none;
        }

        .strip-num {
          font-family: 'DM Serif Display', serif;
          font-size: 52px;
          color: #fff;
          line-height: 1;
        }

        .strip-label {
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: rgba(255,255,255,0.65);
        }

        /* ── Animations ── */
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* ── Responsive ── */
        @media (max-width: 1024px) {
          .faq-grid,
          .projects-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .hero {
            padding: 72px 24px 64px;
          }

          .home-section {
            padding: 56px 24px;
          }

          .faq-grid,
          .projects-grid {
            grid-template-columns: 1fr;
          }

          .stats-strip {
            padding: 40px 24px;
            gap: 32px;
          }

          .strip-stat {
            border-right: none;
            padding: 0;
          }
        }
      `}</style>

            <div className="home">

                {/* Hero */}
                <section className="hero">
                    <div className="hero-bg" />
                    <div className="hero-grid-lines" />
                    <span className="hero-eyebrow">KairosLLC — Anna, TX</span>
                    <h1 className="hero-headline">
                        We build software<br /><em>that ships.</em>
                    </h1>
                    <p className="hero-sub">
                        Web and software development for people and businesses who can't afford to wait. Fast, reliable, and priced fairly.
                    </p>
                    <div className="hero-cta-row">
                        <a href="/contact" className="hero-cta solid">Start a project</a>
                        <a href="/projects" className="hero-cta outline">See our work</a>
                    </div>
                </section>

                {/* Stats */}
                <div className="stats-strip">
                    <div className="strip-stat">
                        <span className="strip-num">3+</span>
                        <span className="strip-label">Live projects</span>
                    </div>
                    <div className="strip-stat">
                        <span className="strip-num">100%</span>
                        <span className="strip-label">On-time delivery</span>
                    </div>
                    <div className="strip-stat">
                        <span className="strip-num">1</span>
                        <span className="strip-label">Point of contact</span>
                    </div>
                </div>

                {/* FAQ */}
                <section className="home-section alt">
                    <p className="section-label">Common questions</p>
                    <h2 className="section-heading">Everything you need to know</h2>
                    <div className="faq-grid">
                        {faqs.map((faq) => (
                            <div className="faq-card" key={faq.title}>
                                <p className="faq-q">{faq.title}</p>
                                <p className="faq-a">{faq.info}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Projects */}
                <section className="home-section">
                    <p className="section-label">Featured work</p>
                    <h2 className="section-heading">Projects we've shipped</h2>
                    <div className="projects-grid">
                        {projects.map((p) => (
                            <a href={p.href} className="project-card" key={p.href} target="_blank" rel="noreferrer">
                                <span className="project-tag">{p.tag}</span>
                                <span className="project-name">{p.label}</span>
                                <span className="project-desc">{p.description}</span>
                                <span className="project-arrow">View project →</span>
                            </a>
                        ))}
                    </div>
                </section>

            </div>
        </>
    );
}