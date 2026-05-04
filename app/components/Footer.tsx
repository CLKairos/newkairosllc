const LOGO_LIGHT = "/K LLC/KLLC-Mint-NoBg.png";
const LOGO_DARK = "/K LLC/KLLC-Navy-NoBg.png";

export default function Footer() {
    return (
        <footer className="footer-wrap">
            <div className="footer-inner">
                <div>
                    <p className="footer-brand"><img src={LOGO_DARK} className={"logo-dark"} />
                        <img src={LOGO_LIGHT} className={"logo-light"} />CLKairos</p>
                    <p className="footer-tagline">Web and software development services.</p>
                </div>
                <div className="footer-links">
                    <div className="footer-col">
                        <p className="footer-col-title">Pages</p>
                        <a href="/"            className="footer-link">Home</a>
                        <a href="/about"       className="footer-link">About</a>
                        <a href="/projects"    className="footer-link">Projects</a>
                    </div>
                    <div className="footer-col">
                        <p className="footer-col-title">Work with us</p>
                        <a href="/sponsors"     className="footer-link">Sponsors</a>
                        <a href="/partnerships" className="footer-link">Partnerships</a>
                        <a href="/contact"      className="footer-link">Contact</a>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <p className="footer-copy">© {new Date().getFullYear()} KairosLLC. Anna, TX.</p>
                <p className="footer-disclaimer">Not a real LLC — yet.</p>
            </div>
        </footer>
    );
}