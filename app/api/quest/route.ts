import { db } from "@/db";
import { quests } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
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

export async function PUT(request: NextRequest) {
  const { questId, metaData } = await request.json();

  try {
    await db
      .update(quests)
      .set({
        state: metaData.state,
      })
      .where(eq(quests.id, questId));
  } catch (error) {
    NextResponse.json({ staus: 500, message: "Failed to change quest state" });
  }

  return NextResponse.json({ status: 200 });
}
