"use client";
import addQuestAction from "@/app/actions/addQuestAction";
import useToast from "@/app/hooks/useToast";
import calculateQuestExperience from "@/utils/calculateExp";
import {
  faDiceD20,
  faExclamationCircle,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { ZodFormattedError, z } from "zod";
interface Props {
  villagLevel: number;
  expNeeded: number;
  villageName: string;
  onSuccess?: () => void;
}

export default function AddQuestForm({
  villagLevel,
  expNeeded,
  villageName,
  onSuccess,
}: Props) {
  const [difficulty, setDifficulty] = useState("");

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
  const clientAction = async (formData: FormData) => {
    const newQuest = Object.fromEntries(formData.entries());

    const response = QuestSchema.safeParse(newQuest);

    if (!response.success) {
      setFormError(response.error.format());
    } else {
      await addQuestAction(formData, villageName)
        .then(() => {
          toast.notify({
            title: "Success",
            description: "Village added",
            variant: "success",
          });
          onSuccess?.();
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
    <form className="mt-8 gap-10" action={clientAction}>
      <div className="flex items-center gap-4 ">
        <fieldset className="space-y-4 w-full">
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
                formError?.title ? "visible" : "invisible"
              }`}
            >
              <FontAwesomeIcon icon={faExclamationCircle} />{" "}
              {formError?.title?._errors.map((err) => err)}
            </span>
          </div>
          <div>
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              className={`w-full resize-none min-h-[200px] p-2 rounded-md mt-1 focus:ring  ring-mauve5 bg-mauve4 `}
              placeholder="Adventurer there is this one dragon..."
              name="description"
            />
          </div>
          <div>
            <label htmlFor="mercenary" className="text-mauve10">
              Mercenary
            </label>
            <input
              id="mercenary"
              disabled
              className={`w-full p-2 rounded-md mt-1 focus:ring disabled:opacity-50 disabled:pointer-events-none ring-mauve5 bg-mauve4 `}
              placeholder="e.g. Bard the Bowman"
              name="mercenary"
            />
          </div>
        </fieldset>
        <fieldset className="space-y-4 w-full">
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
                formError?.difficulty ? "visible" : "invisible"
              }`}
            >
              <FontAwesomeIcon icon={faExclamationCircle} />{" "}
              {formError?.difficulty?._errors.map((err) => err)}
            </span>
          </div>
          <div>
            <label htmlFor="description" className="text-mauve10">
              Equipment
            </label>
            <textarea
              disabled
              className={`w-full resize-none min-h-[200px] p-2 rounded-md mt-1 focus:ring disabled:opacity-50 disabled:pointer-events-none ring-mauve5 bg-mauve4 `}
              placeholder="Equip mercenary with items needed for quest, perhaps a map ?"
            />
          </div>
          <div>
            <label htmlFor="exp">
              Experiance{" "}
              <sup>
                <FontAwesomeIcon icon={faInfoCircle} />
              </sup>
            </label>
            <input
              id="exp"
              readOnly
              //workaround for action not reading disabled values
              tabIndex={-1}
              className={`w-full p-2 pointer-events-none rounded-md mt-1 focus:ring opacity-50  ring-mauve5 bg-mauve4 `}
              name="rewardExp"
              value={
                Number(difficulty) > 0
                  ? calculateQuestExperience(
                      expNeeded,
                      villagLevel,
                      Number(difficulty)
                    )
                  : ""
              }
            />
          </div>
        </fieldset>
      </div>
      <button className="border active:scale-105 w-full rounded-md border-orange11 hover:text-mauve1 duration-200 hover:bg-orange11 px-4 py-2 mt-10">
        Add
      </button>
    </form>
  );
}
function ZodFormattedError<T>(arg0: null) {
  throw new Error("Function not implemented.");
}
