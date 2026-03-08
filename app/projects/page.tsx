const projects = [
    {
        title: "Kairos Task Manager",
        link: "https://todo.kairosllc.org",
        description: "A clean, fast task management tool built in-house. Designed to keep teams focused without the bloat of enterprise tools.",
        tag: "Productivity",
        status: "Live",
    },
    {
        title: "Anna High School SkillsUSA",
        link: "https://annaskillsusa.kairosllc.org",
        description: "Official site for Anna High School's SkillsUSA chapter. Built to showcase student achievements and event info.",
        tag: "Education",
        status: "Live",
    },
    {
        title: "AHS StuCo Newsletter",
        link: "https://ahsstuconewsletter.kairosllc.org",
        description: "Student Council newsletter platform for Anna High School. Keeps students informed with a clean, readable layout.",
        tag: "Education",
        status: "Live",
    },
];

export default function Projects() {
    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@400;500;600&display=swap');
        .projects-page { font-family: 'DM Sans', sans-serif; }

        .projects-hero {
          position: relative; overflow: hidden; background: #0f1a1a;
          padding: 100px 48px 80px;
        }
        .projects-hero-bg {
          position: absolute; inset: 0;
          background: radial-gradient(ellipse 55% 70% at 85% 30%, rgba(61,107,107,0.17) 0%, transparent 70%);
          pointer-events: none;
        }
        .projects-hero-grid {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(61,107,107,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(61,107,107,0.06) 1px, transparent 1px);
          background-size: 48px 48px; pointer-events: none;
        }
        .projects-eyebrow {
          position: relative; font-size: 11px; font-weight: 700; letter-spacing: 3px;
          text-transform: uppercase; color: #5fa8a8; display: flex; align-items: center;
          gap: 12px; margin-bottom: 24px; opacity: 0; animation: fadeUp 0.6s ease 0.1s forwards;
        }
        .projects-eyebrow::before { content: ''; display: block; width: 28px; height: 1px; background: #5fa8a8; }
        .projects-hero-title {
          position: relative; font-family: 'DM Serif Display', serif;
          font-size: clamp(38px, 5vw, 68px); color: #f0f4f4; line-height: 1.08;
          max-width: 640px; margin-bottom: 24px;
          opacity: 0; animation: fadeUp 0.7s ease 0.2s forwards;
        }
        .projects-hero-title em { font-style: italic; color: #5fa8a8; }
        .projects-hero-sub {
          position: relative; font-size: 17px; color: rgba(240,244,244,0.5);
          max-width: 460px; line-height: 1.75;
          opacity: 0; animation: fadeUp 0.7s ease 0.35s forwards;
        }

        .projects-grid-wrap {
          max-width: 1200px; margin: 0 auto;
          padding: 80px 48px;
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 28px;
        }

        .proj-card {
          position: relative; background: #0f1a1a; border: 1px solid #1e3030;
          border-radius: 12px; padding: 40px 32px 32px; text-decoration: none;
          display: flex; flex-direction: column; gap: 14px; overflow: hidden;
          transition: border-color 0.2s, transform 0.2s;
        }
        .proj-card::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px;
          background: linear-gradient(90deg, #3d6b6b, #5fa8a8); opacity: 0; transition: opacity 0.2s;
        }
        .proj-card:hover { border-color: #3d6b6b; transform: translateY(-5px); }
        .proj-card:hover::before { opacity: 1; }

        .proj-top { display: flex; align-items: center; justify-content: space-between; }
        .proj-tag {
          font-size: 10px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase;
          color: #5fa8a8; background: rgba(61,107,107,0.15); border: 1px solid rgba(61,107,107,0.3);
          padding: 3px 10px; border-radius: 20px;
        }
        .proj-status {
          font-size: 10px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase;
          color: #4ade80; display: flex; align-items: center; gap: 5px;
        }
        .proj-status::before {
          content: ''; display: block; width: 6px; height: 6px; border-radius: 50%;
          background: #4ade80; animation: pulse 2s infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; } 50% { opacity: 0.4; }
        }

        .proj-name {
          font-family: 'DM Serif Display', serif; font-size: 24px; color: #e8f0f0; line-height: 1.25;
        }
        .proj-desc { font-size: 14px; color: #5a8080; line-height: 1.7; flex: 1; }
        .proj-link {
          font-size: 12px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase;
          color: #3d6b6b; display: flex; align-items: center; gap: 6px; margin-top: 8px;
          transition: gap 0.2s;
        }
        .proj-card:hover .proj-link { gap: 10px; }

        .projects-cta {
          background: #3d6b6b; padding: 72px 48px; text-align: center;
        }
        .projects-cta-title {
          font-family: 'DM Serif Display', serif; font-size: clamp(28px, 3vw, 42px);
          color: #fff; margin-bottom: 16px;
        }
        .projects-cta-sub { font-size: 16px; color: rgba(255,255,255,0.65); margin-bottom: 32px; }
        .projects-cta-btn {
          display: inline-block; padding: 14px 36px; background: #fff; color: #2f4f4f;
          border-radius: 6px; font-size: 15px; font-weight: 700; text-decoration: none;
          transition: background 0.2s, transform 0.2s;
        }
        .projects-cta-btn:hover { background: #e0eeee; transform: translateY(-2px); }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 1024px) { .projects-grid-wrap { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 640px) {
          .projects-grid-wrap { grid-template-columns: 1fr; padding: 48px 24px; }
          .projects-hero { padding: 72px 24px 60px; }
          .projects-cta { padding: 56px 24px; }
        }
      `}</style>

            <div className="projects-page">
                <section className="projects-hero">
                    <div className="projects-hero-bg" />
                    <div className="projects-hero-grid" />
                    <p className="projects-eyebrow">Our work</p>
                    <h1 className="projects-hero-title">Products we've<br /><em>shipped.</em></h1>
                    <p className="projects-hero-sub">Every project is live and in use. No mockups, no demos — real software solving real problems.</p>
                </section>

                <div className="projects-grid-wrap">
                    {projects.map((p) => (
                        <a key={p.link} href={p.link} className="proj-card" target="_blank" rel="noreferrer">
                            <div className="proj-top">
                                <span className="proj-tag">{p.tag}</span>
                                <span className="proj-status">{p.status}</span>
                            </div>
                            <span className="proj-name">{p.title}</span>
                            <span className="proj-desc">{p.description}</span>
                            <span className="proj-link">View project →</span>
                        </a>
                    ))}
                </div>

                <div className="projects-cta">
                    <h2 className="projects-cta-title">Want to be on this list?</h2>
                    <p className="projects-cta-sub">We're taking on new projects. Get in touch and let's talk about what you want to build.</p>
                    <a href="/contact" className="projects-cta-btn">Start a project</a>
                </div>
            </div>
        </>
    );
}