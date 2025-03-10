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

const CategoryStories: React.FC<CategoryStoriesProps> = ({ categoryId }) => {
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState(1);
  const [nextPage, setNextPage] = useState<string | null>(null);

  const fetchStories = useCallback(
    async (pageNum = 1) => {
      if (!categoryId) {
        console.warn("Категория не выбрана, запрос не отправлен.");
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const response = await fetch(
          `https://zn.by/api/v1/stories/?category=${categoryId}&page=${pageNum}&page_size=12`
        );

        if (!response.ok) {
          throw new Error("Ошибка загрузки");
        }

        const data = await response.json();

        if (!data.results || data.results.length === 0) {
          console.warn("API вернул пустой список сюжетов");
          setStories([]);
          setNextPage(null);
          return;
        }

        const newStories: Story[] = data.results.map((story: any) => ({
          id: story.id,
          title: story.title || "Без названия",
          summary: story.news_article?.summary || "Описание отсутствует",
          main_image: story.news_article?.main_image || "/default-image.jpg", // Заглушка
          category: story.category || { id: 0, name: "Без категории" },
          publication_at: story.news_article?.publication_at || "",
        }));

        setStories((prev) => (pageNum === 1 ? newStories : [...prev, ...newStories]));
        setNextPage(data.next || null);
      } catch (error) {
        console.error("Ошибка загрузки сюжетов:", error);
      } finally {
        setLoading(false);
      }
    },
    [categoryId]
  );

  useEffect(() => {
    if (categoryId) {
      setStories([]); // Очищаем прошлые данные
      setPage(1);
      fetchStories(1);
    }
  }, [categoryId, fetchStories]);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 mt-6">
      {loading && stories.length === 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {Array.from({ length: 12 }).map((_, index) => (
            <div
              key={index}
              className="h-64 w-full bg-gray-200 dark:bg-gray-700 animate-pulse rounded-lg"
            ></div>
          ))}
        </div>
      )}

      {!loading && stories.length === 0 && (
        <p className="text-gray-500 text-center mt-6">Нет сюжетов для этой категории.</p>
      )}

      {stories.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {stories.map((story) => (
            <StoryCard key={story.id} story={story} />
          ))}
        </div>
      )}

      {nextPage && (
        <div className="flex justify-center mt-6">
          <button
            onClick={() => fetchStories(page + 1)}
            className="px-5 py-2 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition"
          >
            Загрузить еще
          </button>
        </div>
      )}
    </div>
  );
};

export default CategoryStories;
