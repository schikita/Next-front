'use client';

import { useState, useEffect } from "react";
import CategoryNewsList from "@/components/CategoryNewsList/CategoryNewsList";
import { useUser } from "@/context/UserContext"; 
import PopularStories from "@/components/PopularStories/PopularStories";
import EditorialPicks from "@/components/EditorialPicks/EditorialPicks";
import AdBanner from "@/components/AdBanner/AdBanner";

const HomePage = () => {
  const [loading, setLoading] = useState(true);
  const { isAuthModalOpen } = useUser(); 

  useEffect(() => {
    setTimeout(() => {
      setLoading(false); // Симуляция окончания загрузки
    }, 2000);
  }, []);

  return (
    <main className="max-w-6xl mx-auto px-0 sm:px-0 md:px-8 mt-6">
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-4 gap-2">

        {/* Основной контент */}
        <div className="md:col-span-3">
          {loading ? (
            <div className="h-60 w-full bg-gray-300 dark:bg-gray-700 animate-pulse rounded-lg"></div> // Скелетон для CategoryNewsList
          ) : (
            <CategoryNewsList />
          )}
        </div>

        {/* Рекламный баннер */}
        <div className="pt-10 hidden md:flex justify-center">
          {loading ? (
            <div className="h-24 w-3/4 bg-gray-300 dark:bg-gray-700 animate-pulse rounded-lg"></div> // Скелетон для AdBanner
          ) : (
            <AdBanner imageSrc="bg.png" />
          )}
        </div>

        {/* Популярные сюжеты */}
        <div className=" md:col-span-3">
          {loading ? (
            <div className="h-72 w-full bg-gray-300 dark:bg-gray-700 animate-pulse rounded-lg"></div> // Скелетон для PopularStories
          ) : (
                <PopularStories />
             
            
          )}
        </div>

        {/* Выбор редакции */}
        <div className="pt-5 md:col-span-3 lg:col-span-1">
          {loading ? (
            <div className="h-60 w-full bg-gray-300 dark:bg-gray-700 animate-pulse rounded-lg"></div> // Скелетон для EditorialPicks
          ) : (
            <EditorialPicks />
          )}
        </div>
      </div>
    </main>
  );
};

export default HomePage;
