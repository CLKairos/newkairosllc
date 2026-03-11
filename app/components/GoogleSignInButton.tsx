"use client";

import { useState }                              from "react";
import { useRouter }                             from "next/navigation";
import { GoogleAuthProvider, signInWithPopup }   from "firebase/auth";
import { auth }                                  from "@/app/lib/firebase";

type Props = {
    mode?: "login" | "signup";
};

export function GoogleSignInButton({ mode = "login" }: Props) {
    const router             = useRouter();
    const [error, setError]  = useState<string | null>(null);
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
        <div>
            <button onClick={handleGoogleAuth} disabled={loading}>
                {loading ? "Please wait..." : label}
            </button>
            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
}