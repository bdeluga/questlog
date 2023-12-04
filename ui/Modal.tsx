"use client";

import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as Dialog from "@radix-ui/react-dialog";

interface Props {
  trigger: React.ReactNode;
  title: string;
  description?: string;
  children: React.ReactNode;
  asChild: boolean;
  open?: boolean;
  onOpenChange?: (value: boolean) => void;
}

export default function Modal({
  trigger,
  title,
  description,
  children,
  asChild,
  open,
  onOpenChange,
}: Props) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Trigger asChild={asChild}>{trigger}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 data-[state=open]:animate-overlayShow bg-mauve1/75" />
        <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-md bg-mauve3 p-6">
          <div className="flex items-center justify-between w-full">
            <Dialog.Title className="text-mauve12 text-xl">
              {title}
            </Dialog.Title>
            <Dialog.Close asChild>
              <button className="text-mauve12 p-2" aria-label="Close">
                <FontAwesomeIcon icon={faClose} />
              </button>
            </Dialog.Close>
          </div>
          <Dialog.Description className="text-mauve11 mt-1 mb-2">
            {description}
          </Dialog.Description>
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
