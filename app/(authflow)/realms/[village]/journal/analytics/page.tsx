import { auth } from "@/auth";
import BarChart from "@/app/components/BarChart";
import { db } from "@/db";
import { Quest } from "@/db/schema";

interface NarrowedQuest {
  id: string;
  state: Quest["state"];
}

interface Groups {
  new: NarrowedQuest[];
  active: NarrowedQuest[];
  resolved: NarrowedQuest[];
  closed: NarrowedQuest[];
  archived: NarrowedQuest[];
}

export default async function AnalyticsPage({
  params,
}: {
  params: { village: string };
}) {
  const user = await auth();

  const data = await db.query.villages.findFirst({
    where: (villages, { eq, and }) =>
      and(
        eq(villages.name, decodeURI(params.village)),
        eq(villages.userId, user!.user!.id)
      ),
    with: {
      quests: {
        columns: {
          id: true,
          state: true,
        },
      },
    },
  });

  const groupedData = data?.quests.reduce(
    (acc: Groups, task: NarrowedQuest) => {
      acc[task.state].push(task);
      return acc;
    },
    { new: [], active: [], resolved: [], closed: [], archived: [] }
  ) ?? { new: [], active: [], resolved: [], closed: [], archived: [] };

  const totalTasks = Object.values(groupedData).flat().length;

  const stateData = Object.keys(groupedData).map((state) => ({
    state,
    percentage: Math.round(
      (groupedData[state as keyof typeof groupedData].length / totalTasks) * 100
    ),
  }));
  return (
    <div className="flex flex-1 flex-col">
      <div className="flex items-center text-2xl  p-10 text-mauve10">
        <h1 className="">Proportional Distribution of Quests to Total value</h1>
        <span className="ml-auto">Total quests: {totalTasks}</span>
      </div>
      <BarChart data={stateData} />
    </div>
  );
}
