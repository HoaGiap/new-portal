'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Article, INITIAL_ARTICLES } from '@/data/articles';

interface Toast {
  message: string;
  type: 'success' | 'error' | 'info';
}

interface ArticlesContextType {
  articles: Article[];
  addArticle: (article: Omit<Article, 'id' | 'publishedAt' | 'views'>) => void;
  updateArticle: (id: string, article: Partial<Article>) => void;
  deleteArticle: (id: string) => void;
  getArticleById: (id: string) => Article | undefined;
  getArticlesByCategory: (slug: string) => Article[];
  searchArticles: (query: string) => Article[];
  toast: Toast | null;
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  hideToast: () => void;
}

const ArticlesContext = createContext<ArticlesContextType | undefined>(undefined);

export function ArticlesProvider({ children }: { children: React.ReactNode }) {
  const [articles, setArticles] = useState<Article[]>([]);
  const [toast, setToast] = useState<Toast | null>(null);

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

  const showToast = useCallback((message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToast({ message, type });
  }, []);

  const hideToast = useCallback(() => {
    setToast(null);
  }, []);

  // Auto hide toast after 3 seconds
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

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
      showToast('Đã thêm bài viết mới thành công! 🎉', 'success');
      return updated;
    });
  }, [showToast]);

  const updateArticle = useCallback((id: string, articleData: Partial<Article>) => {
    setArticles((prev) => {
      const updated = prev.map((a) => (a.id === id ? { ...a, ...articleData } : a));
      saveToStorage(updated);
      showToast('Đã cập nhật bài viết thành công! 📝', 'success');
      return updated;
    });
  }, [showToast]);

  const deleteArticle = useCallback((id: string) => {
    setArticles((prev) => {
      const updated = prev.filter((a) => a.id !== id);
      saveToStorage(updated);
      showToast('Đã xóa bài viết thành công! 🗑️', 'info');
      return updated;
    });
  }, [showToast]);

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
      value={{
        articles,
        addArticle,
        updateArticle,
        deleteArticle,
        getArticleById,
        getArticlesByCategory,
        searchArticles,
        toast,
        showToast,
        hideToast
      }}
    >
      {children}
      
      {/* Toast Notification Element */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-100 animate-fade-in-up">
          <div className={`flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-xl border text-sm font-bold uppercase tracking-wider font-plus-jakarta ${
            toast.type === 'success'
              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
              : toast.type === 'error'
              ? 'bg-red-500/10 text-red-400 border-red-500/20'
              : 'bg-primary/10 text-primary border-primary/20'
          } bg-zinc-900/95 backdrop-blur-md`}>
            <span>{toast.type === 'success' ? '✅' : toast.type === 'error' ? '❌' : 'ℹ️'}</span>
            <span>{toast.message}</span>
            <button onClick={hideToast} className="ml-2 hover:opacity-80">✕</button>
          </div>
        </div>
      )}
    </ArticlesContext.Provider>
  );
}

export function useArticles() {
  const ctx = useContext(ArticlesContext);
  if (!ctx) throw new Error('useArticles must be used within ArticlesProvider');
  return ctx;
}
