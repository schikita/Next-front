"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

interface Category {
  id: number;
  name: string;
}

const CategoryNavigation = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  // 🔹 Загружаем категории
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("https://zn.by/api/v1/categories/");
        if (!response.ok) throw new Error("Ошибка загрузки категорий");

        const data: Category[] = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Ошибка при загрузке категорий:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // 🔹 Прокрутка влево
  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  // 🔹 Прокрутка вправо
  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  // 🔹 Обработчик перехода на страницу категории
  const handleCategoryClick = (categoryId: number) => {
    router.push(`/category/${categoryId}`);
  };

  if (loading) {
    return <p className="text-center text-gray-500">Загрузка...</p>;
  }

  return (
    <div className="relative max-w-screen-lg mx-auto  sm:px-6 md:px-8">
      {/* Контейнер с категориями и стрелками */}
      <div className="relative flex items-center">
        {/* 🔹 Левая стрелка (Теперь она всегда видна) */}
        <button
          onClick={scrollLeft}
          className="absolute left-0 z-10 bg-white dark:bg-gray-800 shadow-md rounded-full p-2 flex items-center justify-center border border-gray-300 dark:border-gray-600"
        >
          <ChevronLeftIcon className="w-6 h-6 text-gray-600 dark:text-gray-400" />
        </button>

        {/* 🔹 Категории */}
        <div
          ref={containerRef}
          className="flex space-x-3 overflow-x-auto no-scrollbar scroll-smooth px-12 "
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {categories.length > 0 ? (
            categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryClick(category.id)}
                className="inline-flex items-center justify-center text-sm font-semibold rounded-2xl border-2 shadow-sm transition-all whitespace-nowrap px-4 py-2
                  border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-300 dark:hover:bg-gray-600 hover:bg-gray-100"
              >
                {category.name}
              </button>
            ))
          ) : (
            <p className="text-gray-500">Загрузка категорий...</p>
          )}
        </div>

        {/* 🔹 Правая стрелка */}
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
