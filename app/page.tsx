import {
  faNoteSticky,
  faChartSimple,
  faMountainCity,
  faTornado,
  faPuzzlePiece,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Home() {
  return (
    <div className="w-full p-12">
      <h1 className="text-6xl font-bold">
        Welcome to<span className="text-orange10"> Questlog</span>
      </h1>
      <p className="text-2xl font-bold text-mauve11 mt-2">
        Empower Your Team, Complete Quests!
      </p>
      <div className="flex mt-10 text-mauve max-w-xl">
        <ul className="grid gap-4">
          <li>
            <div className="border p-4 rounded border-mauve4 flex flex-col h-full">
              <p className="font-bold text-xl">
                Management with a Twist <FontAwesomeIcon icon={faTornado} />
              </p>
              <p className="text-mauve11">
                Effortlessly create, edit, and delete projects. Assign tasks,
                set deadlines, and prioritize with ease.
              </p>
            </div>
          </li>

          <li>
            <div className="border p-4 rounded border-mauve4 flex flex-col h-full">
              <p className="font-bold text-xl">
                Task Management Made Fun{" "}
                <FontAwesomeIcon icon={faPuzzlePiece} />
              </p>
              <p className="text-mauve11">
                Create, edit, and delete tasks within projects. Assign tasks to
                team members, set due dates, and track progress.
              </p>
            </div>
          </li>
          <li>
            <div className="border p-4 rounded border-mauve4 flex flex-col h-full">
              <p className="font-bold text-xl">
                City Building Element <FontAwesomeIcon icon={faMountainCity} />
              </p>
              <p className="text-mauve11">
                Witness the growth of your city as your team accomplishes tasks.
                Each completed task contributes to the development and expansion
                of your virtual city.
              </p>
            </div>
          </li>
          <li>
            <div className="border p-4 rounded border-mauve4 flex flex-col h-full">
              <p className="font-bold text-xl">
                Progress Tracking <FontAwesomeIcon icon={faChartSimple} />
              </p>
              <p className="text-mauve11">
                Stay informed with real-time statistics, charts, and reports.
                Track your team&apos;s achievements and project milestones
                effortlessly.
              </p>
            </div>
          </li>
          <li>
            <div className="border p-4 rounded border-mauve4 flex flex-col h-full">
              <p className="font-bold text-xl">
                Notifications and Reminders{" "}
                <FontAwesomeIcon icon={faNoteSticky} />
              </p>
              <p className="text-mauve11">
                Never miss a deadline again! TaskCity keeps you in the loop with
                timely notifications and reminders.
              </p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
