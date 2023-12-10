import { auth } from "@/app/auth";
import Level from "@/app/components/OverviewPanels/Level";
import Social from "@/app/components/OverviewPanels/Social";
import { db } from "@/db";
import { Village, villages } from "@/db/schema";
import Modal from "@/ui/Modal";
import {
  faChevronDown,
  faDiceD20,
  faDungeon,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { revalidatePath } from "next/cache";
import React from "react";
import css from "styled-jsx/css";

export default async function Dashboard() {
  return (
    <div className="grid grid-cols-5 grid-rows-5 gap-4 flex-1 p-4">
      <div className="col-span-2 row-span-5 border border-mauve4 bg-mauve2 rounded-2xl p-4">
        <h1 className="text-lg">Newest Quests</h1>
      </div>
      <div className="col-span-2 row-span-2 col-start-3 border border-mauve4 bg-mauve2 rounded-2xl p-4">
        Active Realms
      </div>
      <div className="col-span-2 row-span-3 col-start-3 row-start-3 border border-mauve4 bg-mauve2 rounded-2xl p-4">
        Current Enchantments
      </div>
      <div className="col-start-5 row-start-1 border border-mauve4 bg-mauve2 rounded-2xl p-4">
        <Level />
      </div>
      <div className="row-span-4 col-start-5 row-start-2 border border-mauve4 bg-mauve2 rounded-2xl p-4">
        <Social />
      </div>
    </div>
  );
}
