// Footer.tsx
"use client";

import { useEffect } from "react";
import Link from "next/link";
import Logo from "../header/Logo";

const Footer = () => {
  const handleLinkClick = () => {
    window.scrollTo(0, 0); // Прокручиваем страницу в верх
  };

  return (
    <footer className="bg-white rounded-lg shadow-sm dark:bg-gray-900 m-4">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <Link href="/" className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse pr-5">
            <Logo />
          </Link>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
            <li>
              <Link 
                href="/privacy-policy"
                className="relative group text-gray-500 dark:text-gray-400 transition-colors duration-300 hover:text-blue-500"
              >
                Политика конфиденциальности
                <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span>
              </Link>
            </li>
            <li>
              <Link 
                href="/data-processing-policy"
                className="relative group text-gray-500 dark:text-gray-400 transition-colors duration-300 hover:text-blue-500"
                onClick={handleLinkClick} // Добавляем обработчик клика
              >
                Обработка данных
                <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span>
              </Link>
            </li>
            <li>
              <Link 
                href="/cookie-policy"
                className="relative group text-gray-500 dark:text-gray-400 transition-colors duration-300 hover:text-blue-500"
                onClick={handleLinkClick} // Добавляем обработчик клика
              >
                Политика обработки файлов Cookie
                <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span>
              </Link>
            </li>
            <li>
              <Link 
                href="/contact"
                className="relative group text-gray-500 dark:text-gray-400 transition-colors duration-300 hover:text-blue-500"
                onClick={handleLinkClick} // Добавляем обработчик клика
              >
                Контакты
                <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span>
              </Link>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2025 <Link href="/">Ваш Сайт™</Link>. Все права защищены.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
