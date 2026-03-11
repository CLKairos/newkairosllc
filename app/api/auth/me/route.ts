import { NextResponse } from "next/server";
import { cookies }      from "next/headers";

export async function GET() {
    const cookieStore = await cookies();
    const uid = cookieStore.get("session_uid")?.value ?? null;
    return NextResponse.json({ uid });
}