import { db } from "@/db";
import { users } from "@/db/schema";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search");

  if (search && search.length > 1) {
    const data = await db.query.users.findMany({
      where: (users, { ilike }) => ilike(users.name, `%${search}%`),
    });

    return NextResponse.json({ data });
  }

  const data = await db.query.users.findMany();

  return NextResponse.json({ data });
}
