import { NextRequest, NextResponse } from "next/server";

const ALLOWED_IP = process.env.DASHBOARD_ALLOWED_IP ?? "";

function getIP(req: NextRequest): string {
    // Vercel sets x-forwarded-for; fall back to direct connection
    const forwarded = req.headers.get("x-forwarded-for");
    if (forwarded) return forwarded.split(",")[0].trim();
    return req.headers.get("x-real-ip") ?? "";
}

export function middleware(req: NextRequest) {
    if (req.nextUrl.pathname.startsWith("/dashboard")) {
        const ip = getIP(req);
        if (!ALLOWED_IP || ip !== ALLOWED_IP) {
            return NextResponse.rewrite(new URL("/403", req.url));
        }
    }
    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard/:path*"],
};