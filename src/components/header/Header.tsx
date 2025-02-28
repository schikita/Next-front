'use client'; // Для клиентского компонента

import React, { useState, useEffect } from "react";
import ThemeSwitcher from "./ThemeSwitcher"; // Импортируем компонент ThemeSwitcher
import Logo from "./Logo";
import WeatherAndCurrencies from "./WeatherAndCurrencies";
import { UserIcon } from '@heroicons/react/24/solid';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';// Импортируем иконку поиска

const Header = () => {
  const [theme, setTheme] = useState<string>('light'); // Состояние для темы

  // Проверяем, какая тема установлена при первом рендере
  useEffect(() => {
    const currentTheme = localStorage.getItem('theme') || 'light'; // Получаем тему из localStorage
    setTheme(currentTheme);
    document.documentElement.classList.toggle('dark', currentTheme === 'dark'); // Устанавливаем класс для dark темы
  }, []);

  // Переключение темы
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme); // Сохраняем тему в localStorage
    document.documentElement.classList.toggle('dark', newTheme === 'dark'); // Применяем класс dark на <html>
  };

  return (
    <header className="bg-background dark:bg-gray-800 py-4 shadow-md">
      {/* Контейнер с фиксированными отступами и выравниванием, max-width ограничивает ширину */}
      <div className="container mx-auto px-4 sm:px-6 max-w-screen-xl">
        {/* Первый ряд: Логотип, поле поиска, тема и иконка пользователя */}
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Logo />
            
            {/* Поле поиска */}
            <div className="relative">
              <input
                type="text"
                placeholder="Поиск новостей..."
                className="px-4 py-2 pl-10 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-600 dark:text-white dark:border-gray-500"
              />
              <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            </div>
          </div>

          <div className="flex items-center space-x-6">
            {/* Переключатель темы */}
            <ThemeSwitcher theme={theme} toggleTheme={toggleTheme} />
            
            {/* Иконка пользователя */}
            <button className="p-2 rounded-full bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-500">
              <UserIcon className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Второй ряд: Погода и курсы валют */}
        <div className="mt-2">
          <WeatherAndCurrencies />
        </div>
      </div>
    </header>
  );
};

export default Header;
