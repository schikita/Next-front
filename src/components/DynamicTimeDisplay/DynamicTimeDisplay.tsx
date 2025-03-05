"use client";

import React, { useEffect, useState } from "react";

// Функция для выбора правильного склонения
const getPluralForm = (n: number, forms: [string, string, string]) => {
  return forms[
    n % 10 === 1 && n % 100 !== 11
      ? 0
      : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20)
      ? 1
      : 2
  ];
};

// Функция для форматирования времени
const formatTimeAgo = (creationDate: string): string => {
  const now = new Date();
  const date = new Date(creationDate);

  const diffMs = now.getTime() - date.getTime();
  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMinutes < 1) return "только что";
  if (diffMinutes < 60) {
    const minutesForm = getPluralForm(diffMinutes, [
      "минуту",
      "минуты",
      "минут",
    ]);
    return `${diffMinutes} ${minutesForm} назад`;
  }
  if (diffHours < 24) {
    const hoursForm = getPluralForm(diffHours, ["час", "часа", "часов"]);
    return `${diffHours} ${hoursForm} назад`;
  }
  if (diffDays === 1) return "вчера";
  if (diffDays < 7) {
    const daysForm = getPluralForm(diffDays, ["день", "дня", "дней"]);
    return `${diffDays} ${daysForm} назад`;
  }

  const months = [
    "января",
    "февраля",
    "марта",
    "апреля",
    "мая",
    "июня",
    "июля",
    "августа",
    "сентября",
    "октября",
    "ноября",
    "декабря",
  ];
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear() === now.getFullYear() ? "" : ` ${date.getFullYear()}`;

  return `${day} ${month}${year}`;
};

// Компонент с динамическим обновлением времени
interface DynamicTimeDisplayProps {
  creationDate: string;
}

const DynamicTimeDisplay: React.FC<DynamicTimeDisplayProps> = ({
  creationDate,
}) => {
  const [timeAgo, setTimeAgo] = useState<string>(formatTimeAgo(creationDate));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeAgo(formatTimeAgo(creationDate));
    }, 60000);

    return () => clearInterval(timer);
  }, [creationDate]);

  return <span className="text-gray-500 dark:text-gray-400">{timeAgo}</span>;
};

export default DynamicTimeDisplay;
