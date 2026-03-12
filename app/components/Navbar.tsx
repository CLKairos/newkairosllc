"use client";

import { useState, useEffect } from "react";
import { logout } from "@/app/actions";

const LOGO_LIGHT = "/K LLC/KLLC-Mint-NoBg.png";
const LOGO_DARK = "/K LLC/KLLC-Navy-NoBg.png";

const pages = [
    { name: "Home",         location: "/" },
    { name: "About",        location: "/about" },
    { name: "Projects",     location: "/projects" },
    { name: "Sponsors",     location: "/sponsors" },
    { name: "Partnerships", location: "/partnerships" },
    { name: "Contact",      location: "/contact" },
];

export default function Navbar() {
    const [open, setOpen]         = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        fetch("/api/auth/me")
            .then((r) => r.json())
            .then((data) => setLoggedIn(!!data.uid))
            .catch(() => setLoggedIn(false));
    }, []);

    return (
        <nav className="navbar">
            <div className="navbar-inner">
                <a href="/" className="navbar-brand">
                    <img src={LOGO_DARK} className={"logo-dark"} />
                    <img src={LOGO_LIGHT} className={"logo-light"} />
                    KairosLLC
                </a>

                <div className="navbar-links">
                    {pages.map((p) => (
                        <a key={p.name} href={p.location} className="navbar-link">{p.name}</a>
                    ))}

                    {loggedIn ? (
                        <>
                            <a href="/dashboard" className="navbar-link cta">Dashboard</a>
                            <form action={logout}>
                                <button type="submit" className="navbar-link logout">Log out</button>
                            </form>
                        </>
                    ) : (
                        <>
                            <a href="/login"  className="navbar-link cta">Log in</a>
                            <a href="/signup" className="navbar-link logout">Sign up</a>
                        </>
                    )}
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

                {loggedIn ? (
                    <>
                        <a href="/dashboard" className="navbar-link cta" onClick={() => setOpen(false)}>Dashboard</a>
                        <form action={logout}>
                            <button type="submit" className="navbar-link logout">Log out</button>
                        </form>
                    </>
                ) : (
                    <>
                        <a href="/login"  className="navbar-link cta"    onClick={() => setOpen(false)}>Log in</a>
                        <a href="/signup" className="navbar-link logout" onClick={() => setOpen(false)}>Sign up</a>
                    </>
                )}
            </div>
        </nav>
    );
}