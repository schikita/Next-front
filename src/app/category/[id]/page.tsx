"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import CategoryNavigation from "@/components/CategoryNavigation/CategoryNavigation";
import CategoryStories from "@/components/CategoryStories/CategoryStories";

interface Category {
  id: number;
  name: string;
}

const CategoryPage = () => {
  const { id } = useParams(); // Используем id из URL, а не query-параметры
  const [categoryName, setCategoryName] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategoryName = async () => {
      try {
        const response = await fetch(`https://zn.by/api/v1/categories/`);
        if (!response.ok) throw new Error("Ошибка загрузки категорий");

        const data: Category[] = await response.json();
        const currentCategory = data.find((cat) => cat.id === Number(id));

        setCategoryName(currentCategory ? currentCategory.name : "Неизвестная категория");
      } catch (error) {
        console.error("Ошибка при загрузке категорий:", error);
        setCategoryName("Ошибка загрузки");
      }
    };

    if (id) {
      fetchCategoryName();
    }
  }, [id]);

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 mt-6">
      {/* Навигация по категориям */}
      <CategoryNavigation />

      {/* Заголовок категории */}
      <h1 className="text-2xl font-bold mt-4 text-gray-900 dark:text-white">
        {categoryName || "Загрузка..."}
      </h1>

      {/* Загружаем сюжеты, передавая id категории напрямую */}
      <CategoryStories categoryId={id ? Number(id) : null} />
    </main>
  );
};

export default CategoryPage;
