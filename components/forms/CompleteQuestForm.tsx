"use client";
import removeVillageAction from "@/app/actions/removeVillageAction";
import useToast from "@/app/hooks/useToast";
import Submit from "./Submit";
import completeQuestAction from "@/app/actions/completeQuestAction";
import { Quest } from "@/db/schema";

export default function CompleteQuestForm({
  quest,
  onSuccess,
}: {
  quest: Quest;
  onSuccess: () => void;
}) {
  const toast = useToast();
  const clientAction = async () => {
    const result = await completeQuestAction(quest);
    if (result?.error) {
      toast.notify({
        title: "Something went wrong",
        description: result.error,
        variant: "danger",
      });
    } else {
      toast.notify({
        title: "Success",
        description: "Quest completed",
        variant: "success",
      });
      onSuccess();
    }
  };

  return (
    <form action={clientAction}>
      <Submit className="text-plum11 disabled:pointer-events-none  hover:bg-plum7 border-2 border-plum8 bg-plum6  inline-flex h-9 items-center justify-center rounded px-4  leading-none outline-none ">
        Complete
      </Submit>
    </form>
  );
}
