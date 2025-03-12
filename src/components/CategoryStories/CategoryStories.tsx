"use client";

import { useEffect, useState, useCallback } from "react";
import StoryCard from "@/components/StoryCard/StoryCard";

interface Story {
  id: number;
  title: string;
  summary?: string;
  main_image?: string;
  category?: {
    id: number;
    name: string;
  };
  publication_at?: string;
}

interface CategoryStoriesProps {
  categoryId: number | null;
}

const STORIES_PER_LOAD = 12; // Загружаем 12, но показываем 6
const INITIAL_VISIBLE = 6; // Показываем 6 в начале

const CategoryStories: React.FC<CategoryStoriesProps> = ({ categoryId }) => {
  const [stories, setStories] = useState<Story[]>([]);
  const [visibleCount, setVisibleCount] = useState<number>(INITIAL_VISIBLE);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchStories = useCallback(async () => {
    if (!categoryId) {
      console.warn("❌ Категория не выбрана, запрос не отправлен.");
      setLoading(false);
      return;
    }

    const requestUrl = `https://zn.by/api/v1/stories/?category=${categoryId}&page_size=${STORIES_PER_LOAD}`;

    console.log(`📢 Отправляем запрос: ${requestUrl}`);

    setLoading(true);
    try {
      const response = await fetch(requestUrl);

      if (!response.ok) {
        throw new Error(`❌ Ошибка загрузки: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();

      if (!data.results || data.results.length === 0) {
        console.warn("⚠️ API вернул пустой список сюжетов");
        setStories([]);
        return;
      }

      const newStories: Story[] = data.results.map((story: any) => ({
        id: story.id,
        title: story.title || "Без названия",
        summary: story.news_article?.summary || "Описание отсутствует",
        main_image: story.news_article?.main_image || "/default-image.jpg",
        category: story.category || { id: 0, name: "Без категории" },
        publication_at: story.news_article?.publication_at || "",
      }));

      setStories(newStories);
      setVisibleCount(INITIAL_VISIBLE); // Сбрасываем видимость до 6
    } catch (error) {
      console.error("🚨 Ошибка загрузки сюжетов:", error);
    } finally {
      setLoading(false);
    }
  }, [categoryId]);

  // Загружаем сюжеты при изменении `categoryId`
  useEffect(() => {
    if (categoryId) {
      console.log(`🔄 Изменилась категория: ${categoryId}`);
      fetchStories();
    }
  }, [categoryId, fetchStories]);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 mt-6">
      {/* Лоадер при первой загрузке */}
      {loading && stories.length === 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {Array.from({ length: INITIAL_VISIBLE }).map((_, index) => (
            <div key={index} className="h-64 w-full bg-gray-200 dark:bg-gray-700 animate-pulse rounded-lg"></div>
          ))}
        </div>
      )}

      {/* Если данных нет */}
      {!loading && stories.length === 0 && (
        <p className="text-gray-500 text-center mt-6">Нет сюжетов для этой категории.</p>
      )}

      {/* Сюжеты */}
      {stories.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {stories.slice(0, visibleCount).map((story) => (
            <StoryCard key={story.id} story={story} />
          ))}
        </div>
      )}

      {/* Кнопка "Показать еще" */}
      {visibleCount < stories.length && (
        <div className="flex justify-center mt-6">
          <button
            onClick={() => setVisibleCount(stories.length)}
            className="px-5 py-2 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition"
          >
            Показать еще
          </button>
        </div>
      )}
    </div>
  );
};

export default CategoryStories;
