import {
  faDoorClosed,
  faDoorOpen,
  faSignsPost,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="flex flex-1 w-full items-center justify-center flex-col gap-10">
      <FontAwesomeIcon icon={faSignsPost} className=" text-mauve9 text-9xl" />
      <span className="text-mauve9 text-9xl font-bold">End of the road</span>
      <p className="text-2xl">
        Hello <span className="text-orange10">Wanderer</span> you probably see
        this because you&apos;ve reached end of the map, or I didn&apos;t
        impelemt something.
      </p>
      <Link
        href={"./"}
        className="bg-mauve9 relative max-w-xs w-full group p-2 rounded flex items-center gap-1"
      >
        Consider leaving through this door.
        <FontAwesomeIcon
          icon={faDoorClosed}
          className="group-hover:invisible absolute right-4 visible"
        />
        <FontAwesomeIcon
          icon={faDoorOpen}
          className="group-hover:visible absolute right-4 invisible"
        />
      </Link>
    </div>
  );
}
