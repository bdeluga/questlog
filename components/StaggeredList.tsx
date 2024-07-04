"use client";
import {
  faNoteSticky,
  faChartSimple,
  faMountainCity,
  faTornado,
  faPuzzlePiece,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import React from "react";

export default function StaggeredList() {
  const stagger = {
    initial: { opacity: 0, x: -50 },
    animate: { opacity: 1, x: 0 },
  };

  const items = [
    {
      title: "Management with a Twist",
      icon: faTornado,
      description:
        "Effortlessly create, edit, and delete projects. Assign tasks, set deadlines, and prioritize with ease.",
    },
    {
      title: "Task Management Made Fun",
      icon: faPuzzlePiece,
      description:
        "Create, edit, and delete tasks within projects. Assign tasks to team members, set due dates, and track progress.",
    },
    {
      title: "City Building Element",
      icon: faMountainCity,
      description:
        "Witness the growth of your city as your team accomplishes tasks. Each completed task contributes to the development and expansion of your virtual city.",
    },
    {
      title: "Progress Tracking",
      icon: faChartSimple,
      description:
        "Stay informed with real-time statistics, charts, and reports. Track your team's achievements and project milestones effortlessly.",
    },
    {
      title: "Notifications and Reminders",
      icon: faNoteSticky,
      description:
        "Never miss a deadline again! TaskCity keeps you in the loop with timely notifications and reminders.",
    },
  ];

  return (
    <ul className="grid gap-4">
      {items.map((item, index) => (
        <motion.li
          key={index}
          variants={stagger}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <div className="border p-4 rounded border-mauve4 flex flex-col h-full">
            <p className="font-bold text-xl">
              {item.title} <FontAwesomeIcon icon={item.icon} />
            </p>
            <p className="text-mauve11">{item.description}</p>
          </div>
        </motion.li>
      ))}
    </ul>
  );
}
