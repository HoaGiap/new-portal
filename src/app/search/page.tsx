'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useArticles } from '@/context/ArticlesContext';
import { CATEGORIES } from '@/data/articles';
import PostCard from '@/components/PostCard';
import PublicLayout from '@/components/PublicLayout';
import { Search, X } from 'lucide-react';

function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { searchArticles, articles } = useArticles();

  const initialQuery = searchParams.get('q') || '';
  const [inputValue, setInputValue] = useState(initialQuery);
  const [results, setResults] = useState(searchArticles(initialQuery));
  const [hasSearched, setHasSearched] = useState(!!initialQuery);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    const q = searchParams.get('q') || '';
    setInputValue(q);
    if (q) {
      setResults(searchArticles(q));
      setHasSearched(true);
    }
  }, [searchParams, searchArticles]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      router.push(`/search?q=${encodeURIComponent(inputValue.trim())}`);
      setResults(searchArticles(inputValue.trim()));
      setHasSearched(true);
    }
  };

  const filtered = selectedCategory === 'all'
    ? results
    : results.filter((a) => a.categorySlug === selectedCategory);

  const popular = [...articles]
    .sort((a, b) => b.views - a.views)
    .slice(0, 6);

  const suggestions = ['ChatGPT', 'AI', 'Du lịch Việt Nam', 'Bóng đá', 'Khoa học', 'Công nghệ'];

  return (
    <PublicLayout>
      {/* Search Hero */}
      <div className="bg-gradient-to-b from-primary/5 to-background py-12 px-6 border-b border-border-base/70 relative overflow-hidden text-center">
        <div className="absolute top-0 right-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-3xl mx-auto text-center relative z-10 space-y-6">
          <h1 className="text-3xl font-black text-fg-main font-plus-jakarta uppercase tracking-tight flex items-center justify-center gap-2">
            <Search className="w-8 h-8 text-primary" /> Tìm Kiếm Tin Tức
          </h1>
          <p className="text-zinc-550 dark:text-zinc-400 text-xs font-semibold uppercase tracking-wider font-plus-jakarta">Khám phá hàng nghìn bài viết từ nhiều chủ đề</p>

          <form onSubmit={handleSearch} className="flex gap-3 max-w-xl mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input
                id="search-input"
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Nhập từ khóa tìm kiếm..."
                className="w-full pl-11 pr-10 py-3 bg-card border border-border-base rounded-2xl text-fg-main placeholder-zinc-550 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 text-sm font-medium shadow-sm"
                autoFocus
              />
              {inputValue && (
                <button
                  type="button"
                  onClick={() => { setInputValue(''); setHasSearched(false); setResults([]); }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-fg-main text-sm"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            <button
              type="submit"
              id="search-btn"
              className="px-6 py-3 bg-gradient-to-r from-primary to-accent hover:opacity-95 text-white font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-md glow-primary font-plus-jakarta"
            >
              TÌM KIẾM
            </button>
          </form>

          {/* Suggestions */}
          {!hasSearched && (
            <div className="flex flex-wrap justify-center items-center gap-2">
              <span className="text-zinc-500 text-[10px] font-bold uppercase tracking-wider font-plus-jakarta">Tìm kiếm phổ biến:</span>
              {suggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => { setInputValue(s); router.push(`/search?q=${encodeURIComponent(s)}`); }}
                  className="px-3.5 py-1.5 bg-card hover:bg-card-hover border border-border-base text-zinc-650 dark:text-zinc-350 hover:text-primary text-[10px] font-bold uppercase tracking-wider font-plus-jakarta rounded-xl transition-all"
                >
                  {s}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Results */}
      <section className="py-10 px-6 bg-background">
        <div className="max-w-7xl mx-auto">
          {hasSearched ? (
            <>
              {/* Results header + filter */}
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8 pb-4 border-b border-border-base/70">
                <div className="font-plus-jakarta">
                  <h2 className="text-xl font-black text-fg-main uppercase tracking-tight">
                    {filtered.length > 0 ? (
                      <>Tìm thấy <span className="text-primary">{filtered.length}</span> kết quả cho &ldquo;<span className="text-primary">{initialQuery}</span>&rdquo;</>
                    ) : (
                      <>Không tìm thấy kết quả cho &ldquo;<span className="text-red-500">{initialQuery}</span>&rdquo;</>
                    )}
                  </h2>
                  {results.length !== filtered.length && (
                    <p className="text-zinc-500 text-[10px] uppercase tracking-wider mt-1 font-bold">({results.length} kết quả tổng, đang lọc theo chủ đề)</p>
                  )}
                </div>

                {/* Category Filter */}
                <div className="flex flex-wrap gap-1.5 font-plus-jakarta">
                  <button
                    onClick={() => setSelectedCategory('all')}
                    className={`px-3.5 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all border ${
                      selectedCategory === 'all'
                        ? 'bg-gradient-to-r from-primary to-accent text-white border-transparent shadow-md'
                        : 'bg-card text-zinc-650 dark:text-zinc-350 hover:text-fg-main border-border-base'
                    }`}
                  >
                    Tất cả
                  </button>
                  {CATEGORIES.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setSelectedCategory(c.slug)}
                      className={`px-3.5 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all border ${
                        selectedCategory === c.slug
                          ? 'bg-gradient-to-r from-primary to-accent text-white border-transparent shadow-md'
                          : 'bg-card text-zinc-650 dark:text-zinc-350 hover:text-fg-main border-border-base'
                      }`}
                    >
                      {c.icon} {c.name}
                    </button>
                  ))}
                </div>
              </div>

              {filtered.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filtered.map((article, i) => (
                    <PostCard key={article.id} article={article} variant="default" index={i} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 bg-card border border-border-base max-w-md mx-auto p-6 rounded-2xl shadow-premium">
                  <Search className="w-12 h-12 text-zinc-500 mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-fg-main mb-2 font-plus-jakarta uppercase">Không tìm thấy kết quả</h3>
                  <p className="text-zinc-500 dark:text-zinc-400 text-xs mb-6 leading-relaxed">Hãy thử tìm kiếm với các từ khóa khác hoặc tham khảo các bài viết nổi bật bên dưới.</p>
                </div>
              )}
            </>
          ) : (
            /* Popular articles when no search */
            <div>
              <div className="flex items-center gap-3 mb-8 pb-3 border-b border-border-base/70">
                <div className="w-2.5 h-7 bg-primary rounded-full" />
                <h2 className="text-2xl font-black text-fg-main font-plus-jakarta uppercase tracking-tight">Bài Viết Phổ Biến Nhất</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {popular.map((article, i) => (
                  <PostCard key={article.id} article={article} variant="default" index={i} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </PublicLayout>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background flex items-center justify-center"><div className="text-zinc-550 font-bold uppercase tracking-wider font-plus-jakarta text-xs animate-pulse">Đang tải...</div></div>}>
      <SearchContent />
    </Suspense>
  );
}
