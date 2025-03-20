import CategoryNewsList from "@/components/CategoryNewsList/CategoryNewsList";
import PopularStories from "@/components/PopularStories/PopularStories";
import EditorialPicks from "@/components/EditorialPicks/EditorialPicks";
import AdBanner from "@/components/AdBanner/AdBanner";

const HomePage = () => {
  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 mt-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
        {/* Основной контент */}
        <div className="md:col-span-3">
          <CategoryNewsList />
        </div>

        {/* Рекламный баннер */}
        <div className="pt-10 hidden md:flex justify-center">
          <AdBanner imageSrc="bg.png" />
        </div>

        {/* Популярные сюжеты */}
        <div className="md:col-span-3">
          <PopularStories />
        </div>

        {/* Выбор редакции, теперь шире */}
        <div className="pt-5 md:col-span-3 lg:col-span-1">
          <EditorialPicks />
        </div>
      </div>
    </main>
  );
};

export default HomePage;
