'use client';

import { use } from 'react';
import { useArticles } from '@/context/ArticlesContext';
import { CATEGORIES } from '@/data/articles';
import PostCard from '@/components/PostCard';
import PublicLayout from '@/components/PublicLayout';
import Link from 'next/link';
import { useState } from 'react';
import { notFound } from 'next/navigation';

const ITEMS_PER_PAGE = 6;

const colorMap: Record<string, { gradient: string; text: string; border: string; icon_bg: string }> = {
  'cong-nghe': {
    gradient: 'from-primary/10 to-zinc-950',
    text: 'text-primary',
    border: 'border-primary/20',
    icon_bg: 'from-primary to-primary-dark text-black',
  },
  'du-lich': {
    gradient: 'from-emerald-950/40 to-zinc-950',
    text: 'text-emerald-400',
    border: 'border-emerald-800/20',
    icon_bg: 'from-emerald-500 to-emerald-600 text-black',
  },
  'the-thao': {
    gradient: 'from-orange-950/40 to-zinc-950',
    text: 'text-orange-400',
    border: 'border-orange-850/20',
    icon_bg: 'from-orange-500 to-orange-600 text-black',
  },
  'khoa-hoc': {
    gradient: 'from-purple-950/40 to-zinc-950',
    text: 'text-purple-400',
    border: 'border-purple-800/20',
    icon_bg: 'from-purple-500 to-purple-600 text-black',
  },
};

export default function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const { getArticlesByCategory } = useArticles();
  const [page, setPage] = useState(1);

  const category = CATEGORIES.find((c) => c.slug === slug);
  if (!category) return notFound();

  const articles = getArticlesByCategory(slug);
  const sorted = [...articles].sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  const colors = colorMap[slug] || colorMap['cong-nghe'];
  const totalPages = Math.ceil(sorted.length / ITEMS_PER_PAGE);
  const paginated = sorted.slice(0, page * ITEMS_PER_PAGE);
  const hasMore = page < totalPages;

  return (
    <PublicLayout>
      {/* Hero */}
      <div className={`bg-gradient-to-b ${colors.gradient} border-b ${colors.border} py-12 px-4 relative overflow-hidden`}>
        <div className="absolute top-0 right-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs mb-6 uppercase font-bold tracking-wider font-oswald text-zinc-550">
            <Link href="/" className="hover:text-primary transition-colors">Trang Chủ</Link>
            <svg className="w-3.5 h-3.5 text-zinc-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
            <span className={colors.text}>{category.name}</span>
          </div>

          <div className="flex items-center gap-5">
            <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${colors.icon_bg} flex items-center justify-center text-3xl shadow-xl shadow-black/35 font-black`}>
              {category.icon}
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-black text-white mb-1 font-oswald uppercase tracking-tight">
                Chủ đề <span className={colors.text}>{category.name}</span>
              </h1>
              <p className="text-zinc-400 text-xs font-semibold uppercase tracking-wider font-oswald">
                {articles.length} bài viết &bull; Cập nhật liên tục
              </p>
            </div>
          </div>

          {/* Other categories */}
          <div className="flex flex-wrap gap-2.5 mt-8">
            {CATEGORIES.filter((c) => c.slug !== slug).map((c) => (
              <Link
                key={c.id}
                href={`/category/${c.slug}`}
                className="px-3.5 py-1.5 bg-zinc-900/60 hover:bg-zinc-800 border border-zinc-800 rounded-lg text-xs font-bold uppercase tracking-wider font-oswald text-zinc-350 hover:text-white transition-all hover:scale-[1.02]"
              >
                {c.icon} {c.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Articles Grid */}
      <section className="py-12 px-4 bg-zinc-950">
        <div className="max-w-7xl mx-auto">
          {sorted.length === 0 ? (
            <div className="text-center py-20 layer-1 rounded-2xl max-w-lg mx-auto p-8 shadow-xl">
              <div className="text-5xl mb-4">📭</div>
              <h2 className="text-xl font-bold text-white mb-2 font-oswald uppercase">Chưa có bài viết nào</h2>
              <p className="text-zinc-400 text-xs mb-6">Chủ đề này hiện tại chưa được cập nhật bài viết mới. Vui lòng quay lại sau!</p>
              <Link href="/" className="inline-block px-5 py-2.5 bg-primary hover:bg-primary-dark text-black text-xs font-black uppercase tracking-wider rounded-xl transition-colors font-oswald">
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

              {/* Load More / Pagination */}
              <div className="flex flex-col items-center mt-12 gap-3.5">
                <p className="text-zinc-550 text-xs font-semibold uppercase tracking-wider">
                  Hiển thị <span className="text-white font-bold">{Math.min(paginated.length, sorted.length)}</span> / <span className="text-white font-bold">{sorted.length}</span> bài viết
                </p>
                {hasMore && (
                  <button
                    onClick={() => setPage((p) => p + 1)}
                    className="px-6 py-3 bg-primary hover:bg-primary-dark text-black text-xs font-black uppercase tracking-wider rounded-xl transition-all shadow-md shadow-primary/15 flex items-center gap-2 font-oswald"
                  >
                    <svg className="w-4 h-4 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Tải Thêm Bài Viết
                  </button>
                )}
                {!hasMore && sorted.length > ITEMS_PER_PAGE && (
                  <p className="text-zinc-500 text-xs font-bold uppercase tracking-wider font-oswald">✅ Đã hiển thị tất cả bài viết</p>
                )}
              </div>
            </>
          )}
        </div>
      </section>
    </PublicLayout>
  );
}
