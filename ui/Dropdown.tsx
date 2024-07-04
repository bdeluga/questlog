import React from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { cn } from "@/utils/cn";

interface Props extends DropdownMenu.DropdownMenuProps {
  trigger: React.ReactNode;
  side?: "top" | "left" | "bottom" | "right";
  className?: string;
}

export default function Dropdown({
  trigger,
  className,
  children,
  ...props
}: Props) {
  return (
    <DropdownMenu.Root {...props}>
      <DropdownMenu.Trigger asChild>{trigger}</DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          side={props.side}
          className={cn(
            "rounded data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade bg-mauve2 border border-mauve4",
            className
          )}
          sideOffset={8}
        >
          {children}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
