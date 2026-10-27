
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyAccessToken } from "./lib/siteAuth";

export async function proxy(request: NextRequest) {
  const accessCookie = request.cookies.get("saaimah_access");

  const isValid = await verifyAccessToken(accessCookie?.value);

  if (isValid) {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL("/login", request.url));
}

export const config = {
  matcher: [
    "/letters/:path*",
    "/letter/:path*",
    "/memories/:path*",
  ],
};
