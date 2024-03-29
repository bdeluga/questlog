import type { Config } from "drizzle-kit";
import "dotenv/config";
export default {
  schema: "db/schema.ts",
  out: "./drizzle",
  driver: "pg",
  dbCredentials: {
    connectionString: `${process.env.POSTGRES_URL!}?sslmode=require`,
  },
} satisfies Config;
