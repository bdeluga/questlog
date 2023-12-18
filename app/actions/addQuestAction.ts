"use server";
import { db } from "@/db";
import { NewQuest, quests } from "@/db/schema";
import { revalidatePath } from "next/cache";
import { auth } from "../auth";
import calculateExp from "@/utils/calculateExp";
export default async function addQuestAction(
  formData: FormData,
  villageName: string
) {
  const user = await auth();

  if (!user) throw "User not authenticaded";

  const village = await db.query.villages.findFirst({
    where: (villages, { eq, and }) =>
      and(eq(villages.userId, user!.user!.id), eq(villages.name, villageName)),
  });
  if (!village) throw "This village does not exist";

  const { expNeeded, level } = village;

  const newQuest = Object.fromEntries(
    formData.entries()
  ) as unknown as NewQuest;

  const calculatedExp = calculateExp(
    expNeeded,
    level,
    Number(newQuest.difficulty)
  );
  try {
    await db.insert(quests).values({
      ...newQuest,
      villageId: village.id,
      rewardExp: calculatedExp,
    });
  } catch (error) {
    throw "There was an error creating task, try again later";
  }

  revalidatePath("/[village]", "page");
}
