"use client";
import removeMercenary from "@/app/actions/removeMercernary";
import useToast from "@/app/hooks/useToast";
import { Mercenary, Village } from "@/db/schema";
import { faUserMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSWRConfig } from "swr";

export default function RemoveMercenary({
  villageName,
  mercenaryId,
}: {
  villageName: Village["name"];
  mercenaryId: Mercenary["userId"];
}) {
  const toast = useToast();

  const { mutate, cache } = useSWRConfig();

  const revalidate = () => {
    const pattern = new RegExp(`api\/mercenaries`);
    for (const item of cache.keys()) {
      if (pattern.test(item)) {
        mutate(item);
      }
    }
  };

  const clientAction = async () => {
    const response = await removeMercenary(mercenaryId, villageName);
    if (response?.error) {
      toast.notify({
        title: "Error",
        description: response.error,
        variant: "danger",
      });
    } else {
      toast.notify({
        title: "Success",
        description: "Mercenary succesfully removed",
        variant: "success",
      });
      revalidate();
    }
  };

  return (
    <form action={clientAction}>
      <button className="p-2 flex w-full gap-4 justify-between items-center rounded hover:bg-mauve4">
        Exile mercenary
        <FontAwesomeIcon icon={faUserMinus} />
      </button>
    </form>
  );
}
