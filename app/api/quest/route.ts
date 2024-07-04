import { auth } from "@/auth";
import { db } from "@/db";
import { quests } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const villageName = searchParams.get("village") as string;
  if (!villageName) {
    return NextResponse.json("No village provided", {
      status: 400,
    });
  }
  const user = await auth();

  if (!user) {
    return NextResponse.json("User not authorized", {
      status: 401,
    });
  }

  try {
    const village = await db.query.villages.findFirst({
      where: (villages, { eq, and }) =>
        and(eq(villages.name, villageName), eq(villages.userId, user.user!.id)),
      with: {
        quests: {
          where: (quests, { ne }) => ne(quests.state, "archived"),
        },
      },
    });
    return NextResponse.json({ data: village?.quests });
  } catch (error) {
    return NextResponse.json({ status: 500 });
  }
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

  revalidatePath("/[village]/journal/analytics", "page");

  return NextResponse.json({ status: 200 });
}
