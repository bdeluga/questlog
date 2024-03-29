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
import QuestItem from "../QuestItem/QuestItem";
import mapQuests from "@/utils/mapQuests";
import { NotArchivedQuest, Quest, Village } from "@/db/schema";
import useSWRMutation from "swr/mutation";
import updateState from "@/app/actions/updateState";
import Tooltip from "@/ui/Tooltip";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

export default function NoticeBoard({
  data,
  headers,
}: {
  data: Village & { quests: NotArchivedQuest[] };
  headers: string[];
}) {
  //ssr fix
  resetServerContext();

  const [userTasks, setUserTasks] = useState(mapQuests(data.quests));

  const { trigger, isMutating } = useSWRMutation("/api/quest", updateState);

  //useFootgun
  useEffect(() => {
    setUserTasks(mapQuests(data.quests));
  }, [data.quests]);

  const onDragEnd = async (result: DropResult) => {
    const source = result?.source;
    const destination = result?.destination;
    const questId = result.draggableId;
    if (!destination) {
      return;
    }
    const columnDestination = destination.droppableId as Quest["state"];

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

    trigger({ questId, metaData: { state: columnDestination } });
    setUserTasks(reorderedTasks);
  };

  return (
    <>
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
                                    quest={quest as any}
                                    village={data}
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
      {isMutating && (
        <Tooltip
          side="right"
          trigger={
            <button className="absolute bottom-2 left-2 animate-spin">
              <FontAwesomeIcon icon={faSpinner} />
            </button>
          }
        >
          <span className="p-2 bg-mauve3 rounded-md">{`We are handling request in background, don't mind us!`}</span>
        </Tooltip>
      )}
    </>
  );
}
