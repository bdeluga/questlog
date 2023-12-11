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
import { faStar as favOutline } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import Modal from "@/ui/Modal";

import AddVillageForm from "./forms/AddVillageForm";
import RemoveVillageForm from "./forms/RemoveVillageForm";

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
  const [open, setOpen] = useState(false);
  const handleSuccess = (village: Village) => {
    setOpen(false);
  };

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
              <li
                key={village.id}
                className="justify-between flex items-center"
              >
                <button className="p-2 peer rounded w-full text-left relative hover:bg-mauve4">
                  {village.name}
                </button>
                <RemoveVillageForm villageId={village.id} />
              </li>
            ))}
            <div className="px-1 my-2">
              <hr className="text-mauve4" />
            </div>
            <li>
              <Modal
                open={open}
                onOpenChange={setOpen}
                asChild
                title="Create new village"
                description="Add another village, and switch between them any time"
                trigger={
                  <button className="p-2 rounded w-full flex justify-between items-center hover:bg-mauve4">
                    Create village <FontAwesomeIcon icon={faPlus} />
                  </button>
                }
              >
                <AddVillageForm userId={userId} onSuccess={handleSuccess} />
              </Modal>
            </li>
          </ul>
        </div>
      </Dropdown>
    </div>
  );
}
