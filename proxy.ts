import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { checkSession } from "./lib/api/serverApi";

const PRIVATE_ROUTES = ["/notes", "/profile"];
const AUTH_ROUTES = ["/sign-in", "/sign-up"];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;

  const isPrivateRoute = PRIVATE_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  const isAuthRoute = AUTH_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  if (!accessToken && !refreshToken) {
    if (isPrivateRoute) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }

    return NextResponse.next();
  }

  if (accessToken) {
    if (isAuthRoute) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
  }

  if (refreshToken) {
    try {
      const cookieHeader = request.cookies.toString();

      const response = await checkSession(cookieHeader);

      const nextResponse = isAuthRoute
        ? NextResponse.redirect(new URL("/", request.url))
        : NextResponse.next();

      const setCookie = response.headers["set-cookie"];

      if (setCookie) {
        const cookies = Array.isArray(setCookie) ? setCookie : [setCookie];

        for (const cookie of cookies) {
          const [cookieValue] = cookie.split(";");

          const separatorIndex = cookieValue.indexOf("=");

          if (separatorIndex === -1) {
            continue;
          }

          const name = cookieValue.slice(0, separatorIndex).trim();
          const value = cookieValue.slice(separatorIndex + 1).trim();

          nextResponse.cookies.set(name, value);
        }
      }

      if (response.data) {
        return nextResponse;
      }
    } catch {}

    if (isPrivateRoute) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/notes/:path*", "/profile/:path*", "/sign-in", "/sign-up"],
};
