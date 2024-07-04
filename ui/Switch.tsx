import React from "react";
import * as SwitchMenu from "@radix-ui/react-switch";

interface Props {
  id: string;
  defaultChecked: boolean;
}

export default function Switch({ id, defaultChecked }: Props) {
  return (
    <SwitchMenu.Root
      className="w-10 h-6 bg-mauve2 rounded-full border border-mauve5 data-[state=checked]:bg-mauve4 data-[state=checked]:border-mauve6 outline-none cursor-default"
      id={id}
      defaultChecked={defaultChecked}
    >
      <SwitchMenu.Thumb className="block w-4 h-4 bg-mauve11 rounded-full translate-x-1  transition-transform duration-150  will-change-transform data-[state=checked]:translate-x-5" />
    </SwitchMenu.Root>
  );
}
