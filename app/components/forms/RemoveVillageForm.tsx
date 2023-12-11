"use client";
import removeVillageAction from "@/app/actions/removeVillageAction";
import useToast from "@/app/hooks/useToast";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function RemoveVillageForm({
  villageId,
  onSuccess,
}: {
  villageId: string;
  onSuccess: () => void;
}) {
  const toast = useToast();
  const clientAction = async () => {
    await removeVillageAction(villageId)
      .then(() => {
        toast.notify({
          title: "Success",
          description: "Village successfully deleted.",
          variant: "success",
        });
        onSuccess();
      })
      .catch((err) => {
        toast.notify({
          title: "Something went wrong deleting village",
          description: (err as { message: string }).message.split("Error: ")[1],
          variant: "danger",
        });
      });
  };

  return (
    <form action={clientAction}>
      <button className="text-red11  hover:bg-red7 border-2 border-red8 bg-red6  inline-flex h-9 items-center justify-center rounded px-4  leading-none outline-none ">
        Yes, delete village
      </button>
    </form>
  );
}
