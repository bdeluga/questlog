"use client";

export default function Loading() {
  return (
    <div className="w-full h-full animate-pulse p-4">
      <div className="w-[250px] h-8 bg-mauve4 rounded " />
      <div className=" overflow-hidden  rounded-md flex-1 mt-4 ">
        <div className="h-8 w-full bg-mauve4 mb-4" />
        <div className="space-y-4 ">
          {[...Array(9)].map((_, idx) => (
            <div key={idx} className="w-full h-12  bg-mauve4 " />
          ))}
        </div>
      </div>
      <div className="h-12 w-full bg-mauve4 mt-4" />
    </div>
  );
}
