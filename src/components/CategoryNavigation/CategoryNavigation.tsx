"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

interface Category {
  id: number;
  name: string;
}

const CategoryNavigation = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const categoryId = searchParams.get("category");
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [categories, setCategories] = useState<Category[]>([]);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);

  // Загружаем категории
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("https://zn.by/api/v1/categories/");
        const data: Category[] = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Ошибка загрузки категорий:", error);
      }
    };
    fetchCategories();
  }, []);

  // Определяем активную категорию
  const activeCategoryId = categoryId ? Number(categoryId) : null;

  // Обновление состояния скролла
  const updateScrollState = () => {
    if (!containerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
    setIsAtStart(scrollLeft <= 5);
    setIsAtEnd(scrollLeft + clientWidth >= scrollWidth - 5);
  };

  useEffect(() => {
    updateScrollState();
  }, [categories]);

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

  // Обработчик нажатия на категорию
  const handleCategoryClick = (categoryId: number) => {
    if (pathname.startsWith("/story/")) {
      router.push(`/category/${categoryId}`); // Если на странице сюжета — уходим в категорию
    } else {
      router.push(`${pathname}?category=${categoryId}`); // Если в категории — обновляем URL
    }
  };

  return (
    <div className="relative max-w-screen-lg mx-auto px-4 sm:px-6 md:px-8">
      {/* Контейнер с категориями и стрелками */}
      <div className="relative flex items-center">
        {/* Левая стрелка (всегда показываем) */}
        <button
          onClick={scrollLeft}
          className="absolute left-0 z-10 bg-white dark:bg-gray-800 shadow-md rounded-full p-2 flex items-center justify-center border border-gray-300 dark:border-gray-600"
        >
          <ChevronLeftIcon className="w-6 h-6 text-gray-600 dark:text-gray-400" />
        </button>

        {/* Категории */}
        <div
          ref={containerRef}
          className="flex space-x-3 overflow-x-auto no-scrollbar scroll-smooth px-8 md:px-0"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryClick(category.id)}
              className={`inline-flex items-center justify-center text-sm font-semibold rounded-2xl border-2 shadow-sm transition-all whitespace-nowrap px-4 py-2
                ${
                  activeCategoryId === category.id
                    ? "border-4 border-black dark:border-white bg-gray-200 dark:bg-gray-800 text-black dark:text-white"
                    : "border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-300 dark:hover:bg-gray-600 hover:bg-gray-100"
                }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Правая стрелка (всегда показываем) */}
        <button
          onClick={scrollRight}
          className="absolute right-0 z-10 bg-white dark:bg-gray-800 shadow-md rounded-full p-2 flex items-center justify-center border border-gray-300 dark:border-gray-600"
        >
          <ChevronRightIcon className="w-6 h-6 text-gray-600 dark:text-gray-400" />
        </button>
      </div>
    </div>
  );
};

export default CategoryNavigation;
