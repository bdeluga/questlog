"use server";

import { db } from "@/db";
import { quests } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export default async function removeQuest(questId: string) {
  try {
    await db.delete(quests).where(eq(quests.id, questId));
  } catch (error) {
    return { error: "There was an error deleting quest, try again later" };
  }

  revalidatePath("/[village]/journal", "page");
}
