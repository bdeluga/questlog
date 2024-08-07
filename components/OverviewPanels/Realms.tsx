import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Realms() {
  return (
    <div className="flex flex-col h-full justify-start outline p-2">
      <div className="flex items-center justify-between text-lg gap-1">
        <h1>Active Realms</h1>
        <button>
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>
      <div className="flex-1 flex justify-center items-center">
        <span className="text-mauve11 text-lg">
          No active realms, try openning one.
        </span>
      </div>
    </div>
  );
}
