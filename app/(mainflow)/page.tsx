import {
  faNoteSticky,
  faChartSimple,
  faMountainCity,
  faTornado,
  faPuzzlePiece,
} from "@fortawesome/free-solid-svg-icons";
import { animate } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import StaggeredList from "./components/UserBadge/StaggeredList";

export default function Home() {
  return (
    <main className="w-full p-12">
      <h1 className="text-6xl font-bold">
        Welcome to<span className="text-orange10"> Questlog</span>
      </h1>
      <p className="text-2xl font-bold text-mauve11 mt-2">
        Empower Your Team, Complete Quests!
      </p>
      <div className="flex mt-10 text-mauve max-w-xl">
        <StaggeredList />
      </div>
    </main>
  );
}
