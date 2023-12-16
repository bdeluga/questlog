import { Quest, Village, quests } from "@/db/schema";
import Dropdown from "@/ui/Dropdown";
import Modal from "@/ui/Modal";
import {
  faClone,
  faDiceD20,
  faEdit,
  faEllipsisH,
  faEllipsisV,
  faFlask,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ComponentPropsWithRef, forwardRef, useState } from "react";
import removeQuest from "../../actions/removeQuestAction";
import EditActionMenu from "./EditActionMenu";

interface Props extends ComponentPropsWithRef<"div"> {
  quest: Quest;
  village: Village;
}

const QuestItem = forwardRef<HTMLDivElement, Props>(function QuestItem(
  { quest, village, ...divProps },
  ref
) {
  const [openView, setOpenView] = useState(false);

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
          {quest.title}
        </div>

        <Dropdown
          side="left"
          asChild
          trigger={
            <button className="p-1 w-8 h-8 rounded flex justify-center items-center hover:bg-mauve2 active:bg-mauve2 data-[state=open]:bg-mauve2">
              <FontAwesomeIcon icon={faEllipsisH} />
            </button>
          }
        >
          <div className="rounded-md p-2  w-48 min-w-[8rem] bg-mauve2 border border-mauve4 ">
            <ul>
              <li>
                <Modal
                  title={`${quest.title}`}
                  asChild
                  open={openView}
                  onOpenChange={setOpenView}
                  trigger={
                    <button className="p-2 flex w-full gap-4 items-center justify-between rounded hover:bg-mauve3">
                      Open <FontAwesomeIcon icon={faClone} />
                    </button>
                  }
                >
                  <div className="mt-4 text-mauve11 ">{quest.description}</div>
                </Modal>
              </li>
              <EditActionMenu quest={quest} village={village!} />
              <li>
                <form action={removeQuest.bind(null, quest.id)}>
                  <button className="p-2 flex w-full gap-4 justify-between items-center rounded hover:bg-mauve3">
                    Delete task <FontAwesomeIcon icon={faTrash} />
                  </button>
                </form>
              </li>
            </ul>
          </div>
        </Dropdown>
      </h1>
      <div className="mt-4">
        {quest.mercenaryId ? (
          `Mercenary: ${quest.mercenaryId}`
        ) : (
          <div className="flex items-center gap-1  p-1 pl-0 w-max">
            <button className="overflow-hidden rounded-full bg-mauve2 aspect-square w-8 h-8">
              ?
            </button>
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
