import { auth } from "@/app/auth";
import { db } from "@/db";
import { NextRequest, NextResponse } from "next/server";
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const village = searchParams.get("village");

  const user = await auth();

  if (!village || !user?.user?.id) {
    return NextResponse.json("No village nor user provided", { status: 400 });
  }

  const levelData = await db.query.villages.findFirst({
    where: (villages, { eq, and }) =>
      and(eq(villages.name, village), eq(villages.userId, user.user!.id)),
    columns: {
      exp: true,
      expNeeded: true,
      level: true,
    },
  });

  return NextResponse.json({ data: levelData });
}
