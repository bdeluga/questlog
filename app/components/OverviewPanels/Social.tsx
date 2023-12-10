import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Social() {
  return (
    <div className="flex flex-col h-full justify-start">
      <div className="flex items-baseline text-lg gap-1">Tavern</div>
      <div className="gap-3 p-2 w-full mt-4  border-b border-mauve4  focus-within:ring ring-mauve5 flex items-center">
        <label htmlFor="search">
          <FontAwesomeIcon icon={faUser} className="text-mauve11 text" />
        </label>
        <input
          placeholder="Search..."
          id="search"
          className="placeholder:text-mauve11 bg-transparent outline-none flex-1"
        />
      </div>
    </div>
  );
}
