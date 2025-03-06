"use client";

import React from "react";
import Image from "next/image";
import DynamicTimeDisplay from "@/components/DynamicTimeDisplay/DynamicTimeDisplay";
import DropdownButton from "@/components/DropdownButton/DropdownButton";
import "./NewsHeader.css";

interface Source {
  name: string;
  favicon?: string;
}

interface NewsHeaderProps {
  source: Source;
  creationDate: string;
  title: string;
  shareUrl: string;
}

const getValidImageUrl = (url: string | undefined) => {
  if (!url) return "/placeholder.png"; // Заглушка, если URL отсутствует
  return url.startsWith("http") ? url : `https://zn.by${url}`; // Делаем URL абсолютным
};

const NewsHeader: React.FC<NewsHeaderProps> = ({
  source,
  creationDate,
  title,
  shareUrl,
}) => {
  return (
    <div className="border-b border-gray-200 dark:border-gray-700 pb-3">
      {/* Верхняя строка: Источник и кнопка "Поделиться" */}
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center">
          {/* Фавиконка источника */}
          {source.favicon && (
            <img
            src={getValidImageUrl(source?.favicon)}
            alt={source?.name || "Источник"}
            width={20}
            height={20}
            className="w-6 h-6 rounded-full border border-gray-300 dark:border-gray-600"
          />
          
          )}

          {/* Название источника */}
          <div className="source_name pl-3">
            <span className="source_name text-sm font-semibold text-gray-800 dark:text-gray-200">
              {source.name}
            </span>
          </div>
          
        </div>

        {/* Кнопка "Поделиться" */}
        <DropdownButton shareUrl={shareUrl} title={title} />
      </div>

      {/* Заголовок новости */}
      <h1 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
        {title}
      </h1>

      {/* Дата публикации */}
      <p className="text-xs text-gray-500 dark:text-gray-400 font-semibold mt-1">
        <DynamicTimeDisplay creationDate={creationDate} />
      </p>
    </div>
  );
};

export default NewsHeader;
