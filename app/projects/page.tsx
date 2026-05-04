const projects = [
    { title: "Kairos Task Manager",        link: "https://todo.kairosllc.org",               description: "A clean, fast task management tool built in-house. Designed to keep teams focused without the bloat of enterprise tools.",          tag: "Productivity", status: "Live" },
    { title: "Anna High School SkillsUSA", link: "https://annaskillsusa.kairosllc.org",      description: "Official site for Anna High School's SkillsUSA chapter. Built to showcase student achievements and event info.",                    tag: "Education",    status: "Live" },
    { title: "AHS StuCo Newsletter",       link: "https://ahsstuconewsletter.kairosllc.org", description: "Student Council newsletter platform for Anna High School. Keeps students informed with a clean, readable layout.",                  tag: "Education",    status: "Awaiting Approval" },
    { title: "Anna Friends & Foundation",  link: "https://supportannalibrary.org",           description: "The Anna Community Library Friends and Foundation website!",                                                                        tag: "Business",     status: "Live" },
];

export default function Projects() {
    return (
        <div>
            <section className="page-hero">
                <div className="hero-grid" />
                <p className="hero-eyebrow">Our work</p>
                <h1 className="hero-title">Projects we've <em>created.</em></h1>
                <p className="hero-sub">Every project is live and in use.</p>
            </section>

            <div className="projects-grid-wrap">
                {projects.map((p) => (
                    <a key={p.link} href={p.link} className="proj-card" target="_blank" rel="noreferrer">
                        <div className="proj-top">
                            <span className="project-tag">{p.tag}</span>
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
    );
}