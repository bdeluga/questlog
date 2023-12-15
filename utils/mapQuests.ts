import { Quest } from "@/db/schema";
import { QuestMap } from "./reorder";

export default function mapQuests(quests: Quest[]) {
  return (
    quests.reduce(
      (acc: QuestMap, task: Quest) => {
        acc[task.state].push(task);
        return acc;
      },
      { new: [], active: [], resolved: [], closed: [] }
    ) ?? { new: [], active: [], resolved: [], closed: [] }
  );
}
