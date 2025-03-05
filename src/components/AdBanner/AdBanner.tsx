import React from "react";

interface AdBannerProps {
  imageSrc: string;
}

const AdBanner: React.FC<AdBannerProps> = ({ imageSrc }) => {
  return (
    <div className="w-[260px] h-[420px] border border-gray-300 rounded-lg shadow-lg overflow-hidden">
      <a
        href="https://geely-minsk.by/"
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full h-full"
      >
        <img
          src={imageSrc}
          alt="Рекламный баннер"
          className="w-full h-full object-cover"
        />
      </a>
    </div>
  );
};

export default AdBanner;
