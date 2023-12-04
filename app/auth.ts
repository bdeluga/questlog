import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { env } from "@/env.mjs";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq, or } from "drizzle-orm";
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
          where: (users) =>
            or(eq(users.id, user.id), eq(users.providerId, user.id)),
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
        token.id = existingUser?.id;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
});
