"use client";

import React, { useEffect, useState } from "react";
import CategoryList from "@/components/CategoryList/CategoryList"; // Импортируем список категорий
import Header from "@/components/header/Header";
import CategoryNewsList from "@/components/CategoryNewsList/CategoryNewsList";

interface Category {
  id: number;
  name: string;
  code_name: string;
}

const HomePage = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("https://zn.by/api/v1/categories/");
        if (!res.ok) {
          throw new Error("Ошибка при загрузке категорий");
        }
        const data = await res.json();
        setCategories(data);
      } catch (err) {
        setError("Ошибка при загрузке категорий");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <>      
      <main className="max-w-6xl mx-auto p-4">
        {loading ? (
          <div>Загрузка...</div>
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : (
          <CategoryList categories={categories} />
        )}

        {/* Другой контент страницы */}
        <section className="mt-4">
          <h1 className="text-2xl font-bold">Главные новости</h1>
          <CategoryNewsList />
        </section>
      </main>
    </>
  );
};

export default HomePage;
