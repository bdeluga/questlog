import { auth } from "@/app/auth";
import { db } from "@/db";
import { villages } from "@/db/schema";
import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest) {
  const user = await auth();
  console.log(user);

  // const data = await req.json();
  // await db.insert(villages).values({
  //   ...data,
  // });

  return NextResponse.json({ status: 400 });
}
