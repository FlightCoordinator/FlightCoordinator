import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

import { config as appConfig } from "@/shared/app-config";

import type { GlobalTypes } from "@/types/globals";

const authEndpoint: string =
  "http://" + appConfig.AUTH.BASE_URL + ":" + appConfig.AUTH.PORT + appConfig.AUTH.API_PREFIX + "/auth/validate";

async function checkAuth(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/auth") || pathname === "/") {
    return NextResponse.next();
  }

  const cookieStore = await cookies();
  const accessToken = cookieStore.get("fc_at");

  if (!accessToken) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  const requestConfig: RequestInit = {
    method: "POST",
    credentials: "include",
    headers: {
      Cookie: `${accessToken.name}=${accessToken.value}`,
      "Content-Type": "application/json",
    } as HeadersInit,
  };
  try {
    const response = await fetch(authEndpoint, requestConfig);
    if (!response.ok) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
    const validationResult: GlobalTypes.ServerResponseParams<GlobalTypes.Auth.Protected.AuthValidationProps> =
      await response.json();

    if (validationResult.isSuccess && validationResult.data && validationResult.data.isAuthenticated) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/auth/login", request.url));
  } catch {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }
}

export { checkAuth };
