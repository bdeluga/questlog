"use server";
import { db } from "@/db";
import { villages } from "@/db/schema";
import { revalidatePath } from "next/cache";

export default async function addVillageAction(
  formData: FormData,
  userId: string
) {
  const userWithVillages = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.id, userId),
    with: {
      villages: true,
    },
  });

  if (!userWithVillages)
    throw "User not found, log in again and repeat action.";

  const userPlan = userWithVillages.plan;

  const villageName = formData.get("name");

  const maxVillagesCount = userPlan === "hobby" ? 3 : 5;

  const canCreateMoreVillages =
    userWithVillages.villages.length < maxVillagesCount;

  if (!canCreateMoreVillages) {
    throw "Maximum villages count reached, consider deleting unused ones.";
  }

  const duplicate = userWithVillages.villages.find(
    (village) => village.name === villageName
  );

  if (duplicate) {
    throw `Village with name ${villageName} already exist.`;
  }

  await db.insert(villages).values({
    userId,
    name: formData.get("name") as string,
  });
  revalidatePath("/[village]", "layout");
}
