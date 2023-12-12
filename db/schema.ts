import { text, date, pgTable, numeric } from "drizzle-orm/pg-core";
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
  selectedVillage: text("selected_village"),
});

export type User = InferSelectModel<typeof users>;
export type NewUser = InferInsertModel<typeof users>;

export const villages = pgTable("villages", {
  id: text("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  userId: text("user_id")
    .references(() => users.id)
    .notNull(),
  exp: numeric("exp").notNull().default("1"),
  expNeeded: numeric("exp_needed").notNull().default("150"),
  level: numeric("level").default("1"),
});

export type Village = InferSelectModel<typeof villages>;
export type NewVillage = InferInsertModel<typeof villages>;

export const quests = pgTable("quests", {
  id: text("id")
    .default(sql`gen_random_uuid()`)
    .primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  createdAt: date("created_at").default(sql`now()`),
  villageId: text("village_id")
    .references(() => villages.id)
    .notNull(),
  userId: text("user_id").references(() => users.id),
});

export type Quest = InferSelectModel<typeof quests>;
export type NewQuest = InferInsertModel<typeof quests>;
