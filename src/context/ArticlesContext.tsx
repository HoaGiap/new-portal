'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Article, INITIAL_ARTICLES } from '@/data/articles';

interface ArticlesContextType {
  articles: Article[];
  addArticle: (article: Omit<Article, 'id' | 'publishedAt' | 'views'>) => void;
  updateArticle: (id: string, article: Partial<Article>) => void;
  deleteArticle: (id: string) => void;
  getArticleById: (id: string) => Article | undefined;
  getArticlesByCategory: (slug: string) => Article[];
  searchArticles: (query: string) => Article[];
}

const ArticlesContext = createContext<ArticlesContextType | undefined>(undefined);

export function ArticlesProvider({ children }: { children: React.ReactNode }) {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('news_articles');
    if (stored) {
      setArticles(JSON.parse(stored));
    } else {
      setArticles(INITIAL_ARTICLES);
      localStorage.setItem('news_articles', JSON.stringify(INITIAL_ARTICLES));
    }
  }, []);

  const saveToStorage = (data: Article[]) => {
    localStorage.setItem('news_articles', JSON.stringify(data));
  };

  const addArticle = useCallback((articleData: Omit<Article, 'id' | 'publishedAt' | 'views'>) => {
    const newArticle: Article = {
      ...articleData,
      id: Date.now().toString(),
      publishedAt: new Date().toISOString(),
      views: 0,
    };
    setArticles((prev) => {
      const updated = [newArticle, ...prev];
      saveToStorage(updated);
      return updated;
    });
  }, []);

  const updateArticle = useCallback((id: string, articleData: Partial<Article>) => {
    setArticles((prev) => {
      const updated = prev.map((a) => (a.id === id ? { ...a, ...articleData } : a));
      saveToStorage(updated);
      return updated;
    });
  }, []);

  const deleteArticle = useCallback((id: string) => {
    setArticles((prev) => {
      const updated = prev.filter((a) => a.id !== id);
      saveToStorage(updated);
      return updated;
    });
  }, []);

  const getArticleById = useCallback(
    (id: string) => articles.find((a) => a.id === id),
    [articles]
  );

  const getArticlesByCategory = useCallback(
    (slug: string) => articles.filter((a) => a.categorySlug === slug),
    [articles]
  );

  const searchArticles = useCallback(
    (query: string) => {
      const q = query.toLowerCase().trim();
      if (!q) return [];
      return articles.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.summary.toLowerCase().includes(q) ||
          a.content.toLowerCase().includes(q)
      );
    },
    [articles]
  );

  return (
    <ArticlesContext.Provider
      value={{ articles, addArticle, updateArticle, deleteArticle, getArticleById, getArticlesByCategory, searchArticles }}
    >
      {children}
    </ArticlesContext.Provider>
  );
}

export function useArticles() {
  const ctx = useContext(ArticlesContext);
  if (!ctx) throw new Error('useArticles must be used within ArticlesProvider');
  return ctx;
}
