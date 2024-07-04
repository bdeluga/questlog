"use client";
import {
  faArrowRightFromBracket,
  faBell,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NotificationPing from "./NotificationPing";
import type { User } from "next-auth";
import type { FC } from "react";
import Dropdown from "@/ui/Dropdown";
import Image from "next/image";
import ThemeSwitch from "./ThemeSwitch";
import { signOut } from "next-auth/react";

const UserBadge: FC<{ user: User }> = ({ user }) => {
  const notifications = false;

  return (
    <div className="flex items-center gap-2 text-mauve11">
      <button className="w-8 h-8 relative aspect-square border border-mauve4 hover:border-mauve5 rounded-full">
        <FontAwesomeIcon icon={faBell} />
        {notifications && <NotificationPing />}
      </button>
      <Dropdown
        className="w-64 mr-4"
        trigger={
          <button
            type="button"
            className="relative size-8 overflow-hidden rounded-full"
          >
            <Image
              alt="User avatar"
              width={32}
              height={32}
              src={user?.image || ""}
            />
          </button>
        }
      >
        <ul className="p-2 space-y-2">
          <li className="p-2 ">{user?.name}</li>
          <li
            className="h-1 border-t border-mauve4 m-2 -ml-2"
            style={{
              width: "calc(100% + 16px)",
            }}
            role="separator"
          />

          <li className="p-2 flex items-center justify-between hover:bg-mauve5 rounded">
            <label htmlFor="toggle-theme">Theme</label>
            <ThemeSwitch />
          </li>

          <li
            className="h-1 border-t border-mauve4 m-2 -ml-2"
            style={{
              width: "calc(100% + 16px)",
            }}
            role="separator"
          />
          <li>
            <button
              className="p-2 flex w-full justify-between items-center hover:bg-mauve5 rounded"
              onClick={() => signOut()}
            >
              Log out <FontAwesomeIcon icon={faArrowRightFromBracket} />
            </button>
          </li>
        </ul>
      </Dropdown>
    </div>
  );
};
export default UserBadge;
