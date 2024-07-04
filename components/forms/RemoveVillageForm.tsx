"use client";
import removeVillageAction from "@/app/actions/removeVillageAction";
import useToast from "@/app/hooks/useToast";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Submit from "./Submit";

export default function RemoveVillageForm({
  villageId,
  onSuccess,
}: {
  villageId: string;
  onSuccess: () => void;
}) {
  const toast = useToast();
  const clientAction = async () => {
    const result = await removeVillageAction(villageId);
    if (result?.error) {
      toast.notify({
        title: "Something went wrong",
        description: result.error,
        variant: "danger",
      });
    } else {
      toast.notify({
        title: "Success",
        description: "Village successfully deleted.",
        variant: "success",
      });
      onSuccess();
    }
  };

  return (
    <form action={clientAction}>
      <Submit className="text-red11 disabled:pointer-events-none  hover:bg-red7 border-2 border-red8 bg-red6  inline-flex h-9 items-center justify-center rounded px-4  leading-none outline-none ">
        Yes, delete village
      </Submit>
    </form>
  );
}
