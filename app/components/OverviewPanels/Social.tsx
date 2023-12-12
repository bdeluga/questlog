import { faPlus, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Social() {
  const mercenaries = [];

  return (
    <div className="flex flex-col h-full justify-start">
      <div className="flex items-center justify-between text-lg gap-1">
        <h1>Tavern</h1>
        <button>
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>
      <div className="gap-3 p-2 w-full mt-4  border-b border-mauve4 rounded  focus-within:ring ring-mauve5 flex items-center">
        <label htmlFor="search">
          <FontAwesomeIcon icon={faUser} className="text-mauve11 text" />
        </label>
        <input
          placeholder="Search..."
          id="search"
          className="placeholder:text-mauve11 bg-transparent outline-none flex-1"
        />
      </div>
      <ul className="p-2 space-y-2 ">
        {/* {mercenaries?.map((mercenary) => (
          <li key={mercenary.id} className="justify-between flex items-center">
            <button className="p-2 rounded w-full text-left relative hover:bg-mauve4">
              {mercenary.name}
            </button>{" "}
          </li>
        ))} */}
      </ul>
    </div>
  );
}
