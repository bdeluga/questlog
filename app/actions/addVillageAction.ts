"use server";
import { db } from "@/db";
import { villages } from "@/db/schema";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";

export default async function addVillageAction(formData: FormData) {
  const user = await auth();

  if (!user) {
    return { error: "User not authenticaded" };
  }

  const userWithVillages = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.id, user.user!.id),
    with: {
      villages: true,
    },
  });

  if (!userWithVillages)
    return { error: "User not found, log in again and repeat action." };

  const userPlan = userWithVillages.plan;

  const villageName = formData.get("name");

  const maxVillagesCount = userPlan === "hobby" ? 3 : 5;

  const canCreateMoreVillages =
    userWithVillages.villages.length < maxVillagesCount;

  if (!canCreateMoreVillages) {
    return {
      error: "Maximum villages count reached, consider deleting unused ones.",
    };
  }

  const duplicate = userWithVillages.villages.find(
    (village) => village.name === villageName
  );

  if (duplicate) {
    return { error: `Village with name ${villageName} already exist.` };
  }
  try {
    await db.insert(villages).values({
      userId: user.user!.id,
      name: formData.get("name") as string,
    });
  } catch (error) {
    return { error: "There was an error creating village, try again later" };
  }

  revalidatePath("/[village]", "layout");
}
