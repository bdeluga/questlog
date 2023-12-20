"use client";
import addQuestAction from "@/app/actions/addQuestAction";
import useToast from "@/app/hooks/useToast";
import Tooltip from "@/ui/Tooltip";
import calculateExp from "@/utils/calculateExp";
import {
  faDiceD20,
  faExclamationCircle,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { ZodFormattedError, z } from "zod";
interface Props {
  villageName: string;
  onSuccess?: () => void;
}

export default function AddQuestForm({ villageName, onSuccess }: Props) {
  const [difficulty, setDifficulty] = useState("");

  const toast = useToast();

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
  });

  const [formError, setFormError] = useState<ZodFormattedError<
    z.infer<typeof QuestSchema>
  > | null>(null);
  const clientAction = async (formData: FormData) => {
    const newQuest = Object.fromEntries(formData.entries());

    const response = QuestSchema.safeParse(newQuest);

    if (!response.success) {
      setFormError(response.error.format());
    } else {
      const response = await addQuestAction(formData, villageName);
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
            formError?.description ? "visible" : "invisible"
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
      <button className="border active:scale-105 w-full rounded-md border-orange11 hover:text-mauve1 duration-200 hover:bg-orange11 px-4 py-2 mt-10">
        Add
      </button>
    </form>
  );
}
function ZodFormattedError<T>(arg0: null) {
  throw new Error("Function not implemented.");
}
