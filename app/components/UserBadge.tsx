"use client";
import {
  faBell,
  faCog,
  faPlus,
  faSignOut,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DefaultSession } from "next-auth";
import { signOut } from "next-auth/react";
import Image from "next/image";
import React from "react";
import NotificationPing from "./NotificationPing";
import Dropdown from "@/ui/Dropdown";
import Link from "next/link";
import ThemeSwitch from "./ThemeSwitch";
interface Props {
  user: DefaultSession["user"];
}

export default function UserBadge({ user }: Props) {
  const notifications = false;

  return (
    <div className="flex items-center gap-2 text-mauve11">
      <button className="w-8 h-8 relative aspect-square border border-mauve4 hover:border-mauve5 rounded-full">
        <FontAwesomeIcon icon={faBell} />
        {notifications && <NotificationPing />}
      </button>
      <Dropdown
        asChild
        trigger={
          <button className="relative p-4 overflow-hidden rounded-full">
            <Image alt="User avatar" sizes="100%" fill src={user?.image!} />
          </button>
        }
      >
        <div className="rounded-md  bg-mauve2 border border-mauve4 -translate-x-4">
          <div className="border-b p-4 border-mauve4 flex gap-2 items-center mb-2">
            {user?.email}
          </div>
          <Link href={"/dashboard"} className="py-2 block px-4 hover:bg-mauve5">
            Dashboard
          </Link>
          <button className="py-2 block px-4 hover:bg-mauve5">Journal</button>
          <div className="px-4 my-2">
            <hr className="text-mauve4" />
          </div>
          <div className="py-2  px-4 flex items-center justify-between hover:bg-mauve5">
            <label htmlFor="toggle-theme">Theme</label>
            <ThemeSwitch />
          </div>
          <Link
            href={"/dashboard/settings"}
            className="py-2  px-4 flex w-full justify-between items-center hover:bg-mauve5"
          >
            Settings <FontAwesomeIcon icon={faCog} />
          </Link>

          <div className="px-4 my-2">
            <hr className="text-mauve4" />
          </div>
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="block text-left hover:bg-mauve5 w-full mb-2 py-2 px-4"
          >
            Log out
          </button>
        </div>
      </Dropdown>
    </div>
  );
}
