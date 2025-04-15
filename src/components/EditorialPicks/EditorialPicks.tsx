import React, { useState, useEffect } from "react";
import StoryCard from "@/components/StoryCard/StoryCard"; // Импортируем компонент StoryCard

interface Story {
  id: number;
  title: string;
  creation_at: string;
  source?: {
    name: string;
    favicon?: string;
  };
  publication_at?: string;
  category?: {
    name: string;
  };
}

const EditorialPicks = () => {
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);

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
            summary: story.news_article?.summary || "Описание отсутствует", // Добавлено описание
            main_image: story.news_article?.main_image || null,
            category: story.category || { name: "Без категории" },
            publication_at: story.news_article?.publication_at || "", // <-- Дата публикации
          }));

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
            <StoryCard key={story.id} story={story} /> // Используем StoryCard для рендеринга карточек
          ))}
        </div>
      )}
    </div>
  );
};

export default EditorialPicks;
