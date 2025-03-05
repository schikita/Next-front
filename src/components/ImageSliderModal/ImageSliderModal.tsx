"use client";

import React, { useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface ImageSliderModalProps {
  mainImages: string[];
}

const ImageSliderModal: React.FC<ImageSliderModalProps> = ({ mainImages }) => {
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleClickOpen = (image: string, index: number) => {
    setSelectedImage(image);
    setCurrentIndex(index);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handlePrevious = () => {
    const newIndex = (currentIndex - 1 + mainImages.length) % mainImages.length;
    setSelectedImage(mainImages[newIndex]);
    setCurrentIndex(newIndex);
  };

  const handleNext = () => {
    const newIndex = (currentIndex + 1) % mainImages.length;
    setSelectedImage(mainImages[newIndex]);
    setCurrentIndex(newIndex);
  };

  return (
    <>
      {/* Миниатюры изображений */}
      <div className="flex gap-2 overflow-x-auto">
        {mainImages.map((image, index) => (
          <div
            key={index}
            className="relative w-full h-40 rounded-lg overflow-hidden cursor-pointer"
            onClick={() => handleClickOpen(image, index)}
          >
            <Image
              src={image}
              alt={`Thumbnail ${index}`}
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
            {index === mainImages.length - 1 && mainImages.length > 3 && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white text-sm font-bold">
                + Ещё фото
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Модальное окно */}
      {open && selectedImage && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50">
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-white p-2"
          >
            <X className="w-6 h-6" />
          </button>

          <button
            onClick={handlePrevious}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white p-2"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>

          <div className="relative w-full max-w-3xl h-auto">
            <Image
              src={selectedImage}
              alt="Selected Story"
              layout="responsive"
              width={800}
              height={500}
              className="rounded-lg"
            />
          </div>

          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white p-2"
          >
            <ChevronRight className="w-8 h-8" />
          </button>
        </div>
      )}
    </>
  );
};

export default ImageSliderModal;
