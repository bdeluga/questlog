"use client";
import {
  faEllipsisV,
  faPlus,
  faUser,
  faUserMinus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChangeEvent, useState } from "react";
import useSWR from "swr";
import debounce from "lodash.debounce";
import { User } from "@/db/schema";
import Image from "next/image";
import Dropdown from "@/ui/Dropdown";
import SocialLoading from "./SocialLoading";
export default function Social() {
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const fetcher = (url: string) =>
    fetch(url)
      .then((res) => res.json())
      .then(({ data }) => data);

  const { data: mercenaries, isLoading } = useSWR(
    `api/users?search=${debouncedSearch}`,
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
    <div className="flex flex-col h-full justify-start ">
      <div className="flex items-center justify-between text-lg gap-1">
        <h1>Tavern</h1>
        <button>
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>
      <div className="gap-3 p-2 w-full mt-4  border-b border-mauve4 rounded  focus-within:ring ring-mauve5 flex items-center">
        <label htmlFor="search">
          <FontAwesomeIcon icon={faUser} className="text-mauve11 text" />
        </label>
        <input
          placeholder="Search..."
          id="search"
          className="placeholder:text-mauve11 bg-transparent outline-none flex-1"
          onChange={handleDebounce}
        />
      </div>
      {isLoading ? (
        <SocialLoading />
      ) : (
        <ul className="p-2 space-y-2 max-h-[36rem] overflow-y-auto">
          {mercenaries?.map((mercenary: User) => (
            <li
              key={mercenary.id}
              className="justify-between flex items-center"
            >
              <div className="p-2 rounded w-full text-left relative hover:bg-mauve4 flex justify-between">
                <div className="flex items-center gap-1">
                  <Image
                    alt="User avatar"
                    width={32}
                    height={32}
                    src={mercenary.image!}
                    className="rounded-full"
                  />
                  <span>{mercenary.name}</span>
                </div>
                <Dropdown
                  side="bottom"
                  asChild
                  trigger={
                    <button className="p-1 w-8 h-8 rounded flex justify-center items-center hover:bg-mauve2 active:bg-mauve2 data-[state=open]:bg-mauve3">
                      <FontAwesomeIcon icon={faEllipsisV} />
                    </button>
                  }
                >
                  <div className="rounded-md p-2  w-48 min-w-[8rem] bg-mauve3 border -translate-x-10 border-mauve4 ">
                    <ul>
                      <li>
                        <form action={""}>
                          <button className="p-2 flex w-full gap-4 justify-between items-center rounded hover:bg-mauve4">
                            Exile mercenary
                            <FontAwesomeIcon icon={faUserMinus} />
                          </button>
                        </form>
                      </li>
                    </ul>
                  </div>
                </Dropdown>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
