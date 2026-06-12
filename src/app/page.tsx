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
  
  // Trending based on views
  const trending = [...articles].sort((a, b) => b.views - a.views).slice(0, 5);

  // Get articles for specific categories
  const techArticles = articles.filter(a => a.categorySlug === 'cong-nghe').slice(0, 3);
  const travelArticles = articles.filter(a => a.categorySlug === 'du-lich').slice(0, 3);
  const sportsArticles = articles.filter(a => a.categorySlug === 'the-thao').slice(0, 3);

  return (
    <PublicLayout>
      {/* 1. Hero Banner Section */}
      {featured && (
        <section className="relative min-h-[70vh] md:min-h-[80vh] flex items-center justify-center overflow-hidden border-b border-border-base bg-zinc-950">
          <img
            src={featured.image}
            alt={featured.title}
            className="absolute inset-0 w-full h-full object-cover opacity-65 dark:opacity-45"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-transparent hidden lg:block" />
          
          <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 w-full text-center lg:text-left flex flex-col items-center lg:items-start gap-6">
            <span className="px-3 py-1 bg-gradient-to-r from-primary to-accent text-white text-[11px] font-black uppercase tracking-wider rounded-xl shadow-lg glow-primary font-plus-jakarta">
              {featured.categoryName}
            </span>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-fg-main leading-tight max-w-4xl font-plus-jakarta uppercase tracking-tight">
              {featured.title}
            </h1>
            <p className="text-zinc-650 dark:text-zinc-300 text-base md:text-lg max-w-2xl leading-relaxed font-medium">
              {featured.summary}
            </p>
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mt-2">
              <Link
                href={`/post/${featured.id}`}
                className="px-8 py-3.5 bg-gradient-to-r from-primary to-accent hover:opacity-95 text-white font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg glow-primary font-plus-jakarta"
              >
                Khám Phá Ngay
              </Link>
              <Link
                href="/search"
                className="px-6 py-3.5 bg-card hover:bg-card-hover border border-border-base text-fg-main font-bold text-xs uppercase tracking-wider rounded-xl transition-all font-plus-jakarta"
              >
                Tìm Kiếm Tin Tức
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Breaking News Ticker */}
      <div className="bg-card border-b border-border-base/70 py-3 px-6 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center gap-3">
          <span className="px-2.5 py-0.5 bg-red-600 text-white text-[9px] font-black rounded uppercase tracking-wider animate-pulse font-plus-jakarta">
            TIN NÓNG
          </span>
          <p className="text-xs font-semibold text-zinc-600 dark:text-zinc-350 truncate flex-1 text-center sm:text-left uppercase tracking-wide font-plus-jakarta">
            🔥 ChatGPT-5 ra mắt toàn cầu · Việt Nam vô địch giải đấu khu vực · NASA phát hiện nước lỏng trên hành tinh mới
          </p>
        </div>
      </div>

      {/* 2. Featured Grid Section */}
      <section className="py-12 px-6 bg-background">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex items-center gap-3 pb-3 border-b border-border-base/60">
            <div className="w-2.5 h-8 bg-gradient-to-t from-primary to-accent rounded-full" />
            <h2 className="text-2xl font-black text-fg-main font-plus-jakarta uppercase tracking-tight">
              Bài Viết Nổi Bật
            </h2>
          </div>
          {featured && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <PostCard article={featured} variant="featured" />
              </div>
              <div className="flex flex-col gap-6">
                {secondary.map((a, i) => (
                  <PostCard key={a.id} article={a} variant="featured" index={i + 1} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 3. Main Articles & Sidebar Section */}
      <section className="py-12 px-6 border-t border-border-base/50 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Latest Articles */}
            <div className="lg:col-span-2 space-y-8">
              <div className="flex items-center justify-between pb-3 border-b border-border-base/60">
                <div className="flex items-center gap-3">
                  <div className="w-2.5 h-7 bg-primary rounded-full" />
                  <h2 className="text-xl font-black text-fg-main font-plus-jakarta uppercase tracking-tight">
                    Tin Tức Mới Nhất
                  </h2>
                </div>
                <Link
                  href="/search"
                  className="text-primary hover:text-primary-dark text-xs font-bold uppercase tracking-wider flex items-center gap-1 transition-colors font-plus-jakarta"
                >
                  Tất Cả
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

            {/* Sidebar (Trending) */}
            <div className="space-y-8">
              <div className="bg-card border border-border-base rounded-2xl p-6 shadow-premium">
                <div className="flex items-center gap-3 mb-6 pb-3 border-b border-border-base/60">
                  <div className="w-2 h-6 bg-accent rounded-full" />
                  <h3 className="font-bold text-fg-main text-lg font-plus-jakarta uppercase tracking-tight">
                    Xem Nhiều Nhất
                  </h3>
                </div>
                <div className="space-y-5">
                  {trending.map((article, i) => (
                    <div key={article.id} className="flex items-start gap-4 group">
                      <span className="text-2xl font-black bg-gradient-to-tr from-primary to-accent bg-clip-text text-transparent font-plus-jakarta flex-shrink-0 leading-none mt-0.5">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <div className="min-w-0">
                        <Link
                          href={`/post/${article.id}`}
                          className="text-sm font-bold text-fg-main group-hover:text-primary transition-colors line-clamp-2 leading-snug font-plus-jakarta uppercase tracking-tight"
                        >
                          {article.title}
                        </Link>
                        <p className="text-[10px] text-zinc-500 mt-1 font-semibold uppercase tracking-wider font-plus-jakarta">👁 {article.views.toLocaleString()} lượt xem</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Contact Box */}
              <div className="bg-card border border-border-base rounded-2xl p-6 text-center shadow-premium relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-2xl pointer-events-none" />
                <div className="w-14 h-14 rounded-xl bg-gradient-to-tr from-primary to-accent flex items-center justify-center text-white font-black text-2xl mx-auto mb-4 shadow-lg glow-primary">
                  V
                </div>
                <h3 className="font-bold text-fg-main mb-2 text-lg font-plus-jakarta tracking-wide">VietNews</h3>
                <p className="text-zinc-500 dark:text-zinc-400 text-xs leading-relaxed mb-5">
                  Cập nhật tin tức thế giới và Việt Nam nhanh chóng, chính xác. Tiên phong về công nghệ truyền thông số 2026.
                </p>
                <Link
                  href="/contact"
                  className="inline-block w-full px-5 py-2.5 bg-gradient-to-r from-primary to-accent hover:opacity-95 text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all shadow-md font-plus-jakarta text-center"
                >
                  Liên Hệ Ngay
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Category-specific Sections */}
      <section className="py-12 px-6 border-t border-border-base/50 bg-card/15 dark:bg-zinc-950/20">
        <div className="max-w-7xl mx-auto space-y-12">
          {/* Tech Section */}
          {techArticles.length > 0 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-border-base/60">
                <h3 className="text-xl font-black text-fg-main font-plus-jakarta uppercase tracking-tight flex items-center gap-2">
                  <span>💻</span> Công Nghệ
                </h3>
                <Link href="/category/cong-nghe" className="text-xs font-bold text-primary uppercase tracking-wider font-plus-jakarta">Xem thêm</Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {techArticles.map((art) => (
                  <PostCard key={art.id} article={art} variant="compact" />
                ))}
              </div>
            </div>
          )}

          {/* Travel Section */}
          {travelArticles.length > 0 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-border-base/60">
                <h3 className="text-xl font-black text-fg-main font-plus-jakarta uppercase tracking-tight flex items-center gap-2">
                  <span>✈️</span> Du Lịch
                </h3>
                <Link href="/category/du-lich" className="text-xs font-bold text-primary uppercase tracking-wider font-plus-jakarta">Xem thêm</Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {travelArticles.map((art) => (
                  <PostCard key={art.id} article={art} variant="compact" />
                ))}
              </div>
            </div>
          )}

          {/* Sports Section */}
          {sportsArticles.length > 0 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-border-base/60">
                <h3 className="text-xl font-black text-fg-main font-plus-jakarta uppercase tracking-tight flex items-center gap-2">
                  <span>⚽</span> Thể Thao
                </h3>
                <Link href="/category/the-thao" className="text-xs font-bold text-primary uppercase tracking-wider font-plus-jakarta">Xem thêm</Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {sportsArticles.map((art) => (
                  <PostCard key={art.id} article={art} variant="compact" />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 5. Newsletter Section */}
      <section className="py-16 px-6 bg-gradient-to-r from-primary/10 to-accent/10 border-t border-b border-border-base/40 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-2xl mx-auto text-center space-y-6 relative z-10">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-card border border-border-base text-2xl shadow-sm">
            ✉️
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-fg-main font-plus-jakarta uppercase tracking-tight">Đăng Ký Nhận Bản Tin</h2>
          <p className="text-zinc-550 dark:text-zinc-400 text-sm max-w-md mx-auto leading-relaxed">
            Nhận tóm tắt tin tức nóng hổi, bài phân tích chuyên sâu được gửi trực tiếp đến hộp thư của bạn vào mỗi buổi sáng.
          </p>
          <form onSubmit={(e) => { e.preventDefault(); alert('Đăng ký thành công bản tin VietNews! 🚀'); }} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Nhập địa chỉ email của bạn..."
              className="flex-1 px-4 py-3 bg-card border border-border-base rounded-xl text-fg-main text-sm focus:outline-none focus:border-primary shadow-sm"
              required
            />
            <button
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-primary to-accent hover:opacity-95 text-white font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-md font-plus-jakarta"
            >
              ĐĂNG KÝ
            </button>
          </form>
        </div>
      </section>
    </PublicLayout>
  );
}
