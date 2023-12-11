"use server";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
export default async function selectVillageAction(
  villageId: string,
  userId: string
) {
  await db
    .update(users)
    .set({
      selectedVillage: villageId,
    })
    .where(eq(users.id, userId));

  revalidatePath("/");
}
