import { db } from "@/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const village = searchParams.get("village");
  const search = searchParams.get("search");

  const data = await db.query.mercenaries
    .findMany({
      with: {
        user: {
          columns: {
            name: true,
          },
        },
        village: {
          columns: {
            name: true,
          },
        },
      },
      columns: {
        id: true,
      },
    })
    .then((res) =>
      res
        .filter((data) => data.village.name === village)
        .map((user) => ({
          id: user.id,
          name: user.user.name,
        }))
    );

  if (search && search.length > 1) {
    return NextResponse.json({
      data: data.filter((mercenary) =>
        mercenary.name?.toLocaleLowerCase().includes(search.toLocaleLowerCase())
      ),
    });
  }

  return NextResponse.json({ data });
}
