"use client";
import { useVillageStore } from "@/app/store/villageStore";
import ProgressBar from "@/ui/ProgressBar";
import { faFire } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Level() {
  const selectedVillage = useVillageStore((slice) => slice.selectedVillage);

  if (!selectedVillage)
    return (
      <div className="flex flex-col h-full justify-between animate-pulse">
        <div className="flex justify-between items-baseline text-lg">
          Level
          <div className="bg-mauve6 w-10 h-6 rounded-md" />
        </div>
        <div className="flex font-light flex-1 h-full flex-col items-center justify-end gap-1.5">
          <label className="self-start">Current progress</label>
          <div className="bg-mauve6 w-full px-4 h-6 rounded-full" />
        </div>
      </div>
    );

  console.log(selectedVillage);

  return (
    <div className="flex flex-col h-full justify-between">
      <div className="flex justify-between items-baseline text-lg">
        Level
        <div className="flex items-center gap-1 bg-mauve3 w-fit px-2  rounded-md">
          <FontAwesomeIcon icon={faFire} className="text-orange11" />
          <span>{selectedVillage?.level ?? "Inf"}</span>
        </div>
      </div>
      <div className="flex font-light flex-1 h-full flex-col items-center justify-end gap-1.5">
        <label className="self-start">Current progress</label>
        <ProgressBar
          progress={Number(selectedVillage?.exp) ?? 1}
          progressNeeded={Number(selectedVillage?.expNeeded) ?? 1}
        />
      </div>
    </div>
  );
}
