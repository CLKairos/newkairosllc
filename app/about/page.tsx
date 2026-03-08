export default function About() {
    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@400;500;600&display=swap');
        .about-page { font-family: 'DM Sans', sans-serif; }

        .about-hero {
          position: relative;
          overflow: hidden;
          background: #0f1a1a;
          padding: 100px 48px 80px;
        }
        .about-hero-bg {
          position: absolute; inset: 0;
          background:
            radial-gradient(ellipse 50% 80% at 90% 20%, rgba(61,107,107,0.15) 0%, transparent 70%),
            radial-gradient(ellipse 40% 60% at 0% 100%, rgba(47,79,79,0.2) 0%, transparent 60%);
          pointer-events: none;
        }
        .about-hero-grid {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(61,107,107,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(61,107,107,0.06) 1px, transparent 1px);
          background-size: 48px 48px;
          pointer-events: none;
        }
        .about-eyebrow {
          position: relative;
          font-size: 11px; font-weight: 700; letter-spacing: 3px; text-transform: uppercase;
          color: #5fa8a8; display: flex; align-items: center; gap: 12px; margin-bottom: 24px;
          opacity: 0; animation: fadeUp 0.6s ease 0.1s forwards;
        }
        .about-eyebrow::before { content: ''; display: block; width: 28px; height: 1px; background: #5fa8a8; }
        .about-hero-title {
          position: relative;
          font-family: 'DM Serif Display', serif;
          font-size: clamp(40px, 5vw, 72px); color: #f0f4f4; line-height: 1.08;
          max-width: 700px; margin-bottom: 28px;
          opacity: 0; animation: fadeUp 0.7s ease 0.2s forwards;
        }
        .about-hero-title em { font-style: italic; color: #5fa8a8; }
        .about-hero-sub {
          position: relative; font-size: 17px; color: rgba(240,244,244,0.5);
          max-width: 500px; line-height: 1.75;
          opacity: 0; animation: fadeUp 0.7s ease 0.35s forwards;
        }

        .about-body {
          max-width: 1200px; margin: 0 auto; padding: 80px 48px;
          display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: start;
        }
        .about-lead {
          font-family: 'DM Serif Display', serif;
          font-size: clamp(24px, 2.5vw, 34px); color: #1a2e2e; line-height: 1.35; margin-bottom: 24px;
        }
        @media (prefers-color-scheme: dark) { .about-lead { color: #ddeaea; } }
        .about-para { font-size: 16px; color: #556666; line-height: 1.85; margin-bottom: 20px; }
        @media (prefers-color-scheme: dark) { .about-para { color: #7a9ea0; } }

        .about-values { display: flex; flex-direction: column; gap: 20px; }
        .value-item {
          padding: 26px 30px; background: #f7f9f9; border-radius: 10px;
          border-left: 3px solid #3d6b6b; transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .value-item:hover { transform: translateX(4px); box-shadow: 0 4px 20px rgba(47,79,79,0.1); }
        @media (prefers-color-scheme: dark) { .value-item { background: #111f1f; } }
        .value-title { font-family: 'DM Serif Display', serif; font-size: 18px; color: #1a2e2e; margin-bottom: 8px; }
        @media (prefers-color-scheme: dark) { .value-title { color: #cce0e0; } }
        .value-text { font-size: 14px; color: #556666; line-height: 1.7; }
        @media (prefers-color-scheme: dark) { .value-text { color: #7a9ea0; } }

        .founder-strip {
          background: #0f1a1a; padding: 72px 48px;
          display: flex; align-items: center; gap: 56px;
        }
        .founder-divider { width: 3px; height: 80px; background: #3d6b6b; flex-shrink: 0; }
        .founder-name { font-family: 'DM Serif Display', serif; font-size: 32px; color: #f0f4f4; margin-bottom: 6px; }
        .founder-role { font-size: 11px; font-weight: 700; letter-spacing: 2.5px; text-transform: uppercase; color: #5fa8a8; margin-bottom: 16px; }
        .founder-quote { font-size: 16px; color: rgba(240,244,244,0.55); line-height: 1.7; max-width: 600px; font-style: italic; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 900px) {
          .about-body { grid-template-columns: 1fr; gap: 48px; padding: 56px 24px; }
          .about-hero { padding: 72px 24px 60px; }
          .founder-strip { flex-direction: column; gap: 24px; padding: 56px 24px; align-items: flex-start; }
          .founder-divider { width: 48px; height: 3px; }
        }
      `}</style>

            <div className="about-page">
                <section className="about-hero">
                    <div className="about-hero-bg" />
                    <div className="about-hero-grid" />
                    <p className="about-eyebrow">About us</p>
                    <h1 className="about-hero-title">Built on one idea:<br /><em>time is money.</em></h1>
                    <p className="about-hero-sub">KairosLLC exists to close the gap between a good idea and a live product — without the wait or the markup.</p>
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
                            { title: "Honest pricing", text: "No bloated retainers or surprise fees. You know what you're paying and what you're getting before we start." },
                            { title: "One point of contact", text: "You deal with Christian directly. No account managers, no handoffs, no confusion." },
                            { title: "Built to last", text: "We build scalable products designed to grow with your business, not just get you to launch." },
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
        </>
    );
}