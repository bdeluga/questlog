"use client";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";

interface Props {
  children: React.ReactNode;
  trigger: React.ReactNode;
  side?: "top" | "left" | "bottom" | "right";
}

export default function Tooltip({ children, trigger, side }: Props) {
  return (
    <TooltipPrimitive.Provider>
      <TooltipPrimitive.Root delayDuration={250}>
        <TooltipPrimitive.Trigger asChild>{trigger}</TooltipPrimitive.Trigger>
        <TooltipPrimitive.Content
          side={side}
          className="data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade will-change-[transform,opacity]"
          sideOffset={5}
        >
          {children}
        </TooltipPrimitive.Content>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
}
