//https://codesandbox.io/p/sandbox/react-beautiful-dnd-board-base-0dv9b

import { Quest } from "@/db/schema";
import { DropResult } from "react-beautiful-dnd";

export interface Task {
  id: string;
  content: string;
}
interface AllowedStateQuest extends Quest {
  state: "new" | "resolved" | "active" | "closed";
}

export interface QuestMap {
  new: Quest[];
  active: Quest[];
  resolved: Quest[];
  closed: Quest[];
}

const reorder = (list: unknown[], startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export const reorderTasks = ({
  tasks,
  source,
  destination,
}: {
  tasks: QuestMap;
  source: DropResult["source"];
  destination: DropResult["destination"];
}) => {
  const current = [...tasks[source.droppableId as keyof typeof tasks]];
  const next = [...tasks[destination!.droppableId as keyof typeof tasks]];
  const target = current[source.index];

  // moving to same list
  if (source.droppableId === destination!.droppableId) {
    const reordered = reorder(current, source.index, destination!.index);
    const result = {
      ...tasks,
      [source.droppableId]: reordered,
    };
    return result;
  }

  // moving to different list

  // remove from original
  current.splice(source.index, 1);
  // insert into next
  next.splice(destination!.index, 0, {
    ...target,
    state: destination!.droppableId as Quest["state"],
  });

  const result = {
    ...tasks,
    [source.droppableId]: current,
    [destination!.droppableId]: next,
  };

  return result;
};
