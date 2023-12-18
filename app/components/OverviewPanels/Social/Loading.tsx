export default function Loading() {
  return (
    <ul className="p-2 space-y-2 ">
      {[...Array(10)]?.map((_, idx) => (
        <li key={idx} className="justify-between flex items-center">
          <button className="p-2 rounded w-full text-left relative  flex justify-between">
            <div className="flex items-center gap-1">
              <div className="h-8 w-8  bg-mauve4 rounded-full" />
              <div className="bg-mauve4 w-40 h-6" />
            </div>
            <div className="h-8 w-8  rounded bg-mauve4" />
          </button>
        </li>
      ))}
    </ul>
  );
}
