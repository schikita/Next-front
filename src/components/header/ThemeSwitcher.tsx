// src/components/theme/ThemeSwitcher.tsx

'use client'; // Чтобы компонент был клиентским

import React from "react";
import { SunIcon, MoonIcon } from '@heroicons/react/24/solid';

// Типы пропсов
interface ThemeSwitcherProps {
  theme: string;
  toggleTheme: () => void;
}

const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ theme, toggleTheme }) => {
  return (
    <button 
      onClick={toggleTheme}
      className="p-2 rounded-full bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-500"
    >
      {theme === 'light' ? (
        <MoonIcon className="w-6 h-6" />
      ) : (
        <SunIcon className="w-6 h-6" />
      )}
    </button>
  );
};

export default ThemeSwitcher;
