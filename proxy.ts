import { parseSetCookie } from "cookie";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { checkSession } from "./lib/api/serverApi";

const PRIVATE_ROUTES = ["/notes", "/profile"];
const AUTH_ROUTES = ["/sign-in", "/sign-up"];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const cookieStore = await cookies();

  const accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;

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
      const cookieHeader = cookieStore.toString();

      const response = await checkSession(cookieHeader);

      const nextResponse = isAuthRoute
        ? NextResponse.redirect(new URL("/", request.url))
        : NextResponse.next();

      const setCookie = response.headers["set-cookie"];

      if (setCookie) {
        const cookies = Array.isArray(setCookie) ? setCookie : [setCookie];

        for (const cookieHeader of cookies) {
          const parsedCookie = parseSetCookie(cookieHeader);

          if (!parsedCookie) {
            continue;
          }

          const { name, value, ...options } = parsedCookie;

          if (!value) {
            continue;
          }

          nextResponse.cookies.set({
            name,
            value,
            ...options,
          });
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
