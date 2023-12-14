import NoticeBoard from "@/app/components/NoticeBoard";
import { db } from "@/db";
import { Quest } from "@/db/schema";
import Modal from "@/ui/Modal";
import { QuestMap } from "@/utils/reorder";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
export default async function JournalPage({
  params,
}: {
  params: { village: string };
}) {
  const data = await db.query.villages
    .findFirst({
      where: (villages, { eq }) => eq(villages.name, params.village),
      with: {
        quests: true,
      },
    })
    .then(
      (res) =>
        res?.quests.reduce(
          (acc: QuestMap, task: Quest) => {
            acc[task.state].push(task);
            return acc;
          },
          { new: [], active: [], resolved: [], closed: [] }
        ) ?? { new: [], active: [], resolved: [], closed: [] }
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
      <NoticeBoard
        headers={["new", "active", "resolved", "closed"]}
        tasks={data}
      />
    </div>
  );
}
