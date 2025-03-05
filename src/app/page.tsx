import React from "react";
import CategoryNewsList from "@/components/CategoryNewsList/CategoryNewsList";
import AdBanner from "@/components/AdBanner/AdBanner";


const HomePage = () => {
  const imageSrc = "bg.png"; // Путь к баннеру

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 mt-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Основной контент */}
        <div className="md:col-span-3">
          <CategoryNewsList />
        </div>

        {/* Рекламный баннер (показывается только на md+) */}
        <div className="pt-10 hidden md:flex justify-center">
          <AdBanner imageSrc={imageSrc} />
        </div>
      </div>
    </main>
  );
};

export default HomePage;

