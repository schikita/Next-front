"use client"; // Для клиентского компонента

import { useState, useEffect } from "react";

const BackToTop = () => {
  const [showButton, setShowButton] = useState(false);

  // Отслеживаем прокрутку страницы
  const handleScroll = () => {
    if (window.scrollY > 200) {
      setShowButton(true); // Показать кнопку, если прокрутили на 200px
    } else {
      setShowButton(false); // Скрыть кнопку, если вернулись наверх
    }
  };

  useEffect(() => {
    // Добавляем слушатель прокрутки
    window.addEventListener("scroll", handleScroll);

    // Убираем слушатель прокрутки при размонтировании
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Функция для прокрутки страницы наверх
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-10 right-4 w-14 h-14 flex items-center justify-center bg-blue-500 text-white rounded-full shadow-lg transition-opacity ${
        showButton ? "opacity-100" : "opacity-0"
      }`}
      style={{
        transition: "opacity 0.3s ease-in-out",
        fontSize: "1.5rem", // Размер стрелки вверх
      }}
      aria-label="Back to top"
    >
      <span className="translate-y-[-2px]">▲</span>
    </button>
  );
};

export default BackToTop;
