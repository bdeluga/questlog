import { NextRequest, NextResponse } from "next/server";
import { auth } from "./app/auth";
import { db } from "./db";

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  //returns user object
  const session = await auth();

  //append new routes if needed in future
  const authRoutes = ["/sign-up", "/sign-in"];
  const sensitiveRoutes = ["/new-user"];
  const apiRoutes = [
    "/api/mercenaries",
    "/api/quest",
    "/api/users",
    "/api/village/level",
  ];

  const isAccessing = (routes: string[]) =>
    routes.some((route) => pathname.startsWith(route));

  if (req.headers.get("next-action") || isAccessing(apiRoutes)) {
    if (!session)
      return NextResponse.json({ error: "Unathorized" }, { status: 401 });

    NextResponse.next();
  }

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
    if (session) {
      const user = await db.query.users.findFirst({
        where: (users, { eq }) => eq(users.id, session.user?.id!),
        with: {
          villages: true,
        },
      });

      if (user?.plan && user.villages.length > 0) {
        return NextResponse.redirect(
          new URL(`${user.villages[0].name}`, req.url)
        );
      }
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

    if (!user?.villages) {
      return NextResponse.redirect(new URL("new-user", req.url));
    }

    return NextResponse.redirect(new URL(`${user.villages[0].name}`, req.url));
  }

  return NextResponse.next();
}
