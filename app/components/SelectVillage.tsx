"use client";
import { Village } from "@/db/schema";
import Dropdown from "@/ui/Dropdown";
import {
  faCaretDown,
  faCaretUp,
  faPlus,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { faStar as favOutline } from "@fortawesome/free-regular-svg-icons";
import { faStar as favFilled } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

interface Props {
  villages: Village[];
}

export default function SelectVillage({ villages }: Props) {
  return (
    <Dropdown
      asChild
      trigger={
        <button className="flex flex-col hover:bg-mauve3 p-1 px-2 text-sm rounded-md -space-y-1">
          <FontAwesomeIcon icon={faCaretUp} />
          <FontAwesomeIcon icon={faCaretDown} />
        </button>
      }
    >
      <div className="rounded-md max-w-xs  bg-mauve2 border border-mauve4 ">
        <div className="gap-3 p-2 w-full  border-b border-mauve4  focus-within:ring ring-mauve5 flex items-center">
          <label htmlFor="search">
            <FontAwesomeIcon icon={faSearch} className="text-mauve11 text" />
          </label>
          <input
            placeholder="Search..."
            id="search"
            className="placeholder:text-mauve11 bg-transparent outline-none flex-1"
          />
        </div>
        <ul className="p-2 space-y-2 ">
          {villages?.map((village) => (
            <li key={village.id} className="justify-between flex items-center">
              <button className="p-2 rounded w-full text-left relative hover:bg-mauve4">
                {village.name}
              </button>{" "}
              <button className="absolute right-4">
                <FontAwesomeIcon icon={favOutline} />
              </button>
            </li>
          ))}
          <div className="px-1 my-2">
            <hr className="text-mauve4" />
          </div>
          <li>
            <button className="p-2 rounded w-full flex justify-between items-center hover:bg-mauve4">
              Create village <FontAwesomeIcon icon={faPlus} />
            </button>
          </li>
        </ul>
      </div>
    </Dropdown>
  );
}
