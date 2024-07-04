"use client";

import { faPlus, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSearchParams } from "next/navigation";
import React, { useRef } from "react";
import debounce from "lodash.debounce";
import { useFormStatus } from "react-dom";
const SearchInput = () => {
  const searchParams = useSearchParams();

  const formRef = useRef<HTMLFormElement | null>(null);

  const handleSearch = debounce(() => formRef.current?.requestSubmit(), 550);

  return (
    <form
      ref={formRef}
      method="GET"
      action={(e) => console.log(Object.fromEntries(e))}
    >
      <div className="flex items-center mt-4 gap-4">
        <div className="gap-3 p-2 w-full bg-mauve3 border rounded border-mauve4 focus-within:ring ring-mauve5 flex items-center">
          <label htmlFor="search">
            <FontAwesomeIcon icon={faSearch} className="text-mauve11 text" />
          </label>
          <input
            placeholder="Search realms..."
            defaultValue={searchParams.get("q") || ""}
            onChange={handleSearch}
            id="search"
            name="q"
            className="placeholder:text-mauve11 bg-transparent outline-none flex-1"
          />
          <input
            type="hidden"
            name="sort"
            defaultValue={searchParams.getAll("sort") || "name"}
          />
          <input
            type="hidden"
            name="view"
            defaultValue={searchParams.get("view") || "list"}
          />
        </div>
        <button
          type="button"
          onClick={handleSearch}
          className="flex items-center justify-center w-10 h-10 rounded-md bg-mauve12 text-mauve1"
        >
          <FontAwesomeIcon icon={faPlus} />
        </button>
        <Elo />
      </div>
    </form>
  );
};

export default SearchInput;

const Elo = () => {
  const { pending } = useFormStatus();

  console.log(pending);

  return null;
};
