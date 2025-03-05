"use client";

import React from "react";
import CategoryNewsList from "@/components/CategoryNewsList/CategoryNewsList";

const HomePage = () => {
  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 mt-6">
      <CategoryNewsList />
    </main>
  );
};

export default HomePage;
