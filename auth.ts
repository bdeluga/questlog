import GitHub from "next-auth/providers/github";
import { env } from "./env.mjs";

import NextAuth from "next-auth";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GitHub({
      clientId: env.AUTH_GITHUB_ID,
      clientSecret: env.AUTH_GITHUB_SECRET,
      authorization: { params: { scope: "read:user,user:email,repo" } },
    }),
  ],
  pages: {
    signIn: "/sign-in",
  },

  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith("/realms");
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL("/realms", nextUrl));
      }
      return true;
    },
  },
});
