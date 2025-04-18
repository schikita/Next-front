'use client';

import { useState, useEffect } from "react";
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
  const { user } = useUser();  // Получаем информацию о пользователе из контекста
  const [loading, setLoading] = useState(true); // Состояние для загрузки
  const [isAuthModalOpen, setAuthModalOpen] = useState(false); // Состояние модального окна

  useEffect(() => {
    const currentTheme = localStorage.getItem('theme') || 'light'; // Получаем тему из localStorage
    setTheme(currentTheme);
    document.documentElement.classList.toggle('dark', currentTheme === 'dark'); // Устанавливаем класс для dark темы

    setTimeout(() => {
      setLoading(false); // Симулируем окончание загрузки через 2 секунды
    }, 2000);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme); // Сохраняем тему в localStorage
    document.documentElement.classList.toggle('dark', newTheme === 'dark'); // Применяем класс dark на <html>
  };

  return (
    <header className="bg-background dark:bg-gray-800 py-4 shadow-lg">
      <div className="container mx-auto px-4 sm:px-6 flex justify-between items-center">
        {/* Логотип с анимацией и плавным переходом */}
        <div className="flex items-center space-x-4">
          {loading ? (
            <div className="w-20 h-8 bg-gray-300 dark:bg-gray-700 animate-pulse rounded-md"></div> // Скелетон для логотипа
          ) : (
            <Link href="/" className="flex items-center group">
              <Logo />
              <span className="ml-2 text-xl font-semibold text-gray-900 dark:text-white group-hover:text-blue-500 transition-colors">
                Новости Беларуси
              </span>
            </Link>
          )}
        </div>

        {/* Поиск с динамичным эффектом, скрываем при ширине экрана меньше 650px */}
        <div className="relative flex items-center w-1/3 hidden md:block">
          {loading ? (
            <div className="w-full h-10 bg-gray-300 dark:bg-gray-700 animate-pulse rounded-full"></div> // Скелетон для поиска
          ) : (
            <input
              type="text"
              placeholder="Поиск новостей..."
              className="px-4 py-2 pl-10 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-600 dark:text-white dark:border-gray-500 w-full"
            />
          )}
          <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
        </div>

        {/* Переключатель темы и иконка пользователя */}
        <div className="flex items-center space-x-6">
          {loading ? (
            <div className="w-10 h-10 bg-gray-300 dark:bg-gray-700 animate-pulse rounded-full"></div> // Скелетон для переключателя темы
          ) : (
            <ThemeSwitcher theme={theme} toggleTheme={toggleTheme} />
          )}

          {loading ? (
            <div className="w-10 h-10 bg-gray-300 dark:bg-gray-700 animate-pulse rounded-full"></div> // Скелетон для иконки пользователя
          ) : (
            <div>
              <UserPanel setAuthModalOpen={setAuthModalOpen} /> {/* Передаем setAuthModalOpen в UserPanel */}
            </div>
          )}
        </div>
      </div>

      {/* Второй ряд: Погода и курсы валют */}
      <div className="mt-2 container mx-auto px-4 sm:px-6 max-w-screen-xl">
        {loading ? (
          <div className="w-full h-12 bg-gray-300 dark:bg-gray-700 animate-pulse rounded-full"></div> // Скелетон для погоды и курсов валют
        ) : (
          <WeatherAndCurrencies />
        )}
      </div>

      {/* Модальное окно авторизации */}
      {isAuthModalOpen && <AuthModal onClose={() => setAuthModalOpen(false)} />}
    </header>
  );
};

export default Header;
