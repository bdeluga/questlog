import NextAuth from "next-auth";
import { env } from "~/env.mjs";
import GithubProvider from "next-auth/providers/github";
const handler = NextAuth({
  providers: [
    GithubProvider({
      clientId: env.GITHUB_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
    }),
    //...more providers
  ],
  pages: {
    signIn: "/sign-in",
    newUser: "/dashboard",
  },
});

export { handler as GET, handler as POST };
