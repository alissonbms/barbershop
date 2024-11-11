import { NextRequest, NextResponse } from "next/server";
import { auth } from "./auth";
import { getSession } from "./app/_actions/getSession";

const authRoutes = ["/auth/signin", "/auth/signup", "/api/auth/signin"];
const userRoutes = ["/bookings, /membership"];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isUserRoute = userRoutes.includes(path);
  const isAuthRoute = authRoutes.includes(path);

  const session = await getSession();

  if (isUserRoute && !session?.user) {
    return NextResponse.redirect(new URL("/auth/signin", req.nextUrl));
  }

  if (isAuthRoute && session?.user) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  if (req.nextUrl.pathname.startsWith("/owner") && !session?.user) {
    return NextResponse.redirect(new URL("/auth/signin", req.nextUrl));
  }

  if (
    req.nextUrl.pathname.startsWith("/owner") &&
    session?.user &&
    session?.user?.role === "USER"
  ) {
    return NextResponse.redirect(new URL("/membership", req.nextUrl));
  }

  return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
