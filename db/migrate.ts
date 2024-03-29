import { migrate } from "drizzle-orm/vercel-postgres/migrator";
import { drizzle } from "drizzle-orm/vercel-postgres";
import { sql } from "@vercel/postgres";
import "dotenv/config";
const runMigrate = async () => {
  if (!process.env.POSTGRES_URL) {
    throw new Error("DATABASE_URL is not defined");
  }

  const db = drizzle(sql);

  console.log("⏳ Running migrations...");

  const start = Date.now();

  await migrate(db, { migrationsFolder: "drizzle" });

  const end = Date.now();

  console.log(`✅ Migrations completed in ${end - start}ms`);

  process.exit(0);
};

runMigrate().catch((err) => {
  console.error("❌ Migration failed");
  process.exit(1);
});
