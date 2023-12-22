"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import React from "react";

export default function BubblingLinks() {
  const { village } = useParams();
  const pathname = usePathname();
  const subroutes = [
    { label: "Overview", href: `/${village}` },
    { label: "Journal", href: `/${village}/journal` },
    { label: "Mercenaries", href: `/${village}/people` },
    { label: "Village", href: `/${village}/village` },
    // { label: "Realm Connections", href: `/${village}/integrations` },
    // { label: "Enchantment Forge", href: `/${village}/settings` },
  ];

  return (
    <nav className="space-x-6 p-4 border-b border-mauve3">
      {subroutes.map(({ label, href }) => (
        <Link
          key={label}
          href={href}
          className={`relative p-2 ${
            href === pathname ? "bg-mauve4 font-bold" : "hover:bg-mauve4"
          } rounded text-sm`}
        >
          {label}
        </Link>
      ))}
    </nav>
  );
}
