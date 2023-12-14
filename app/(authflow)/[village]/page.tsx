import Enchantments from "@/app/components/OverviewPanels/Enchantments";
import Level from "@/app/components/OverviewPanels/Level";
import Quests from "@/app/components/OverviewPanels/Quests";
import Realms from "@/app/components/OverviewPanels/Realms";
import Social from "@/app/components/OverviewPanels/Social";
import { db } from "@/db";
import React from "react";

export default async function Dashboard({
  params,
}: {
  params: { village: string };
}) {
  const data = await db.query.villages.findFirst({
    where: (villages, { eq }) => eq(villages.name, decodeURI(params.village)),
    with: {
      quests: true,
    },
  });

  return (
    <div className="grid grid-cols-5 grid-rows-5 gap-4 flex-1 p-4">
      <div className="col-span-2 row-span-5 border border-mauve4 bg-mauve2 rounded-2xl p-4">
        <Quests />
      </div>
      <div className="col-span-2 row-span-2 col-start-3 border border-mauve4 bg-mauve2 rounded-2xl p-4">
        <Realms />
      </div>
      <div className="col-span-2 row-span-3 col-start-3 row-start-3 border border-mauve4 bg-mauve2 rounded-2xl p-4">
        <Enchantments />
      </div>
      <div className="col-start-5 row-start-1 border border-mauve4 bg-mauve2 rounded-2xl p-4">
        <Level village={data!} />
      </div>
      <div className="row-span-4 col-start-5 row-start-2 border border-mauve4 bg-mauve2 rounded-2xl p-4">
        <Social />
      </div>
    </div>
  );
}
