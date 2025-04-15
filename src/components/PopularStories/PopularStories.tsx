"use client";

import { useEffect, useState } from "react";
import StoryCard from "@/components/StoryCard/StoryCard";
import "./style-popular.css"

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

const PopularStories = () => {
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPopularStories = async () => {
    try {
      console.log("🔄 Запрос популярных сюжетов...");

      const response = await fetch(
        "https://zn.by/api/v1/stories/?ordering=-is_pinned_order,-score&pinned=true&page_size=9"
      );

      if (!response.ok) {
        throw new Error(`❌ Ошибка загрузки: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();

      if (data.results && data.results.length > 0) {
        const formattedStories: Story[] = data.results.map((story: any) => ({
          id: story.id,
          title: story.news_article?.title || "Без заголовка",
          summary: story.news_article?.summary || "Описание отсутствует",
          main_image: story.news_article?.main_image || "/default-image.jpg",
          category: story.category || { id: 0, name: "Без категории" },
          publication_at: story.news_article?.publication_at || "",
        }));

        setStories(formattedStories);
      }
    } catch (error) {
      console.error("🚨 Ошибка загрузки популярных сюжетов:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPopularStories();
  }, []);

  return (
    <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg mt-6">
      <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
        Самые популярные новости
      </h2>

      {/* Лоадер (скелетон) */}
      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="h-40 w-full bg-gray-300 dark:bg-gray-700 animate-pulse rounded-lg"></div>
          ))}
        </div>
      )}

      {/* Вывод популярных сюжетов */}
      {!loading && stories.length > 0 ? (
        <div className="carder grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {stories.map((story) => (
            <StoryCard key={story.id} story={story} />
          ))}
        </div>
      ) : (
        !loading && <p className="text-gray-500 text-center">Нет популярных новостей.</p>
      )}
    </div>
  );
};

export default PopularStories;
