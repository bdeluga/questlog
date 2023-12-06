import { text, date, pgTable, varchar } from "drizzle-orm/pg-core";
import { InferInsertModel, InferSelectModel, sql } from "drizzle-orm";

export const users = pgTable("users", {
  id: text("id")
    .default(sql`gen_random_uuid()`)
    .primaryKey(),
  name: text("name"),
  createdAt: date("created_at").default(sql`now()`),
  image: text("image"),
  email: text("email").unique(),
  provider: text("provider").default("credentials"),
  providerId: text("provider_id"),
  plan: text("plan"),
});

export type User = InferSelectModel<typeof users>;
export type NewUser = InferInsertModel<typeof users>;

export const villages = pgTable("villages", {
  id: text("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  name: text("name"),
  userId: text("user_id")
    .references(() => users.id)
    .notNull(),
});

export type Village = InferSelectModel<typeof villages>;
export type NewVillage = InferInsertModel<typeof villages>;
