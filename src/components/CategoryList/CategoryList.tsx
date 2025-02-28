"use client";

import React from "react";
import Link from "next/link";

interface Category {
  id: number;
  name: string;
  code_name: string;
}

interface Props {
  categories: Category[];
}

const CategoryList: React.FC<Props> = ({ categories }) => {
  return (
    <div className="flex overflow-x-auto space-x-3 py-2">
      {categories.map((category) => (
        <Link
          key={category.id}
          href={`/?category=${category.id}`}
          className="px-4 py-2 text-sm font-medium bg-white shadow rounded-full border border-gray-300 hover:bg-gray-100 transition"
        >
          {category.name}
        </Link>
      ))}
    </div>
  );
};

export default CategoryList;
