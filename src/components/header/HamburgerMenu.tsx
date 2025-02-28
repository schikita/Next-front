// src/components/HamburgerMenu.tsx

import React from "react";

const HamburgerMenu = ({ categories }: { categories: Array<any> }) => {
  // Проверяем, что categories не undefined и это массив
  if (!categories || categories.length === 0) {
    return <div>Нет доступных категорий</div>; // Можно отобразить какой-то fallback, если данных нет
  }

  return (
    <div className="lg:hidden">
      <button className="text-gray-600">☰</button>
      <ul>
              {categories.map((category) => (
                <li key={category.id}>{category.name}</li> // Отображаем название категории
              ))}
            </ul>
    </div>
  );
};

export default HamburgerMenu;
