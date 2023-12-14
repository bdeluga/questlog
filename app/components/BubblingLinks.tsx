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
    { label: "Realm Connections", href: `/${village}/integrations` },
    { label: "Enchantment Forge", href: `/${village}/settings` },
    { label: "Mercenaries", href: `/${village}/people` },
    { label: "Village", href: `/${village}/village` },
  ];

  return (
    <nav className="space-x-6 p-4 border-b border-mauve3">
      {subroutes.map(({ label, href }) => (
        <Link
          key={label}
          href={href}
          className={`relative p-2 ${
            href === pathname ? "" : "hover:bg-mauve4"
          } rounded text-sm`}
        >
          {label}
          {href === pathname && (
            <motion.span
              layoutId="bubble"
              initial={false}
              className="absolute inset-0  bg-mauve6  mix-blend-difference"
              style={{ borderRadius: "4px" }}
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
        </Link>
      ))}
    </nav>
  );
}
