"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import clsx from "clsx";

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme") === "dark";
    setDark(saved);
    document.documentElement.classList.toggle("dark", saved);
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      className={clsx(
        "h-9 w-9 rounded-full flex items-center justify-center transition-all",
        "border border-gray-200 bg-white",
        "hover:bg-gray-100",
        "dark:border-gray-700 dark:bg-cardDark dark:hover:bg-gray-800"
      )}
    >
      {dark ? (
        <Moon size={16} className="text-gray-200" />
      ) : (
        <Sun size={16} className="text-gray-700" />
      )}
    </button>
  );
}
