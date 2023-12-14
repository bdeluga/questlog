import JournalNav from "@/app/components/JournalNav";
import React, { Suspense } from "react";
import Loading from "./loading";

export default async function JournalLayout({
  children,
}: {
  children: React.ReactElement;
}) {
  return (
    <div className=" flex-1 flex">
      <div className="border-r border-mauve4 max-w-xs w-full">
        <JournalNav />
      </div>
      <Suspense fallback={<Loading />}>{children}</Suspense>
    </div>
  );
}
