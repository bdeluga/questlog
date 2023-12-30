import completeQuestAction from "@/app/actions/completeQuestAction";
import { Quest } from "@/db/schema";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function CompleteQuestItem({ quest }: { quest: Quest }) {
  return (
    <form action={completeQuestAction.bind(null, quest)}>
      <button className="p-2 flex w-full gap-4 justify-between outline-none items-center rounded hover:bg-mauve3">
        Complete quest <FontAwesomeIcon icon={faSave} />
      </button>
    </form>
  );
}
