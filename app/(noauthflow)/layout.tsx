import Link from "next/link";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookBookmark } from "@fortawesome/free-solid-svg-icons";

export default async function NoAuthLayout({
  children,
}: {
  children: React.ReactElement;
}) {
  return (
    <>
      <header className="flex justify-between items-center p-4 border-mauve3 border-b">
        <Link href={"/"} className="text-2xl">
          <FontAwesomeIcon icon={faBookBookmark} className="text-orange11" />
          <span className="ml-1">Questlog</span>
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
      </header>
      {children}
    </>
  );
}
