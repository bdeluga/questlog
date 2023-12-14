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
import { useParams, usePathname } from "next/navigation";

export default function JournalNav() {
  const { village } = useParams();
  const pathname = usePathname();

  const subroutes = [
    { label: "Notice Board", href: `/${village}/journal`, icon: faScroll },
    { label: "Quests", href: `/${village}/journal/quests`, icon: faDiceD20 },
    {
      label: "Insights",
      href: `/${village}/journal/analytics`,
      icon: faChartSimple,
    },
    { label: "Sprints", href: `/${village}/journal/sprints`, icon: faTimeline },
    {
      label: "Chronicles",
      href: `/${village}/journal/retrospectives`,
      icon: faHourglassHalf,
    },
  ];

  return (
    <nav className="border-l ml-2 border-mauve4  mt-4">
      {subroutes.map(({ label, href, icon }) => (
        <Link
          key={label}
          href={href}
          className={`py-2 ${
            pathname === href ? "border-orange11" : "border-transparent"
          } px-4 flex flex-1 justify-between items-center border-l hover:bg-mauve3 -ml-px  hover:border-orange11 `}
        >
          {label}
          <FontAwesomeIcon icon={icon} />
        </Link>
      ))}
    </nav>
  );
}
