import {
  faFilter,
  faList,
  faPlus,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { QuestTable } from "./Table";

export default function Quests() {
  const quests = [];

  return (
    <div className="flex flex-col h-full justify-start">
      <div className="flex items-center justify-between text-lg gap-1">
        <h1>Newest quests</h1>
        <button>
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>
      {/* <div className="flex items-baseline gap-4">
        <div className="gap-3 p-2 w-full mt-4  border-b border-mauve4 rounded  focus-within:ring ring-mauve5 flex items-center">
          <label htmlFor="search">
            <FontAwesomeIcon icon={faSearch} className="text-mauve11 text" />
          </label>
          <input
            placeholder="Search..."
            id="search"
            className="placeholder:text-mauve11 bg-transparent outline-none flex-1"
          />
        </div>
      </div> */}
      {/* <QuestTable/> */}
    </div>
  );
}
