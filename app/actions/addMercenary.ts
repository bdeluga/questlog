"use server";

import { db } from "@/db";
import { mercenaries, quests, villages } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { auth } from "../auth";

export default async function addMercenary(
  mercenaryId: string,
  villageName: string
) {
  const user = await auth();

  if (!user) return { error: "User not authorized" };

  const village = await db.query.villages.findFirst({
    where: (villages, { eq, and }) =>
      and(eq(villages.userId, user.user!.id), eq(villages.name, villageName)),
  });
  if (!village) return { error: "This village does not exist" };

  try {
    await db.insert(mercenaries).values({
      userId: mercenaryId,
      villageId: village.id,
    });
  } catch (error) {
    return { error: "There was an error adding mercenary, try again later" };
  }

  revalidatePath("/[village]", "page");
}
