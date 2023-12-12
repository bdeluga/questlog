"use client";
import { useVillageStore } from "@/app/store/villageStore";
import Modal from "@/ui/Modal";
import { TaskMap, reorderTasks } from "@/utils/reorder";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";

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
  const [tasks, setTasks] = useState<TaskMap>(initialTasks);
  const headers = Object.keys(initialTasks);

  const onDragEnd = (result: DropResult) => {
    // dropped nowhere

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
      tasks,
      source,
      destination,
    });

    setTasks(reorderedTasks);
  };

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
                          className={`flex-1 duration-200 p-4 transition-colors  ${
                            snapshot.isDraggingOver &&
                            !snapshot.draggingFromThisWith
                              ? "bg-mauve3/50"
                              : ""
                          }`}
                        >
                          {/* Render tasks within each column */}
                          {tasks[key as keyof typeof tasks].map(
                            (task, index) => (
                              <Draggable
                                key={task.id}
                                draggableId={task.id}
                                index={index}
                              >
                                {(provided) => (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    className="bg-white p-4 rounded mb-2 bg-mauve4"
                                  >
                                    {task.content}
                                  </div>
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
    </div>
  );
}
