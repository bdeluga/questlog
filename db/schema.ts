import {
  pgTable,
  unique,
  pgEnum,
  text,
  date,
  uniqueIndex,
  foreignKey,
  integer,
  primaryKey,
} from "drizzle-orm/pg-core";
import {
  InferInsertModel,
  InferSelectModel,
  relations,
  sql,
} from "drizzle-orm";

export const plan = pgEnum("plan", ["pro", "hobby"]);
export const state = pgEnum("state", [
  "archived",
  "closed",
  "resolved",
  "active",
  "new",
]);
export const type = pgEnum("type", ["owner", "member"]);

export const users = pgTable("users", {
  id: text("id")
    .default(sql`gen_random_uuid()`)
    .primaryKey(),
  name: text("name"),
  createdAt: date("created_at").defaultNow(),
  image: text("image"),
  email: text("email").unique(),
  provider: text("provider").default("credentials"),
  providerId: text("provider_id"),
  plan: plan("plan"),
  userType: type("type").default("owner"),
});

export const usersRelations = relations(users, ({ many }) => ({
  villages: many(villages),
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
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    exp: integer("exp").default(1).notNull(),
    expNeeded: integer("exp_needed").default(150).notNull(),
    level: integer("level").default(1).notNull(),
  },
  (table) => {
    return {
      userVillageIdx: uniqueIndex("user_village_idx").on(
        table.name,
        table.userId
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

export interface NotArchivedQuest extends Quest {
  state: Exclude<Quest["state"], "archived">;
}

export const mercenaries = pgTable(
  "mercenaries",
  {
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    villageId: text("village_id")
      .notNull()
      .references(() => villages.id, { onDelete: "cascade" }),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.userId, table.villageId] }),
    uniqueConstin: uniqueIndex("unique_mercenary").on(
      table.userId,
      table.villageId
    ),
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

export const quests = pgTable("quests", {
  id: text("id")
    .default(sql`gen_random_uuid()`)
    .primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  createdAt: date("created_at").defaultNow(),
  villageId: text("village_id")
    .notNull()
    .references(() => villages.id, { onDelete: "cascade" }),
  difficulty: text("difficulty").notNull(),
  rewardExp: integer("reward_exp").notNull(),
  state: state("state").default("new").notNull(),
  // sql`CREATE SEQUENCE questnum_seq;`
  number: integer("number")
    .default(sql`nextval('questnum_seq')`)
    .notNull(),
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
