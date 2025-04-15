import { useState, useEffect, useCallback } from "react";
import { FaTrash } from "react-icons/fa"; // Использование иконки "удалить"
import StoryCard from "@/components/StoryCard/StoryCard"; // Подключаем компонент StoryCard
import { deleteNews, getPublications } from "@/lib/api"; // Импортируем методы API

// Определяем типы для публикаций
type Publication = {
  id: number;
  title: string;
  summary: string;
  text: string;
  main_image: string;
  publication_at: string;
  category?: {
    name: string;
  };
};

// Интерфейс для параметров компонента
type ChannelPublicationsProps = {
  channelId: number;
  theme: string;
  isEditable: boolean;
};

const ChannelPublications: React.FC<ChannelPublicationsProps> = ({
  channelId,
  theme,
  isEditable,
}) => {
  const [publications, setPublications] = useState<Publication[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedNewsId, setSelectedNewsId] = useState<number | null>(null);
  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  // Функция для получения публикаций с сервера
  const fetchPublications = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getPublications(channelId); // Получаем публикации с сервера
      setPublications(data);
    } catch (error) {
      console.error("Ошибка при загрузке публикаций:", error);
    } finally {
      setLoading(false);
    }
  }, [channelId]);

  useEffect(() => {
    fetchPublications();
  }, [fetchPublications]);

  // Удаление новости
  const handleDeleteNews = async () => {
    try {
      if (selectedNewsId) {
        await deleteNews(selectedNewsId); // Удаляем новость по ID
        setPublications((prev) =>
          prev.filter((pub) => pub.id !== selectedNewsId) // Убираем удаленную новость из списка
        );
        setModalOpen(false); // Закрываем модальное окно
      }
    } catch (err) {
      console.error("Ошибка при удалении новости:", err);
    }
  };

  const openDeleteModal = (newsId: number) => {
    setSelectedNewsId(newsId);
    setModalOpen(true); // Открываем модальное окно подтверждения удаления
  };

  const closeDeleteModal = () => {
    setModalOpen(false);
    setSelectedNewsId(null); // Закрываем модальное окно и сбрасываем выбранный ID новости
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-3">Подборки автора</h2>
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="w-full h-72 bg-gray-300 animate-pulse rounded"
            />
          ))}
        </div>
      ) : publications.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {publications.map((publication) => (
            <div key={publication.id} className="relative w-full h-full">
              {isEditable && (
                <button
                  onClick={() => openDeleteModal(publication.id)}
                  className="absolute top-2 left-2 bg-black text-white p-2 rounded-full"
                >
                  <FaTrash />
                </button>
              )}
              <StoryCard
                story={{
                  id: publication.id,
                  title: publication.title,
                  summary: publication.summary || publication.text, // Краткое описание
                  main_image: publication.main_image, // Изображение
                  category: publication.category ? publication.category : { name: "Без категории" }, // Если category нет, указываем значение по умолчанию
                  publication_at: publication.publication_at || "Дата не указана", // Если дата не указана, выводим "Дата не указана"
                }}
                theme={theme}
              />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center">Публикаций пока нет.</p>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">
              Действительно ли желаете удалить новость?
            </h3>
            <div className="flex justify-between">
              <button
                onClick={handleDeleteNews}
                className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded"
              >
                Да
              </button>
              <button
                onClick={closeDeleteModal}
                className="border-gray-500 text-gray-500 border px-4 py-2 rounded"
              >
                Отмена
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChannelPublications;
