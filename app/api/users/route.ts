import { auth } from "@/app/auth";
import { db } from "@/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const user = await auth();

  if (!user)
    return NextResponse.json({ stauts: 401, message: "User not authorized" });

  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search");

  if (search && search.length > 0) {
    const data = await db.query.users.findMany({
      where: (users, { ilike, and, eq }) =>
        and(ilike(users.name, `%${search}%`), eq(users.userType, "member")),
    });

    return NextResponse.json({ data });
  }

  return NextResponse.json({ status: 500 });
}
