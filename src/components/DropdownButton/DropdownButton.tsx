"use client";

import React, { useState } from "react";
import { Share2 } from "lucide-react";
import html2canvas from "html2canvas";
import ShareButtons from "@/components/ShareButtons/ShareButtons"; // Импорт компонента для кнопок социальных сетей

interface DropdownButtonProps {
  shareUrl: string;
  title: string;
  elementRef: React.RefObject<HTMLDivElement>;
}

const DropdownButton: React.FC<DropdownButtonProps> = ({ shareUrl, title, elementRef }) => {
  const [open, setOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const captureElement = async () => {
    if (!elementRef.current) {
      console.error("❌ Не найден элемент для рендера.");
      return;
    }

    try {
      const canvas = await html2canvas(elementRef.current, {
        useCORS: true,
        logging: true,
        scale: 2,
      });

      const img = canvas.toDataURL("image/png");
      setImageUrl(img);

      console.log("✅ Скриншот создан:", img);
    } catch (error) {
      console.error("🚨 Ошибка при создании скриншота:", error);
    }
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    // Устанавливаем изображение по умолчанию, если не удается загрузить
    e.target.src = '/default-image.jpg'; 
  };

  return (
    <div className="relative">
      <button
        onClick={() => {
          setOpen(true);
          captureElement(); // Создание скриншота при нажатии
        }}
        className="p-2 rounded-full bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-500"
      >
        <Share2 className="w-5 h-5" />
      </button>

      <ShareButtons
        open={open}
        onClose={() => setOpen(false)}
        shareUrl={shareUrl}
        title={title}
        imageUrl={imageUrl || "/default-image.jpg"} // Если imageUrl нет, используем изображение по умолчанию
      />
    </div>
  );
};

export default DropdownButton;
