"use client"; // Указываем, что это клиентский компонент

import { useEffect } from "react";
import { usePathname } from "next/navigation"; // Используем usePathname из next/navigation

const ScrollToTopOnNavigate = () => {
  const pathname = usePathname(); // Отслеживаем изменения пути

  useEffect(() => {
    window.scrollTo(0, 0); // Прокручиваем страницу в верх

  }, [pathname]); // Запускать эффект при изменении пути

  return null; // Этот компонент ничего не рендерит
};

export default ScrollToTopOnNavigate;
