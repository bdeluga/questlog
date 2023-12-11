"use client";
import { Village } from "@/db/schema";
import Dropdown from "@/ui/Dropdown";
import {
  faCaretDown,
  faCaretUp,
  faPlus,
  faSearch,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import Modal from "@/ui/Modal";
import AddVillageForm from "../forms/AddVillageForm";
import VillagesListElement from "./VillagesListElement";
import AddVillageModal from "./AddVillageModal";

interface Props {
  villages: Village[];
  activeVillage: Village;
  userId: string;
}

export default function SelectVillage({
  villages,
  activeVillage,
  userId,
}: Props) {
  const [selectedVillage, setSelectedVillage] =
    useState<Village>(activeVillage);

  const handleOnClick = (village: Village) => setSelectedVillage(village);

  //

  return (
    <div className="flex items-center gap-1 text-xl">
      <div>{selectedVillage.name}</div>
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
              <VillagesListElement
                handleClick={handleOnClick}
                key={village.id}
                village={village}
                selectedVillage={selectedVillage.id}
                userId={userId}
              />
            ))}
            <div className="px-1 my-2">
              <hr className="text-mauve4" />
            </div>
            <li>
              <AddVillageModal userId={userId} />
            </li>
          </ul>
        </div>
      </Dropdown>
    </div>
  );
}
