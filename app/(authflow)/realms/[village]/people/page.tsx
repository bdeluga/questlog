"use client";

import { User } from "@/db/schema";
import { faAdd, faEllipsisV, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import debounce from "lodash.debounce";
import { ChangeEvent, useState } from "react";
import useSWR from "swr";
import Image from "next/image";
import Dropdown from "@/ui/Dropdown";
import RemoveMercenary from "@/app/components/OverviewPanels/Social/RemoveMercenary";
import AddUserForm from "@/app/components/forms/AddMercenaryForm";
export default function PeoplePage({
  params,
}: {
  params: { village: string };
}) {
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const fetcher = (url: string) =>
    fetch(url)
      .then((res) => res.json())
      .then(({ data }) => data);

  const { data: mercenaries, isLoading } = useSWR<User[]>(
    `/api/mercenaries?village=${decodeURI(
      params.village
    )}&search=${debouncedSearch}`,
    fetcher,
    {
      revalidateOnFocus: false,
    }
  );

  const handleDebounce = debounce(
    (e: ChangeEvent<HTMLInputElement>) => setDebouncedSearch(e.target.value),
    500
  );

  return (
    <div className="p-4 flex-1 flex flex-col max-w-4xl w-full mx-auto">
      <div className="flex items-center mt-4 gap-4">
        <div className="gap-3 p-2 w-full  bg-mauve3 border rounded border-mauve4  mx-auto focus-within:ring ring-mauve5 flex items-center">
          <label htmlFor="search">
            <FontAwesomeIcon icon={faUser} className="text-mauve11 text" />
          </label>
          <input
            placeholder="Find mercenaries..."
            id="search"
            className="placeholder:text-mauve11 bg-transparent outline-none flex-1"
            onChange={handleDebounce}
          />
        </div>
        <div className="flex items-center justify-center w-10 h-10 rounded-md bg-mauve12 text-mauve1">
          <AddUserForm
            mercenaries={mercenaries ?? []}
            village={params.village}
          />
        </div>
      </div>
      <div className="grid grid-flow-col-dense gap-4 mt-10 ">
        {mercenaries?.map((mercenary) => (
          <div
            key={mercenary.id}
            className="bg-mauve3 border  p-2 rounded-md flex justify-between border-mauve4"
          >
            <div className="flex items-center gap-2">
              <button className="relative p-4 overflow-hidden rounded-full">
                <Image
                  alt="User avatar"
                  sizes="100%"
                  fill
                  src={"/default.svg"}
                />
              </button>{" "}
              {mercenary.name}
            </div>
            <Dropdown
              side="bottom"
              trigger={
                <button className="p-1 w-8 h-8 rounded flex justify-center items-center hover:bg-mauve2 active:bg-mauve2 data-[state=open]:bg-mauve3">
                  <FontAwesomeIcon icon={faEllipsisV} />
                </button>
              }
              items={[
                {
                  id: "remove",
                  element: (
                    <RemoveMercenary
                      villageName={decodeURI(params.village)}
                      mercenaryId={mercenary.id}
                    />
                  ),
                },
              ]}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
