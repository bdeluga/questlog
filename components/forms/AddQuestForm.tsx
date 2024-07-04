"use client";
import addQuestAction from "@/app/actions/addQuestAction";
import useToast from "@/app/hooks/useToast";

import {
  faClose,
  faDiceD20,
  faExclamationCircle,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChangeEvent, useState } from "react";
import { ZodFormattedError, z } from "zod";
import Submit from "./Submit";
import useSWR from "swr";
import debounce from "lodash.debounce";
import Image from "next/image";
import { User } from "@/db/schema";
interface Props {
  villageName: string;
  onSuccess?: () => void;
}

export default function AddQuestForm({ villageName, onSuccess }: Props) {
  const [difficulty, setDifficulty] = useState("");
  const [mercenary, setMercenary] = useState<User | null>(null);
  const toast = useToast();

  const [debouncedSearch, setDebouncedSearch] = useState("");

  const fetcher = (url: string) =>
    fetch(url)
      .then((res) => res.json())
      .then(({ data }) => data);

  const { data: mercenaries, isLoading } = useSWR(
    `/api/mercenaries?village=${villageName}&search=${debouncedSearch}`,
    fetcher,
    {
      revalidateOnFocus: false,
    }
  );

  const handleDebounce = debounce(
    (e: ChangeEvent<HTMLInputElement>) => setDebouncedSearch(e.target.value),
    500
  );

  const QuestSchema = z.object({
    title: z
      .string()
      .trim()
      .min(1, "This field is required")
      .max(50, "This field is too long"),
    difficulty: z.coerce
      .number()
      .min(1, "This field is required")
      .max(10, "Field's value should be a number between 1 and 10"),
    description: z
      .string()
      .max(255, "Description should be at most 255 characters")
      .optional(),
    mercenaryId: z.string().optional(),
  });

  const [formError, setFormError] = useState<ZodFormattedError<
    z.infer<typeof QuestSchema>
  > | null>(null);
  const clientAction = async (formData: FormData) => {
    const newQuest = Object.fromEntries(formData.entries());
    if (mercenary) {
      newQuest.mercenaryId = mercenary.id;
    }
    const response = QuestSchema.safeParse(newQuest);

    if (!response.success) {
      setFormError(response.error.format());
    } else {
      const response = await addQuestAction(newQuest, villageName);
      if (response?.error) {
        toast.notify({
          title: "Error",
          description: response.error,
          variant: "danger",
        });
      } else {
        toast.notify({
          title: "Success",
          description: "Quest added",
          variant: "success",
        });
        onSuccess?.();
      }
    }
  };

  const handleClearError = (property: keyof z.infer<typeof QuestSchema>) => {
    const updatedObject = { ...formError };

    delete updatedObject[property];

    // @ts-expect-error it's fine shh...
    setFormError(updatedObject);
  };

  return (
    <form className="mt-8" action={clientAction}>
      <fieldset className="space-y-4 w-full relative">
        <div>
          <label htmlFor="title">Title</label>
          <input
            id="title"
            className={`w-full peer p-2 rounded-md mt-1 focus:ring  ring-mauve5 bg-mauve4 `}
            placeholder="e.g. Defeat Smaug"
            name="title"
            onFocus={() => handleClearError("title")}
          />

          <span
            className={`text-red9 text-sm ${
              formError?.title ? "inline" : "hidden"
            }`}
          >
            <FontAwesomeIcon icon={faExclamationCircle} />{" "}
            {formError?.title?._errors.map((err) => err)}
          </span>
        </div>
        <div>
          <label htmlFor="difficulty">
            Difficulty <FontAwesomeIcon icon={faDiceD20} />
          </label>
          <input
            id="difficulty"
            className={`w-full p-2 rounded-md mt-1 focus:ring disabled:opacity-50 disabled:pointer-events-none ring-mauve5 bg-mauve4 `}
            name="difficulty"
            value={difficulty}
            type="number"
            onChange={(e) => setDifficulty(e.currentTarget.value)}
            onFocus={() => handleClearError("difficulty")}
          />
          <span
            className={`text-red9 text-sm ${
              formError?.difficulty ? "inline" : "hidden"
            }`}
          >
            <FontAwesomeIcon icon={faExclamationCircle} />{" "}
            {formError?.difficulty?._errors.map((err) => err)}
          </span>
        </div>
        <div>
          <label htmlFor="description">
            Description
            <span className="font-light text-mauve9"> (Optional)</span>
          </label>
          <textarea
            id="description"
            onFocus={() => handleClearError("description")}
            className={`w-full resize-none h-24 p-2 rounded-md mt-1 focus:ring  ring-mauve5 bg-mauve4 `}
            placeholder="Adventurer there is this one dragon..."
            name="description"
          />
        </div>
        <span
          className={`text-red9 text-sm ${
            formError?.description ? "inline" : "hidden"
          }`}
        >
          <FontAwesomeIcon icon={faExclamationCircle} />{" "}
          {formError?.description?._errors.map((err) => err)}
        </span>
        {/* <div>
          <label htmlFor="description" className="text-mauve10">
            Equipment
          </label>
          <textarea
            disabled
            className={`w-full resize-none min-h-[100px] p-2 rounded-md mt-1 focus:ring disabled:opacity-50 disabled:pointer-events-none ring-mauve5 bg-mauve4 `}
            placeholder="Equip mercenary with items needed for quest, perhaps a map ?"
          />
        </div> */}
        {mercenary ? (
          <div>
            <label htmlFor="mercenary">
              Mercenary <FontAwesomeIcon icon={faUser} />
            </label>
            <input
              disabled
              readOnly
              id="mercenart"
              value={mercenary.name!}
              className="w-full p-2 rounded-md bg-mauve4 mt-1 relative peer hover:bg-mauve6"
              onChange={handleDebounce}
            />
            <button
              type="button"
              onClick={() => setMercenary(null)}
              className="absolute right-2 bottom-2 peer-hover:visible invisible  hover:visible"
            >
              <FontAwesomeIcon icon={faClose} />
            </button>
          </div>
        ) : (
          <>
            {debouncedSearch.length > 0 && (
              <ul className=" space-y-2 max-h-[10rem] p-2 h-full overflow-y-auto bg-mauve4 border-2 border-mauve5 rounded absolute w-full translate-y-20">
                {mercenaries?.map((mercenary: User) => (
                  <li
                    key={mercenary.id}
                    className="justify-between flex items-center"
                  >
                    <button
                      type="button"
                      onClick={() => {
                        setMercenary(mercenary);
                        setDebouncedSearch("");
                      }}
                      className="p-2 rounded w-full text-left relative hover:bg-mauve7 flex justify-between"
                    >
                      <div className="flex items-center gap-1">
                        <Image
                          alt="User avatar"
                          width={32}
                          height={32}
                          src={"/default.svg"}
                          className="rounded-full"
                        />
                        <span>{mercenary.name}</span>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            )}
            <div>
              <label htmlFor="mercenary">
                Mercenary <FontAwesomeIcon icon={faUser} />
              </label>
              <input
                id="mercenary"
                className={`w-full p-2 rounded-md mt-1 focus:ring  ring-mauve5 bg-mauve4 `}
                placeholder="e.g. Bard the Bowman"
                name="mercenary"
                onChange={handleDebounce}
              />
            </div>
          </>
        )}
      </fieldset>
      <Submit className="border w-full rounded-md border-orange11 disabled:pointer-events-none hover:text-mauve1 duration-200 hover:bg-orange11 px-4 py-2 mt-10">
        Add
      </Submit>
    </form>
  );
}
