"use client";
import { QuestMap, reorderTasks } from "@/utils/reorder";
import { useEffect, useMemo, useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
  resetServerContext,
} from "react-beautiful-dnd";
import QuestItem from "../QuestItem";
import mapQuests from "@/utils/mapQuests";
import { Quest } from "@/db/schema";
import useSWR from "swr";

export default function NoticeBoard({
  quests,
  headers,
}: {
  quests: Quest[];
  headers: string[];
}) {
  resetServerContext();

  const [userTasks, setUserTasks] = useState(mapQuests(quests));

  const fetcher = (
    taskNumber: string,
    metaData: { state: string; index: unknown }
  ) =>
    fetch("/api/quest", {
      method: "POST",
      body: JSON.stringify({ taskNumber, metaData }),
    });

  //TODO

  //useFootgun
  useEffect(() => {
    setUserTasks(mapQuests(quests));
  }, [quests]);

  const onDragEnd = async (result: DropResult) => {
    const source = result?.source;
    const destination = result?.destination;

    if (!destination) {
      return;
    }

    // did not move anywhere - can bail early
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    const reorderedTasks = reorderTasks({
      tasks: userTasks,
      source,
      destination,
    });

    setUserTasks(reorderedTasks);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="taskboard" type="COLUMN" direction="horizontal">
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="grid grid-cols-4 h-full divide-x"
          >
            {headers.map((key) => {
              return (
                <div key={key} className="border-mauve4 flex-1 flex flex-col">
                  <h2 className="text-xl text-center bg-mauve2 capitalize p-2 border-mauve4 border-y ">
                    {key}
                  </h2>
                  <Droppable droppableId={key}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={`flex-1 p-4 ${
                          snapshot.isDraggingOver &&
                          !snapshot.draggingFromThisWith
                            ? "bg-mauve3/50"
                            : ""
                        }`}
                      >
                        {userTasks[key as keyof typeof userTasks].map(
                          (quest, index) => (
                            <Draggable
                              key={quest.id}
                              draggableId={quest.id}
                              index={index}
                            >
                              {(provided) => (
                                <QuestItem
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  quest={quest}
                                />
                              )}
                            </Draggable>
                          )
                        )}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </div>
              );
            })}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
