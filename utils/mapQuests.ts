import { AllowedStateQuest, Quest } from "@/db/schema";
import { QuestMap } from "./reorder";

export default function mapQuests(quests: AllowedStateQuest[]) {
  return (
    quests.reduce(
      (acc: QuestMap, task: AllowedStateQuest) => {
        acc[task.state].push(task);
        return acc;
      },
      { new: [], active: [], resolved: [], closed: [] }
    ) ?? { new: [], active: [], resolved: [], closed: [] }
  );
}
