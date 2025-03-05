'use client';

import React, { useEffect, useState } from "react";
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";

interface ThemeSwitcherProps {
  theme: string;
  toggleTheme: () => void;
}

const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ theme, toggleTheme }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <button 
      onClick={toggleTheme}
      className="p-2 rounded-full bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-500"
    >
      {/* Отрисовываем иконку только после монтирования */}
      {mounted ? (
        theme === "light" ? <MoonIcon className="w-6 h-6" /> : <SunIcon className="w-6 h-6" />
      ) : (
        <div className="w-6 h-6" /> // Заглушка, чтобы избежать ошибки Hydration
      )}
    </button>
  );
};

export default ThemeSwitcher;
