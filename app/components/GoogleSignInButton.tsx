"use client";

import { useState }                              from "react";
import { useRouter }                             from "next/navigation";
import { GoogleAuthProvider, signInWithPopup }   from "firebase/auth";
import { auth }                                  from "@/app/lib/firebase";

type Props = {
    mode?: "login" | "signup";
};

export function GoogleSignInButton({ mode = "login" }: Props) {
    const router                = useRouter();
    const [error, setError]     = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const label = mode === "signup" ? "Sign up with Google" : "Sign in with Google";

    async function handleGoogleAuth() {
        setError(null);
        setLoading(true);
        try {
            const provider = new GoogleAuthProvider();
            const result   = await signInWithPopup(auth, provider);
            const idToken  = await result.user.getIdToken();

            const res = await fetch("/api/auth/google", {
                method:  "POST",
                headers: { "Content-Type": "application/json" },
                body:    JSON.stringify({ idToken }),
            });

            const data = await res.json();
            if (!res.ok) {
                setError(data.error ?? `Google ${mode} failed.`);
                return;
            }

            router.push("/dashboard");
        } catch (err: any) {
            console.error(`Google ${mode} error:`, err);
            setError(err?.message ?? `Google ${mode} failed.`);
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <style>{`
                .google-btn {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 10px;
                    width: 100%;
                    padding: 10px 16px;
                    background: transparent;
                    border: 1px solid #1e2330;
                    border-radius: 4px;
                    color: #94a3b8;
                    font-family: 'Courier New', monospace;
                    font-size: 12px;
                    font-weight: 700;
                    letter-spacing: 1px;
                    text-transform: uppercase;
                    cursor: pointer;
                    transition: border-color 0.15s, color 0.15s, background 0.15s;
                }
                .google-btn:hover:not(:disabled) {
                    border-color: #475569;
                    color: #e2e8f0;
                    background: #161b27;
                }
                .google-btn:disabled {
                    opacity: 0.4;
                    cursor: not-allowed;
                }
                .google-icon {
                    width: 16px;
                    height: 16px;
                    flex-shrink: 0;
                }
                .google-error {
                    margin-top: 8px;
                    font-family: 'Courier New', monospace;
                    font-size: 12px;
                    color: #f87171;
                    text-align: center;
                }
            `}</style>

            <button className="google-btn" onClick={handleGoogleAuth} disabled={loading}>
                {!loading && (
                    <svg className="google-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                )}
                {loading ? "Please wait..." : label}
            </button>

            {error && <p className="google-error">{error}</p>}
        </>
    );
}