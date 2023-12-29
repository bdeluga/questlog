"use client";

import { Quest, User, Village } from "@/db/schema";
import Modal from "@/ui/Modal";
import {
  faClose,
  faDiceD20,
  faEdit,
  faExclamationCircle,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChangeEvent, useState } from "react";
import { produce } from "immer";
import useToast from "@/app/hooks/useToast";
import { ZodFormattedError, z } from "zod";
import updateQuestAction from "@/app/actions/updateQuestAction";
import Submit from "../forms/Submit";
import useSWR from "swr";
import debounce from "lodash.debounce";
import Image from "next/image";
interface Props {
  quest: Quest & { mercenary: { id: string; name: string } | null };
  village: Village;
}
export default function EditMenuItem({ quest, village }: Props) {
  const [editedQuest, setEditedQuest] = useState(quest);
  const [open, setOpen] = useState(false);
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const handleCanel = (value: boolean) => {
    if (value === false) {
      setEditedQuest(quest);
    }
    setOpen(value);
  };

  const toast = useToast();

  const fetcher = (url: string) =>
    fetch(url)
      .then((res) => res.json())
      .then(({ data }) => data);

  const { data: mercenaries, isLoading } = useSWR(
    `/api/mercenaries?village=${decodeURI(
      village.name
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
  console.log(editedQuest);

  const QuestSchema = z.object({
    title: z
      .string()
      .trim()
      .min(1, "This field is required")
      .max(50, "New title should be at most 50 characters long"),
    difficulty: z.coerce
      .number()
      .min(1, "This field is required")
      .max(10, "New difficulty should be a number between 1 and 10"),
    description: z
      .string()
      .max(255, "New description should be at most 255 characters")
      .optional(),
  });

  const [formError, setFormError] = useState<ZodFormattedError<
    z.infer<typeof QuestSchema>
  > | null>(null);
  const clientAction = async () => {
    const response = QuestSchema.safeParse(editedQuest);
    if (!response.success) {
      setFormError(response.error.format());
    } else {
      const response = await updateQuestAction(editedQuest);
      if (response?.error) {
        toast.notify({
          title: "Error",
          description: response.error,
          variant: "danger",
        });
      } else {
        toast.notify({
          title: "Success",
          description: "Quest story successfully updated",
          variant: "success",
        });
        setOpen(false);
      }
    }
  };

  console.log(mercenaries);
  const handleClearError = (property: keyof z.infer<typeof QuestSchema>) => {
    const updatedObject = { ...formError };

    delete updatedObject[property];

    // @ts-expect-error it's fine shh...
    setFormError(updatedObject);
  };
  return (
    <Modal
      title={`Edit #${editedQuest.number}`}
      asChild
      open={open}
      onOpenChange={handleCanel}
      trigger={
        <button className="p-2 flex w-full gap-4 items-center justify-between rounded hover:bg-mauve3">
          Edit <FontAwesomeIcon icon={faEdit} />
        </button>
      }
    >
      <form className="mt-4" action={clientAction}>
        <fieldset className="space-y-2 w-full relative">
          <div>
            <label htmlFor="title">Title</label>
            <input
              id="title"
              className={`w-full peer p-2 rounded-md mt-1 focus:ring  ring-mauve5 bg-mauve4 `}
              name="title"
              value={editedQuest.title}
              onChange={(e) =>
                setEditedQuest(
                  produce((draft) => {
                    draft.title = e.target.value;
                  })
                )
              }
              onFocus={() => handleClearError("title")}
            />
            <span
              className={`text-red9 text-sm ${
                formError?.title ? "visible" : "invisible"
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
              type="number"
              value={editedQuest.difficulty}
              onChange={(e) =>
                setEditedQuest(
                  produce((draft) => {
                    draft.difficulty = e.target.value;
                  })
                )
              }
              onFocus={() => handleClearError("difficulty")}
            />
            <span
              className={`text-red9 text-sm ${
                formError?.difficulty ? "visible" : "invisible"
              }`}
            >
              <FontAwesomeIcon icon={faExclamationCircle} />{" "}
              {formError?.difficulty?._errors.map((err) => err)}
            </span>
          </div>
          <div>
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              className={`w-full resize-none h-24 p-2 rounded-md mt-1 focus:ring  ring-mauve5 bg-mauve4 `}
              name="description"
              value={editedQuest.description}
              onChange={(e) =>
                setEditedQuest(
                  produce((draft) => {
                    draft.description = e.target.value;
                  })
                )
              }
            />
            <span
              className={`text-red9 text-sm ${
                formError?.description ? "visible" : "invisible"
              }`}
            >
              <FontAwesomeIcon icon={faExclamationCircle} />{" "}
              {formError?.description?._errors.map((err) => err)}
            </span>
          </div>
          <div>
            <label htmlFor="description" className="text-mauve10">
              Equipment
            </label>
            <textarea
              disabled
              className={`w-full resize-none min-h-[100px] p-2 rounded-md mt-1 focus:ring disabled:opacity-50 disabled:pointer-events-none ring-mauve5 bg-mauve4 `}
              value={"No equipment for this quest"}
            />
          </div>
          {editedQuest.mercenary ? (
            <div>
              <label htmlFor="mercenary">
                Mercenary <FontAwesomeIcon icon={faUser} />
              </label>
              <input
                disabled
                readOnly
                id="mercenary"
                value={editedQuest.mercenary.name}
                className="w-full p-2 rounded-md bg-mauve4 mt-1 relative peer hover:bg-mauve6"
                onChange={handleDebounce}
              />
              <button
                type="button"
                onClick={() =>
                  setEditedQuest(
                    produce((draft) => {
                      draft.mercenary = null;
                    })
                  )
                }
                className="absolute right-2 bottom-2 peer-hover:visible invisible  hover:visible"
              >
                <FontAwesomeIcon icon={faClose} />
              </button>
            </div>
          ) : (
            <>
              {debouncedSearch.length > 0 && (
                <ul className=" space-y-2 max-h-[10rem] p-2 h-full overflow-y-auto bg-mauve4 border-2 border-mauve5 rounded absolute w-full translate-y-20">
                  {mercenaries?.map(
                    (mercenary: { id: string; name: string }) => (
                      <li
                        key={mercenary.id}
                        className="justify-between flex items-center"
                      >
                        <button
                          type="button"
                          onClick={() => {
                            setEditedQuest(
                              produce((draft) => {
                                draft.mercenary = mercenary;
                              })
                            );
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
                    )
                  )}
                </ul>
              )}
              <div>
                <label htmlFor="mercenary">
                  Mercenary <FontAwesomeIcon icon={faUser} />
                </label>
                <input
                  id="mercenary"
                  className={`w-full p-2 rounded-md mt-1 focus:ring disabled:opacity-50 disabled:pointer-events-none ring-mauve5 bg-mauve4 `}
                  name="mercenary"
                  onChange={handleDebounce}
                />
              </div>
            </>
          )}
        </fieldset>
        <div className="w-full mt-8 flex justify-end gap-4">
          <button
            type="button"
            onClick={() => handleCanel(false)}
            className="py-1 px-2 border rounded border-mauve12 hover:bg-mauve12 hover:text-mauve1 duration-150"
          >
            Cancel
          </button>
          <Submit className="py-1 px-2 disabled:pointer-events-none  border-grass9 rounded bg-grass8 hover:bg-grass9 text-mauve1 duration-150">
            Save changes
          </Submit>
        </div>
      </form>
    </Modal>
  );
}
