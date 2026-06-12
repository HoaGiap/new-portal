'use client';

import Link from 'next/link';
import { Article } from '@/data/articles';

interface PostCardProps {
  article: Article;
  variant?: 'default' | 'featured' | 'compact' | 'horizontal';
  index?: number;
}

const categoryColorMap: Record<string, { badge: string; text: string; bg: string }> = {
  'cong-nghe': {
    badge: 'bg-primary/10 text-primary border border-primary/20',
    text: 'text-primary',
    bg: 'from-primary to-primary-dark',
  },
  'du-lich': {
    badge: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
    text: 'text-emerald-400',
    bg: 'from-emerald-500 to-emerald-600',
  },
  'the-thao': {
    badge: 'bg-orange-500/10 text-orange-400 border border-orange-500/20',
    text: 'text-orange-400',
    bg: 'from-orange-500 to-orange-600',
  },
  'khoa-hoc': {
    badge: 'bg-purple-500/10 text-purple-400 border border-purple-500/20',
    text: 'text-purple-400',
    bg: 'from-purple-500 to-purple-600',
  },
};

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

function formatViews(views: number) {
  if (views >= 1000) return `${(views / 1000).toFixed(1)}k`;
  return views.toString();
}

export default function PostCard({ article, variant = 'default', index = 0 }: PostCardProps) {
  const colors = categoryColorMap[article.categorySlug] || categoryColorMap['cong-nghe'];
  const delay = `${index * 50}ms`;

  if (variant === 'horizontal') {
    return (
      <article
        className="flex gap-4 group animate-fade-in-up"
        style={{ animationDelay: delay, animationFillMode: 'both' }}
      >
        <Link href={`/post/${article.id}`} className="relative flex-shrink-0 w-24 h-20 rounded-lg overflow-hidden border border-zinc-800">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-115 transition-transform duration-500"
          />
        </Link>
        <div className="flex-1 min-w-0">
          <span className={`inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${colors.badge} mb-1 font-oswald`}>
            {article.categoryName}
          </span>
          <Link href={`/post/${article.id}`}>
            <h4 className="text-sm font-bold text-zinc-100 line-clamp-2 group-hover:text-primary transition-colors leading-tight font-oswald uppercase tracking-tight">
              {article.title}
            </h4>
          </Link>
          <p className="text-[11px] text-zinc-500 mt-1">📅 {formatDate(article.publishedAt)}</p>
        </div>
      </article>
    );
  }

  if (variant === 'featured') {
    return (
      <article
        className="relative rounded-2xl overflow-hidden group h-[480px] animate-fade-in-up card-glow border border-zinc-850 shadow-2xl"
        style={{ animationDelay: delay, animationFillMode: 'both' }}
      >
        <img
          src={article.image}
          alt={article.title}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
          <span className={`inline-block text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded ${colors.badge} mb-3 font-oswald`}>
            {article.categoryName}
          </span>
          <Link href={`/post/${article.id}`}>
            <h2 className="text-2xl md:text-3xl font-black text-white mb-2.5 leading-tight group-hover:text-primary transition-colors line-clamp-3 font-oswald uppercase tracking-tight">
              {article.title}
            </h2>
          </Link>
          <p className="text-zinc-300 text-sm line-clamp-2 mb-4 leading-relaxed">{article.summary}</p>
          <div className="flex items-center justify-between text-zinc-400 text-xs border-t border-zinc-800/80 pt-3">
            <span className="flex items-center gap-2">
              <span className={`w-6 h-6 rounded-full bg-gradient-to-br ${colors.bg} flex items-center justify-center text-black text-[10px] font-black`}>
                {article.author[0]}
              </span>
              <span className="font-semibold text-zinc-350">{article.author}</span>
            </span>
            <div className="flex items-center gap-3 font-medium">
              <span>📅 {formatDate(article.publishedAt)}</span>
              <span>👁 {formatViews(article.views)} lượt xem</span>
            </div>
          </div>
        </div>
      </article>
    );
  }

  if (variant === 'compact') {
    return (
      <article
        className="layer-1 rounded-xl p-4 hover:border-primary/40 hover:bg-zinc-900/60 transition-all group animate-fade-in-up"
        style={{ animationDelay: delay, animationFillMode: 'both' }}
      >
        <span className={`inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${colors.badge} mb-2 font-oswald`}>
          {article.categoryName}
        </span>
        <Link href={`/post/${article.id}`}>
          <h3 className="font-bold text-zinc-200 group-hover:text-primary transition-colors line-clamp-2 text-sm font-oswald uppercase leading-snug">
            {article.title}
          </h3>
        </Link>
        <div className="flex items-center gap-3 mt-2 text-zinc-550 text-xs">
          <span>📅 {formatDate(article.publishedAt)}</span>
          <span>•</span>
          <span>👁 {formatViews(article.views)} lượt xem</span>
        </div>
      </article>
    );
  }

  // Default card
  return (
    <article
      className="layer-1 rounded-xl overflow-hidden group hover:border-primary/35 transition-all duration-300 card-glow animate-fade-in-up flex flex-col h-full shadow-lg"
      style={{ animationDelay: delay, animationFillMode: 'both' }}
    >
      <Link href={`/post/${article.id}`} className="relative overflow-hidden h-48 block flex-shrink-0 border-b border-zinc-900">
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-600"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/45 to-transparent" />
        <span className={`absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded ${colors.badge} backdrop-blur-md`}>
          {article.categoryName}
        </span>
      </Link>

      <div className="p-5 flex flex-col flex-1">
        <Link href={`/post/${article.id}`}>
          <h3 className="font-bold text-zinc-100 group-hover:text-primary transition-colors line-clamp-2 text-lg leading-snug mb-2 font-oswald uppercase tracking-tight">
            {article.title}
          </h3>
        </Link>
        <p className="text-zinc-400 text-sm line-clamp-2 leading-relaxed flex-1">{article.summary}</p>
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-zinc-800/80 text-xs text-zinc-500">
          <span className="flex items-center gap-1.5">
            <span className={`w-5 h-5 rounded-full bg-gradient-to-br ${colors.bg} flex items-center justify-center text-black text-[9px] font-black`}>
              {article.author[0]}
            </span>
            <span className="truncate max-w-[100px] font-medium">{article.author}</span>
          </span>
          <div className="flex items-center gap-2">
            <span>📅 {formatDate(article.publishedAt)}</span>
            <span>•</span>
            <span>👁 {formatViews(article.views)}</span>
          </div>
        </div>
      </div>
    </article>
  );
}
