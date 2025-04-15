import React, { useState } from "react";
import { updateChannelLogo } from "@/lib/api"; // Подключаем API метод

interface ChannelLogoEditProps {
  currentLogo: string;
  channelId: number;
  isEditable: boolean;
  onLogoChange: (logo: string) => void;
  onClose: () => void;
}

const ChannelLogoEdit: React.FC<ChannelLogoEditProps> = ({
  currentLogo,
  channelId,
  isEditable,
  onLogoChange,
  onClose,
}) => {
  const [previewLogo, setPreviewLogo] = useState(currentLogo);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return; // Если файл не выбран, выходим

    setLoading(true);
    setError(null); // Сбрасываем предыдущие ошибки

    try {
      // Обновляем фавиконку через API
      const updatedChannel = await updateChannelLogo(channelId.toString(), file); // Если channelId это строка


      onLogoChange(updatedChannel.favicon); // Обновляем логотип в родительском компоненте
      setPreviewLogo(updatedChannel.favicon); // Обновляем превью логотипа
    } catch (err) {
      console.error("Ошибка при загрузке логотипа:", err);
      setError("Не удалось загрузить логотип. Попробуйте снова."); // Отображаем ошибку
    } finally {
      setLoading(false); // Включаем состояние загрузки в false после завершения
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {loading ? (
        <div className="w-20 h-20 bg-gray-300 animate-pulse rounded-full" />
      ) : (
        <img
          src={previewLogo || "https://via.placeholder.com/80"}
          alt="Логотип канала"
          className="w-20 h-20 rounded-full object-cover"
        />
      )}
      {isEditable ? (
        <>
          <label className="cursor-pointer py-2 px-4 bg-blue-500 text-white rounded">
            {loading ? "Загрузка..." : "Загрузить логотип"}
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={handleFileChange}
            />
          </label>
          {error && <div className="text-red-500 text-sm">{error}</div>}
        </>
      ) : (
        <div className="text-gray-500">У вас нет прав для изменения логотипа.</div>
      )}
      <button
        onClick={onClose}
        className="mt-4 py-2 px-4 bg-gray-300 text-black rounded hover:bg-gray-400"
      >
        Отмена
      </button>
    </div>
  );
};

export default ChannelLogoEdit;
