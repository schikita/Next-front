'use client';

import React, { useState, useEffect } from "react";
import ThemeSwitcher from "./ThemeSwitcher";
import AuthModal from "@/components/Auth/AuthModal";
import Logo from "./Logo";
import WeatherAndCurrencies from "./WeatherAndCurrencies";
import UserPanel from "./UserPanel";
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'; // Иконка поиска
import Link from "next/link";
import { useUser } from "@/context/UserContext";

const Header = () => {
  const [theme, setTheme] = useState<string>('light'); // Состояние для темы
  const { user } = useUser();
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);

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
    <header className="bg-background dark:bg-gray-800 py-4 shadow-lg">
      {/* Контейнер с фиксированными отступами и выравниванием, max-width ограничивает ширину */}
      <div className="container mx-auto px-4 sm:px-6 flex justify-between items-center">
        
        {/* Логотип с анимацией и плавным переходом */}
        <div className="flex items-center space-x-4">
          <Link href="/" className="flex items-center group">
            <Logo />
            <span className="ml-2 text-xl font-semibold text-gray-900 dark:text-white group-hover:text-blue-500 transition-colors">
              Новости Беларуси
            </span>
          </Link>
        </div>

        {/* Поиск с динамичным эффектом, скрываем при ширине экрана меньше 650px */}
        <div className="relative flex items-center w-1/3 hidden md:block">
          <input
            type="text"
            placeholder="Поиск новостей..."
            className="px-4 py-2 pl-10 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-600 dark:text-white dark:border-gray-500 w-full"
          />
          <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
        </div>

        {/* Переключатель темы и иконка пользователя */}
        <div className="flex items-center space-x-6">
          {/* Переключатель темы с анимацией */}
          <ThemeSwitcher theme={theme} toggleTheme={toggleTheme} />

          {/* Иконка пользователя */}
          <UserPanel />
        </div>
      </div>

      {/* Второй ряд: Погода и курсы валют */}
      <div className="mt-2 container mx-auto px-4 sm:px-6 max-w-screen-xl">
        <WeatherAndCurrencies />
      </div>

      {/* Модальное окно авторизации */}
      {isAuthModalOpen && <AuthModal onClose={() => setAuthModalOpen(false)} />}
    </header>
  );
};

export default Header;
