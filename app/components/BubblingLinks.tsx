"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function BubblingLinks() {
  const pathname = usePathname();
  const subroutes = [
    { label: "Overview", href: "/dashboard" },
    { label: "Journal", href: "/dashboard/journal" },
    { label: "Realm Connections", href: "/dashboard/integrations" },
    { label: "Enchantment Forge", href: "/dashboard/settings" },
    { label: "Mercenaries", href: "/dashboard/people" },
    { label: "Village", href: "/dashboard/village" },
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
              className="absolute inset-0 z-10 bg-mauve6  mix-blend-difference"
              style={{ borderRadius: "4px" }}
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
        </Link>
      ))}
    </nav>
  );
}
