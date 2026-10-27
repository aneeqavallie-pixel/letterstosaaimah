
import { NextResponse } from "next/server";
import { createAccessToken } from "@/lib/siteAuth";

export async function POST(request: Request) {
  const { password } = await request.json();

  if (!process.env.SITE_PASSWORD) {
    return NextResponse.json(
      { error: "Website password is not configured" },
      { status: 500 }
    );
  }

  if (password !== process.env.SITE_PASSWORD) {
    return NextResponse.json(
      { error: "Incorrect password" },
      { status: 401 }
    );
  }

  const token = await createAccessToken();

  const response = NextResponse.json({ success: true });

  response.cookies.set("saaimah_access", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });

  return response;
}
