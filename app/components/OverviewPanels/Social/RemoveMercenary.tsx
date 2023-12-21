import { faUserMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function RemoveMercenary() {
  return (
    <form action={""}>
      <button className="p-2 flex w-full gap-4 justify-between items-center rounded hover:bg-mauve4">
        Exile mercenary
        <FontAwesomeIcon icon={faUserMinus} />
      </button>
    </form>
  );
}
