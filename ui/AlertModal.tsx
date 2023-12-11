"use client";

import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as AlertDialog from "@radix-ui/react-alert-dialog";

interface Props {
  trigger: React.ReactNode;
  title: string;
  description?: string;
  asChild: boolean;
  open?: boolean;
  onOpenChange?: (value: boolean) => void;
  confirmAction: React.ReactNode;
}

export default function AlertModal({
  trigger,
  title,
  description,
  asChild,
  open,
  onOpenChange,
  confirmAction,
}: Props) {
  return (
    <AlertDialog.Root open={open} onOpenChange={onOpenChange}>
      <AlertDialog.Trigger asChild={asChild}>{trigger}</AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="fixed inset-0 data-[state=open]:animate-overlayShow bg-mauve1/75" />
        <AlertDialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-md bg-mauve3 p-6">
          <AlertDialog.Title className="text-mauve12 text-xl">
            {title}
          </AlertDialog.Title>

          <AlertDialog.Description className="text-mauve11 mt-1 mb-2">
            {description}
          </AlertDialog.Description>
          <div className="flex justify-end gap-[25px]">
            <AlertDialog.Cancel asChild>
              <button className="text-mauve11 bg-mauve4 hover:bg-mauve5 focus:shadow-mauve7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px]">
                Cancel
              </button>
            </AlertDialog.Cancel>
            <AlertDialog.Action asChild>{confirmAction}</AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}
