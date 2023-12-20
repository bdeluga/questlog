"use server";
import { db } from "@/db";
import { villages } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
export default async function removeVillageAction(villageId: string) {
  try {
    await db.delete(villages).where(eq(villages.id, villageId));
  } catch (error) {
    return { error: "There was an error removing village, try again later" };
  }

  revalidatePath("/");
}
