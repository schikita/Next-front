import CategoryNavigation from "@/components/CategoryNavigation/CategoryNavigation";

const CategoryPage = () => {
  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 mt-6">
      <CategoryNavigation />
      <h1 className="text-xl font-bold mt-4">Сюжеты категории</h1>
      {/* Тут будет контент категории */}
    </main>
  );
};

export default CategoryPage;
