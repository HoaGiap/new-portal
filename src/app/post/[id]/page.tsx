'use client';

import { use } from 'react';
import { useArticles } from '@/context/ArticlesContext';
import PublicLayout from '@/components/PublicLayout';
import PostCard from '@/components/PostCard';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default function PostDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { getArticleById, getArticlesByCategory } = useArticles();

  const article = getArticleById(id);
  if (!article) return notFound();

  const related = getArticlesByCategory(article.categorySlug)
    .filter((a) => a.id !== article.id)
    .slice(0, 3);

  const categoryColorMap: Record<string, string> = {
    'cong-nghe': 'bg-primary/10 text-primary border-primary/20',
    'du-lich': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    'the-thao': 'bg-orange-500/10 text-orange-400 border-orange-500/20',
    'khoa-hoc': 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  };
  
  const categoryBgMap: Record<string, string> = {
    'cong-nghe': 'from-primary to-primary-dark',
    'du-lich': 'from-emerald-500 to-emerald-600',
    'the-thao': 'from-orange-500 to-orange-600',
    'khoa-hoc': 'from-purple-500 to-purple-600',
  };

  const catColor = categoryColorMap[article.categorySlug] || categoryColorMap['cong-nghe'];
  const catBg = categoryBgMap[article.categorySlug] || categoryBgMap['cong-nghe'];

  const formattedDate = new Date(article.publishedAt).toLocaleDateString('vi-VN', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  });
  const formattedTime = new Date(article.publishedAt).toLocaleTimeString('vi-VN', {
    hour: '2-digit', minute: '2-digit',
  });

  const readingTime = Math.max(1, Math.ceil(article.content.replace(/<[^>]*>/g, '').split(' ').length / 200));

  return (
    <PublicLayout>
      <article className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-xs mb-6 flex-wrap uppercase font-bold tracking-wider font-oswald text-zinc-550">
              <Link href="/" className="hover:text-primary transition-colors">Trang Chủ</Link>
              <svg className="w-3 h-3 text-zinc-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
              <Link href={`/category/${article.categorySlug}`} className="hover:text-primary transition-colors">
                {article.categoryName}
              </Link>
              <svg className="w-3 h-3 text-zinc-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
              <span className="text-zinc-400 line-clamp-1 max-w-[200px] sm:max-w-sm">{article.title}</span>
            </nav>

            {/* Category Badge */}
            <Link
              href={`/category/${article.categorySlug}`}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1 rounded border text-xs font-bold uppercase tracking-wider mb-4 ${catColor} transition-opacity hover:opacity-85 font-oswald`}
            >
              {article.categoryName}
            </Link>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-black text-white leading-tight mb-5 font-oswald uppercase tracking-tight">
              {article.title}
            </h1>

            {/* Summary */}
            <p className="text-base text-zinc-300 leading-relaxed border-l-4 border-primary pl-4 mb-6 italic">
              {article.summary}
            </p>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 mb-6 pb-6 border-b border-zinc-900">
              <div className="flex items-center gap-2.5">
                <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${catBg} flex items-center justify-center text-black font-black text-sm`}>
                  {article.author[0]}
                </div>
                <div>
                  <p className="text-sm font-bold text-white font-oswald uppercase tracking-wide">{article.author}</p>
                  <p className="text-[10px] text-zinc-550 uppercase tracking-widest font-black">Phóng viên</p>
                </div>
              </div>
              <div className="h-8 w-px bg-zinc-800 hidden sm:block" />
              <div className="text-xs text-zinc-400 flex flex-col font-medium">
                <span className="text-zinc-305">{formattedDate}</span>
                <span className="text-zinc-550">{formattedTime}</span>
              </div>
              <div className="h-8 w-px bg-zinc-800 hidden sm:block" />
              <div className="flex items-center gap-4 text-xs text-zinc-450 font-bold uppercase tracking-wider font-oswald">
                <span className="flex items-center gap-1">
                  👁 <span className="text-white">{article.views.toLocaleString()}</span> lượt xem
                </span>
                <span className="flex items-center gap-1">
                  ⏱ <span className="text-white">{readingTime} phút</span> đọc
                </span>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative rounded-xl overflow-hidden mb-8 aspect-video border border-zinc-900 shadow-2xl">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/30 to-transparent" />
            </div>

            {/* Content */}
            <div
              className="article-content"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />

            {/* Tags / Share */}
            <div className="mt-10 pt-8 border-t border-zinc-900 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2 flex-wrap font-oswald">
                <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Tags:</span>
                <Link href={`/category/${article.categorySlug}`}
                  className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${catColor}`}>
                  {article.categoryName}
                </Link>
                <span className="px-2.5 py-0.5 rounded border border-zinc-800 text-zinc-400 text-[10px] font-bold uppercase tracking-wider">Tin Tức</span>
                <span className="px-2.5 py-0.5 rounded border border-zinc-800 text-zinc-400 text-[10px] font-bold uppercase tracking-wider">VietNews</span>
              </div>
              <div className="flex items-center gap-2 font-oswald">
                <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Chia sẻ:</span>
                <button className="px-3 py-1.5 bg-zinc-900 hover:text-primary border border-zinc-800 text-zinc-300 text-[10px] font-black uppercase tracking-wider rounded transition-colors">Facebook</button>
                <button className="px-3 py-1.5 bg-zinc-900 hover:text-primary border border-zinc-800 text-zinc-300 text-[10px] font-black uppercase tracking-wider rounded transition-colors">Twitter</button>
              </div>
            </div>

            {/* Author Box */}
            <div className="mt-8 layer-1 rounded-2xl p-6 flex items-start gap-4 shadow-xl">
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${catBg} flex items-center justify-center text-black text-lg font-black flex-shrink-0 shadow-md`}>
                {article.author[0]}
              </div>
              <div className="min-w-0">
                <h4 className="font-bold text-white mb-1 font-oswald uppercase tracking-wide">{article.author}</h4>
                <p className="text-zinc-400 text-xs leading-relaxed">
                  Phóng viên chuyên mảng <strong className="text-zinc-200">{article.categoryName}</strong> tại VietNews. 
                  Hơn 5 năm kinh nghiệm trong lĩnh vực báo chí và truyền thông, luôn đem tới các tin tức nóng hổi, trung thực và sâu sắc nhất.
                </p>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* Related Articles */}
            <div className="layer-1 rounded-2xl p-5 sticky top-28 shadow-xl">
              <div className="flex items-center gap-3 mb-5 pb-3 border-b border-zinc-850">
                <div className="w-1.5 h-6 bg-primary rounded-full" />
                <h3 className="font-bold text-white text-base font-oswald uppercase tracking-tight">Bài Viết Liên Quan</h3>
              </div>
              {related.length > 0 ? (
                <div className="space-y-4">
                  {related.map((a, i) => (
                    <PostCard key={a.id} article={a} variant="horizontal" index={i} />
                  ))}
                </div>
              ) : (
                <p className="text-zinc-550 text-xs font-semibold uppercase tracking-wider text-center py-4">Không có bài viết liên quan.</p>
              )}

              <div className="mt-6 pt-4 border-t border-zinc-850">
                <Link
                  href={`/category/${article.categorySlug}`}
                  className="flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-primary/10 hover:bg-primary/20 border border-primary/20 text-primary rounded-xl text-xs font-bold uppercase tracking-wider transition-all font-oswald text-center"
                >
                  Xem thêm về {article.categoryName}
                  <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </article>
    </PublicLayout>
  );
}
