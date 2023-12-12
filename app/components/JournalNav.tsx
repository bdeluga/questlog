"use client";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartSimple,
  faDiceD20,
  faHourglassHalf,
  faScroll,
  faTimeline,
} from "@fortawesome/free-solid-svg-icons";
import { usePathname } from "next/navigation";

export default function JournalNav() {
  const pathname = usePathname();
  return (
    <nav>
      <ul className="space-y-2 py-2">
        <li className="text-mauve11">
          <Link
            href={"./journal"}
            className={`py-2 ${
              pathname === "/dashboard/journal"
                ? "border-orange11"
                : "border-transparent"
            } px-4 flex w-full justify-between items-center border-l-4 hover:bg-mauve3 hover:border-orange11 `}
          >
            Notice Board
            <FontAwesomeIcon icon={faScroll} />
          </Link>
        </li>
        <li className="text-mauve11">
          <Link
            href={"./Quests"}
            className={`py-2 ${
              pathname === "/dashboard/quests"
                ? "border-orange11"
                : "border-transparent"
            } px-4 flex w-full justify-between items-center border-l-4 hover:bg-mauve3 hover:border-orange11 `}
          >
            Quests
            <FontAwesomeIcon icon={faDiceD20} />
          </Link>
        </li>
        <li className="text-mauve11">
          <Link
            href={"./analytics"}
            className={`py-2 ${
              pathname === "/dashboard/journal/analytics"
                ? "border-orange11"
                : "border-transparent"
            } px-4 flex w-full justify-between items-center border-l-4 hover:bg-mauve3 hover:border-orange11 `}
          >
            Insights
            <FontAwesomeIcon icon={faChartSimple} />
          </Link>
        </li>
        <li className="text-mauve11">
          <Link
            href={"./sprints"}
            className={`py-2 ${
              pathname === "/dashboard/journal/sprints"
                ? "border-orange11"
                : "border-transparent"
            } px-4 flex w-full justify-between items-center border-l-4 hover:bg-mauve3 hover:border-orange11 `}
          >
            Sprints
            <FontAwesomeIcon icon={faTimeline} />
          </Link>
        </li>
        <li className="text-mauve11">
          <Link
            href={"./retrospectives"}
            className={`py-2 ${
              pathname === "/dashboard/journal/retrospectives"
                ? "border-orange11"
                : "border-transparent"
            } px-4 flex w-full justify-between items-center border-l-4 hover:bg-mauve3 hover:border-orange11 `}
          >
            Chronicles
            <FontAwesomeIcon icon={faHourglassHalf} />
          </Link>
        </li>
      </ul>
    </nav>
  );
}
