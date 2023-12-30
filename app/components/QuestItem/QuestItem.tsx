import { Quest, User, Village, quests } from "@/db/schema";
import Dropdown from "@/ui/Dropdown";
import {
  faDiceD20,
  faEllipsisH,
  faFlask,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ComponentPropsWithRef, forwardRef, useState } from "react";
import removeQuest from "../../actions/removeQuestAction";
import EditMenuItem from "./EditMenuItem";
import ShowMenuItem from "./ShowMenuItem";
import RemoveMenuItem from "./RemoveMenuItem";
import Image from "next/image";
import CompleteQuestItem from "./CompleteQuestItem";
interface Props extends ComponentPropsWithRef<"div"> {
  quest: Quest & { mercenary: { id: string; name: string } };
  village: Village;
}

const QuestItem = forwardRef<HTMLDivElement, Props>(function QuestItem(
  { quest, village, ...divProps },
  ref
) {
  return (
    <div
      ref={ref}
      {...divProps}
      className="relative p-2 rounded mb-2 bg-mauve4"
    >
      <h1 className="flex w-full text-lg justify-between items-center">
        <div className="flex gap-1">
          <span className="p-1 grid place-items-center  rounded bg-mauve2 text-xs">
            # {quest.number}
          </span>
          <span className="mx-1 truncate max-w-[16rem]">{quest.title}</span>
        </div>
        {quest.state === "closed" ? (
          <Dropdown
            side="left"
            trigger={
              <button className="p-1 w-8 h-8 rounded flex justify-center items-center hover:bg-mauve2 active:bg-mauve2 data-[state=open]:bg-mauve2">
                <FontAwesomeIcon icon={faEllipsisH} />
              </button>
            }
            items={[
              { id: "show", element: <ShowMenuItem quest={quest} /> },
              {
                id: "edit",
                element: <EditMenuItem quest={quest} village={village} />,
              },
              {
                id: "delete",
                element: <RemoveMenuItem quest={quest} />,
              },
              {
                id: "complete",
                element: <CompleteQuestItem quest={quest} />,
              },
            ]}
          />
        ) : (
          <Dropdown
            side="left"
            trigger={
              <button className="p-1 w-8 h-8 rounded flex justify-center items-center hover:bg-mauve2 active:bg-mauve2 data-[state=open]:bg-mauve2">
                <FontAwesomeIcon icon={faEllipsisH} />
              </button>
            }
            items={[
              { id: "show", element: <ShowMenuItem quest={quest} /> },
              {
                id: "edit",
                element: <EditMenuItem quest={quest} village={village} />,
              },
              {
                id: "delete",
                element: <RemoveMenuItem quest={quest} />,
              },
            ]}
          />
        )}
      </h1>
      <div className="mt-4">
        {quest.mercenary ? (
          <div className="p-2 rounded w-fit text-left relative text-sm bg-mauve2 flex justify-between">
            <div className="flex items-center gap-1">
              <Image
                alt="User avatar"
                width={16}
                height={16}
                src={"/default.svg"}
                className="rounded-full"
              />
              <span>{quest.mercenary.name}</span>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-1  p-1 pl-0 w-max">
            <div className="flex justify-center items-center overflow-hidden rounded-full bg-mauve2 aspect-square w-8 h-8">
              ?
            </div>
            <span className="text-sm flex gap-2 bg-mauve3 rounded p-2 items-center">
              No mercenary
            </span>
          </div>
        )}
      </div>
      <div className="mt-4 flex justify-between">
        <div className="flex gap-0.5 items-center text-red8">
          <FontAwesomeIcon icon={faDiceD20} />
          {quest.difficulty}
        </div>
        <div className="flex gap-0.5 items-center text-plum8">
          <FontAwesomeIcon icon={faFlask} />
          {quest.rewardExp}
        </div>
      </div>
    </div>
  );
});

export default QuestItem;
