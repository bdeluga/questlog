import React from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

interface Props {
  trigger: React.ReactNode;
  children: React.ReactNode;
  asChild: boolean;
  side?: "bottom" | "top" | "right" | "left";
}

export default function Dropdown({ trigger, children, asChild, side }: Props) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild={asChild}>{trigger}</DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          side={side}
          className="rounded w-full animate-slideUpAndFade"
          sideOffset={10}
        >
          {children}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
