import Link from "next/link";
import React from "react";
import UserBadge from "@/app/components/UserBadge";
import { auth } from "@/app/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookJournalWhills,
  faCaretDown,
  faCaretUp,
} from "@fortawesome/free-solid-svg-icons";

async function MainFlowLayout({ children }: { children: React.ReactElement }) {
  const user = await auth();

  const selectedProject = false || "Village #1";

  return (
    <>
      <header className="flex justify-between items-center p-4 border-mauve3 border-b">
        {user?.user ? (
          <>
            <nav className="flex items-center gap-3 h-full ">
              <Link href={"/dashboard"} className="text-4xl">
                <FontAwesomeIcon
                  icon={faBookJournalWhills}
                  className="text-orange11"
                />
              </Link>

              <div className="w-0.5 rounded-md py-4 bg-mauve3 rotate-12" />
              <div className="flex items-center gap-1 text-xl">
                <div>{selectedProject}</div>
                <button className="flex flex-col hover:bg-mauve3 p-1 px-2 text-sm rounded-md -space-y-1">
                  <FontAwesomeIcon icon={faCaretUp} />
                  <FontAwesomeIcon icon={faCaretDown} />
                </button>
              </div>
            </nav>
            <UserBadge user={user.user} />
          </>
        ) : (
          <>
            <Link href={"/"} className="text-4xl">
              <FontAwesomeIcon
                icon={faBookJournalWhills}
                className="text-orange11"
              />
            </Link>
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
          </>
        )}
      </header>
      {children}
    </>
  );
}

export default MainFlowLayout;
