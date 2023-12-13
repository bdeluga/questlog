import { Quest } from "@/db/schema";
import Modal from "@/ui/Modal";
import {
  faDiceD20,
  faEdit,
  faEllipsisV,
  faFlask,
  faListDots,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  ComponentPropsWithRef,
  DetailedHTMLProps,
  HTMLAttributes,
  LegacyRef,
  forwardRef,
  useState,
} from "react";

interface Props extends ComponentPropsWithRef<"div"> {
  quest: Quest;
}

const QuestItem = forwardRef<HTMLDivElement, Props>(function QuestItem(
  { quest, ...divProps },
  ref
) {
  const [open, setOpen] = useState(false);

  return (
    <div ref={ref} {...divProps}>
      <h1 className="flex w-full text-lg justify-between items-center ">
        <Modal
          title={`${quest.title}`}
          asChild
          open={open}
          onOpenChange={setOpen}
          trigger={<button className="hover:underline">{quest.title}</button>}
        >
          <div className="mt-4 text-mauve11">{quest.description}</div>
        </Modal>
        <button className="">
          <FontAwesomeIcon icon={faEllipsisV} />
        </button>
      </h1>

      <div className="mt-4">
        {quest.mercenaryId ? (
          `Mercenary: ${quest.mercenaryId}`
        ) : (
          <div className="flex items-center gap-1  p-1 pl-0 w-max">
            <button className="overflow-hidden rounded-full bg-mauve2 aspect-square w-8 h-8">
              ?
            </button>
            <button
              className="text-sm flex gap-2 bg-mauve3 rounded p-2 items-center"
              onClick={() => setOpen(true)}
            >
              Hire mercenary
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
        )}
      </div>
      <div className="mt-4 flex justify-between">
        <span>
          Status: <u className="underline-offset-2">{quest.state}</u>
        </span>
        <div className="flex flex-col gap-1 items-center text-red8">
          <div className="flex gap-0.5 items-center">
            <FontAwesomeIcon icon={faDiceD20} />
            {quest.difficulty}
          </div>
          <div className="flex gap-0.5 items-center text-plum8">
            <FontAwesomeIcon icon={faFlask} />
            {quest.rewardExp}
          </div>
        </div>
      </div>
    </div>
  );
});

export default QuestItem;
