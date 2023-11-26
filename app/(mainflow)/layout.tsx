import { getServerSession } from "next-auth";
import { signOut } from "next-auth/react";
import Link from "next/link";
import React from "react";
import UserBadge from "./components/UserBadge";

async function MainFlowLayout({ children }: { children: React.ReactElement }) {
  const user = await getServerSession();

  return (
    <>
      <header className="flex justify-end p-4 border-b border-mauve3">
        {user?.user ? (
          <UserBadge session={user} />
        ) : (
          <div className="flex gap-4">
            <Link
              className="rounded-lg flex justify-center items-center text-center px-3 py-1.5  border border-mauve4 bg-mauve2 hover:border-mauve5 hover:bg-mauve3"
              href={"/sign-in"}
            >
              Sign in
            </Link>
            <Link
              className="rounded-lg flex justify-center items-center text-center px-4 py-1.5  border border-mauve11 hover:bg-mauve12 hover:text-mauve1"
              href={"/sign-up"}
            >
              Sign up
            </Link>
          </div>
        )}
      </header>
      {children}
    </>
  );
}

export default MainFlowLayout;
