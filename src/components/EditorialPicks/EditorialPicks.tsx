"use client";

import StoryCard from "@/components/StoryCard/StoryCard";
import { useEffect, useState } from "react";

interface Story {
  id: number;
  title: string;
  main_image?: string;
  category?: {
    id: number;
    name: string;
  };
  publication_at?: string;
}

const EditorialPicks = () => {
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchEditorialPicks = async () => {
      try {
        const response = await fetch(
          "https://zn.by/api/v1/stories/?ordering=-is_pinned_order,-score&pinned=true&page_size=3"
        );

        if (!response.ok) {
          throw new Error("Ошибка загрузки 'Выбор редакции'");
        }

        const data = await response.json();
        console.log("📥 Данные из API:", data);

        if (Array.isArray(data.results)) {
          const formattedStories = data.results.map((story) => ({
            id: story.id,
            title: story.news_article?.title || "Без названия",
            main_image: story.news_article?.main_image || null,
            category: story.category || { id: 0, name: "Без категории" },
            publication_at: story.news_article?.publication_at || null, // <-- Дата публикации
          }));

          console.log("🖼️ Проверка данных в карточках:", formattedStories);

          setStories(formattedStories);
        } else {
          console.warn("⚠️ API вернул некорректные данные", data);
        }
      } catch (error) {
        console.error("🚨 Ошибка загрузки 'Выбор редакции':", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEditorialPicks();
  }, []);

  return (
    <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
      <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
        Выбор редакции
      </h2>

      {loading ? (
        <p className="text-gray-500 text-center">Загрузка...</p>
      ) : stories.length === 0 ? (
        <p className="text-gray-500 text-center">Нет новостей.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {stories.map((story) => (
            <StoryCard key={story.id} story={story} isLink={true} />
          ))}
        </div>
      )}
    </div>
  );
};

export default EditorialPicks;
