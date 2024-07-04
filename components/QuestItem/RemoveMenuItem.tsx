import removeQuest from "@/app/actions/removeQuestAction";
import { Quest } from "@/db/schema";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function RemoveMenuItem({ quest }: { quest: Quest }) {
  return (
    <form action={removeQuest.bind(null, quest.id)}>
      <button className="p-2 flex w-full gap-4 justify-between outline-none items-center rounded hover:bg-mauve3">
        Delete task <FontAwesomeIcon icon={faTrash} />
      </button>
    </form>
  );
}
