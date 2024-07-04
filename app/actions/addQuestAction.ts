"use server";
import { db } from "@/db";
import { NewQuest, Quest, quests } from "@/db/schema";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import calculateExp from "@/utils/calculateExp";
export default async function addQuestAction(
  formData: {
    [k: string]: FormDataEntryValue;
  },
  villageName: string
) {
  const user = await auth();

  if (!user) return { error: "User not authenticaded" };

  const village = await db.query.villages.findFirst({
    where: (villages, { eq, and }) =>
      and(eq(villages.userId, user!.user!.id), eq(villages.name, villageName)),
  });
  if (!village) return { error: "This village does not exist" };

  const { expNeeded, level } = village;

  const calculatedExp = calculateExp(
    expNeeded,
    level,
    Number(formData.difficulty)
  );
  try {
    await db.insert(quests).values({
      ...(formData as unknown as Quest),
      villageId: village.id,
      rewardExp: calculatedExp,
    });
  } catch (error) {
    return { error: "There was an error creating task, try again later" };
  }

  revalidatePath("/[village]", "page");
}
