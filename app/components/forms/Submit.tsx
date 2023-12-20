"use client";
import { ComponentProps } from "react";
//@ts-expect-error
import { useFormStatus } from "react-dom";
export default function Submit({ ...props }: ComponentProps<"button">) {
  const { pending } = useFormStatus();

  return (
    <button {...props} aria-disabled={pending} disabled={pending}>
      {pending ? (
        <span className="flex h-7 w-7 border-4 mx-auto text-mauve5 border-b-inherit rounded-full animate-spin" />
      ) : (
        props.children
      )}
    </button>
  );
}
