"use client";
import removeVillageAction from "@/app/actions/removeVillageAction";
import useToast from "@/app/hooks/useToast";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function RemoveVillageForm({
  villageId,
}: {
  villageId: string;
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
    <form
      action={clientAction}
      className="text-mauve11 opacity-0 peer-hover:opacity-100 hover:text-mauve12 hover:opacity-100 duration-150 transition-colors  absolute right-4"
    >
      <button>
        <FontAwesomeIcon icon={faTrash} />
      </button>
    </form>
  );
}
