export default function About() {
    return (
        <div>
            <section className="page-hero">
                <div className="about-hero-bg" />
                <div className="hero-grid" />
                <p className="hero-eyebrow">About us</p>
                <h1 className="hero-title">Built on one idea:<br /><em>time is money.</em></h1>
                <p className="hero-sub">KairosLLC exists to close the gap between a good idea and a live product — without the wait or the markup.</p>
            </section>

            <div className="about-body">
                <div>
                    <p className="about-lead">We're a for-profit dev group that treats your deadlines like our own.</p>
                    <p className="about-para">Founded by Christian Larsen IV, KairosLLC was built around a straightforward observation: most software agencies are slow, expensive, and impersonal. We set out to be the opposite.</p>
                    <p className="about-para">We combine solid engineering with a lean process to ship web and software products faster than firms twice our size — at a fraction of the cost. Our partners and sponsors can confirm it. So can our track record.</p>
                    <p className="about-para">We're not trying to be the biggest agency. We're trying to be the one you trust to get it done right the first time.</p>
                </div>
                <div className="about-values">
                    {[
                        { title: "Speed without shortcuts", text: "We move fast because our process is tight, not because we cut corners. Every product we ship is production-ready." },
                        { title: "Honest pricing",          text: "No bloated retainers or surprise fees. You know what you're paying and what you're getting before we start." },
                        { title: "One point of contact",    text: "You deal with Christian directly. No account managers, no handoffs, no confusion." },
                        { title: "Built to last",           text: "We build scalable products designed to grow with your business, not just get you to launch." },
                    ].map((v) => (
                        <div className="value-item" key={v.title}>
                            <p className="value-title">{v.title}</p>
                            <p className="value-text">{v.text}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="founder-strip">
                <div className="founder-divider" />
                <div>
                    <p className="founder-name">Christian Larsen IV</p>
                    <p className="founder-role">Founder & Lead Developer</p>
                    <p className="founder-quote">"I started KairosLLC because I kept seeing good ideas die waiting for a dev team to have bandwidth. That's a fixable problem."</p>
                </div>
            </div>
        </div>
    );
}