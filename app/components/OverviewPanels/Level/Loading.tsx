export default function Loading() {
  return (
    <div className="flex flex-col h-full justify-between animate-pulse">
      <div className="flex justify-between items-baseline text-lg">
        Level
        <div className="bg-mauve6 w-10 h-6 rounded-md" />
      </div>
      <div className="flex font-light flex-1 h-full flex-col items-center justify-end gap-1.5">
        <label className="self-start">Current progress</label>
        <div className="bg-mauve6 w-full px-4 h-6 rounded-full" />
      </div>
    </div>
  );
}
