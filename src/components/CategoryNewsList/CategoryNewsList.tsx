"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

interface NewsArticle {
  id: number;
  title: string;
  description?: string;
  url: string;
  publication_at: string;
  main_image?: string;
  source: {
    id: number;
    name: string;
    url: string;
    favicon?: string;
  };
}

interface NewsItem {
  id: number;
  title: string;
  creation_at: string;
  category: {
    id: number;
    name: string;
    code_name: string;
  };
  news_article: NewsArticle;
}

const CategoryNewsList = () => {
  const searchParams = useSearchParams();
  const categoryId = searchParams.get("category") ?? "";

  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [nextPage, setNextPage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Функция загрузки новостей
  const fetchNews = async (cursor: string | null = null) => {
    setLoading(true);
    setError(null);

    try {
      let url = "https://zn.by/api/v1/stories/";
      if (categoryId) url += `?category=${categoryId}`;
      if (cursor) url += `&cursor=${cursor}`;

      console.log("Запрос к API:", url);

      const response = await fetch(url);
      if (!response.ok) throw new Error(`Ошибка загрузки: ${response.status}`);

      const data = await response.json();

      setNews((prevNews) => [...prevNews, ...(data.results || [])]);
      setNextPage(data.next ?? null);
    } catch (err) {
      setError("Не удалось загрузить новости");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setNews([]); // Очистка перед загрузкой новых данных
    fetchNews();
  }, [categoryId]);

  const loadMoreNews = () => {
    if (nextPage) {
      const cursor = new URL(nextPage).searchParams.get("cursor");
      fetchNews(cursor);
    }
  };

  return (
    <div className="container mx-auto px-4 max-w-4xl">
      <h2 className="text-xl font-bold mb-4">
        {categoryId ? `Новости категории: ${categoryId}` : "Все новости"}
      </h2>

      {error && <p className="text-red-500">{error}</p>}
      {loading && !news.length && <p>Загрузка...</p>}

      <ul className="space-y-4">
        {news.map((item) => (
          <li key={item.id} className="border-b pb-4">
            <a href={item.news_article.url} target="_blank" rel="noopener noreferrer">
              <h3 className="text-lg font-semibold hover:underline">{item.title}</h3>
            </a>
            <p className="text-sm text-gray-600">{item.news_article.summary}</p>
            {item.news_article.main_image && (
              <img src={item.news_article.main_image} alt={item.title} className="w-full max-h-48 object-cover mt-2 rounded-lg" />
            )}
            <p className="text-xs text-gray-500 mt-1">
              {new Date(item.news_article.publication_at).toLocaleString()} | Источник: {item.news_article.source.name}
            </p>
          </li>
        ))}
      </ul>

      {nextPage && (
        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={loadMoreNews}
        >
          Загрузить ещё
        </button>
      )}
    </div>
  );
};

export default CategoryNewsList;
