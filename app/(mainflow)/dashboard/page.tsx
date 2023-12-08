import { auth } from "@/app/auth";
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

export default async function Dashboard() {
  const guilds: string[] = [];

  const user = await auth();

  const userVillages = await db.query.villages.findMany({
    where: (villages, { eq }) => eq(villages.userId, user!.user!.id),
  });

  if (!userVillages.length) {
    return (
      <div className="grid flex-1 place-items-center">
        <form
          className="p-4 max-w-sm w-full rounded bg-mauve2 border border-mauve4"
          action={async (formData: FormData) => {
            "use server";
            const name = formData.get("name") as string;
            await db.insert(villages).values({
              userId: user!.user!.id,
              name,
            });
            revalidatePath("/dashboard");
          }}
        >
          <h1 className="text-lg">First Village</h1>
          <p className="text-mauve11">
            Create your first village, watch it grow with each{" "}
            <span className="text-orange11 underline text-lg cursor-pointer">
              Level <FontAwesomeIcon icon={faDiceD20} />
            </span>
          </p>
          <fieldset className="mt-4 flex flex-col">
            <label htmlFor="village">Name</label>
            <input
              id="village"
              className="block p-2 mt-0.5 rounded-md  focus:ring ring-mauve5 bg-mauve4"
              placeholder="My first Super Village"
              name="name"
            />
            <button className="bg-mauve12 text-mauve2 px-4 py-2 rounded-md self-end mt-4">
              Create
            </button>
          </fieldset>
        </form>
      </div>
    );
  }

  return (
    <div className="flex flex-1 p-6 justify-start flex-col items-center">
      {!!guilds && !!userVillages.length && (
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
