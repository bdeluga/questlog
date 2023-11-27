import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { env } from "~/env.mjs";
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
});
