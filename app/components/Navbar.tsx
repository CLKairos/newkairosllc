"use client";

import { useState } from "react";

const pages = [
    { name: "Home", location: "/" },
    { name: "About", location: "/about" },
    { name: "Projects", location: "/projects" },
    { name: "Sponsors", location: "/sponsors" },
    { name: "Partnerships", location: "/partnerships" },
    { name: "Contact", location: "/contact" },
];

export default function Navbar() {
    const [open, setOpen] = useState(false);

    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;600;700&display=swap');

        .navbar {
          width: 100%; position: sticky; top: 0; z-index: 1000;
          background: linear-gradient(135deg, #0f1a1a, #1a2e2e);
          border-bottom: 1px solid rgba(61,107,107,0.25);
          box-shadow: 0 2px 24px rgba(0,0,0,0.4);
          font-family: 'DM Sans', sans-serif;
        }
        .navbar-inner {
          display: flex; align-items: center; justify-content: space-between;
          padding: 0 48px; height: 68px; max-width: 1400px; margin: 0 auto;
        }
        .navbar-brand {
          font-size: 20px; font-weight: 700; color: #f0f4f4; text-decoration: none;
          letter-spacing: -0.3px; display: flex; align-items: center; gap: 10px;
        }
        .navbar-brand-dot {
          width: 8px; height: 8px; border-radius: 50%; background: #5fa8a8;
          animation: blink 3s ease infinite;
        }
        @keyframes blink { 0%,100% { opacity: 1; } 50% { opacity: 0.3; } }

        .navbar-links { display: flex; align-items: center; gap: 4px; }
        .navbar-link {
          font-size: 14px; font-weight: 500; color: rgba(240,244,244,0.65);
          text-decoration: none; padding: 7px 14px; border-radius: 6px;
          transition: color 0.15s, background 0.15s;
          border: none; background: transparent; cursor: pointer;
        }
        .navbar-link:hover { color: #f0f4f4; background: rgba(61,107,107,0.2); }
        .navbar-link.cta {
          background: #3d6b6b; color: #fff; font-weight: 600; margin-left: 8px;
          padding: 8px 18px; transition: background 0.15s, transform 0.15s;
        }
        .navbar-link.cta:hover { background: #4a8080; transform: translateY(-1px); }

        /* Hamburger */
        .navbar-hamburger {
          display: none; flex-direction: column; gap: 5px; cursor: pointer;
          background: none; border: none; padding: 6px;
        }
        .navbar-hamburger span {
          display: block; width: 22px; height: 2px; background: #e0eeee;
          border-radius: 2px; transition: all 0.25s ease;
        }
        .navbar-hamburger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
        .navbar-hamburger.open span:nth-child(2) { opacity: 0; }
        .navbar-hamburger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

        /* Mobile menu */
        .navbar-mobile {
          display: none; flex-direction: column; gap: 2px;
          background: #0f1a1a; border-top: 1px solid rgba(61,107,107,0.2);
          padding: 12px 20px 20px;
        }
        .navbar-mobile.open { display: flex; }
        .navbar-mobile .navbar-link { padding: 11px 16px; font-size: 15px; }

        @media (max-width: 820px) {
          .navbar-links { display: none; }
          .navbar-hamburger { display: flex; }
          .navbar-inner { padding: 0 20px; }
        }
      `}</style>

            <nav className="navbar">
                <div className="navbar-inner">
                    <a href="/" className="navbar-brand">
                        <span className="navbar-brand-dot" />
                        KairosLLC
                    </a>

                    <div className="navbar-links">
                        {pages.slice(0, -1).map((p) => (
                            <a key={p.name} href={p.location} className="navbar-link">{p.name}</a>
                        ))}
                        <a href="/contact" className="navbar-link cta">Contact</a>
                    </div>

                    <button className={`navbar-hamburger ${open ? "open" : ""}`} onClick={() => setOpen(!open)} aria-label="Toggle menu">
                        <span /><span /><span />
                    </button>
                </div>

                <div className={`navbar-mobile ${open ? "open" : ""}`}>
                    {pages.map((p) => (
                        <a key={p.name} href={p.location} className="navbar-link" onClick={() => setOpen(false)}>{p.name}</a>
                    ))}
                </div>
            </nav>
        </>
    );
}