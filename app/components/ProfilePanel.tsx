"use client";

import { useState, useEffect } from "react";
import {
    EmailAuthProvider,
    reauthenticateWithCredential,
    updatePassword,
    verifyBeforeUpdateEmail,
    sendEmailVerification,
    sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "@/app/lib/firebase";
import { updateUsername, updatePasswordDB, updateEmailDB, markEmailVerified } from "@/app/actions";

interface Props {
    user: { id: string; email: string; username: string; emailVerified: boolean; firebaseUid: string; };
}

type SectionState = { success: string | null; error: string | null; loading: boolean };
const init = (): SectionState => ({ success: null, error: null, loading: false });

export default function ProfilePanel({ user }: Props) {
    const [username, setUsername]           = useState(user.username);
    const [uState, setUState]               = useState(init());

    const [currentPw, setCurrentPw]         = useState("");
    const [newPw, setNewPw]                 = useState("");
    const [confirmPw, setConfirmPw]         = useState("");
    const [pwState, setPwState]             = useState(init());

    const [newEmail, setNewEmail]           = useState("");
    const [emailPw, setEmailPw]             = useState("");
    const [emailState, setEmailState]       = useState(init());

    const [verifyState, setVerifyState]     = useState(init());
    const [resetState, setResetState]       = useState(init());
    const [verified, setVerified]           = useState(user.emailVerified);

    useEffect(() => {
        const fbUser = auth.currentUser;
        if (fbUser && fbUser.emailVerified && !user.emailVerified) {
            markEmailVerified().then(() => setVerified(true));
        }
    }, []);

    async function handleUsernameChange() {
        setUState({ ...init(), loading: true });
        const res = await updateUsername(username);
        setUState({ loading: false, success: res?.success ? "Username updated." : null, error: res?.error ?? null });
    }

    async function handlePasswordChange() {
        setPwState({ ...init(), loading: true });
        if (newPw !== confirmPw) { setPwState({ loading: false, success: null, error: "Passwords do not match." }); return; }
        if (newPw.length < 8)    { setPwState({ loading: false, success: null, error: "Password must be at least 8 characters." }); return; }
        try {
            const fbUser = auth.currentUser;
            if (fbUser && fbUser.email) {
                const cred = EmailAuthProvider.credential(fbUser.email, currentPw);
                await reauthenticateWithCredential(fbUser, cred);
                await updatePassword(fbUser, newPw);
            }
            const res = await updatePasswordDB(newPw);
            if (res?.success) {
                setPwState({ loading: false, success: "Password updated.", error: null });
                setCurrentPw(""); setNewPw(""); setConfirmPw("");
            } else {
                setPwState({ loading: false, success: null, error: res?.error ?? "Failed." });
            }
        } catch (err: any) {
            const msg = err?.code === "auth/wrong-password" || err?.code === "auth/invalid-credential"
                ? "Current password is incorrect."
                : err?.message ?? "Failed to update password.";
            setPwState({ loading: false, success: null, error: msg });
        }
    }

    async function handleEmailChange() {
        setEmailState({ ...init(), loading: true });
        if (!newEmail.trim()) { setEmailState({ loading: false, success: null, error: "Email is required." }); return; }
        try {
            const fbUser = auth.currentUser;
            if (fbUser && fbUser.email) {
                const cred = EmailAuthProvider.credential(fbUser.email, emailPw);
                await reauthenticateWithCredential(fbUser, cred);
                await verifyBeforeUpdateEmail(fbUser, newEmail.trim(), { url: "https://kairosllc.org/dashboard" });
            }
            const res = await updateEmailDB(newEmail.trim());
            if (res?.success) {
                setEmailState({ loading: false, success: "Verification sent to your new address. Check your inbox.", error: null });
                setNewEmail(""); setEmailPw("");
            } else {
                setEmailState({ loading: false, success: null, error: res?.error ?? "Failed." });
            }
        } catch (err: any) {
            const msg = err?.code === "auth/wrong-password" || err?.code === "auth/invalid-credential"
                ? "Current password is incorrect."
                : err?.code === "auth/requires-recent-login"
                    ? "Please log out and log back in before changing your email."
                    : err?.message ?? "Failed to update email.";
            setEmailState({ loading: false, success: null, error: msg });
        }
    }

    async function handleResendVerification() {
        setVerifyState({ ...init(), loading: true });
        try {
            const fbUser = auth.currentUser;
            if (fbUser) {
                await sendEmailVerification(fbUser, { url: "https://kairosllc.org/dashboard" });
                setVerifyState({ loading: false, success: "Verification email sent. Check your inbox.", error: null });
            } else {
                setVerifyState({ loading: false, success: null, error: "You must be logged in via Firebase to resend verification." });
            }
        } catch (err: any) {
            setVerifyState({ loading: false, success: null, error: err?.message ?? "Failed to send verification email." });
        }
    }

    async function handlePasswordReset() {
        setResetState({ ...init(), loading: true });
        try {
            await sendPasswordResetEmail(auth, user.email, { url: "https://kairosllc.org/login" });
            setResetState({ loading: false, success: `Reset email sent to ${user.email}.`, error: null });
        } catch (err: any) {
            setResetState({ loading: false, success: null, error: err?.message ?? "Failed to send reset email." });
        }
    }

    return (
        <div className="profile-wrap">

            <div className="profile-section">
                <p className="profile-section-title">Email Verification</p>
                <div className="profile-meta">
                    <span>{user.email}</span>
                    <span className={`verified-badge ${verified ? "yes" : "no"}`}>
                        {verified ? "Verified" : "Not verified"}
                    </span>
                </div>
                {!verified && (
                    <>
                        <button className="profile-btn" onClick={handleResendVerification} disabled={verifyState.loading}>
                            {verifyState.loading ? "Sending..." : "Resend verification email"}
                        </button>
                        {verifyState.success && <p className="profile-success">{verifyState.success}</p>}
                        {verifyState.error   && <p className="profile-error">{verifyState.error}</p>}
                    </>
                )}
                {verified && <p className="profile-success">Your email address is verified.</p>}
            </div>

            <div className="profile-section">
                <p className="profile-section-title">Username</p>
                <div className="profile-field">
                    <label className="profile-label">Username</label>
                    <input className="profile-input" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="yourname" />
                </div>
                <button className="profile-btn" onClick={handleUsernameChange} disabled={uState.loading}>
                    {uState.loading ? "Saving..." : "Save username"}
                </button>
                {uState.success && <p className="profile-success">{uState.success}</p>}
                {uState.error   && <p className="profile-error">{uState.error}</p>}
            </div>

            <div className="profile-section">
                <p className="profile-section-title">Change Password</p>
                <div className="profile-field">
                    <label className="profile-label">Current password</label>
                    <input className="profile-input" type="password" value={currentPw} onChange={(e) => setCurrentPw(e.target.value)} placeholder="••••••••" />
                </div>
                <div className="profile-field">
                    <label className="profile-label">New password</label>
                    <input className="profile-input" type="password" value={newPw} onChange={(e) => setNewPw(e.target.value)} placeholder="••••••••" />
                </div>
                <div className="profile-field">
                    <label className="profile-label">Confirm new password</label>
                    <input className="profile-input" type="password" value={confirmPw} onChange={(e) => setConfirmPw(e.target.value)} placeholder="••••••••" />
                </div>
                <button className="profile-btn" onClick={handlePasswordChange} disabled={pwState.loading}>
                    {pwState.loading ? "Updating..." : "Update password"}
                </button>
                {pwState.success && <p className="profile-success">{pwState.success}</p>}
                {pwState.error   && <p className="profile-error">{pwState.error}</p>}
            </div>

            <div className="profile-section">
                <p className="profile-section-title">Change Email Address</p>
                <p className="profile-meta">Current: {user.email}</p>
                <div className="profile-field">
                    <label className="profile-label">New email address</label>
                    <input className="profile-input" type="email" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} placeholder="new@example.com" />
                </div>
                <div className="profile-field">
                    <label className="profile-label">Current password to confirm</label>
                    <input className="profile-input" type="password" value={emailPw} onChange={(e) => setEmailPw(e.target.value)} placeholder="••••••••" />
                </div>
                <button className="profile-btn" onClick={handleEmailChange} disabled={emailState.loading}>
                    {emailState.loading ? "Sending..." : "Send verification to new email"}
                </button>
                {emailState.success && <p className="profile-success">{emailState.success}</p>}
                {emailState.error   && <p className="profile-error">{emailState.error}</p>}
            </div>

            <div className="profile-section">
                <p className="profile-section-title">Password Reset Email</p>
                <p className="profile-meta">Sends a reset link to {user.email}. Use this if you have forgotten your current password.</p>
                <button className="profile-btn danger" onClick={handlePasswordReset} disabled={resetState.loading}>
                    {resetState.loading ? "Sending..." : "Send password reset email"}
                </button>
                {resetState.success && <p className="profile-success">{resetState.success}</p>}
                {resetState.error   && <p className="profile-error">{resetState.error}</p>}
            </div>

        </div>
    );
}