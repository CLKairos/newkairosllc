"use client";

import { useState } from "react";
import { useTransition } from "react";
import { logout } from "@/app/actions";

const LOGO_LIGHT = "/K LLC/KLLC-Mint-NoBg.png";
const LOGO_DARK = "/K LLC/KLLC-Navy-NoBg.png";

const pages = [
    { name: "Services",     location: "#services" },
    { name: "About",        location: "#about" },
];

interface Props {
    user?: { id: string; username: string; type: "user" | "admin" } | null;
}

export default function Navbar({ user }: Props) {
    const [open, setOpen] = useState(false);
    const [isPending, startTransition] = useTransition();

    function handleLogout() {
        startTransition(() => logout());
    }

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
                    
                    {user ? (
                        <>
                            <a href="/dashboard" className="navbar-link">Dashboard</a>
                            <a href="/dashboard?tab=profile" className="navbar-link">Profile</a>
                            <button 
                                onClick={handleLogout}
                                disabled={isPending}
                                className="navbar-link cta"
                                style={{ background: "none", border: "none", cursor: "pointer", padding: "0" }}
                            >
                                {isPending ? "Signing out..." : "Sign out"}
                            </button>
                        </>
                    ) : (
                        <>
                            <a href="/login" className="navbar-link">Sign in</a>
                            <a href="/signup" className="navbar-link cta">Get Started</a>
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
                
                {user ? (
                    <>
                        <a href="/dashboard" className="navbar-link" onClick={() => setOpen(false)}>Dashboard</a>
                        <a href="/dashboard?tab=profile" className="navbar-link" onClick={() => setOpen(false)}>Profile</a>
                        <button 
                            onClick={() => {
                                setOpen(false);
                                handleLogout();
                            }}
                            disabled={isPending}
                            className="navbar-link cta"
                            style={{ background: "none", border: "none", cursor: "pointer", width: "100%", textAlign: "left", padding: "0" }}
                        >
                            {isPending ? "Signing out..." : "Sign out"}
                        </button>
                    </>
                ) : (
                    <>
                        <a href="/login" className="navbar-link" onClick={() => setOpen(false)}>Sign in</a>
                        <a href="/signup" className="navbar-link cta" onClick={() => setOpen(false)}>Get Started</a>
                    </>
                )}
            </div>
        </nav>
    );
}