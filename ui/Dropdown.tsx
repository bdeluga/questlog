import React from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

interface Props {
  trigger: React.ReactNode;
  children: React.ReactNode;
  asChild: boolean;
}

export default function Dropdown({ trigger, children, asChild }: Props) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild={asChild}>{trigger}</DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          side="bottom"
          className="rounded w-full max-w-sm animate-slideUpAndFade"
          sideOffset={10}
        >
          {children}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
