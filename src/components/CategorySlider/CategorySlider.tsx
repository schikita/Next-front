"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
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
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [scrollStart, setScrollStart] = useState<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
      setIsAtStart(scrollLeft <= 0);
      setIsAtEnd(scrollLeft + clientWidth >= scrollWidth);
    };

    const scrollContainer = containerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", handleScroll);
      handleScroll();
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!containerRef.current) return;
    setTouchStartX(e.touches[0].clientX);
    setScrollStart(containerRef.current.scrollLeft);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartX === null || !containerRef.current) return;
    const deltaX = e.touches[0].clientX - touchStartX;
    containerRef.current.scrollLeft = scrollStart - deltaX;
  };

  const handleTouchEnd = () => {
    setTouchStartX(null);
  };

  return (
    <div className="relative max-w-screen-lg mx-auto pt-3 px-4 sm:px-6 md:px-8">
      {/* Заголовок выбранной категории */}
      {selectedCategory !== null && (
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          {categories.find((cat) => cat.id === selectedCategory)?.name}
        </h2>
      )}

      {/* Контейнер с категориями и стрелками */}
      <div className="relative flex items-center">
        {/* Левая стрелка */}
        {!isAtStart && (
          <button
            onClick={scrollLeft}
            className="absolute left-0 z-10 bg-white dark:bg-gray-800 shadow-md rounded-full p-2 flex items-center justify-center"
          >
            <ChevronLeftIcon className="w-6 h-6 text-gray-600 dark:text-gray-400" />
          </button>
        )}

        {/* Категории */}
        <div
          ref={containerRef}
          className="flex space-x-3 overflow-x-auto no-scrollbar scroll-smooth py-4 px-8 md:px-2"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => onSelectCategory(category.id)}
              className={`inline-flex items-center justify-center text-sm font-semibold rounded-2xl border-2 ring-0 transition-all whitespace-nowrap px-4 py-2 
                ${
                  selectedCategory === category.id
                    ? "border-0 border-black dark:border-white bg-gray-200 dark:bg-gray-900 text-black dark:text-white ring-2 ring-black dark:ring-white"
                    : "border-gray-300 bg-white dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 hover:bg-gray-100"
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
            className="absolute right-0 z-10 bg-white dark:bg-gray-800 shadow-md rounded-full p-2 flex items-center justify-center"
          >
            <ChevronRightIcon className="w-6 h-6 text-gray-600 dark:text-gray-400" />
          </button>
        )}
      </div>
    </div>
  );
};

export default CategorySlider;
