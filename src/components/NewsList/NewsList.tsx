"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

interface Source {
  id: number;
  name: string;
  url: string;
  favicon?: string;
}

interface Story {
  id: number;
  title: string;
  creation_at: string;
  source?: Source;
  news_article?: {
    source?: Source;
  };
}

interface NewsListProps {
  stories: Story[];
  showSkeleton: boolean;
  onLoadMore?: () => void;
}

const NewsList: React.FC<NewsListProps> = ({ stories, showSkeleton, onLoadMore }) => {
  const [visibleCount, setVisibleCount] = useState(5);

  useEffect(() => {
    setVisibleCount(5);
  }, [stories]);

  const handleShowMore = () => {
    setVisibleCount((prevCount) => prevCount + 5);
  };

  // Проверка и исправление URL для favicon
  const getValidImageUrl = (url: string | undefined) => {
    if (!url) return "/placeholder.png"; // Заглушка, если URL отсутствует
    return url.startsWith("http") ? url : `https://zn.by${url}`; // Делаем URL абсолютным
  };

  // Функция для форматирования даты
  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleDateString("ru-RU", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const renderSkeletons = () => {
    return Array.from({ length: 5 }).map((_, index) => (
      <div key={index} className="flex items-center space-x-3 p-3 rounded-lg bg-gray-100 dark:bg-gray-800 animate-pulse">
        <div className="w-5 h-5 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
      </div>
    ));
  };

  return (
    <div className="mt-4">
      <div className="space-y-2">
        {showSkeleton
          ? renderSkeletons()
          : stories.slice(0, visibleCount).map((story) => {
              const source = story.source || story.news_article?.source || null;

              return (
                <Link key={story.id} href={`/story/${story.id}`} className="block">
                  <div className="flex items-start p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition">
                    {source?.favicon && (
                      <div className="flex-shrink-0">
                      <img
                        src={getValidImageUrl(source?.favicon)}
                        alt={source?.name || "Источник"}
                        width={20}
                        height={20}
                        className="w-5 h-5 rounded-full border border-gray-300 dark:border-gray-600"
                      />

                      </div>
                    )}
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-800 dark:text-#ffffff-200">
                        {source ? source.name : "Источник неизвестен"}
                      </p>
                      <p className="text-xs text-gray-500">{formatDate(story.creation_at)}</p>
                      <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">{story.title}</p>
                    </div>
                  </div>
                </Link>
              );
            })}
      </div>

      {visibleCount < stories.length && !showSkeleton && (
        <div className="flex justify-center mt-4">
          <button
            onClick={handleShowMore}
            className="px-4 py-2 text-sm font-medium bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition"
          >
            Показать ещё
          </button>
        </div>
      )}
    </div>
  );
};

export default NewsList;
