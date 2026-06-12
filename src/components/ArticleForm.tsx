'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CATEGORIES } from '@/data/articles';
import RichTextEditor from './RichTextEditor';
import { Loader2, Check } from 'lucide-react';

interface ArticleFormData {
  title: string;
  summary: string;
  content: string;
  image: string;
  categoryId: string;
  author: string;
}

interface ArticleFormProps {
  initialData?: Partial<ArticleFormData>;
  onSubmit: (data: ArticleFormData) => void;
  isEdit?: boolean;
}

const emptyForm: ArticleFormData = {
  title: '',
  summary: '',
  content: '',
  image: '',
  categoryId: '1',
  author: '',
};

export default function ArticleForm({ initialData, onSubmit, isEdit = false }: ArticleFormProps) {
  const router = useRouter();
  const [form, setForm] = useState<ArticleFormData>({ ...emptyForm, ...initialData });
  const [errors, setErrors] = useState<Partial<ArticleFormData>>({});
  const [loading, setLoading] = useState(false);
  const [imagePreviewError, setImagePreviewError] = useState(false);

  const validate = (): boolean => {
    const newErrors: Partial<ArticleFormData> = {};
    if (!form.title.trim()) newErrors.title = 'Vui lòng nhập tiêu đề';
    else if (form.title.length < 10) newErrors.title = 'Tiêu đề phải có ít nhất 10 ký tự';
    if (!form.summary.trim()) newErrors.summary = 'Vui lòng nhập tóm tắt';
    else if (form.summary.length < 30) newErrors.summary = 'Tóm tắt phải có ít nhất 30 ký tự';
    if (!form.content.trim()) newErrors.content = 'Vui lòng nhập nội dung';
    else if (form.content.length < 50) newErrors.content = 'Nội dung phải có ít nhất 50 ký tự';
    if (!form.image.trim()) newErrors.image = 'Vui lòng nhập URL ảnh';
    if (!form.author.trim()) newErrors.author = 'Vui lòng nhập tên tác giả';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof ArticleFormData]) setErrors((prev) => ({ ...prev, [name]: '' }));
    if (name === 'image') setImagePreviewError(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      const firstError = document.querySelector('.border-red-500');
      firstError?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    onSubmit(form);
    setLoading(false);
  };

  const selectedCategory = CATEGORIES.find((c) => c.id === form.categoryId);

  const categoryColorMap: Record<string, string> = {
    'cong-nghe': 'bg-primary/10 text-primary border-primary/20',
    'du-lich': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    'the-thao': 'bg-orange-500/10 text-orange-400 border-orange-500/20',
    'khoa-hoc': 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  };

  const inputClass = (field: keyof ArticleFormData) =>
    `w-full px-4 py-2.5 bg-zinc-950 border rounded-xl text-white placeholder-zinc-650 text-sm focus:outline-none focus:ring-2 transition-all ${
      errors[field]
        ? 'border-red-500 focus:ring-red-500/20'
        : 'border-zinc-800 focus:border-primary focus:ring-primary/15'
    }`;

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      {/* Title */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider font-oswald text-zinc-300 mb-1.5">
          Tiêu đề bài viết <span className="text-red-500 font-sans">*</span>
        </label>
        <input
          id="form-title"
          name="title"
          type="text"
          value={form.title}
          onChange={handleChange}
          placeholder="Nhập tiêu đề hấp dẫn..."
          className={inputClass('title')}
        />
        {errors.title && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.title}</p>}
        <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-wider font-oswald mt-1">{form.title.length} ký tự</p>
      </div>

      {/* Summary */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider font-oswald text-zinc-300 mb-1.5">
          Tóm tắt <span className="text-red-500 font-sans">*</span>
        </label>
        <textarea
          id="form-summary"
          name="summary"
          value={form.summary}
          onChange={handleChange}
          rows={3}
          placeholder="Nhập mô tả ngắn gọn (hiển thị ở trang chủ)..."
          className={`${inputClass('summary')} resize-none`}
        />
        {errors.summary && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.summary}</p>}
        <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-wider font-oswald mt-1">{form.summary.length} ký tự</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Author */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider font-oswald text-zinc-300 mb-1.5">
            Tác giả <span className="text-red-500 font-sans">*</span>
          </label>
          <input
            id="form-author"
            name="author"
            type="text"
            value={form.author}
            onChange={handleChange}
            placeholder="Nguyễn Văn A"
            className={inputClass('author')}
          />
          {errors.author && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.author}</p>}
        </div>

        {/* Category */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider font-oswald text-zinc-300 mb-1.5">
            Chủ đề <span className="text-red-500 font-sans">*</span>
          </label>
          <select
            id="form-category"
            name="categoryId"
            value={form.categoryId}
            onChange={handleChange}
            className="w-full px-4 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-white text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 font-semibold font-oswald uppercase tracking-wider"
          >
            {CATEGORIES.map((c) => (
              <option key={c.id} value={c.id}>
                {c.icon} {c.name.toUpperCase()}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Image URL + Preview */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider font-oswald text-zinc-300 mb-1.5">
          URL ảnh bìa <span className="text-red-500 font-sans">*</span>
        </label>
        <input
          id="form-image"
          name="image"
          type="url"
          value={form.image}
          onChange={handleChange}
          placeholder="https://images.unsplash.com/..."
          className={inputClass('image')}
        />
        {errors.image && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.image}</p>}
        {form.image && !imagePreviewError && (
          <div className="mt-4 relative rounded-xl overflow-hidden h-44 border border-zinc-800 shadow-lg">
            <img
              src={form.image}
              alt="Preview"
              className="w-full h-full object-cover"
              onError={() => setImagePreviewError(true)}
            />
            <div className="absolute inset-0 bg-black/20 flex items-end p-3">
              <span className="text-black text-[10px] font-black uppercase tracking-wider bg-primary px-2.5 py-1 rounded">Xem trước ảnh bìa</span>
            </div>
          </div>
        )}
        {form.image && imagePreviewError && (
          <p className="text-yellow-500 text-xs mt-1.5 font-medium">⚠️ Không thể tải ảnh preview. Kiểm tra lại URL.</p>
        )}
        <p className="text-zinc-550 text-[10px] font-bold uppercase tracking-wider font-oswald mt-1.5">
          💡 Gợi ý: Dùng URL từ{' '}
          <a href="https://unsplash.com" target="_blank" rel="noopener" className="text-primary hover:underline">
            Unsplash
          </a>
          {' '}(format: https://images.unsplash.com/photo-ID?w=800&h=450&fit=crop)
        </p>
      </div>

      {/* Content */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider font-oswald text-zinc-300 mb-1.5">
          Nội dung bài viết <span className="text-red-500 font-sans">*</span>
          <span className="text-zinc-550 text-[10px] ml-2 font-bold normal-case font-sans tracking-normal">(Soạn thảo trực quan hoặc sửa HTML)</span>
        </label>
        <RichTextEditor
          value={form.content}
          onChange={(newContent) => {
            setForm((prev) => ({ ...prev, content: newContent }));
            if (errors.content) setErrors((prev) => ({ ...prev, content: '' }));
          }}
          placeholder="Nhập nội dung bài viết..."
          error={errors.content}
        />
        {errors.content && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.content}</p>}
        <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-wider font-oswald mt-1">{form.content.length} ký tự</p>
      </div>

      {/* Preview badge */}
      {selectedCategory && form.title && (
        <div className="p-4 layer-1 rounded-xl shadow-md">
          <p className="text-[10px] font-bold uppercase tracking-wider font-oswald text-zinc-500 mb-2">👁 Xem trước bài viết:</p>
          <div className="flex items-center gap-3">
            <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded border font-oswald ${categoryColorMap[selectedCategory.slug] || ''}`}>
              {selectedCategory.name}
            </span>
            <span className="text-sm font-bold text-zinc-200 line-clamp-1 font-oswald uppercase tracking-tight">{form.title}</span>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-3 pt-2 font-oswald">
        <button
          type="submit"
          id="form-submit"
          disabled={loading}
          style={{ backgroundColor: '#00BD7D', color: '#000000' }}
          className="flex-1 sm:flex-none px-8 py-3 hover:bg-[#009a65] disabled:opacity-50 disabled:cursor-not-allowed font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-md shadow-primary/10 flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-black" />
              Đang lưu...
            </>
          ) : (
            <>
              <Check className="w-4 h-4 text-black" strokeWidth={2.5} />
              {isEdit ? 'Cập Nhật Bài Viết' : 'Đăng Bài Viết'}
            </>
          )}
        </button>
        <button
          type="button"
          onClick={() => router.push('/admin/articles')}
          className="px-6 py-3 bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 text-zinc-300 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors"
        >
          Hủy bỏ
        </button>
      </div>
    </form>
  );
}
