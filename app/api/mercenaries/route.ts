import { db } from "@/db";
import { mercenaries, users } from "@/db/schema";
import { sql } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const village = searchParams.get("village");
  const search = searchParams.get("search");

  if (search && search.length > 1) {
    const data = await db
      .select()
      .from(mercenaries)
      .innerJoin(users, sql`${"mercenaries.userId"} = ${"users.id"}`)
      .where(sql`lower(${"users.name"}) LIKE lower(${`%${search}%`})`)
      .execute();

    return NextResponse.json({ data });
  }

  const data = await db.query.mercenaries
    .findMany({
      with: {
        user: {
          columns: {
            name: true,
            image: true,
            id: true,
          },
        },
        village: {
          columns: {
            name: true,
          },
        },
      },
      columns: {},
    })
    .then((res) =>
      res
        .filter((data) => data.village.name === village)
        .map((user) => user.user)
    );

  return NextResponse.json({ data });
}
