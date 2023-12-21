import {
  InferInsertModel,
  InferSelectModel,
  relations,
  sql,
} from "drizzle-orm";
import {
  text,
  date,
  pgEnum,
  pgTable,
  uniqueIndex,
  integer,
  primaryKey,
} from "drizzle-orm/pg-core";

const planEnum = pgEnum("plan", ["hobby", "pro"]);
const stateEnum = pgEnum("state", [
  "new",
  "active",
  "resolved",
  "closed",
  "archived",
]);
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
  plan: planEnum("plan"),
  selectedVillage: text("selected_village"),
});

export const usersRelations = relations(users, ({ many }) => ({
  villages: many(villages),
  quests: many(quests),
}));

export type User = InferSelectModel<typeof users>;
export type NewUser = InferInsertModel<typeof users>;

export const villages = pgTable(
  "villages",
  {
    id: text("id")
      .default(sql`gen_random_uuid()`)
      .primaryKey(),
    name: text("name").notNull(),
    userId: text("user_id")
      .references(() => users.id, { onDelete: "cascade" })
      .notNull(),
    exp: integer("exp").notNull().default(1),
    expNeeded: integer("exp_needed").notNull().default(150),
    level: integer("level").default(1).notNull(),
  },
  (table) => {
    return {
      userVillageIdx: uniqueIndex("user_village_idx").on(
        table.userId,
        table.name
      ),
    };
  }
);

export const villagesRelations = relations(villages, ({ one, many }) => ({
  user: one(users, {
    fields: [villages.userId],
    references: [users.id],
  }),
  quests: many(quests, {
    //@ts-expect-error idk why this is
    fields: [villages.id],
    references: [quests.villageId],
  }),
}));

export type Village = InferSelectModel<typeof villages>;
export type NewVillage = InferInsertModel<typeof villages>;

export const quests = pgTable("quests", {
  id: text("id")
    .default(sql`gen_random_uuid()`)
    .primaryKey(),
  number: integer("number")
    .default(sql`nextval('questnum_seq')`)
    .notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  createdAt: date("created_at").default(sql`now()`),
  villageId: text("village_id")
    .references(() => villages.id, { onDelete: "cascade" })
    .notNull(),
  mercenaryId: text("user_id").references(() => users.id),
  difficulty: text("difficulty").notNull(),
  rewardExp: integer("reward_exp").notNull(),
  state: stateEnum("state").default("new").notNull(),
});

export const questsRelations = relations(quests, ({ one }) => ({
  village: one(villages, {
    fields: [quests.villageId],
    references: [villages.id],
  }),
  user: one(users),
}));
export type Quest = InferSelectModel<typeof quests>;
export type NewQuest = InferInsertModel<typeof quests>;

export interface NotArchivedQuest extends Quest {
  state: Exclude<Quest["state"], "archived">;
}

export const mercenaries = pgTable(
  "mercenaries",
  {
    userId: text("user_id")
      .references(() => users.id, { onDelete: "cascade" })
      .notNull(),
    villageId: text("village_id")
      .references(() => villages.id, { onDelete: "cascade" })
      .notNull(),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.userId, table.villageId] }),
  })
);

export const mercenariesRelations = relations(mercenaries, ({ one }) => ({
  user: one(users, {
    fields: [mercenaries.userId],
    references: [users.id],
  }),
  village: one(villages, {
    fields: [mercenaries.villageId],
    references: [villages.id],
  }),
}));
export type Mercenary = InferSelectModel<typeof mercenaries>;
export type NewMercenary = InferInsertModel<typeof mercenaries>;
