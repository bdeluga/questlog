import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Enchantments() {
  return (
    <div className="flex flex-col h-full justify-start outline p-2">
      <div className="flex  text-lg gap-1">
        <h1>Latest Enchantments</h1>
      </div>
      <div className="flex-1 flex justify-center items-center">
        <span className="text-mauve11 text-lg">
          No new enchantments, try leveling your village.
        </span>
      </div>
    </div>
  );
}
