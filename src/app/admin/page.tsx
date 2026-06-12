'use client';

import { useArticles } from '@/context/ArticlesContext';
import { CATEGORIES } from '@/data/articles';
import Link from 'next/link';
import { FileText, Eye, Tag, CalendarPlus, Plus, Pencil, ExternalLink, Laptop, Plane, Trophy, FlaskConical } from 'lucide-react';

const categoryIcons: Record<string, React.ReactNode> = {
  'cong-nghe': <Laptop className="w-3.5 h-3.5 inline text-zinc-400" />,
  'du-lich': <Plane className="w-3.5 h-3.5 inline text-zinc-400" />,
  'the-thao': <Trophy className="w-3.5 h-3.5 inline text-zinc-400" />,
  'khoa-hoc': <FlaskConical className="w-3.5 h-3.5 inline text-zinc-400" />,
};

export default function AdminDashboardPage() {
  const { articles } = useArticles();

  const stats = [
    {
      label: 'Tổng bài viết',
      value: articles.length,
      icon: <FileText className="w-5 h-5 text-primary" />,
      color: 'from-zinc-900 to-zinc-950 border border-zinc-800',
      shadow: 'shadow-primary/5',
      accentText: 'text-primary',
    },
    {
      label: 'Lượt xem',
      value: articles.reduce((sum, a) => sum + a.views, 0).toLocaleString(),
      icon: <Eye className="w-5 h-5 text-emerald-400" />,
      color: 'from-zinc-900 to-zinc-950 border border-zinc-800',
      shadow: 'shadow-emerald-500/5',
      accentText: 'text-emerald-400',
    },
    {
      label: 'Chủ đề',
      value: CATEGORIES.length,
      icon: <Tag className="w-5 h-5 text-purple-400" />,
      color: 'from-zinc-900 to-zinc-950 border border-zinc-800',
      shadow: 'shadow-purple-500/5',
      accentText: 'text-purple-400',
    },
    {
      label: 'Bài mới hôm nay',
      value: articles.filter((a) => {
        const today = new Date();
        const pub = new Date(a.publishedAt);
        return pub.toDateString() === today.toDateString();
      }).length,
      icon: <CalendarPlus className="w-5 h-5 text-orange-400" />,
      color: 'from-zinc-900 to-zinc-950 border border-zinc-800',
      shadow: 'shadow-orange-500/5',
      accentText: 'text-orange-400',
    },
  ];

  const recentArticles = [...articles]
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, 5);

  const categoryStats = CATEGORIES.map((cat) => ({
    ...cat,
    count: articles.filter((a) => a.categorySlug === cat.slug).length,
    views: articles.filter((a) => a.categorySlug === cat.slug).reduce((sum, a) => sum + a.views, 0),
  }));

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-white font-oswald uppercase tracking-tight">
            Chào mừng trở lại! 👋
          </h2>
          <p className="text-zinc-400 mt-1 text-xs font-semibold uppercase tracking-wider font-oswald">
            Tổng quan hệ thống VietNews · {new Date().toLocaleDateString('vi-VN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
        </div>
        <Link
          href="/admin/articles/new"
          className="flex items-center gap-2 px-4 py-2.5 bg-primary hover:bg-primary-dark text-black text-xs font-black uppercase tracking-wider rounded-xl transition-all shadow-md shadow-primary/10 font-oswald flex-shrink-0"
        >
          <Plus className="w-4 h-4 text-black" />
          Thêm bài viết
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className={`bg-gradient-to-br ${stat.color} rounded-2xl p-5 shadow-xl ${stat.shadow} relative overflow-hidden group hover:border-primary/20 transition-all`}
          >
            <div className="flex items-center justify-between mb-3 border-b border-zinc-800/60 pb-2">
              <span className="text-2xl">{stat.icon}</span>
              <span className="text-zinc-500 text-[9px] font-black uppercase tracking-widest font-oswald">Thống kê</span>
            </div>
            <p className={`text-2xl md:text-3xl font-black mb-1 font-oswald ${stat.accentText}`}>{stat.value}</p>
            <p className="text-zinc-400 text-xs font-bold uppercase tracking-wider font-oswald">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Articles */}
        <div className="lg:col-span-2 layer-1 rounded-2xl shadow-xl">
          <div className="flex items-center justify-between p-5 border-b border-zinc-850">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-6 bg-primary rounded-full" />
              <h3 className="font-bold text-white text-base font-oswald uppercase tracking-tight">Bài Viết Gần Đây</h3>
            </div>
            <Link href="/admin/articles" className="text-primary hover:text-primary-dark text-xs font-bold uppercase tracking-wider font-oswald">
              Xem tất cả →
            </Link>
          </div>
          <div className="p-5 space-y-3">
            {recentArticles.map((article) => (
              <div key={article.id} className="flex items-center gap-3 p-3 bg-zinc-950/60 border border-zinc-900 rounded-xl hover:border-primary/20 transition-all group">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-12 h-12 rounded-lg object-cover flex-shrink-0 border border-zinc-800"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-zinc-150 truncate group-hover:text-primary transition-colors font-oswald uppercase tracking-tight leading-snug">
                    {article.title}
                  </p>
                  <div className="flex items-center gap-2 mt-0.5 font-oswald">
                    <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">{article.categoryName}</span>
                    <span className="text-zinc-800 font-bold">·</span>
                    <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider flex items-center gap-1 mt-0.5"><Eye className="w-3 h-3 text-zinc-500" /> {article.views.toLocaleString()} xem</span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <Link
                    href={`/post/${article.id}`}
                    target="_blank"
                    className="p-1.5 rounded-lg border border-zinc-850 bg-zinc-900 text-zinc-400 hover:text-primary hover:border-primary/25 transition-all flex items-center justify-center"
                    title="Xem bài viết"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                  <Link
                    href={`/admin/articles/edit/${article.id}`}
                    className="p-1.5 rounded-lg border border-zinc-850 bg-zinc-900 text-zinc-400 hover:text-emerald-450 hover:border-emerald-500/25 transition-all flex items-center justify-center"
                    title="Chỉnh sửa"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Category Stats */}
        <div className="layer-1 rounded-2xl shadow-xl">
          <div className="flex items-center gap-3 p-5 border-b border-zinc-850">
            <div className="w-1.5 h-6 bg-primary rounded-full" />
            <h3 className="font-bold text-white text-base font-oswald uppercase tracking-tight">Thống Kê Chủ Đề</h3>
          </div>
          <div className="p-5 space-y-5">
            {categoryStats.map((cat) => {
              const percentage = articles.length > 0 ? Math.round((cat.count / articles.length) * 100) : 0;
              const colorMap: Record<string, string> = {
                'cong-nghe': 'bg-primary',
                'du-lich': 'bg-emerald-500',
                'the-thao': 'bg-orange-500',
                'khoa-hoc': 'bg-purple-500',
              };
              return (
                <div key={cat.id}>
                  <div className="flex items-center justify-between mb-1.5 font-oswald">
                    <span className="text-xs font-bold text-zinc-300 uppercase tracking-wider flex items-center gap-1.5">
                      {categoryIcons[cat.slug] || cat.icon} {cat.name}
                    </span>
                    <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">{cat.count} bài</span>
                  </div>
                  <div className="h-1.5 bg-zinc-900 rounded-full overflow-hidden border border-zinc-850">
                    <div
                      className={`h-full ${colorMap[cat.slug] || 'bg-primary'} rounded-full transition-all duration-700`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <p className="text-[10px] text-zinc-550 mt-1 font-semibold uppercase tracking-wider font-oswald flex items-center gap-1"><Eye className="w-3 h-3 text-zinc-500" /> {cat.views.toLocaleString()} lượt xem</p>
                </div>
              );
            })}
          </div>

          <div className="px-5 pb-5">
            <Link
              href="/admin/articles"
              className="flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 text-zinc-300 hover:text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all font-oswald text-center"
            >
              Quản lý tất cả bài viết
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
