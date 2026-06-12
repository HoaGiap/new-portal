'use client';

import { use, useState, useEffect } from 'react';
import { useArticles } from '@/context/ArticlesContext';
import PublicLayout from '@/components/PublicLayout';
import PostCard from '@/components/PostCard';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface Comment {
  id: string;
  author: string;
  content: string;
  date: string;
}

const DEFAULT_COMMENTS: Record<string, Comment[]> = {
  '1': [
    { id: 'c1', author: 'Minh Tuấn', content: 'Bài viết rất hay và chi tiết, tôi rất mong đợi ChatGPT-5 ra mắt!', date: '10/06/2026' },
    { id: 'c2', author: 'Thanh Hằng', content: 'Công nghệ AI thay đổi nhanh thật, phải liên tục cập nhật.', date: '11/06/2026' }
  ],
  '2': [
    { id: 'c3', author: 'Quốc Bảo', content: 'Thiết bị này có vẻ ngoài ấn tượng hơn thế hệ trước rất nhiều.', date: '08/06/2026' }
  ],
  '3': [
    { id: 'c4', author: 'Lan Anh', content: 'Tự hào về du lịch Việt Nam quá, năm nay sẽ đi du lịch trong nước.', date: '09/06/2026' }
  ]
};

export default function PostDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { getArticleById, getArticlesByCategory, articles } = useArticles();

  const article = getArticleById(id);
  if (!article) return notFound();

  // Related articles
  const related = getArticlesByCategory(article.categorySlug)
    .filter((a) => a.id !== article.id)
    .slice(0, 3);

  // Sort articles by date to find Prev/Next
  const sortedArticles = [...articles].sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  const currentIndex = sortedArticles.findIndex(a => a.id === article.id);
  const prevArticle = currentIndex > 0 ? sortedArticles[currentIndex - 1] : null;
  const nextArticle = currentIndex < sortedArticles.length - 1 ? sortedArticles[currentIndex + 1] : null;

  // Comments state
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentName, setCommentName] = useState('');
  const [commentText, setCommentText] = useState('');

  useEffect(() => {
    // Load initial comments or from localStorage
    const saved = localStorage.getItem(`comments_${id}`);
    if (saved) {
      setComments(JSON.parse(saved));
    } else {
      const initial = DEFAULT_COMMENTS[id] || [
        { id: 'c_default', author: 'Độc giả VietNews', content: 'Bài viết hữu ích, cung cấp nhiều thông tin cần thiết.', date: '12/06/2026' }
      ];
      setComments(initial);
      localStorage.setItem(`comments_${id}`, JSON.stringify(initial));
    }
  }, [id]);

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (commentName.trim() && commentText.trim()) {
      const newComment: Comment = {
        id: Date.now().toString(),
        author: commentName.trim(),
        content: commentText.trim(),
        date: new Date().toLocaleDateString('vi-VN')
      };
      const updated = [newComment, ...comments];
      setComments(updated);
      localStorage.setItem(`comments_${id}`, JSON.stringify(updated));
      setCommentName('');
      setCommentText('');
    }
  };

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('Đã sao chép liên kết vào bộ nhớ tạm! 📋');
  };

  const categoryColorMap: Record<string, string> = {
    'cong-nghe': 'bg-primary/10 text-primary border-primary/20',
    'du-lich': 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20 dark:border-emerald-500/30',
    'the-thao': 'bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20 dark:border-orange-500/30',
    'khoa-hoc': 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20 dark:border-purple-500/30',
  };
  
  const categoryBgMap: Record<string, string> = {
    'cong-nghe': 'from-primary to-accent',
    'du-lich': 'from-emerald-500 to-teal-600',
    'the-thao': 'from-orange-500 to-orange-600',
    'khoa-hoc': 'from-purple-500 to-indigo-600',
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
      {/* 1. Hero Image Cover */}
      <div className="relative w-full h-[50vh] md:h-[60vh] overflow-hidden border-b border-border-base bg-zinc-950">
        <img
          src={article.image}
          alt={article.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
      </div>

      <article className="max-w-7xl mx-auto px-6 py-10 relative z-10 -mt-24 sm:-mt-32">
        {/* Main Card Wrap */}
        <div className="bg-card border border-border-base rounded-3xl p-6 md:p-10 shadow-premium">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            
            {/* Left Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Breadcrumb */}
              <nav className="flex items-center gap-2 text-xs uppercase font-bold tracking-wider font-plus-jakarta text-zinc-500">
                <Link href="/" className="hover:text-primary transition-colors">Trang Chủ</Link>
                <svg className="w-3.5 h-3.5 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
                <Link href={`/category/${article.categorySlug}`} className="hover:text-primary transition-colors">
                  {article.categoryName}
                </Link>
                <svg className="w-3.5 h-3.5 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
                <span className="text-zinc-400 dark:text-zinc-500 line-clamp-1 max-w-[150px] sm:max-w-xs">{article.title}</span>
              </nav>

              {/* Title & Badge */}
              <div className="space-y-3">
                <Link
                  href={`/category/${article.categorySlug}`}
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg border text-xs font-bold uppercase tracking-wider ${catColor} transition-opacity hover:opacity-85 font-plus-jakarta`}
                >
                  {article.categoryName}
                </Link>
                <h1 className="text-3xl md:text-4xl font-black text-fg-main leading-tight font-plus-jakarta uppercase tracking-tight">
                  {article.title}
                </h1>
              </div>

              {/* Summary quote */}
              <p className="text-base md:text-lg text-zinc-650 dark:text-zinc-350 leading-relaxed border-l-4 border-primary pl-4 py-1 italic font-medium">
                {article.summary}
              </p>

              {/* Author / Date Info */}
              <div className="flex flex-wrap items-center gap-4 py-4 border-t border-b border-border-base/60 text-xs text-zinc-500 dark:text-zinc-400 font-medium">
                <div className="flex items-center gap-2.5">
                  <div className={`w-8 h-8 rounded-lg bg-gradient-to-tr ${catBg} flex items-center justify-center text-white font-black text-xs shadow-sm`}>
                    {article.author[0]}
                  </div>
                  <div>
                    <p className="font-bold text-fg-main font-plus-jakarta uppercase tracking-wide">{article.author}</p>
                    <p className="text-[10px] text-zinc-400 uppercase tracking-widest font-black">Phóng viên</p>
                  </div>
                </div>
                <div className="h-8 w-px bg-border-base hidden sm:block" />
                <div className="flex flex-col">
                  <span className="text-fg-main font-bold font-plus-jakarta">{formattedDate}</span>
                  <span className="text-[10px] text-zinc-400">{formattedTime}</span>
                </div>
                <div className="h-8 w-px bg-border-base hidden sm:block" />
                <div className="flex items-center gap-4 font-bold uppercase tracking-wider font-plus-jakarta">
                  <span>👁 {article.views.toLocaleString()} lượt xem</span>
                  <span>⏱ {readingTime} phút đọc</span>
                </div>
              </div>

              {/* Rich Text HTML Content */}
              <div
                className="article-content pt-4"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />

              {/* Article Navigator (Prev / Next) */}
              <div className="flex flex-col sm:flex-row gap-4 justify-between border-t border-b border-border-base/60 py-6 mt-10">
                {prevArticle ? (
                  <Link
                    href={`/post/${prevArticle.id}`}
                    className="flex flex-col text-left group max-w-xs p-3.5 hover:bg-card-hover rounded-2xl transition-all border border-transparent hover:border-border-base"
                  >
                    <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider font-plus-jakarta">← Bài Trước</span>
                    <span className="text-sm font-bold text-fg-main group-hover:text-primary transition-colors font-plus-jakarta line-clamp-1 uppercase mt-1">
                      {prevArticle.title}
                    </span>
                  </Link>
                ) : (
                  <div className="flex-1" />
                )}

                {nextArticle ? (
                  <Link
                    href={`/post/${nextArticle.id}`}
                    className="flex flex-col text-right items-end group max-w-xs p-3.5 hover:bg-card-hover rounded-2xl transition-all border border-transparent hover:border-border-base"
                  >
                    <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider font-plus-jakarta">Bài Tiếp Theo →</span>
                    <span className="text-sm font-bold text-fg-main group-hover:text-primary transition-colors font-plus-jakarta line-clamp-1 uppercase mt-1">
                      {nextArticle.title}
                    </span>
                  </Link>
                ) : (
                  <div className="flex-1" />
                )}
              </div>

              {/* Simulated Comments Section */}
              <div className="pt-8 space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-6 bg-primary rounded-full" />
                  <h3 className="font-bold text-lg text-fg-main font-plus-jakarta uppercase tracking-tight">Ý kiến độc giả ({comments.length})</h3>
                </div>

                <form onSubmit={handleCommentSubmit} className="space-y-4 bg-card-hover border border-border-base rounded-2xl p-5 shadow-sm">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="cmt-name" className="block text-[10px] font-bold uppercase tracking-wider font-plus-jakarta text-zinc-450 mb-1.5">
                        Tên của bạn
                      </label>
                      <input
                        id="cmt-name"
                        type="text"
                        value={commentName}
                        onChange={(e) => setCommentName(e.target.value)}
                        placeholder="Nhập tên..."
                        className="w-full px-4 py-2.5 bg-card border border-border-base rounded-xl text-fg-main text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 font-semibold"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="cmt-text" className="block text-[10px] font-bold uppercase tracking-wider font-plus-jakarta text-zinc-450 mb-1.5">
                      Ý kiến đóng góp
                    </label>
                    <textarea
                      id="cmt-text"
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      placeholder="Bình luận của bạn..."
                      rows={3}
                      className="w-full px-4 py-2.5 bg-card border border-border-base rounded-xl text-fg-main text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 font-medium resize-none"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-gradient-to-r from-primary to-accent hover:opacity-95 text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all shadow-md font-plus-jakarta"
                  >
                    Gửi Bình Luận
                  </button>
                </form>

                {/* Comment list */}
                <div className="space-y-4">
                  {comments.map((cmt) => (
                    <div key={cmt.id} className="border-b border-border-base/55 pb-4 last:border-0 flex gap-3.5 items-start">
                      <div className="w-8 h-8 rounded-full bg-zinc-700/10 border border-border-base flex items-center justify-center font-bold text-zinc-500 text-xs">
                        {cmt.author[0].toUpperCase()}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 font-plus-jakarta">
                          <span className="text-xs font-bold text-fg-main uppercase tracking-wide">{cmt.author}</span>
                          <span className="text-[10px] text-zinc-400">{cmt.date}</span>
                        </div>
                        <p className="text-sm text-zinc-650 dark:text-zinc-350 mt-1 leading-relaxed">{cmt.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Sidebar */}
            <aside className="space-y-8">
              {/* Author Widget */}
              <div className="layer-1 rounded-2xl p-6 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-primary/5 rounded-full blur-2xl pointer-events-none" />
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${catBg} flex items-center justify-center text-white text-lg font-black flex-shrink-0 shadow-md`}>
                    {article.author[0]}
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-bold text-fg-main font-plus-jakarta uppercase tracking-wide text-sm">{article.author}</h4>
                    <p className="text-[10px] text-zinc-400 uppercase tracking-widest font-black mt-0.5">Phóng viên VietNews</p>
                  </div>
                </div>
                <p className="text-zinc-500 dark:text-zinc-400 text-xs leading-relaxed mt-4">
                  Phóng viên chuyên trách mục <strong className="text-fg-main font-bold">{article.categoryName}</strong> tại tòa soạn VietNews, luôn tận tâm mang đến độc giả góc nhìn chân thực nhất.
                </p>
                
                {/* Social Share Group */}
                <div className="mt-5 pt-4 border-t border-border-base flex flex-col gap-2.5 font-plus-jakarta">
                  <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Chia sẻ bài viết:</span>
                  <div className="grid grid-cols-3 gap-2">
                    <button onClick={() => alert('Đã chia sẻ lên Facebook! 🌐')} className="py-2 px-3 border border-border-base hover:bg-card-hover rounded-xl text-[10px] font-bold uppercase tracking-wider text-zinc-650 dark:text-zinc-300 hover:text-primary transition-all">Facebook</button>
                    <button onClick={() => alert('Đã chia sẻ lên Twitter! 🐦')} className="py-2 px-3 border border-border-base hover:bg-card-hover rounded-xl text-[10px] font-bold uppercase tracking-wider text-zinc-650 dark:text-zinc-300 hover:text-primary transition-all">Twitter</button>
                    <button onClick={copyLink} className="py-2 px-3 border border-border-base hover:bg-card-hover rounded-xl text-[10px] font-bold uppercase tracking-wider text-zinc-650 dark:text-zinc-300 hover:text-primary transition-all">Copy Link</button>
                  </div>
                </div>
              </div>

              {/* Related Articles Box */}
              <div className="layer-1 rounded-2xl p-5 shadow-xl sticky top-28">
                <div className="flex items-center gap-3 mb-5 pb-3 border-b border-border-base/60">
                  <div className="w-1.5 h-6 bg-primary rounded-full" />
                  <h3 className="font-bold text-fg-main text-sm font-plus-jakarta uppercase tracking-tight">Bài Viết Liên Quan</h3>
                </div>
                {related.length > 0 ? (
                  <div className="space-y-4">
                    {related.map((a, i) => (
                      <PostCard key={a.id} article={a} variant="horizontal" index={i} />
                    ))}
                  </div>
                ) : (
                  <p className="text-zinc-500 text-xs font-semibold uppercase tracking-wider text-center py-4">Không có bài viết cùng chủ đề.</p>
                )}

                <div className="mt-6 pt-4 border-t border-border-base">
                  <Link
                    href={`/category/${article.categorySlug}`}
                    className="flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-gradient-to-r from-primary to-accent hover:opacity-95 text-white rounded-xl text-[10px] font-black uppercase tracking-wider transition-all font-plus-jakarta text-center"
                  >
                    Xem thêm về {article.categoryName}
                  </Link>
                </div>
              </div>
            </aside>

          </div>
        </div>
      </article>
    </PublicLayout>
  );
}
