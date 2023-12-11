import { NextRequest, NextResponse } from "next/server";
import { auth } from "./app/auth";

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  //returns user object
  const session = await auth();

  const isAccessing = (routes: string[]) =>
    routes.some((route) => pathname.startsWith(route));

  //append new routes if needed in future
  const authRoutes = ["/sign-up", "/sign-in"];
  const sensitiveRoutes = ["/dashboard"];

  //auth safeguards
  if (isAccessing(authRoutes)) {
    if (session) {
      return NextResponse.redirect(new URL("/", req.url));
    }
    return NextResponse.next();
  }

  //sensitive safeguards
  if (isAccessing(sensitiveRoutes)) {
    if (!session) {
      return NextResponse.redirect(new URL("/sign-in", req.url));
    }
    return NextResponse.next();
  }

  if (pathname === "/" && session) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}
