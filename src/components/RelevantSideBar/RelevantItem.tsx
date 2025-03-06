"use client";

import React from "react";
import Link from "next/link";
import DynamicTimeDisplay from "@/components/DynamicTimeDisplay/DynamicTimeDisplay";

interface NewsArticle {
  id: number;
  title: string;
  publication_at: string;
}

interface Story {
  id: number;
  news_articles: NewsArticle[];
}

interface RelevantItemProps {
  story: Story;
}

const RelevantItem: React.FC<RelevantItemProps> = ({ story }) => {
  // Проверяем, что у сюжета есть статьи
  if (!story?.news_articles || story.news_articles.length === 0) return null;

  const article = story.news_articles[0]; // Берем первую статью

  return (
    <Link href={`/story/${story.id}`} passHref>
      <div className="block p-3 rounded-md transition hover:bg-gray-100 dark:hover:bg-gray-800">
        <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-1">
          {article.title}
        </h3>
        <p className="text-xs text-gray-500">
          <DynamicTimeDisplay creationDate={article.publication_at} />
        </p>
      </div>
    </Link>
  );
};

export default RelevantItem;
