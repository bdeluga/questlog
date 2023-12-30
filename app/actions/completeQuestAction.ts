"use server";
import { db } from "@/db";
import { Quest, quests, villages } from "@/db/schema";
import { LEVEL_GROWTH } from "@/utils/expConstants";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export default async function completeQuestAction(quest: Quest) {
  const village = await db.query.villages.findFirst({
    where: (villages, { eq }) => eq(villages.id, quest.villageId),
  });
  if (!village) {
    return { error: "Quest doesn't match any village, try again" };
  }

  let newExp = village.exp + quest.rewardExp;

  while (newExp >= village.expNeeded) {
    village.level += 1;
    newExp -= village.expNeeded;
    village.expNeeded = Math.floor(village.expNeeded * LEVEL_GROWTH);
  }

  village.exp = newExp;
  try {
    await db
      .update(villages)
      .set(village)
      .where(eq(villages.id, quest.villageId));

    await db
      .update(quests)
      .set({
        state: "archived",
      })
      .where(eq(quests.id, quest.id));
  } catch (error) {
    return { error: "There was an error recieving reward, try again" };
  }

  revalidatePath("/[village]", "page");
}
