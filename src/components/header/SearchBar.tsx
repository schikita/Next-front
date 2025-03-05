'use client';

import React from "react";

const SearchBar = () => {
  return (
    <input
      type="text"
      placeholder="Поиск новостей..."
      className="px-4 py-2 border rounded-md w-full transition-all duration-200 
                 text-gray-900 placeholder-gray-500 border-gray-300
                 dark:bg-gray-800 dark:text-#7a2929 dark:placeholder-gray-400 dark:border-#ff0000-600
                 focus:ring-2 focus:ring-#ff0000-500 dark:focus:ring-blue-400"
    />
  );
};

export default SearchBar;
