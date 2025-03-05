"use client";

import { useState, useEffect, useCallback } from "react";
import CategorySlider from "@/components/CategorySlider/CategorySlider";
import NewsList from "@/components/NewsList/NewsList";
import { useRouter, useSearchParams } from "next/navigation";

interface Category {
  id: number;
  name: string;
}

interface Story {
  id: number;
  title: string;
  creation_at: string;
  category: Category;
  source?: {
    name: string;
    favicon?: string;
  };
  main_image?: string;
  publication_at?: string;
  url?: string;
}

const CategoryNewsList = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryId = searchParams ? searchParams.get("category") : null;

  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [nextPage, setNextPage] = useState<string | null>(null);

  // 🔹 Загрузка категорий
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("https://zn.by/api/v1/categories/");
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Ошибка загрузки категорий:", error);
      }
    };

    fetchCategories();
  }, []);

  // 🔹 Функция для загрузки сюжетов
  const fetchStories = useCallback(async (categoryId?: number, cursor?: string) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page_size: "10",
        ordering: "-creation_at",
      });

      if (categoryId) params.append("category", categoryId.toString());
      if (cursor) params.append("cursor", cursor);

      const response = await fetch(`https://zn.by/api/v1/stories/?${params.toString()}`);
      const data = await response.json();

      const newStories: Story[] = data.results.map((story: any) => ({
        id: story.id,
        title: story.title,
        creation_at: story.creation_at,
        category: story.category,
        source: story.news_article?.source || { name: "Источник неизвестен" },
        main_image: story.news_article?.main_image || null,
        publication_at: story.news_article?.publication_at,
        url: story.news_article?.url,
      }));

      setStories((prev) => (cursor ? [...prev, ...newStories] : newStories));
      setNextPage(data.next || null);
    } catch (error) {
      console.error("Ошибка загрузки новостей:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // 🔹 Устанавливаем текущую категорию по умолчанию (Политика) или из URL
  useEffect(() => {
    if (categories.length > 0) {
      const defaultCategory = categories.find((cat) => cat.name === "Политика") || categories[0];
      const selected = categoryId
        ? categories.find((cat) => cat.id.toString() === categoryId) || defaultCategory
        : defaultCategory;

      setSelectedCategory(selected);
      fetchStories(selected.id);
    }
  }, [categories, categoryId, fetchStories]);




  
  // 🔹 Обработчик выбора категории
  const handleSelectCategory = useCallback(
    (categoryId: number | null) => {
      setStories([]);
      setNextPage(null);
      const category = categories.find((cat) => cat.id === categoryId) || null;
      setSelectedCategory(category);
      router.push(category ? `?category=${category.id}` : "/");
      fetchStories(category?.id);
    },
    [fetchStories, router, categories]
  );

  // 🔹 Функция загрузки следующей страницы
  const loadMoreStories = useCallback(() => {
    if (nextPage) {
      const cursor = new URL(nextPage).searchParams.get("cursor");
      fetchStories(selectedCategory?.id, cursor || undefined);
    }
  }, [nextPage, fetchStories, selectedCategory]);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 mt-6">
      {/* Заголовок с текущей категорией */}
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 border-b-4 border-gray-300 pb-1">
        {selectedCategory ? selectedCategory.name : "Актуальные сюжеты"}
      </h2>

      {/* Слайдер категорий */}
      <CategorySlider
        categories={categories}
        selectedCategory={selectedCategory?.id || null} // Передаем id вместо объекта
        onSelectCategory={handleSelectCategory}
      />

      {/* Список сюжетов */}
      <NewsList stories={stories} showSkeleton={loading} onLoadMore={nextPage ? loadMoreStories : undefined} />
    </div>
  );
};

export default CategoryNewsList;
