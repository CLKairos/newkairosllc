import { NextRequest, NextResponse } from "next/server";

export default function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;

    // ── User dashboard: session cookie required ─────────────────────────────────
    if (pathname.startsWith("/dashboard")) {
        const uid = req.cookies.get("session_uid")?.value;
        if (!uid) return NextResponse.redirect(new URL("/login", req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard/:path*"],
};