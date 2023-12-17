"use client";

import { Quest, Village } from "@/db/schema";
import Modal from "@/ui/Modal";
import {
  faDiceD20,
  faEdit,
  faExclamationCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { produce } from "immer";
import calculateExp from "@/utils/calculateExp";
import useToast from "@/app/hooks/useToast";
import { ZodFormattedError, z } from "zod";
import updateQuestAction from "@/app/actions/updateQuestAction";
interface Props {
  quest: Quest;
  village: Village;
}
export default function EditMenuItem({ quest, village }: Props) {
  const [editedQuest, setEditedQuest] = useState(quest);
  const [open, setOpen] = useState(false);
  const handleCanel = (value: boolean) => {
    if (value === false) {
      setEditedQuest(quest);
    }
    setOpen(value);
  };

  const toast = useToast();

  const QuestSchema = z
    .object({
      title: z.string().trim().min(1, "This field is required"),
      difficulty: z.string().min(1, "This field is required."),
    })
    .passthrough();

  const [formError, setFormError] = useState<ZodFormattedError<
    z.infer<typeof QuestSchema>
  > | null>(null);
  const clientAction = async () => {
    const response = QuestSchema.safeParse(editedQuest);
    if (!response.success) {
      setFormError(response.error.format());
    } else {
      await updateQuestAction(editedQuest)
        .then(() => {
          toast.notify({
            title: "Success",
            description: "Quest story successfully updated",
            variant: "success",
          });
          setOpen(false);
        })
        .catch((err) => {
          toast.notify({
            title: "Error",
            description: (err as { message: string }).message.split(
              "Error: "
            )[1],
            variant: "danger",
          });
        });
    }
  };

  const handleClearError = (property: keyof z.infer<typeof QuestSchema>) => {
    const updatedObject = { ...formError };

    delete updatedObject[property];

    // @ts-expect-error it's fine shh...
    setFormError(updatedObject);
  };
  return (
    <li>
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
          <fieldset className="space-y-4 w-full">
            <div className="flex gap-4">
              <div className="basis-7/12">
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
              <div className="basis-5/12">
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
            </div>
            <div>
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                className={`w-full resize-none min-h-[200px] p-2 rounded-md mt-1 focus:ring  ring-mauve5 bg-mauve4 `}
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
            <div className="flex gap-4">
              <div className="basis-8/12">
                <label htmlFor="mercenary" className="text-mauve10">
                  Mercenary
                </label>
                <input
                  id="mercenary"
                  disabled
                  className={`w-full p-2 rounded-md mt-1 focus:ring disabled:opacity-50 disabled:pointer-events-none ring-mauve5 bg-mauve4 `}
                  name="mercenary"
                />
              </div>
              <div className="basis-4/12">
                <label htmlFor="exp">Experiance</label>
                <input
                  id="exp"
                  readOnly
                  //workaround for action not reading disabled values
                  tabIndex={-1}
                  className={`w-full p-2 pointer-events-none rounded-md mt-1 focus:ring   ring-mauve5 bg-mauve4 `}
                  name="rewardExp"
                  value={
                    Number(editedQuest.difficulty) > 0
                      ? calculateExp(
                          village.expNeeded,
                          village.level,
                          Number(editedQuest.difficulty)
                        )
                      : ""
                  }
                />
              </div>
            </div>
          </fieldset>
          <div className="w-full mt-8 flex justify-end gap-4">
            <button
              type="button"
              onClick={() => handleCanel(false)}
              className="py-1 px-2 border rounded border-mauve12 hover:bg-mauve12 hover:text-mauve1 duration-150"
            >
              Cancel
            </button>
            <button className="py-1 px-2  border-grass9 rounded bg-grass8 hover:bg-grass9 text-mauve1 duration-150">
              Save changes
            </button>
          </div>
        </form>
      </Modal>
    </li>
  );
}