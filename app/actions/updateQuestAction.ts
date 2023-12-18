"use server";
import { db } from "@/db";
import { NewQuest, Quest, quests, users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { auth } from "../auth";
import calculateExp from "@/utils/calculateExp";
export default async function updateQuestAction(quest: Quest) {
  const { difficulty, title, description } = quest;

  const village = await db.query.villages.findFirst({
    where: (villages, { eq }) => eq(villages.id, quest.villageId),
  });

  if (!village) throw "No village with such quest found";

  const newRewardExp = calculateExp(
    village.expNeeded,
    village.level,
    Number(difficulty)
  );

  await db
    .update(quests)
    .set({
      difficulty: difficulty,
      title: title,
      description: description,
      rewardExp: Number(newRewardExp),
    })
    .where(eq(quests.id, quest.id));

  revalidatePath("/[village]/journal", "page");
}
