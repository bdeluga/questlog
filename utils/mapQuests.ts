import { NotArchivedQuest, Quest } from "@/db/schema";
import { QuestMap } from "./reorder";

export default function mapQuests(quests: NotArchivedQuest[]) {
  return (
    quests.reduce(
      (acc: QuestMap, task: NotArchivedQuest) => {
        acc[task.state].push(task);
        return acc;
      },
      { new: [], active: [], resolved: [], closed: [] }
    ) ?? { new: [], active: [], resolved: [], closed: [] }
  );
}
