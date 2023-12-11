"use client";
import useToast from "@/app/hooks/useToast";
import * as ToastPrimitive from "@radix-ui/react-toast";

export default function Toast() {
  const { toast, remove } = useToast();

  const titleColor = {
    info: "text-mauve12",
    success: "text-grass10",
    danger: "text-red10",
  };

  return (
    <>
      <ToastPrimitive.Root
        open={!!toast}
        onOpenChange={remove}
        className="bg-mauve4  text-red rounded-md p-4 flex flex-col  data-[state=open]:animate-slideIn data-[state=closed]:animate-hide"
      >
        <ToastPrimitive.Title
          className={` ${
            titleColor[toast?.variant as keyof typeof titleColor]
          } [grid-area:_title] mb-[5px] font-bold text-slate12 text-[15px]`}
        >
          {toast?.title}
        </ToastPrimitive.Title>
        <ToastPrimitive.Description className="text-mauve11 text-sm">
          {toast?.description}
        </ToastPrimitive.Description>
        {/* <ToastPrimitive.Action
          className="[grid-area:_action]"
          asChild
          altText="Goto schedule to undo"
        >
          <button className="inline-flex items-center justify-center rounded font-medium text-xs px-[10px] leading-[25px] h-[25px] bg-green2 text-green11 shadow-[inset_0_0_0_1px] shadow-green7 hover:shadow-[inset_0_0_0_1px] hover:shadow-green8 focus:shadow-[0_0_0_2px] focus:shadow-green8">
            Undo
          </button>
        </ToastPrimitive.Action> */}
      </ToastPrimitive.Root>
      <ToastPrimitive.Viewport className="fixed bottom-0 right-0 flex flex-col p-6 gap-2 w-96 max-w-screen-sm m-0 list-none z-[2147483647] outline-none" />
    </>
  );
}
