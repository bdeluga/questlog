"use client";

import { User } from "next-auth";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC, Fragment } from "react";

const BreadCrumbs: FC<{ user: User }> = ({ user }) => {
  const pathname = usePathname();
  const segments = pathname.split("/").slice(1);
  return (
    <ul className="flex gap-3 items-center">
      {segments.map((segment, idx) => {
        const isLastSegment = idx === segments.length - 1;
        return (
          <Fragment key={segment}>
            {isLastSegment ? (
              <li
                role="separator"
                className="w-0.5 rounded-md py-4 bg-mauve3 rotate-12"
              />
            ) : null}
            <Link href={segment}>{segment}</Link>
          </Fragment>
        );
      })}
    </ul>
  );
};

export default BreadCrumbs;
