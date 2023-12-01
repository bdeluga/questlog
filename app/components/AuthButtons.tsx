"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function AuthButtons() {
  const path = usePathname();

  return (
    <div className="flex gap-4">
      {path === "/sign-up" ? (
        <Link
          className="rounded-lg flex justify-center items-center text-center px-3 py-1.5  border border-mauve4 bg-mauve2 hover:border-mauve5 hover:bg-mauve3"
          href={"/sign-in"}
        >
          Sign in
        </Link>
      ) : (
        <Link
          className="rounded-lg flex justify-center items-center text-center px-3 py-1.5  border border-mauve4 bg-mauve2 hover:border-mauve5 hover:bg-mauve3"
          href={"/sign-up"}
        >
          Sign up
        </Link>
      )}
    </div>
  );
}
