import { NextRequest, NextResponse } from "next/server";
import { auth } from "./app/auth";
import { db } from "./db";

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  //returns user object
  const session = await auth();

  const isAccessing = (routes: string[]) =>
    routes.some((route) => pathname.startsWith(route));

  //append new routes if needed in future
  const authRoutes = ["/sign-up", "/sign-in"];
  const sensitiveRoutes = ["/dashboard", "/new-user/plan"];

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
    const user = await db.query.users.findFirst({
      where: (users, { eq }) => eq(users.id, session.user?.id!),
      with: {
        villages: true,
      },
    });

    return NextResponse.redirect(
      new URL(`${user?.selectedVillage || user?.villages[0].name}`, req.url)
    );
  }

  return NextResponse.next();
}
