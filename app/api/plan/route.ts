import { auth } from "@/app/auth";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

import { NextRequest, NextResponse } from "next/server";
export async function PATCH(req: NextRequest) {
  const user = await auth();
  if (!user?.user) {
    return NextResponse.json("User is not authorized", { status: 401 });
  }
  const data = await req.json();
  await db.update(users).set(data).where(eq(users.id, user.user.id));

  return NextResponse.json({ status: 200 });
}
