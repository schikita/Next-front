import React, { useState, useEffect } from "react";
import ItemNews from "./ItemNews"; // Импорт компонента элемента новости

interface Story {
  id: number;
  title: string;
  creation_at: string;
  source?: {
    name: string;
    favicon?: string;
  };
}

interface NewsListProps {
  stories: Story[];
  showSkeleton: boolean;
}

const NewsList: React.FC<NewsListProps> = ({ stories, showSkeleton }) => {
  const [visibleCount, setVisibleCount] = useState(5); // Показывать 5 новостей

  useEffect(() => {
    setVisibleCount(5); // Сбрасываем количество видимых элементов при обновлении списка
  }, [stories]);

  const handleShowMore = () => {
    setVisibleCount((prevCount) => prevCount + 5);
  };

  return (
    <div className="mt-4">
      <div className="space-y-2">
        {showSkeleton ? (
          <p>Загрузка...</p>
        ) : (
          stories.slice(0, visibleCount).map((story) => <ItemNews key={story.id} story={story} />)
        )}
      </div>

      {/* Кнопка "Показать ещё" */}
      {visibleCount < stories.length && !showSkeleton && (
        <div className="flex justify-center mt-4">
          <button
            onClick={handleShowMore}
            className="px-4 text-sm font-medium bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition"
          >
            Показать ещё
          </button>
        </div>
      )}
    </div>
  );
};

export default NewsList;
