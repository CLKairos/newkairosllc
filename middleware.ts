import { NextRequest, NextResponse } from "next/server";

const ALLOWED_IP = (process.env.DASHBOARD_ALLOWED_IP ?? "").trim();

function getIP(req: NextRequest): string {
    // x-vercel-forwarded-for is set by Vercel and cannot be spoofed by the client
    const vercel = req.headers.get("x-vercel-forwarded-for");
    if (vercel) return vercel.split(",")[0].trim();

    // Fall back to standard x-forwarded-for
    const forwarded = req.headers.get("x-forwarded-for");
    if (forwarded) return forwarded.split(",")[0].trim();

    return "";
}

export function middleware(req: NextRequest) {
    if (req.nextUrl.pathname.startsWith("/dashboard")) {
        const ip = getIP(req);

        // Temporary: log the detected IP to Vercel function logs so you can verify
        console.log("[dashboard] detected IP:", ip, "| allowed:", ALLOWED_IP);

        if (!ALLOWED_IP) {
            console.warn("[dashboard] DASHBOARD_ALLOWED_IP is not set — blocking all access");
            return NextResponse.rewrite(new URL("/403", req.url));
        }

        if (ip !== ALLOWED_IP) {
            return NextResponse.rewrite(new URL("/403", req.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard/:path*"],
};