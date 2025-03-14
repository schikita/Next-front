"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Dialog } from "@headlessui/react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface ImageSliderModalProps {
  images: string[];
}

const ImageSliderModal: React.FC<ImageSliderModalProps> = ({ images }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleOpen = (index: number) => {
    setSelectedIndex(index);
    setIsOpen(true);
  };

  const handlePrevious = () => {
    setSelectedIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    setSelectedIndex((prev) => (prev + 1) % images.length);
  };

  // Определяем количество видимых изображений в зависимости от ширины экрана
  const getVisibleImagesCount = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth < 550) return 1;
      if (window.innerWidth < 1150) return 2;
    }
    return 3;
  };

  const visibleImagesCount = getVisibleImagesCount();
  const remainingImages = images.length - visibleImagesCount;

  return (
    <>
      {/* Галерея миниатюр */}
      <div className="flex gap-2 mt-4">
        {images.slice(0, visibleImagesCount).map((image, index) => {
          const isLastVisible = index === visibleImagesCount - 1;

          return (
            <div
              key={index}
              className="relative w-full h-36 rounded-lg overflow-hidden cursor-pointer"
              onClick={() => handleOpen(index)}
            >
              <Image
                src={image}
                alt={`Фото ${index + 1}`}
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
              {isLastVisible && remainingImages > 0 && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white font-bold text-lg">
                  +{remainingImages} фото
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Модальное окно для просмотра изображений */}
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center">
          <Dialog.Panel className="relative w-full max-w-4xl p-4">
            <button
              className="absolute top-2 right-2 text-white bg-gray-900 p-2 rounded-full"
              onClick={() => setIsOpen(false)}
            >
              <X size={24} />
            </button>

            {/* Навигационные кнопки */}
            <button
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-900 p-2 rounded-full text-white"
              onClick={handlePrevious}
            >
              <ChevronLeft size={24} />
            </button>

            <Image
              src={images[selectedIndex]}
              alt={`Фото ${selectedIndex + 1}`}
              width={800}
              height={500}
              className="rounded-lg mx-auto"
            />

            <button
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-900 p-2 rounded-full text-white"
              onClick={handleNext}
            >
              <ChevronRight size={24} />
            </button>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
};

export default ImageSliderModal;
