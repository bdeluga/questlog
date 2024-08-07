"use server";
import { db } from "@/db";
import { User, Village, users, villages } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
export default async function updateUserDetailsAction(
  plan: User["plan"],
  villageName: Village["name"]
) {
  const user = await auth();

  if (!user) return { error: "User not authenticaded" };

  try {
    await db.transaction(async (tx) => {
      await tx
        .update(users)
        .set({
          plan: plan,
        })
        .where(eq(users.id, user.user!.id));

      await tx.insert(villages).values({
        name: villageName,
        userId: user.user!.id,
      });
    });
  } catch (error) {
    return {
      error: "There was an error updating your details, try again later",
    };
  }

  revalidatePath("/");
}
