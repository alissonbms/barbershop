import { NextRequest, NextResponse } from "next/server";
import { auth } from "./auth";

const authRoutes = ["/auth/signin", "/auth/signup", "/api/auth/signin"];
const userRoutes = ["/bookings"];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isUserRoute = userRoutes.includes(path);
  const isAuthRoute = authRoutes.includes(path);

  // 3. Decrypt the session from the cookie
  const session = await auth();

  if (isUserRoute && !session?.user) {
    return NextResponse.redirect(new URL("/auth/signin", req.nextUrl));
  }

  if (isAuthRoute && session?.user) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  // 5. Redirect to /dashboard if the user is authenticated
  if (req.nextUrl.pathname.startsWith("/owner")) {
    return NextResponse.redirect(new URL("/license", req.nextUrl));
  }

  return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
