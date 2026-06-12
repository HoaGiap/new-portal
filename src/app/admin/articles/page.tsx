'use client';

import { useState } from 'react';
import { useArticles } from '@/context/ArticlesContext';
import { CATEGORIES } from '@/data/articles';
import Link from 'next/link';
import { Plus, Search, Eye, Pencil, Trash2, Inbox } from 'lucide-react';

export default function AdminArticlesPage() {
  const { articles, deleteArticle } = useArticles();
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'date' | 'views' | 'title'>('date');

  const filtered = articles
    .filter((a) => {
      const matchSearch = a.title.toLowerCase().includes(search.toLowerCase()) || a.author.toLowerCase().includes(search.toLowerCase());
      const matchCat = categoryFilter === 'all' || a.categorySlug === categoryFilter;
      return matchSearch && matchCat;
    })
    .sort((a, b) => {
      if (sortBy === 'date') return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
      if (sortBy === 'views') return b.views - a.views;
      return a.title.localeCompare(b.title);
    });

  const confirmDelete = (id: string) => setDeleteId(id);

  const handleDelete = () => {
    if (deleteId) {
      deleteArticle(deleteId);
      setDeleteId(null);
    }
  };

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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-white font-oswald uppercase tracking-tight">Quản Lý Bài Viết</h2>
          <p className="text-zinc-400 text-xs font-semibold uppercase tracking-wider font-oswald mt-1">Tổng cộng <span className="text-white font-bold">{articles.length}</span> bài viết</p>
        </div>
        <Link
          href="/admin/articles/new"
          className="flex items-center gap-2 px-4 py-2.5 bg-primary hover:bg-primary-dark text-black text-xs font-black uppercase tracking-wider rounded-xl transition-all shadow-md shadow-primary/10 font-oswald flex-shrink-0"
        >
          <Plus className="w-4 h-4 text-black" />
          Thêm Bài Mới
        </Link>
      </div>

      {/* Filters */}
      <div className="layer-1 rounded-2xl p-4 shadow-lg">
        <div className="flex flex-col md:flex-row gap-3">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Tìm theo tiêu đề hoặc tác giả..."
              className="w-full pl-10 pr-4 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-primary"
            />
          </div>

          {/* Category Filter */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-4 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-zinc-300 text-sm focus:outline-none focus:border-primary font-semibold font-oswald uppercase tracking-wider"
          >
            <option value="all">Tất cả chủ đề</option>
            {CATEGORIES.map((c) => <option key={c.id} value={c.slug}>{c.icon} {c.name.toUpperCase()}</option>)}
          </select>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'date' | 'views' | 'title')}
            className="px-4 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-zinc-300 text-sm focus:outline-none focus:border-primary font-semibold font-oswald uppercase tracking-wider"
          >
            <option value="date">Mới nhất</option>
            <option value="views">Nhiều xem nhất</option>
            <option value="title">Tên A-Z</option>
          </select>
        </div>
        {(search || categoryFilter !== 'all') && (
          <div className="flex items-center gap-2 mt-3 font-oswald text-xs font-bold uppercase tracking-wider">
            <span className="text-zinc-500">Kết quả: <span className="text-white font-bold">{filtered.length}</span> bài</span>
            <button onClick={() => { setSearch(''); setCategoryFilter('all'); }} className="text-primary hover:text-primary-dark transition-colors">
              Xóa bộ lọc
            </button>
          </div>
        )}
      </div>

      {/* Table */}
      <div className="layer-1 rounded-2xl overflow-hidden shadow-xl">
        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-5xl mb-3 flex justify-center text-zinc-500"><Inbox className="w-12 h-12" /></div>
            <p className="text-white font-bold mb-1 font-oswald uppercase">Không tìm thấy bài viết</p>
            <p className="text-zinc-400 text-xs">Thử tìm kiếm với từ khóa khác hoặc thêm bài viết mới.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-zinc-800 bg-zinc-950/40">
                  <th className="px-5 py-3.5 text-xs font-bold text-zinc-450 uppercase tracking-wider font-oswald">Bài Viết</th>
                  <th className="px-5 py-3.5 text-xs font-bold text-zinc-450 uppercase tracking-wider font-oswald hidden md:table-cell">Chủ Đề</th>
                  <th className="px-5 py-3.5 text-xs font-bold text-zinc-450 uppercase tracking-wider font-oswald hidden lg:table-cell">Tác Giả</th>
                  <th className="px-5 py-3.5 text-xs font-bold text-zinc-450 uppercase tracking-wider font-oswald hidden lg:table-cell">Lượt Xem</th>
                  <th className="px-5 py-3.5 text-xs font-bold text-zinc-450 uppercase tracking-wider font-oswald hidden sm:table-cell">Ngày Đăng</th>
                  <th className="px-5 py-3.5 text-xs font-bold text-zinc-450 uppercase tracking-wider font-oswald text-center">Thao Tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-850 bg-zinc-900/30">
                {filtered.map((article) => (
                  <tr key={article.id} className="group hover:bg-zinc-900/60 transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={article.image}
                          alt={article.title}
                          className="w-10 h-10 rounded-lg object-cover flex-shrink-0 border border-zinc-800"
                        />
                        <div className="min-w-0">
                          <p className="text-sm font-bold text-zinc-150 line-clamp-2 leading-tight group-hover:text-primary transition-colors font-oswald uppercase tracking-tight">
                            {article.title}
                          </p>
                          <p className="text-[10px] text-zinc-550 mt-0.5 hidden sm:block font-bold">ID: {article.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 hidden md:table-cell">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded border text-[10px] font-bold uppercase tracking-wider font-oswald ${categoryColorMap[article.categorySlug] || ''}`}>
                        {article.categoryName}
                      </span>
                    </td>
                    <td className="px-5 py-4 hidden lg:table-cell">
                      <div className="flex items-center gap-2">
                        <div className={`w-6 h-6 rounded-full bg-gradient-to-br ${categoryBgMap[article.categorySlug] || categoryBgMap['cong-nghe']} flex items-center justify-center text-black text-[9px] font-black`}>
                          {article.author[0]}
                        </div>
                        <span className="text-xs font-semibold text-zinc-300 whitespace-nowrap">{article.author}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4 hidden lg:table-cell">
                      <span className="text-xs font-semibold text-zinc-350 flex items-center gap-1"><Eye className="w-3.5 h-3.5 text-zinc-500" /> {article.views.toLocaleString()}</span>
                    </td>
                    <td className="px-5 py-4 hidden sm:table-cell">
                      <span className="text-[11px] font-medium text-zinc-400 whitespace-nowrap">
                        {new Date(article.publishedAt).toLocaleDateString('vi-VN')}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <Link
                          href={`/post/${article.id}`}
                          target="_blank"
                          className="p-1.5 rounded-lg border border-zinc-800 bg-zinc-900 text-zinc-400 hover:text-primary hover:border-primary/25 transition-all flex items-center justify-center"
                          title="Xem trước"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        <Link
                          href={`/admin/articles/edit/${article.id}`}
                          className="p-1.5 rounded-lg border border-zinc-800 bg-zinc-900 text-zinc-400 hover:text-emerald-450 hover:border-emerald-500/25 transition-all flex items-center justify-center"
                          title="Chỉnh sửa"
                        >
                          <Pencil className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => confirmDelete(article.id)}
                          className="p-1.5 rounded-lg border border-zinc-800 bg-zinc-900 text-zinc-400 hover:text-red-400 hover:border-red-500/25 transition-all flex items-center justify-center"
                          title="Xóa"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Delete Confirm Modal */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 max-w-sm w-full shadow-2xl">
            <div className="text-4xl mb-4 text-center flex justify-center text-red-500"><Trash2 className="w-10 h-10 animate-bounce" /></div>
            <h3 className="text-lg font-bold text-white text-center mb-2 font-oswald uppercase">Xác nhận xóa</h3>
            <p className="text-zinc-400 text-xs text-center mb-6 leading-relaxed">
              Bạn có chắc muốn xóa bài viết này? Hành động này không thể hoàn tác.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteId(null)}
                className="flex-1 py-2.5 bg-zinc-850 hover:bg-zinc-800 text-white rounded-xl text-xs font-bold uppercase tracking-wider font-oswald transition-colors border border-zinc-800"
              >
                Hủy bỏ
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 py-2.5 bg-red-600 hover:bg-red-500 text-white rounded-xl text-xs font-bold uppercase tracking-wider font-oswald transition-colors"
              >
                Xóa bài viết
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
