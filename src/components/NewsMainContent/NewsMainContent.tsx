import React from "react";
import ImageSliderModal from "@/components/ImageSliderModal/ImageSliderModal";

interface NewsMainContentProps {
  mainImages?: string[];
  text: string;
  url?: string;
  articleId: number;
  loading: boolean;
}

const NewsMainContent: React.FC<NewsMainContentProps> = ({
  mainImages = [],
  text,
  url,
  loading,
}) => {
  return (
    <div className="flex flex-col space-y-4 p-4 bg-white dark:bg-gray-900 rounded-lg shadow-md">
      {/* Основной контент */}
      <div className="text-gray-800 dark:text-gray-300 text-base leading-relaxed">
        {loading ? (
          <div className="w-full h-20 bg-gray-200 dark:bg-gray-700 animate-pulse rounded"></div>
        ) : (
          <p dangerouslySetInnerHTML={{ __html: text }} />
        )}
      </div>

      {/* Блок реакций */}
      <div className="flex items-center space-x-4 text-gray-600 dark:text-gray-400 text-sm">
        <div className="flex items-center space-x-1 cursor-pointer">
          <span>👍</span>
          <span>0</span>
        </div>
        <div className="flex items-center space-x-1 cursor-pointer">
          <span>👎</span>
          <span>0</span>
        </div>
        <div className="flex items-center space-x-1 cursor-pointer">
          <span>😃</span>
          <span>0</span>
        </div>
        <div className="flex items-center space-x-1 cursor-pointer">
          <span>😡</span>
          <span>0</span>
        </div>
      </div>

      {/* Кнопка "Читать в первоисточнике" */}
      {loading ? (
        <div className="w-48 h-10 bg-gray-200 dark:bg-gray-700 animate-pulse rounded"></div>
      ) : (
        url && (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center px-4 py-2 bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-md font-semibold text-sm hover:bg-gray-400 dark:hover:bg-gray-600 transition"
          >
            Читать в первоисточнике
            <svg
              className="w-4 h-4 ml-2 opacity-50"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13 7h4m0 0v4m0-4L7 17"
              ></path>
            </svg>
          </a>
        )
      )}

      {/* Слайдер изображений */}
      {loading ? (
        <div className="w-full h-40 bg-gray-200 dark:bg-gray-700 animate-pulse rounded"></div>
      ) : (
        mainImages.length > 0 && <ImageSliderModal images={mainImages} />
      )}
    </div>
  );
};

export default NewsMainContent;
