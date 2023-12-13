import { db } from "@/db";
import { quests } from "@/db/schema";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const villageId = searchParams.get("village");

  if (!villageId) {
    return NextResponse.json("No villageId", { status: 400 });
  }

  const data = await db.query.quests.findMany({
    where: (quests, { eq }) => eq(quests.villageId, villageId),
  });

  return NextResponse.json(data);
}
