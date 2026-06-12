'use client';

import { use } from 'react';
import { useRouter } from 'next/navigation';
import { useArticles } from '@/context/ArticlesContext';
import { CATEGORIES } from '@/data/articles';
import ArticleForm from '@/components/ArticleForm';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronLeft, ExternalLink } from 'lucide-react';

export default function EditArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const { getArticleById, updateArticle } = useArticles();

  const article = getArticleById(id);
  if (!article) return notFound();

  const handleSubmit = (formData: {
    title: string;
    summary: string;
    content: string;
    image: string;
    categoryId: string;
    author: string;
  }) => {
    const category = CATEGORIES.find((c) => c.id === formData.categoryId)!;
    const slug = formData.title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd')
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-')
      .substring(0, 80);

    updateArticle(id, {
      title: formData.title,
      slug,
      summary: formData.summary,
      content: formData.content,
      image: formData.image,
      categoryId: category.id,
      categoryName: category.name,
      categorySlug: category.slug,
      author: formData.author,
    });

    router.push('/admin/articles');
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link
          href="/admin/articles"
          className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-900 border border-zinc-850 transition-all"
        >
          <ChevronLeft className="w-5 h-5 text-current" />
        </Link>
        <div>
          <h2 className="text-2xl font-black text-white font-oswald uppercase tracking-tight">Chỉnh Sửa Bài Viết</h2>
          <p className="text-zinc-450 text-xs font-semibold uppercase tracking-wider font-oswald mt-0.5 line-clamp-1">
            Đang sửa: <span className="text-zinc-300 normal-case font-medium">{article.title}</span>
          </p>
        </div>
        <div className="ml-auto flex gap-2">
          <Link
            href={`/post/${article.id}`}
            target="_blank"
            className="flex items-center gap-1.5 px-3.5 py-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white text-xs font-bold uppercase tracking-wider font-oswald rounded-xl transition-all shadow-md"
          >
            <ExternalLink className="w-4 h-4 text-current" />
            Xem trước
          </Link>
        </div>
      </div>

      {/* Form Card */}
      <div className="layer-1 rounded-2xl p-6 shadow-xl">
        <ArticleForm
          initialData={{
            title: article.title,
            summary: article.summary,
            content: article.content,
            image: article.image,
            categoryId: article.categoryId,
            author: article.author,
          }}
          onSubmit={handleSubmit}
          isEdit={true}
        />
      </div>
    </div>
  );
}
