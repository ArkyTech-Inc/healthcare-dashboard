import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({ name, value, ...options });
          response = NextResponse.next({ request: { headers: request.headers } });
          response.cookies.set({ name, value, ...options });
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({ name, value: "", ...options });
          response = NextResponse.next({ request: { headers: request.headers } });
          response.cookies.set({ name, value: "", ...options });
        },
      },
    }
  );

  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Protect dashboard routes
  if (request.nextUrl.pathname.startsWith("/patients") && !session) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (request.nextUrl.pathname.startsWith("/appointments") && !session) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (request.nextUrl.pathname.startsWith("/medical-records") && !session) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (request.nextUrl.pathname.startsWith("/prescriptions") && !session) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (request.nextUrl.pathname.startsWith("/providers") && !session) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (request.nextUrl.pathname.startsWith("/audit-logs") && !session) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Redirect authenticated users away from auth pages
  if (
    (request.nextUrl.pathname === "/login" ||
      request.nextUrl.pathname === "/register" ||
      request.nextUrl.pathname === "/forgot-password") &&
    session
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return response;
}

export const config = {
  matcher: [
    "/patients/:path*",
    "/appointments/:path*",
    "/medical-records/:path*",
    "/prescriptions/:path*",
    "/providers/:path*",
    "/audit-logs/:path*",
    "/login",
    "/register",
    "/forgot-password",
  ],
};
