import React, { useState } from "react";

interface ImageSliderModalProps {
  images: string[];
}

const ImageSliderModal: React.FC<ImageSliderModalProps> = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(images[0]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [open, setOpen] = useState(false);

  if (!images.length) return null;

  const handleNext = () => {
    const newIndex = (currentIndex + 1) % images.length;
    setSelectedImage(images[newIndex]);
    setCurrentIndex(newIndex);
  };

  const handlePrev = () => {
    const newIndex = (currentIndex - 1 + images.length) % images.length;
    setSelectedImage(images[newIndex]);
    setCurrentIndex(newIndex);
  };

  return (
    <div className="relative">
      <div className="flex space-x-2">
        {images.slice(0, 3).map((image, index) => (
          <img
            key={index}
            src={image}
            alt="Thumbnail"
            className="w-20 h-20 object-cover rounded-md cursor-pointer"
            onClick={() => {
              setSelectedImage(image);
              setCurrentIndex(index);
              setOpen(true);
            }}
          />
        ))}
        {images.length > 3 && (
          <div
            className="w-20 h-20 flex items-center justify-center bg-gray-500 text-white rounded-md cursor-pointer"
            onClick={() => setOpen(true)}
          >
            +{images.length - 3}
          </div>
        )}
      </div>

      {/* Модальное окно */}
      {open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
          <div className="relative w-11/12 md:w-2/3 lg:w-1/2">
            <button
              className="absolute top-2 right-2 text-white text-lg"
              onClick={() => setOpen(false)}
            >
              ✕
            </button>
            <img
              src={selectedImage}
              alt="Selected"
              className="w-full max-h-[80vh] object-contain rounded-md"
            />
            <button
              className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white"
              onClick={handlePrev}
            >
              ◀
            </button>
            <button
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white"
              onClick={handleNext}
            >
              ▶
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageSliderModal;
