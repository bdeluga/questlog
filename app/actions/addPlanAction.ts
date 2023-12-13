"use server";
import { db } from "@/db";
import { User, users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
export default async function addPlanAction(
  formData: FormData,
  userId: string
) {
  const plan = formData.get("plan") as User["plan"];
  await db
    .update(users)
    .set({
      plan: plan,
    })
    .where(eq(users.id, userId));
  revalidatePath("/");
}
