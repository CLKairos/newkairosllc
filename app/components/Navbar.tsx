"use client";

import { useState } from "react";

const LOGO_LIGHT = "/K LLC/KLLC-Mint-NoBg.png";
const LOGO_DARK = "/K LLC/KLLC-Navy-NoBg.png";

const pages = [
    { name: "Services",     location: "#services" },
    { name: "About",        location: "#about" },
];

export default function Navbar() {
    const [open, setOpen] = useState(false);

    return (
        <nav className="navbar">
            <div className="navbar-inner">
                <a href="/" className="navbar-brand">
                    <img src={LOGO_DARK} className={"logo-dark"} />
                    <img src={LOGO_LIGHT} className={"logo-light"} />
                    CLKairos
                </a>

                <div className="navbar-links">
                    {pages.map((p) => (
                        <a key={p.name} href={p.location} className="navbar-link">{p.name}</a>
                    ))}
                    <a href="#contact" className="navbar-link cta">Get Started</a>
                </div>

                <button
                    className={`navbar-hamburger ${open ? "open" : ""}`}
                    onClick={() => setOpen(!open)}
                    aria-label="Toggle menu"
                >
                    <span /><span /><span />
                </button>
            </div>

            <div className={`navbar-mobile ${open ? "open" : ""}`}>
                {pages.map((p) => (
                    <a key={p.name} href={p.location} className="navbar-link" onClick={() => setOpen(false)}>{p.name}</a>
                ))}
                <a href="#contact" className="navbar-link cta" onClick={() => setOpen(false)}>Get Started</a>
            </div>
        </nav>
    );
}