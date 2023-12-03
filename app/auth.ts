import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { env } from "@/env.mjs";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
export const {
  handlers: { GET, POST },
  auth,
} = NextAuth({
  providers: [
    GitHub({
      clientId: env.GITHUB_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
      authorization: { params: { scope: "read:user,user:email,repo" } },
    }),
  ],
  pages: { newUser: "/dashboard", signIn: "/sign-in" },
  callbacks: {
    async jwt({ user, token, trigger, account }) {
      if (trigger === "signIn") {
        const existingUser = await db.query.users.findFirst({
          where: eq(users.id, user.id),
        });
        if (!existingUser) {
          if (account?.provider) {
            await db.insert(users).values({
              email: user.email,
              image: user.image,
              name: user.name,
              provider: account.provider,
              providerId: account.providerAccountId,
            });
          } else {
            await db.insert(users).values({
              email: user.email,
              image: user.image,
              name: user.name,
            });
          }
        }
      }
      return token;
    },
  },
});
