"use client";
import * as Progress from "@radix-ui/react-progress";

export default function ProgressBar({
  progress,
  progressNeeded,
}: {
  progress: number;
  progressNeeded: number;
}) {
  return (
    <>
      <Progress.Root
        className={`group overflow-hidden cursor-default h-6 w-full border-mauve4 bg-mauve3 border rounded-xl`}
        style={{
          transform: "translateZ(0)",
        }}
        value={progress}
      >
        <Progress.Indicator
          className="bg-orange11 group-hover:opacity-50 relative flex w-full h-full transition-transform duration-[660ms] ease-[cubic-bezier(0.65, 0, 0.35, 1)]"
          style={{ transform: `translateX(-${100 - progress}%)` }}
        />
        <div className="absolute opacity-0 group-hover:opacity-100 duration-150 text-orange12/50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
          {progress}/{progressNeeded}
        </div>
      </Progress.Root>
    </>
  );
}
