"use client";

import { useState } from "react";

interface Article {
  id: number;
  title: string;
  publication_at: string;
  source: {
    name: string;
    favicon?: string;
  };
}

interface RelatedArticlesProps {
  articles: Article[];
  onArticleClick: (article: Article) => void;
  selectedArticleId: number;
}

const getValidImageUrl = (url: string | undefined) => {
  if (!url) return "/placeholder.png"; // Заглушка, если URL отсутствует
  return url.startsWith("http") ? url : `https://zn.by${url}`; // Делаем URL абсолютным
};

export default function RelatedArticles({
  articles,
  onArticleClick,
  selectedArticleId,
}: RelatedArticlesProps) {
  const filteredArticles = articles.filter(
    (article) => article.id !== selectedArticleId
  );
  const [visibleCount, setVisibleCount] = useState(5);

  return (
    <div className="mt-4">
      {filteredArticles.length > 0 && (
        <h3 className="text-lg font-semibold mb-2">ЭТОТ СЮЖЕТ В СМИ:</h3>
      )}

      {filteredArticles.slice(0, visibleCount).map((article) => (
        <div
          key={article.id}
          onClick={() => onArticleClick(article)}
          className="cursor-pointer p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
        >
          <div className="flex items-center gap-2">
            {article.source.favicon && (
               <img
              src={getValidImageUrl(article.source.favicon)}
              alt={article.source.name || "Источник"}
              width={20}
              height={20}
              className="w-6 h-6 rounded-full border border-gray-300 dark:border-gray-600"
            />
              
            )}
            <span className="text-sm font-medium">{article.source.name}</span>
            <span className="text-xs text-gray-500">{formatTimeAgo(article.publication_at)}</span>
          </div>
          <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 mt-1">
            {article.title}
          </p>
        </div>
      ))}

      {visibleCount < filteredArticles.length && (
        <button
          onClick={() => setVisibleCount((prev) => prev + 5)}
          className="mt-3 px-4 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition"
        >
          Показать еще
        </button>
      )}
    </div>
  );
}

// Функция форматирования времени (пример)
function formatTimeAgo(dateString: string) {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMinutes = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMinutes < 1) return "только что";
  if (diffMinutes < 60) return `${diffMinutes} мин назад`;
  if (diffHours < 24) return `${diffHours} ч назад`;
  if (diffDays === 1) return "вчера";
  return `${diffDays} дн назад`;
}
