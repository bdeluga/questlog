"use client";
import { Village } from "@/db/schema";
import Dropdown from "@/ui/Dropdown";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import VillagesListElement from "./VillagesListElement";
import AddVillageModal from "./AddVillageModal";

interface Props {
  villages: Village[];
  activeVillage: Village["name"];
  userId: string;
}

export default function SelectVillage({
  villages,
  activeVillage,
  userId,
}: Props) {
  return (
    <div className="flex items-center gap-1 text-xl">
      <div>{activeVillage}</div>
      <Dropdown
        trigger={
          <button className="flex flex-col hover:bg-mauve3 p-1 px-2 text-sm rounded-md -space-y-1">
            <FontAwesomeIcon icon={faCaretUp} />
            <FontAwesomeIcon icon={faCaretDown} />
          </button>
        }
        items={[
          {
            id: "label-1",
            element: (
              <div className="gap-3  w-full p-2 border-b border-mauve4  focus-within:ring ring-mauve5 flex items-center">
                Choose village or create new
              </div>
            ),
          },

          ...villages?.map((village) => ({
            id: village.id,
            element: (
              <VillagesListElement
                key={village.id}
                village={village}
                userId={userId}
                canDelete={village.name !== activeVillage}
              />
            ),
          })),
          {
            id: "separator-1",
            element: (
              <div className="px-1 my-2">
                <hr className="text-mauve4" />
              </div>
            ),
          },
          {
            id: "add",
            element: <AddVillageModal userId={userId} />,
          },
        ]}
      >
        <div className="rounded-md w-full bg-mauve2 border border-mauve4">
          <div className="gap-3 max-w-md w-full p-4 border-b border-mauve4  focus-within:ring ring-mauve5 flex items-center">
            Choose village or create new
          </div>

          <ul className="p-2 space-y-2 ">
            {villages?.map((village) => (
              <VillagesListElement
                key={village.id}
                village={village}
                userId={userId}
                canDelete={village.name !== activeVillage}
              />
            ))}

            <li>
              <AddVillageModal userId={userId} />
            </li>
          </ul>
        </div>
      </Dropdown>
    </div>
  );
}
