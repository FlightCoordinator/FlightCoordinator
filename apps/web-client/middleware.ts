import { MiddlewareConfig, NextRequest } from "next/server";

import { checkAuth } from "./shared/lib/auth";

export async function middleware(request: NextRequest) {
  return await checkAuth(request);
}

export const config: MiddlewareConfig = {
  matcher: ["/app/:path*", "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
};
