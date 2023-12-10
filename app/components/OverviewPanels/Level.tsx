import ProgressBar from "@/ui/ProgressBar";
import { faFire } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Level() {
  return (
    <div className="flex flex-col h-full justify-between">
      <div className="flex justify-between items-baseline text-lg">
        Level
        <div className="flex items-center gap-1 bg-mauve3 w-fit px-2  rounded-md">
          <FontAwesomeIcon icon={faFire} className="text-orange11" />
          <span> 1</span>
        </div>
      </div>
      <div className="flex font-light flex-1 h-full flex-col items-center justify-end gap-1.5">
        <label className="self-start">Current progress</label>
        <ProgressBar progress={1} progressNeeded={100} />
      </div>
    </div>
  );
}
