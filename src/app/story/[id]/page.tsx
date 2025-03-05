"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

interface Story {
  id: number;
  title: string;
  creation_at: string;
  news_articles?: { id: number; title: string; text: string }[];
}

export default function StoryPage() {
  const { id } = useParams();
  const [story, setStory] = useState<Story | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    fetch(`https://zn.by/api/v1/stories/${id}/`, { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => setStory(data))
      .catch((error) => console.error("Ошибка загрузки:", error))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Загрузка...</p>;
  if (!story) return <p>Сюжет не найден.</p>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold">{story.title}</h1>
      <p className="text-gray-500">Дата публикации: {story.creation_at}</p>

      {story.news_articles?.length ? (
        story.news_articles.map((article) => (
          <div key={article.id} className="mt-4">
            <h2 className="text-xl font-semibold">{article.title}</h2>
            <p>{article.text}</p>
          </div>
        ))
      ) : (
        <p className="text-gray-500">Нет доступных статей</p>
      )}
    </div>
  );
}
