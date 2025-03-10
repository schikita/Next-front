"use client";

import Link from "next/link";
import Image from "next/image";

interface Story {
  id: number;
  title: string;
  summary?: string;
  description?: string;
  text?: string;
  main_image?: string;
  category?: {
    id: number;
    name: string;
  };
  publication_at?: string;
}

const StoryCard: React.FC<{ story: Story }> = ({ story }) => {
  return (
    <Link
      href={`/story/${story.id}`}
      className="block group relative overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700 shadow-md transition hover:shadow-lg dark:hover:shadow-gray-900"
    >
      {/* Изображение или заглушка */}
      <div className="relative w-full h-52 bg-gray-100 dark:bg-gray-800">
        {story.main_image ? (
          <Image
            src={story.main_image}
            alt={story.title}
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-gray-500 text-sm">
            Нет изображения
          </div>
        )}
      </div>

      {/* Контент */}
      <div className="p-4">
        {/* Категория */}
        {story.category && (
          <span className="absolute top-3 left-3 bg-black/70 text-white text-xs font-semibold px-2 py-1 rounded-md">
            {story.category.name}
          </span>
        )}

        {/* Заголовок */}
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:underline">
          {story.title}
        </h3>

        {/* Краткое описание */}
        {story.summary && (
          <p className="mt-2 text-sm text-gray-700 dark:text-gray-400 line-clamp-3">
            {story.summary}
          </p>
        )}

        {/* Дата публикации */}
        {story.publication_at && (
          <p className="mt-3 text-xs text-gray-500">
            📅 {new Date(story.publication_at).toLocaleDateString("ru-RU")}
          </p>
        )}
      </div>
    </Link>
  );
};

export default StoryCard;
