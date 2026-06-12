'use client';

import { useRouter } from 'next/navigation';
import { useArticles } from '@/context/ArticlesContext';
import { CATEGORIES } from '@/data/articles';
import ArticleForm from '@/components/ArticleForm';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

export default function NewArticlePage() {
  const router = useRouter();
  const { addArticle } = useArticles();

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

    addArticle({
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
          <h2 className="text-2xl font-black text-white font-oswald uppercase tracking-tight">Thêm Bài Viết Mới</h2>
          <p className="text-zinc-450 text-xs font-semibold uppercase tracking-wider font-oswald mt-0.5">Tạo và đăng bài viết mới lên VietNews</p>
        </div>
      </div>

      {/* Form Card */}
      <div className="layer-1 rounded-2xl p-6 shadow-xl">
        <ArticleForm onSubmit={handleSubmit} isEdit={false} />
      </div>
    </div>
  );
}
