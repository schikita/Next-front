"use client";

import { useEffect, useState } from "react";
import useCategories from "@/components/CategorySlider/useCategories";
import CategorySlider from "@/components/CategorySlider/CategorySlider";

const HomePage = () => {
  const { categories, loading, error } = useCategories();
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  useEffect(() => {
    if (categories.length > 0) {
      const politicsCategory = categories.find((cat) => cat.name === "Политика");
      if (politicsCategory) {
        setSelectedCategory(politicsCategory.id);
      }
    }
  }, [categories]); // Выполняем только после загрузки категорий

  if (loading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <main>
      
      <CategorySlider 
        categories={categories} 
        selectedCategory={selectedCategory} 
        onSelectCategory={setSelectedCategory} // Передаем управление выбором категории
      />
    </main>
  );
};

export default HomePage;
