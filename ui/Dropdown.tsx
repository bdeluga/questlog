import React from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

interface Item {
  id: string;
  element: React.ReactNode;
}

interface Props extends DropdownMenu.DropdownMenuProps {
  trigger: React.ReactNode;
  items: Item[];
  side?: "top" | "left" | "bottom" | "right";
  className?: string;
}

export default function Dropdown({
  trigger,
  items,
  className,
  ...props
}: Props) {
  return (
    <DropdownMenu.Root {...props}>
      <DropdownMenu.Trigger asChild>{trigger}</DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          side={props.side}
          className={`rounded w-full  animate-slideUpAndFade bg-mauve2 border flex flex-col space-y-2 p-2 ${className} border-mauve4`}
          sideOffset={10}
        >
          {items?.map(({ id, element }) => {
            if (id.includes("separator")) {
              return (
                <DropdownMenu.Separator asChild key={id}>
                  {element}
                </DropdownMenu.Separator>
              );
            }

            if (id.includes("label")) {
              return (
                <DropdownMenu.Label asChild key={id}>
                  {element}
                </DropdownMenu.Label>
              );
            }

            return (
              <DropdownMenu.Item key={id} asChild>
                {element}
              </DropdownMenu.Item>
            );
          })}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
