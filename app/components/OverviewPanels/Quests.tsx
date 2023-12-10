import {
  faFilter,
  faList,
  faPlus,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Quests() {
  const quests = [];

  return (
    <div className="flex flex-col h-full justify-start">
      <div className="flex items-center justify-between text-lg gap-1">
        <h1>Newest quests</h1>
        <div className="flex gap-4 items-center">
          <button>
            <FontAwesomeIcon icon={faFilter} />
          </button>
          <button>
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>
      </div>
      <div className="flex items-baseline gap-4">
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
      </div>
      {!quests.length && (
        <div className="flex-1 flex justify-center items-center text-mauve11 text-lg">
          No active quests, mercenaries are getting bored.
        </div>
      )}
      <ul className="p-2 space-y-2 ">
        {quests?.map((quest) => (
          <li key={quest.id} className="justify-between flex items-center">
            <button className="p-2 rounded w-full text-left relative hover:bg-mauve4">
              {quest.name}
            </button>{" "}
          </li>
        ))}
      </ul>
    </div>
  );
}
