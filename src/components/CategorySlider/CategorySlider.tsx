"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

interface Category {
  id: number;
  name: string;
}

interface CategorySliderProps {
  categories: Category[];
  selectedCategory: number | null;
  onSelectCategory: (categoryId: number | null) => void;
}

const CategorySlider: React.FC<CategorySliderProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [scrollStart, setScrollStart] = useState<number>(0);

  // Функция обновления состояния стрелок
  const updateScrollState = () => {
    if (!containerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;

    setIsAtStart(scrollLeft <= 5);
    setIsAtEnd(scrollLeft + clientWidth >= scrollWidth - 5);
  };

  // Обновление состояния при монтировании и изменении категорий
  useEffect(() => {
    if (!containerRef.current) return;
    updateScrollState();
  }, [categories]);

  // Обработчик скролла
  useEffect(() => {
    const scrollContainer = containerRef.current;
    if (!scrollContainer) return;

    scrollContainer.addEventListener("scroll", updateScrollState);
    return () => {
      scrollContainer.removeEventListener("scroll", updateScrollState);
    };
  }, []);

  // Прокрутка влево
  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  // Прокрутка вправо
  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  // Начало свайпа
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!containerRef.current) return;
    setTouchStartX(e.touches[0].clientX);
    setScrollStart(containerRef.current.scrollLeft);
  };

  // Обработка свайпа
  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartX === null || !containerRef.current) return;
    const deltaX = e.touches[0].clientX - touchStartX;
    containerRef.current.scrollLeft = scrollStart - deltaX;
  };

  // Завершение свайпа
  const handleTouchEnd = () => {
    setTouchStartX(null);
  };

  return (
    <div className="relative max-w-screen-lg mx-auto px-4 sm:px-6 md:px-8">
      {/* Контейнер с категориями и стрелками */}
      <div className="relative flex items-center">
        {/* Левая стрелка */}
        {!isAtStart && (
          <button
            onClick={scrollLeft}
            className="absolute left-0 z-10 bg-white dark:bg-gray-800 shadow-md rounded-full p-2 flex items-center justify-center border border-gray-300 dark:border-gray-600"
          >
            <ChevronLeftIcon className="w-6 h-6 text-gray-600 dark:text-gray-400" />
          </button>
        )}

        {/* Категории */}
        <div
          ref={containerRef}
          className="flex space-x-3 overflow-x-auto no-scrollbar scroll-smooth px-8 md:px-0"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {categories.map((category) => (
          <button
          key={category.id}
          onClick={() => onSelectCategory(category.id)}
          className={`inline-flex items-center justify-center text-sm font-semibold rounded-2xl border-2 shadow-sm transition-all whitespace-nowrap px-4 py-1
            ${
              selectedCategory === category.id
                ? "border-4 border-black dark:border-white bg-gray-200 dark:bg-gray-800 text-black dark:text-white"
                : "border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-300 dark:hover:bg-gray-600 hover:bg-gray-100"
            }`}
        >
          {category.name}
        </button>
        
         
          ))}
        </div>

        {/* Правая стрелка */}
        {!isAtEnd && (
          <button
          onClick={scrollRight}
          className="absolute right-0 z-10 bg-white dark:bg-gray-800 shadow-md rounded-full p-2 flex items-center justify-center border border-gray-300 dark:border-gray-600"
        >
          <ChevronRightIcon className="w-6 h-6 text-gray-600 dark:text-gray-400" />
        </button>
        )}
      </div>
    </div>
  );
};

export default CategorySlider;
