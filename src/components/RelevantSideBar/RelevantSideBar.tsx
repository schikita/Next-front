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
  title: string;
  news_article: NewsArticle;
  creation_at: string;
}

interface RelevantSideBarProps {
  excludeId: number;
  relatedStories: Story[];
}

const RelevantSideBar: React.FC<RelevantSideBarProps> = ({ excludeId, relatedStories }) => {
  // Фильтруем новости, чтобы не дублировать текущую статью
  const filteredStories = relatedStories.filter((story) => story.id !== excludeId);

  return (
    <aside className="w-full p-4 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold border-b pb-2 dark:text-white">
        Новости из категории
      </h2>
      <div className="pt-3 space-y-3">
        {filteredStories.length > 0 ? (
          filteredStories.map((story) => (
            <Link
              key={story.id}
              href={`/story/${story.id}`}
              className="block p-3 bg-white dark:bg-gray-700 rounded-md transition hover:bg-gray-100 dark:hover:bg-gray-600"
            >
              <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">
                {story.news_article?.title}
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                <DynamicTimeDisplay creationDate={story.news_article?.publication_at} />
              </p>
            </Link>
          ))
        ) : (
          <p className="text-gray-500 text-sm dark:text-gray-400">
            Нет новостей для отображения.
          </p>
        )}
      </div>
    </aside>
  );
};

export default RelevantSideBar;
