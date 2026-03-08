export default function Footer() {
    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&display=swap');
        .footer-wrap {
          background: linear-gradient(to bottom, #0f1a1a, #070e0e);
          border-top: 1px solid rgba(61,107,107,0.2);
          padding: 56px 48px 32px;
          font-family: 'DM Sans', sans-serif;
          margin-top: auto;
        }
        .footer-inner {
          max-width: 1200px; margin: 0 auto;
          display: flex; justify-content: space-between; align-items: flex-start;
          gap: 40px; flex-wrap: wrap; margin-bottom: 48px;
        }
        .footer-brand {
          font-size: 18px; font-weight: 700; color: #e0eeee; margin-bottom: 8px;
          display: flex; align-items: center; gap: 8px;
        }
        .footer-brand-dot { width: 7px; height: 7px; border-radius: 50%; background: #5fa8a8; }
        .footer-tagline { font-size: 13px; color: rgba(224,238,238,0.4); max-width: 220px; line-height: 1.6; }
        .footer-links { display: flex; gap: 48px; flex-wrap: wrap; }
        .footer-col { display: flex; flex-direction: column; gap: 10px; }
        .footer-col-title { font-size: 10px; font-weight: 700; letter-spacing: 2.5px; text-transform: uppercase; color: #5fa8a8; margin-bottom: 4px; }
        .footer-link { font-size: 13px; color: rgba(224,238,238,0.5); text-decoration: none; transition: color 0.15s; }
        .footer-link:hover { color: #e0eeee; }
        .footer-bottom {
          max-width: 1200px; margin: 0 auto;
          display: flex; align-items: center; justify-content: space-between;
          border-top: 1px solid rgba(61,107,107,0.15); padding-top: 24px;
          flex-wrap: wrap; gap: 12px;
        }
        .footer-copy { font-size: 12px; color: rgba(224,238,238,0.3); }
        .footer-disclaimer { font-size: 12px; color: rgba(224,238,238,0.25); font-style: italic; }
        @media (max-width: 640px) {
          .footer-wrap { padding: 40px 24px 24px; }
          .footer-inner { flex-direction: column; gap: 32px; }
          .footer-bottom { flex-direction: column; align-items: flex-start; }
        }
      `}</style>

            <footer className="footer-wrap">
                <div className="footer-inner">
                    <div>
                        <p className="footer-brand"><span className="footer-brand-dot" />KairosLLC</p>
                        <p className="footer-tagline">Web and software development. Fast, reliable, and priced fairly.</p>
                    </div>
                    <div className="footer-links">
                        <div className="footer-col">
                            <p className="footer-col-title">Pages</p>
                            <a href="/" className="footer-link">Home</a>
                            <a href="/about" className="footer-link">About</a>
                            <a href="/projects" className="footer-link">Projects</a>
                        </div>
                        <div className="footer-col">
                            <p className="footer-col-title">Work with us</p>
                            <a href="/sponsors" className="footer-link">Sponsors</a>
                            <a href="/partnerships" className="footer-link">Partnerships</a>
                            <a href="/contact" className="footer-link">Contact</a>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p className="footer-copy">© {new Date().getFullYear()} KairosLLC. Anna, TX.</p>
                    <p className="footer-disclaimer">Not a real LLC — yet.</p>
                </div>
            </footer>
        </>
    );
}