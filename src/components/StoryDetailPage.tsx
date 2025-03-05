"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import CategorySlider from "@/components/CategorySlider/CategorySlider";
import NewsHeader from "@/components/NewsHeader/NewsHeader";
import NewsMainContent from "@/components/NewsDetailPage/NewsMainContent";
import RelatedArticles from "@/components/NewsDetailPage/RelatedArticles";
import RelevantSideBar from "@/components/RelevantSideBar";
import RecommendationsWithAd from "@/components/NewsDetailPage/RecommendationsWithAd";
import EditorialPicks from "@/components/HomePage/EditorialPicks";
import AdBanner from "@/components/AdBanner";
import NotFound from "@/components/NotFound";

interface Category {
  id: number;
  name: string;
  code_name: string;
}

interface Source {
  id: number;
  name: string;
  url: string;
  favicon?: string;
}

interface NewsArticle {
  id: number;
  title: string;
  description: string;
  summary: string;
  text: string;
  url: string;
  publication_at: string;
  source: Source;
  main_image: string;
}

interface Story {
  id: number;
  creation_at: string;
  category: Category;
  news_articles: NewsArticle[];
  main_images: string[];
}

const StoryDetailPage = () => {
  const { id } = useParams();
  const [story, setStory] = useState<Story | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(
    null
  );
  const [relatedStories, setRelatedStories] = useState<Story[]>([]);

  // 🔹 Загрузка данных истории и связанных материалов
  useEffect(() => {
    const fetchStoryDetails = async () => {
      setLoading(true);
      try {
        const res = await fetch(`https://zn.by/api/v1/stories/${id}/`);
        if (!res.ok) throw new Error("Сюжет не найден");
        const data: Story = await res.json();

        setStory(data);
        setSelectedArticle(data.news_articles[0]);

        // Загружаем связанные истории
        const relatedRes = await fetch(
          `https://zn.by/api/v1/stories/?category=${data.category.id}&page_size=5`
        );
        const relatedData = await relatedRes.json();
        setRelatedStories(
          relatedData.results.filter((item: Story) => item.id !== data.id)
        );
      } catch (error) {
        console.error("Ошибка загрузки:", error);
        setError("Сюжет не найден.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchStoryDetails();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [id]);

  if (!loading && error) return <NotFound />;

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 mt-6">
      {/* Слайдер категорий */}
      <div className="mb-6">
        <CategorySlider
          categories={[]} // Можно добавить категории, если API поддерживает
          selectedCategory={story?.category.id || null}
          onSelectCategory={() => {}}
        />
      </div>

      {/* Основная сетка контента */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Основной контент */}
        <div className="md:col-span-3">
          {loading ? (
            <p>Загрузка...</p>
          ) : (
            <>
              {selectedArticle && (
                <>
                  {/* Заголовок */}
                  <NewsHeader
                    source={selectedArticle.source}
                    creationDate={selectedArticle.publication_at}
                    title={selectedArticle.title}
                    shareUrl={`https://zn.by/story/${id}`}
                  />

                  {/* Основной контент */}
                  <NewsMainContent
                    mainImages={story?.main_images || []}
                    text={selectedArticle.text}
                    url={selectedArticle.url}
                    articleId={id}
                    description={selectedArticle.summary}
                    sourceName={selectedArticle.source.name}
                  />

                  {/* Похожие статьи */}
                  <div className="mt-6">
                    <RelatedArticles
                      articles={story?.news_articles || []}
                      onArticleClick={setSelectedArticle}
                      selectedArticle={selectedArticle}
                    />
                  </div>

                  {/* Рекомендации */}
                  <div className="mt-6">
                    <RecommendationsWithAd type="recommendations" />
                  </div>
                </>
              )}
            </>
          )}
        </div>

        {/* Боковая колонка */}
        <div className="hidden md:block">
          {loading ? (
            <p>Загрузка...</p>
          ) : (
            <RelevantSideBar
              relatedStories={relatedStories}
              onStoryClick={() => {}}
            />
          )}

          {/* Редакционные подборки */}
          <div className="mt-4">
            <EditorialPicks />
          </div>

          {/* Рекламный баннер */}
          <div className="mt-6 flex justify-center">
            <AdBanner imageSrc="/ads/banner.jpg" />
          </div>
        </div>
      </div>
    </main>
  );
};

export default StoryDetailPage;
