"use client";
import { User, Village } from "@/db/schema";
import Modal from "@/ui/Modal";
import { faAdd, faPlus, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import debounce from "lodash.debounce";
import { ChangeEvent, useState } from "react";
import useSWR from "swr";
import Image from "next/image";
import Submit from "./Submit";
import Tooltip from "@/ui/Tooltip";
import addMercenary from "@/app/actions/addMercenary";
import useToast from "@/app/hooks/useToast";
import { useSWRConfig } from "swr";
export default function AddUserForm({
  mercenaries,
  village,
}: {
  mercenaries: User[];
  village: Village["name"];
}) {
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const fetcher = (url: string) =>
    fetch(url)
      .then((res) => res.json())
      .then(({ data }) => data);

  const { data: users, isLoading } = useSWR(
    `/api/users?search=${debouncedSearch}`,
    fetcher,
    {
      revalidateOnFocus: false,
    }
  );

  const { cache, mutate } = useSWRConfig();

  const revalidate = () => {
    const pattern = new RegExp(`/api\/mercenaries`);
    for (const item of cache.keys()) {
      if (pattern.test(item)) {
        mutate(item);
      }
    }
  };

  const handleDebounce = debounce(
    (e: ChangeEvent<HTMLInputElement>) => setDebouncedSearch(e.target.value),
    500
  );
  const toast = useToast();

  const clientAction = async (mercenaryId: string) => {
    const result = await addMercenary(mercenaryId, village);

    if (result?.error) {
      toast.notify({
        title: "Error",
        description: result.error,
      });
    } else {
      toast.notify({
        title: "Success",
        description: "Mercenary was added to your village",
        variant: "success",
      });
      revalidate();
    }
  };
  console.log(users, mercenaries);
  return (
    <Modal
      asChild
      onOpenChange={(val) => {
        if (!val) {
          setDebouncedSearch("");
        }
      }}
      trigger={
        <button>
          <FontAwesomeIcon icon={faPlus} />
        </button>
      }
      title="Add mercenary"
      description="Populate your village with new mercenaries, and assign them quests!"
    >
      <div className="mt-4 relative">
        <label htmlFor="name">Name</label>
        <input
          id="name"
          className={`w-full p-2 rounded-md mt-1 focus:ring disabled:opacity-50 disabled:pointer-events-none ring-mauve5 bg-mauve4`}
          placeholder="e.g. Bob The Mighty"
          name="name"
          onChange={handleDebounce}
        />
        <ul
          className={`${
            !debouncedSearch.length ? "hidden" : "absolute"
          }  w-full mt-2 p-2  rounded-md bg-mauve3  border-2 border-mauve9 max-h-[400px]`}
        >
          {!!users?.length &&
            users.map((user: User) => (
              <li
                key={user.id}
                className="p-2 rounded w-full text-left items-center hover:bg-mauve4 flex justify-between"
              >
                <div className="flex items-center gap-1">
                  <Image
                    alt="User avatar"
                    width={32}
                    height={32}
                    src={"/default.svg"}
                    className="rounded-full"
                  />
                  <span>{user.name}</span>
                </div>
                {/* /already mercenary */}
                {mercenaries.some(
                  (mercenary) => user.name === mercenary.name
                ) ? (
                  <Tooltip
                    trigger={
                      <div className="bg-mauve4 rounded-md text-orange11 px-2 py-0.5 ">
                        <FontAwesomeIcon icon={faUser} />
                      </div>
                    }
                  >
                    <div className="p-2 bg-mauve3 rounded">
                      User is alredy mercenary in your village
                    </div>
                  </Tooltip>
                ) : (
                  <form action={clientAction.bind(null, user.id!)}>
                    <Submit className="border active:scale-105 disabled:pointer-events-none rounded-md border-orange11 hover:text-mauve1 duration-200 hover:bg-orange11  px-2 py-0.5 ">
                      <FontAwesomeIcon icon={faAdd} />
                    </Submit>
                  </form>
                )}
              </li>
            ))}
          {!users?.length && !isLoading && (
            <span className="text-center w-full block text-mauve11">
              No mercenaries found
            </span>
          )}
          {isLoading && (
            <span className="text-center w-full block text-mauve11">
              Fetching mercenaries...
            </span>
          )}
        </ul>
      </div>
    </Modal>
  );
}
