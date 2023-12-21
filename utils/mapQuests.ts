import { Quest } from "@/db/schema";
import { QuestMap } from "./reorder";

interface AllowedStateQuest extends Quest {
  state: "new" | "resolved" | "active" | "closed";
}

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
