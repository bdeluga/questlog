"use server";

import { db } from "@/db";
import { quests } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export default async function removeQuest(questId: string) {
  await db.delete(quests).where(eq(quests.id, questId));

  revalidatePath("/[village]/journal", "page");
}
