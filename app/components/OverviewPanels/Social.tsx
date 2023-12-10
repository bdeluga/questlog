import { faPlus, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Social() {
  const mercenaries = [];

  return (
    <div className="flex flex-col h-full justify-start">
      <div className="flex items-baseline text-lg gap-1">Tavern</div>
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
        {mercenaries?.map((mercenary) => (
          <li key={mercenary.id} className="justify-between flex items-center">
            <button className="p-2 rounded w-full text-left relative hover:bg-mauve4">
              {mercenary.name}
            </button>{" "}
          </li>
        ))}
        {!!mercenaries.length && (
          <div className="px-1 my-2">
            <hr className="text-mauve4" />
          </div>
        )}
        <li>
          <button className="p-2 rounded w-full flex justify-between items-center hover:bg-mauve4">
            Add mercenary <FontAwesomeIcon icon={faPlus} />
          </button>
        </li>
      </ul>
    </div>
  );
}
