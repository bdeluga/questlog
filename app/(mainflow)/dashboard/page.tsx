import { auth } from "@/app/auth";
import VillageFormMenu from "@/app/components/forms/VillageFormMenu";
import { db } from "@/db";
import Modal from "@/ui/Modal";
import {
  faChevronDown,
  faDungeon,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { redirect } from "next/navigation";
import React from "react";

export default async function Dashboard() {
  const guilds: string[] = [];

  const user = await auth();

  const villages = await db.query.villages.findMany({
    where: (villages, { eq }) => eq(villages.userId, user!.user!.id),
  });

  return (
    <div className="flex flex-1 justify-center flex-col items-center">
      {!!guilds && villages.length > 0 && (
        <>
          <div className="max-w-5xl w-full flex items-center gap-4">
            <div className="bg-mauve3 gap-3 p-2 w-full rounded-md border border-mauve4 focus-within:ring ring-mauve5 flex items-center">
              <label htmlFor="search">
                <FontAwesomeIcon
                  icon={faSearch}
                  className="text-mauve11 text"
                />
              </label>
              <input
                placeholder="Search..."
                id="search"
                className="placeholder:text-mauve11 bg-transparent outline-none flex-1"
              />
            </div>
            <button className="p-2 border flex gap-4 items-center text-mauve1 bg-mauve12 hover:bg-mauve11 duration-200 whitespace-nowrap h-full rounded-md">
              Add New... <FontAwesomeIcon icon={faChevronDown} />
            </button>
          </div>
          <div className="flex flex-col gap-10 mt-20 text-mauve10">
            <FontAwesomeIcon icon={faDungeon} className="text-9xl " />
            <p className="text-2xl">
              There is no active guild looking for quests.{" "}
              <Modal
                asChild
                trigger={
                  <button className="underline text-orange11">Make one</button>
                }
                title="Add Guild"
                description="Craft your guild here. Hit create when you're finished."
              >
                <form className="mt-4">
                  <label htmlFor="guild">Name</label>
                  <input
                    id="guild"
                    className="w-full p-2 rounded-md mt-1 focus:ring ring-mauve5 bg-mauve4"
                    placeholder="e.g. Backend crawlers"
                  />
                  <div className="flex justify-end">
                    <button className="border active:scale-105  rounded-md border-orange11 hover:text-mauve1 duration-200 hover:bg-orange11 px-4 py-2 mt-4">
                      Create
                    </button>
                  </div>
                </form>
              </Modal>
            </p>
          </div>
        </>
      )}
    </div>
  );
}
