"use client";

import Head from "next/head";
import { useEffect, useState } from "react";
import { useParams, notFound } from "next/navigation";
import CategoryNavigation from "@/components/CategoryNavigation/CategoryNavigation";
import NewsHeader from "@/components/NewsHeader/NewsHeader";
import NewsMainContent from "@/components/NewsMainContent/NewsMainContent";
import RelatedArticles from "@/components/RelatedArticles/RelatedArticles";
import RelevantSideBar from "@/components/RelevantSideBar/RelevantSideBar";

interface Category {
  id: number;
  name: string;
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
  description?: string;
  summary?: string;
  text?: string;
  url: string;
  publication_at: string;
  source: Source;
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
  const [error, setError] = useState<boolean>(false);
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [relatedStories, setRelatedStories] = useState<Story[]>([]);

  useEffect(() => {
    const fetchStoryDetails = async () => {
      setLoading(true);
      try {
        const res = await fetch(`https://zn.by/api/v1/stories/${id}/`);
        if (!res.ok) throw new Error("Сюжет не найден");
        const data: Story = await res.json();

        setStory(data);
        setSelectedArticle(data.news_articles[0] || null);

        const relatedRes = await fetch(
          `https://zn.by/api/v1/stories/?category=${data.category.id}&page_size=5`
        );
        if (!relatedRes.ok) throw new Error("Ошибка загрузки связанных сюжетов");
        const relatedData = await relatedRes.json();

        setRelatedStories(relatedData.results.filter((item: Story) => item.id !== data.id));
      } catch (error) {
        console.error("Ошибка загрузки:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchStoryDetails();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [id]);

  if (error) return notFound();

  const pageTitle = selectedArticle?.title || "Новость";
  const pageDescription =
    selectedArticle?.summary || selectedArticle?.description || "Читайте свежие новости на Zn.by";
  const pageImage = story?.main_images?.[0] || "/default-news-image.jpg";
  const pageUrl = `https://zn.by/story/${id}`;

  return (
    <>
      <Head>
        <title>{pageTitle} | Zn.by</title>
        <meta name="description" content={pageDescription} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content={pageImage} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Zn.by" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={pageImage} />
      </Head>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 mt-6">
        <div className="mb-6">
          <CategoryNavigation />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-3">
            {loading ? (
              <p className="text-center text-gray-500">Загрузка...</p>
            ) : (
              story && selectedArticle && (
                <>
                  <NewsHeader
                    source={selectedArticle.source}
                    creationDate={selectedArticle.publication_at}
                    title={selectedArticle.title}
                    shareUrl={pageUrl}
                  />

                  <NewsMainContent
                    mainImages={story.main_images || []}
                    text={selectedArticle.summary || selectedArticle.description || ""}
                    url={selectedArticle.url}
                    articleId={Number(id)}
                    loading={loading}
                  />

                  {story.news_articles.length > 1 && (
                    <RelatedArticles
                      articles={story.news_articles.filter(
                        (article) => article.id !== selectedArticle?.id
                      )}
                      onArticleClick={(article) => setSelectedArticle(article)}
                      selectedArticle={selectedArticle}
                    />
                  )}
                </>
              )
            )}
          </div>

          <aside className="hidden md:block">
            {!loading && Array.isArray(relatedStories) && relatedStories.length > 0 && (
              <RelevantSideBar excludeId={Number(id)} relatedStories={relatedStories} />
            )}
          </aside>
        </div>
      </main>
    </>
  );
};

export default StoryDetailPage;