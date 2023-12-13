"use client";
import NoticeBoard from "@/app/components/NoticeBoard";
import NoticeBoardFallback from "@/app/components/NoticeBoardFallback";
import { useVillageStore } from "@/app/store/villageStore";
import { Quest } from "@/db/schema";
import Modal from "@/ui/Modal";
import { QuestMap } from "@/utils/reorder";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import useSWR from "swr";
export default function JournalPage() {
  const selectedVillage = useVillageStore((slice) => slice.selectedVillage);
  const getTasks = () =>
    fetch(`/api/quest?village=${selectedVillage?.id}`)
      .then((res) => res.json())
      .then((tasks) =>
        tasks.reduce(
          (acc: QuestMap, task: Quest) => {
            acc[task.state].push(task);
            return acc;
          },
          { new: [], active: [], resolved: [], closed: [] }
        )
      );
  const { data, isLoading } = useSWR(
    `/api/quests?uid=${selectedVillage?.id}`,
    getTasks
  );

  return (
    <div className="flex-1 flex flex-col">
      <Modal
        asChild
        trigger={
          <button className="inline-flex w-fit gap-2 items-center px-4 py-2 rounded bg-mauve3 m-2">
            Add new Quest <FontAwesomeIcon icon={faPlus} />
          </button>
        }
        title="Add new Quest"
      >
        costam
      </Modal>
      {isLoading ? (
        <NoticeBoardFallback />
      ) : (
        <NoticeBoard
          headers={["new", "active", "resolved", "closed"]}
          tasks={data}
        />
      )}
    </div>
  );
}
