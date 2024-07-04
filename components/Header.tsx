import React from "react";
import UserBadge from "./UserBadge";
import BreadCrumbs from "./BreadCrumbs";
import Link from "next/link";
import { auth } from "@/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookBookmark } from "@fortawesome/free-solid-svg-icons";

const Header = async () => {
  const session = await auth();

  if (!session?.user) return null;

  return (
    <header className="flex justify-between items-center p-4 border-mauve3 border-b">
      <nav className="flex gap-3">
        <Link href={`/`} className="text-2xl">
          <FontAwesomeIcon icon={faBookBookmark} className="text-orange11" />
        </Link>
        <BreadCrumbs user={session.user} />
      </nav>
      <UserBadge user={session.user} />
    </header>
  );
};

export default Header;
