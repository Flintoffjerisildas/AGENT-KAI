import React from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={() => {
        // debug log
        try {
          // eslint-disable-next-line no-console
          console.debug('[ThemeToggle] clicked — current theme', theme);
        } catch (e) {}
        toggleTheme();
      }}
      className="p-2 rounded-xl border shadow-sm bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-yellow-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
    >
      {theme === "light" ? (
        <Moon size={20} />
      ) : (
        <Sun size={20} className="text-yellow-300" />
      )}
    </button>
  );
}
