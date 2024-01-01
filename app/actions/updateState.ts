import { Quest } from "@/db/schema";

interface QuestMetaData {
  state: Quest["state"];
  index?: number;
}

interface functionArgs {
  questId: string;
  metaData: QuestMetaData;
}

export default async function updateState(
  url: string,
  { arg }: { arg: functionArgs }
) {
  await fetch(url, {
    method: "PUT",
    body: JSON.stringify(arg),
  });
}
