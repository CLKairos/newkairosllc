const LOGO_LIGHT = "/K LLC/KLLC-Mint-NoBg.png";
const LOGO_DARK = "/K LLC/KLLC-Navy-NoBg.png";

export default function Footer() {
    return (
        <footer className="footer-wrap">
            <div className="footer-content">
                <div className="footer-main">
                    <div className="footer-brand-section">
                        <p className="footer-brand"><img src={LOGO_DARK} className={"logo-dark"} />
                            <img src={LOGO_LIGHT} className={"logo-light"} />CLKairos</p>
                    </div>
                    <div className="footer-social">
                        <a href="https://github.com/CLKairos" className="social-link" target="_blank" rel="noreferrer">GitHub</a>
                        <a href="https://www.youtube.com/@CLKairos" className="social-link" target="_blank" rel="noreferrer">YouTube</a>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <p className="footer-copy">© {new Date().getFullYear()} CLKairos. All rights reserved.</p>
            </div>
        </footer>
    );
}