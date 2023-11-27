"use client";

import { DefaultSession } from "next-auth";
import { signOut } from "next-auth/react";
import Image from "next/image";
import React from "react";
function UserBadge({ user }: { user: DefaultSession }) {
  return (
    <div className="flex items-center gap-2 bg-mauve2 p-2 rounded-md">
      {user?.name}
      <button
        className="relative p-4 overflow-hidden rounded-full"
        onClick={() => signOut({ callbackUrl: "/" })}
      >
        <Image alt="User avatar" fill src={user?.image!} />
      </button>
    </div>
  );
}

export default UserBadge;
