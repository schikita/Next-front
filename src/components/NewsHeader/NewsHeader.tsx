import React, { useRef } from "react";
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
  if (!url) return "/placeholder.png";
  return url.startsWith("http") ? url : `https://zn.by${url}`;
};

const NewsHeader: React.FC<NewsHeaderProps> = ({ source, creationDate, title, shareUrl }) => {
  const contentRef = useRef<HTMLDivElement>(null); // ✅ Создаем ref

  return (
    <div ref={contentRef} className="border-b border-gray-200 dark:border-gray-700 pb-3">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center">
          {source.favicon && (
            <img
              src={getValidImageUrl(source.favicon)}
              alt={source.name || "Источник"}
              width={20}
              height={20}
              className="w-6 h-6 rounded-full border border-gray-300 dark:border-gray-600"
              onError={(e) => (e.currentTarget.src = "/placeholder.png")} // ✅ Заглушка при ошибке загрузки
            />
          )}
          <div className="source_name pl-3">
            <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">
              {source.name}
            </span>
          </div>
        </div>

        {/* ✅ Передаем ссылку на контент для рендера */}
        <DropdownButton shareUrl={shareUrl} title={title} elementRef={contentRef} />
      </div>

      <h1 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">{title}</h1>

      <p className="text-xs text-gray-500 dark:text-gray-400 font-semibold mt-1">
        <DynamicTimeDisplay creationDate={creationDate} />
      </p>
    </div>
  );
};

export default NewsHeader;
