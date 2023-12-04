import { db } from "@/db";
import { village } from "@/db/schema";
import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest) {
  const data = await req.json();
  await db.insert(village).values({
    ...data,
  });

  return NextResponse.json({ status: 200 });
}
