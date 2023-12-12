"use client";
import NoticeBoard from "@/app/components/NoticeBoard";
import { useVillageStore } from "@/app/store/villageStore";
import Modal from "@/ui/Modal";
import { TaskMap, reorderTasks } from "@/utils/reorder";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useMemo, useState } from "react";

export default function JournalPage() {
  const selectedVillage = useVillageStore((slice) => slice.selectedVillage);
  const initialTasks: TaskMap = {
    new: [
      { id: "task1", content: "Task 1" },
      // Add more tasks as needed
    ],
    active: [
      // Active tasks
    ],
    resolved: [
      { id: "task2", content: "Task 2" },
      // Add more resolved tasks as needed
    ],
    closed: [
      // Closed tasks
    ],
  };
  const headers = useMemo(() => Object.keys(initialTasks), []);

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
      <NoticeBoard headers={headers} tasks={initialTasks} />
    </div>
  );
}
