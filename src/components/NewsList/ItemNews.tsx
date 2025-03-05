import React from "react";
import Link from "next/link";

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
}

interface ItemNewsProps {
  story: Story;
}

const getValidImageUrl = (url: string | undefined) => {
  if (!url) return "/placeholder.png"; // Заглушка, если URL отсутствует
  return url.startsWith("http") ? url : `https://zn.by${url}`; // Делаем URL абсолютным
};

// Функция форматирования даты по стилю Яндекса
const formatTimeYandex = (date: string) => {
  const now = new Date();
  const newsDate = new Date(date);
  const diffInMs = now.getTime() - newsDate.getTime();
  const diffInMinutes = Math.floor(diffInMs / 60000);

  if (diffInMinutes < 1) return "только что";
  if (diffInMinutes < 60) return `${diffInMinutes} ${getMinuteLabel(diffInMinutes)} назад`;

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours} ${getHourLabel(diffInHours)} назад`;

  return `${newsDate.toLocaleDateString("ru-RU", { day: "2-digit", month: "long" })}`;
};

// Склонение минут
const getMinuteLabel = (minutes: number) => {
  if (minutes % 10 === 1 && minutes !== 11) return "минуту";
  if ([2, 3, 4].includes(minutes % 10) && ![12, 13, 14].includes(minutes)) return "минуты";
  return "минут";
};

// Склонение часов
const getHourLabel = (hours: number) => {
  if (hours % 10 === 1 && hours !== 11) return "час";
  if ([2, 3, 4].includes(hours % 10) && ![12, 13, 14].includes(hours)) return "часа";
  return "часов";
};

const ItemNews: React.FC<ItemNewsProps> = ({ story }) => {
  const source = story.source || null;

  return (
    <Link href={`/story/${story.id}`} className="block">

      <div className="flex items-start p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition">
        {/* Логотип источника */}
        {source?.favicon && (
          <div className="pt-2 flex-shrink-0">
            <img
              src={getValidImageUrl(source?.favicon)}
              alt={source?.name || "Источник"}
              width={20}
              height={20}
              className="w-6 h-6 rounded-full border border-gray-300 dark:border-gray-600"
            />
          </div>
        )}

        {/* Основная информация */}
        <div className="ml-3">
          <div className="flex items-center space-x-2">
            <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
              {source ? source.name : "Источник неизвестен"}
            </p>
            <p className="text-xs text-gray-500">{formatTimeYandex(story.creation_at)}</p>
          </div>
          <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">{story.title}</p>
        </div>
      </div>
    </Link>
  );
};

export default ItemNews;
