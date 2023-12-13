import { QuestMap, reorderTasks } from "@/utils/reorder";
import { useEffect, useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
  resetServerContext,
} from "react-beautiful-dnd";
import QuestItem from "./QuestItem";

export default function NoticeBoard({
  tasks,
  headers,
}: {
  tasks: QuestMap;
  headers: string[];
}) {
  resetServerContext();

  const [userTasks, setUserTasks] = useState(tasks);

  useEffect(() => {
    setUserTasks(tasks);
  }, [tasks]);

  const onDragEnd = (result: DropResult) => {
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
            {/* Render columns for each key in initialTasks */}
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
                                  className="bg-white p-4 rounded mb-2 bg-mauve4 "
                                />
                              )}
                            </Draggable>
                          )
                        )}
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
