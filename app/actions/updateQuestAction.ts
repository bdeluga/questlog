"use server";
import { db } from "@/db";
import { NewQuest, Quest, User, quests, users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { auth } from "../auth";
import calculateExp from "@/utils/calculateExp";
export default async function updateQuestAction(
  quest: Quest & { mercenary: { id: string; name: string } | null }
) {
  const { difficulty, title, description, mercenary } = quest;

  const village = await db.query.villages.findFirst({
    where: (villages, { eq }) => eq(villages.id, quest.villageId),
  });

  if (!village) return { error: "No village with such quest found" };

  const newRewardExp = calculateExp(
    village.expNeeded,
    village.level,
    Number(difficulty)
  );

  try {
    if (mercenary) {
      await db
        .update(quests)
        .set({
          difficulty: difficulty,
          title: title,
          description: description,
          rewardExp: Number(newRewardExp),
          mercenaryId: mercenary.id!,
        })
        .where(eq(quests.id, quest.id));
    } else {
      await db
        .update(quests)
        .set({
          difficulty: difficulty,
          title: title,
          description: description,
          rewardExp: Number(newRewardExp),
          mercenaryId: null,
        })
        .where(eq(quests.id, quest.id));
    }
  } catch (error) {
    return { error: "There was an error updating quest, try again later" };
  }

  revalidatePath("/[village]/journal", "page");
}
