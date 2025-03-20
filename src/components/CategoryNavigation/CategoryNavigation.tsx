'use client'; // Для клиентского компонента

import { useEffect, useRef, useState } from "react";
import { useRouter, usePathname, useParams } from "next/navigation";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

interface Category {
  id: number;
  name: string;
}

const CategoryNavigation = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { id } = useParams();
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [categories, setCategories] = useState<Category[]>([]);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);

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

  const activeCategoryId = id ? Number(id) : null;

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

  const handleCategoryClick = (categoryId: number) => {
    router.push(`/category/${categoryId}`);
  };

  return (
<div className="relative max-w-screen-lg mx-auto px-4 sm:px-6 md:px-8">
  <div className="relative flex items-center flex-wrap justify-start gap-2">
    {/* Левая стрелка */}
    {!isAtStart && (
      <button
        onClick={scrollLeft}
        className="absolute left-0 z-10 bg-white dark:bg-gray-800 shadow-md rounded-full p-2 flex items-center justify-center border border-gray-300 dark:border-gray-600"
      >
        <ChevronLeftIcon className="w-6 h-6 text-gray-600 dark:text-gray-400" />
      </button>
    )}

    <div
      ref={containerRef}
      className="flex space-x-2 overflow-x-auto no-scrollbar scroll-smooth"
      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
    >
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => handleCategoryClick(category.id)}
          className={`inline-flex items-center justify-center text-sm font-semibold rounded-2xl border-2 shadow-sm transition-all whitespace-nowrap px-4 py-1
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

    {/* Правая стрелка */}
    <button
      onClick={scrollRight}
      className={`absolute right-0 z-10 bg-white dark:bg-gray-800 shadow-md rounded-full p-2 flex items-center justify-center border border-gray-300 dark:border-gray-600 ${
        isAtEnd ? "opacity-0 pointer-events-none" : ""
      }`}
      disabled={isAtEnd}
    >
      <ChevronRightIcon className="w-6 h-6 text-gray-600 dark:text-gray-400" />
    </button>
  </div>
</div>

  );
};

export default CategoryNavigation;
