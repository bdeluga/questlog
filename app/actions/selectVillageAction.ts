"use server";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { auth } from "../auth";
export default async function selectVillageAction(villageId: string) {
  const user = await auth();
  if (!user) throw "User not authenticaded";

  await db
    .update(users)
    .set({
      selectedVillage: villageId,
    })
    .where(eq(users.id, user.user!.id));

  revalidatePath("/");
}
