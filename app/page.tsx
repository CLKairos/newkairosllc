export default function Home() {
    const faqs = [
        { title: "Who are we?",          info: "A for-profit dev group run by Christian Larsen IV. We help people and businesses get web and software ideas into production — fast and reliably." },
        { title: "What do we do?",       info: "Website and software development. If you need a site built or a program developed, we get it done with better quality and better pricing than most big agencies." },
        { title: "Why should I trust you?", info: "Our partners and sponsors can vouch for us. We have a track record of delivering above expectations. Check the Partners, Sponsors, and Projects pages for proof." },
        { title: "How do I get in touch?",  info: "Head to the Contact page. You'll find everything you need to start a partnership or kick off a project." },
        { title: "How can I sponsor you?",  info: "Visit the Sponsors page and scroll to the bottom. Fill out the form and we'll be in touch." },
        { title: "Where can I learn more?", info: "The About page has everything in detail — who we are, what we've built, and where we're headed." },
    ];

    const projects = [
        { label: "Kairos Task Manager",    href: "https://todo.kairosllc.org",              description: "A clean, fast task management tool built in-house.",                                tag: "Productivity" },
        { label: "AHS SkillsUSA",          href: "https://annaskillsusa.kairosllc.org",      description: "Official site for Anna High School's SkillsUSA chapter.",                         tag: "Education" },
        { label: "AHS StuCo Newsletter",   href: "https://ahsstuconewsletter.kairosllc.org", description: "Student Council newsletter platform for Anna High School.",                        tag: "Education" },
    ];

    return (
        <div>
            <section className="home-hero">
                <div className="home-hero-bg" />
                <div className="home-hero-grid" />
                <span className="home-hero-eyebrow">KairosLLC — Anna, TX</span>
                <h1 className="home-hero-title">We build software<br /><em>that ships.</em></h1>
                <p className="home-hero-sub">Web and software development for people and businesses who can't afford to wait. Fast, reliable, and priced fairly.</p>
                <div className="home-hero-cta-row">
                    <a href="/contact"  className="hero-cta solid">Start a project</a>
                    <a href="/projects" className="hero-cta outline">See our work</a>
                </div>
            </section>

            <div className="stats-strip">
                <div className="strip-stat"><span className="strip-num">3+</span><span className="strip-label">Live projects</span></div>
                <div className="strip-stat"><span className="strip-num">100%</span><span className="strip-label">On-time delivery</span></div>
                <div className="strip-stat"><span className="strip-num">1</span><span className="strip-label">Point of contact</span></div>
            </div>

            <section className="page-section alt">
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

            <section className="page-section">
                <p className="section-label">Featured work</p>
                <h2 className="section-heading">Projects we've shipped</h2>
                <div className="home-projects-grid">
                    {projects.map((p) => (
                        <a href={p.href} className="home-project-card" key={p.href} target="_blank" rel="noreferrer">
                            <span className="project-tag">{p.tag}</span>
                            <span className="project-name">{p.label}</span>
                            <span className="project-desc">{p.description}</span>
                            <span className="project-arrow">View project →</span>
                        </a>
                    ))}
                </div>
            </section>
        </div>
    );
}