"use client";
import { Village } from "@/db/schema";
import ProgressBar from "@/ui/ProgressBar";
import { faFire } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useSWR from "swr";
import Loading from "./Loading";
export default function Level({ village }: { village: Village["name"] }) {
  const fetcher = (url: string) =>
    fetch(url)
      .then((res) => res.json())
      .then(({ data }) => data);

  const { data: villageInfo, isLoading } = useSWR(
    `api/village/level?village=${village}`,
    fetcher,
    {
      revalidateOnFocus: false,
    }
  );

  if (isLoading) return <Loading />;

  return (
    <div className="flex flex-col h-full justify-between">
      <div className="flex justify-between items-baseline text-lg">
        Level
        <div className="flex items-center gap-1 bg-mauve3 w-fit px-2  rounded-md">
          <FontAwesomeIcon icon={faFire} className="text-orange11" />
          <span>{villageInfo?.level ?? "0"}</span>
        </div>
      </div>
      <div className="flex font-light flex-1 h-full flex-col items-center justify-end gap-1.5">
        <label className="self-start">Current progress</label>
        <ProgressBar
          progress={villageInfo?.exp ?? 1}
          progressNeeded={villageInfo?.expNeeded ?? 1}
        />
      </div>
    </div>
  );
}
