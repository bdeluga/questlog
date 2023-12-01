import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    GITHUB_ID: z.string(),
    GITHUB_CLIENT_SECRET: z.string(),
    NEXTAUTH_SECRET: z.string(),
    JWT_SECRET: z.string(),
  },

  experimental__runtimeEnv: {
    GITHUB_ID: process.env.GITHUB_ID,
    GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    JWT_SECRET: process.env.JWT_SECRET,
  },
});
