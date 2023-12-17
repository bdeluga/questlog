"use server";
import { db } from "@/db";
import { NewQuest, Quest, quests, users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
export default async function updateQuestAction(quest: Quest) {
  await db.update(quests).set(quest).where(eq(quests.id, quest.id));

  revalidatePath("/[village]/journal", "page");
}
