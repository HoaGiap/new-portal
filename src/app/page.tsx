'use client';

import { useArticles } from '@/context/ArticlesContext';
import { CATEGORIES } from '@/data/articles';
import PostCard from '@/components/PostCard';
import PublicLayout from '@/components/PublicLayout';
import Link from 'next/link';

export default function HomePage() {
  const { articles } = useArticles();
  const sorted = [...articles].sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  const featured = sorted[0];
  const secondary = sorted.slice(1, 3);
  const latest = sorted.slice(3, 9);
  const trending = sorted.slice(0, 5);

  return (
    <PublicLayout>
      {/* Hero Banner */}
      <section className="relative bg-zinc-950 py-8 px-4 overflow-hidden border-b border-zinc-900">
        {/* Decorative BG Glow */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-primary/5 blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto">
          {/* Breaking News Ticker */}
          <div className="flex items-center gap-3 mb-6 bg-zinc-900/60 border border-zinc-800/80 rounded-full px-4 py-2 w-fit">
            <span className="px-2 py-0.5 bg-red-600 text-white text-[10px] font-black rounded uppercase tracking-wider animate-pulse">
              LIVE
            </span>
            <p className="text-xs text-zinc-350 truncate max-w-xs sm:max-w-md font-semibold">
              🔥 TIN NÓNG: ChatGPT-5 ra mắt · Việt Nam vô địch AFF Cup · NASA khám phá hành tinh mới
            </p>
          </div>

          {/* Featured Grid */}
          {featured && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-4">
              <div className="lg:col-span-2">
                <PostCard article={featured} variant="featured" />
              </div>
              <div className="flex flex-col gap-5">
                {secondary.map((a, i) => (
                  <PostCard key={a.id} article={a} variant="featured" index={i + 1} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Category Quick Links */}
      <section className="py-6 px-4 border-b border-zinc-900 bg-zinc-950/40">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {CATEGORIES.map((cat) => {
              const catArticles = articles.filter((a) => a.categorySlug === cat.slug);
              const colorMap: Record<string, string> = {
                'cong-nghe': 'border-l-4 border-l-primary group-hover:border-l-primary',
                'du-lich': 'border-l-4 border-l-emerald-400 group-hover:border-l-emerald-400',
                'the-thao': 'border-l-4 border-l-orange-400 group-hover:border-l-orange-400',
                'khoa-hoc': 'border-l-4 border-l-purple-400 group-hover:border-l-purple-400',
              };
              
              const textColors: Record<string, string> = {
                'cong-nghe': 'group-hover:text-primary',
                'du-lich': 'group-hover:text-emerald-400',
                'the-thao': 'group-hover:text-orange-400',
                'khoa-hoc': 'group-hover:text-purple-400',
              };

              return (
                <Link
                  key={cat.id}
                  href={`/category/${cat.slug}`}
                  className={`layer-1 ${colorMap[cat.slug]} rounded-xl p-4 flex items-center gap-3 group transition-all hover:bg-zinc-900 hover:shadow-lg hover:-translate-y-0.5`}
                >
                  <span className="text-2xl flex-shrink-0">{cat.icon}</span>
                  <div className="min-w-0">
                    <p className={`font-bold text-zinc-100 text-sm font-oswald uppercase tracking-wider transition-colors ${textColors[cat.slug]}`}>
                      {cat.name}
                    </p>
                    <p className="text-zinc-500 text-xs mt-0.5 font-medium">{catArticles.length} bài viết</p>
                  </div>
                  <svg className="w-4 h-4 text-zinc-650 ml-auto group-hover:translate-x-1 group-hover:text-zinc-400 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Latest News + Sidebar */}
      <section className="py-12 px-4 bg-zinc-950">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Latest Articles */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-8 pb-3 border-b border-zinc-900">
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-8 bg-primary rounded-full" />
                  <h2 className="text-2xl font-black text-white font-oswald uppercase tracking-tight">
                    Tin Tức Mới Nhất
                  </h2>
                </div>
                <Link href="/search" className="text-primary hover:text-primary-dark text-xs font-bold uppercase tracking-wider flex items-center gap-1 transition-colors font-oswald">
                  Xem tất cả
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {latest.map((article, i) => (
                  <PostCard key={article.id} article={article} variant="default" index={i} />
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Trending / Highlighted */}
              <div className="layer-1 rounded-2xl p-6 shadow-xl">
                <div className="flex items-center gap-3 mb-6 pb-3 border-b border-zinc-850">
                  <div className="w-1.5 h-6 bg-primary rounded-full" />
                  <h3 className="font-bold text-white text-lg font-oswald uppercase tracking-tight">
                    Bài Viết Nổi Bật
                  </h3>
                </div>
                <div className="space-y-5">
                  {trending.map((article, i) => (
                    <div key={article.id} className="flex items-start gap-4 group">
                      <span className={`text-2xl font-black flex-shrink-0 leading-none mt-0.5 font-oswald ${
                        i === 0 ? 'text-primary' : i === 1 ? 'text-emerald-400' : i === 2 ? 'text-orange-400' : 'text-zinc-650'
                      }`}>
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <div className="min-w-0">
                        <Link
                          href={`/post/${article.id}`}
                          className="text-sm font-bold text-zinc-350 group-hover:text-primary transition-colors line-clamp-2 leading-snug font-oswald uppercase tracking-tight"
                        >
                          {article.title}
                        </Link>
                        <p className="text-[11px] text-zinc-550 mt-1 font-semibold">👁 {(article.views / 1000).toFixed(1)}k lượt xem</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* About Widget */}
              <div className="layer-1 bg-gradient-to-br from-zinc-900 to-zinc-950 border border-primary/20 rounded-2xl p-6 text-center shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-2xl pointer-events-none" />
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-black font-black text-2xl mx-auto mb-4 shadow-lg shadow-primary/25">
                  V
                </div>
                <h3 className="font-bold text-white mb-2 text-lg font-oswald tracking-wide">VietNews</h3>
                <p className="text-zinc-400 text-xs leading-relaxed mb-5">
                  Cập nhật tin tức công nghệ, khoa học, thể thao và du lịch liên tục 24/7. Chính xác, tin cậy và khách quan.
                </p>
                <Link
                  href="/contact"
                  className="inline-block w-full px-5 py-2.5 bg-primary hover:bg-primary-dark text-black text-xs font-black uppercase tracking-wider rounded-xl transition-all shadow-md shadow-primary/15 font-oswald text-center"
                >
                  Liên Hệ Ngay
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
