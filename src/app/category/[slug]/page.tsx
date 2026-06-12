'use client';

import { use } from 'react';
import { useArticles } from '@/context/ArticlesContext';
import { CATEGORIES } from '@/data/articles';
import PostCard from '@/components/PostCard';
import PublicLayout from '@/components/PublicLayout';
import Link from 'next/link';
import { useState } from 'react';
import { notFound } from 'next/navigation';
import { ChevronRight, RotateCw, Inbox } from 'lucide-react';

const ITEMS_PER_PAGE = 6;

const colorMap: Record<string, { gradient: string; text: string; border: string; icon_bg: string }> = {
  'cong-nghe': {
    gradient: 'from-primary/10 to-zinc-950/20',
    text: 'text-primary',
    border: 'border-primary/20',
    icon_bg: 'from-primary to-accent text-white',
  },
  'du-lich': {
    gradient: 'from-emerald-500/10 to-zinc-950/20',
    text: 'text-emerald-600 dark:text-emerald-400',
    border: 'border-emerald-800/20 dark:border-emerald-500/30',
    icon_bg: 'from-emerald-500 to-teal-600 text-white',
  },
  'the-thao': {
    gradient: 'from-orange-500/10 to-zinc-950/20',
    text: 'text-orange-600 dark:text-orange-400',
    border: 'border-orange-850/20 dark:border-orange-550/30',
    icon_bg: 'from-orange-500 to-orange-600 text-white',
  },
  'khoa-hoc': {
    gradient: 'from-purple-500/10 to-zinc-950/20',
    text: 'text-purple-600 dark:text-purple-400',
    border: 'border-purple-800/20 dark:border-purple-500/30',
    icon_bg: 'from-purple-500 to-indigo-600 text-white',
  },
};

export default function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const { getArticlesByCategory } = useArticles();
  const [page, setPage] = useState(1);
  const [filterSort, setFilterSort] = useState<'date' | 'views'>('date');

  const category = CATEGORIES.find((c) => c.slug === slug);
  if (!category) return notFound();

  const articles = getArticlesByCategory(slug);
  const sorted = [...articles].sort((a, b) => {
    if (filterSort === 'views') return b.views - a.views;
    return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
  });

  const colors = colorMap[slug] || colorMap['cong-nghe'];
  const totalPages = Math.ceil(sorted.length / ITEMS_PER_PAGE);
  const paginated = sorted.slice(0, page * ITEMS_PER_PAGE);
  const hasMore = page < totalPages;

  return (
    <PublicLayout>
      {/* Hero Header */}
      <div className={`bg-gradient-to-b ${colors.gradient} border-b border-border-base/70 py-12 px-6 relative overflow-hidden`}>
        <div className="absolute top-0 right-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10 space-y-6">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs mb-2 uppercase font-bold tracking-wider font-plus-jakarta text-zinc-500">
            <Link href="/" className="hover:text-primary transition-colors">Trang Chủ</Link>
            <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
            <span className={colors.text}>{category.name}</span>
          </nav>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${colors.icon_bg} flex items-center justify-center text-3xl shadow-lg shadow-black/15 font-black`}>
                {category.icon}
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-black text-fg-main mb-1 font-plus-jakarta uppercase tracking-tight">
                  Chủ đề <span className={colors.text}>{category.name}</span>
                </h1>
                <p className="text-zinc-550 dark:text-zinc-400 text-xs font-semibold uppercase tracking-wider font-plus-jakarta">
                  {articles.length} bài viết &bull; Cập nhật tự động
                </p>
              </div>
            </div>

            {/* Filter Toggle */}
            <div className="flex bg-card border border-border-base rounded-xl p-1 w-fit self-start sm:self-center font-plus-jakarta">
              <button
                onClick={() => { setFilterSort('date'); setPage(1); }}
                className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                  filterSort === 'date'
                    ? 'bg-gradient-to-r from-primary to-accent text-white shadow-sm'
                    : 'text-zinc-500 hover:text-fg-main'
                }`}
              >
                Mới Nhất
              </button>
              <button
                onClick={() => { setFilterSort('views'); setPage(1); }}
                className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                  filterSort === 'views'
                    ? 'bg-gradient-to-r from-primary to-accent text-white shadow-sm'
                    : 'text-zinc-500 hover:text-fg-main'
                }`}
              >
                Xem Nhiều
              </button>
            </div>
          </div>

          {/* Quick links to other categories */}
          <div className="flex flex-wrap gap-2 pt-2">
            {CATEGORIES.filter((c) => c.slug !== slug).map((c) => (
              <Link
                key={c.id}
                href={`/category/${c.slug}`}
                className="px-4 py-2 bg-card hover:bg-card-hover border border-border-base rounded-xl text-xs font-bold uppercase tracking-wider font-plus-jakarta text-zinc-650 dark:text-zinc-300 hover:text-primary transition-all hover:scale-[1.02]"
              >
                {c.icon} {c.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Articles Grid */}
      <section className="py-12 px-6 bg-background">
        <div className="max-w-7xl mx-auto">
          {sorted.length === 0 ? (
            <div className="text-center py-20 bg-card border border-border-base rounded-2xl max-w-lg mx-auto p-8 shadow-premium">
              <Inbox className="w-12 h-12 text-zinc-500 mx-auto mb-4" />
              <h2 className="text-xl font-bold text-fg-main mb-2 font-plus-jakarta uppercase">Chưa có bài viết nào</h2>
              <p className="text-zinc-500 dark:text-zinc-400 text-xs mb-6">Chủ đề này hiện tại chưa được cập nhật bài viết mới. Vui lòng quay lại sau!</p>
              <Link href="/" className="inline-block px-5 py-2.5 bg-gradient-to-r from-primary to-accent hover:opacity-95 text-white text-xs font-black uppercase tracking-wider rounded-xl transition-colors font-plus-jakarta">
                Quay Về Trang Chủ
              </Link>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginated.map((article, i) => (
                  <PostCard key={article.id} article={article} variant="default" index={i} />
                ))}
              </div>

              {/* Load More Button */}
              <div className="flex flex-col items-center mt-12 gap-3.5">
                <p className="text-zinc-500 dark:text-zinc-400 text-xs font-bold uppercase tracking-wider">
                  Hiển thị <span className="text-fg-main font-bold">{Math.min(paginated.length, sorted.length)}</span> / <span className="text-fg-main font-bold">{sorted.length}</span> bài viết
                </p>
                {hasMore && (
                  <button
                    onClick={() => setPage((p) => p + 1)}
                    className="px-6 py-3 bg-gradient-to-r from-primary to-accent hover:opacity-95 text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all shadow-lg glow-primary flex items-center gap-2 font-plus-jakarta"
                  >
                    <RotateCw className="w-4 h-4 text-white animate-pulse" />
                    Tải Thêm Bài Viết
                  </button>
                )}
                {!hasMore && sorted.length > ITEMS_PER_PAGE && (
                  <p className="text-zinc-550 dark:text-zinc-400 text-xs font-bold uppercase tracking-wider font-plus-jakarta">✅ Đã hiển thị tất cả bài viết</p>
                )}
              </div>
            </>
          )}
        </div>
      </section>
    </PublicLayout>
  );
}
