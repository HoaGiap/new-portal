'use client';

import Link from 'next/link';
import PublicLayout from '@/components/PublicLayout';

export default function NotFound() {
  return (
    <PublicLayout>
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
        <div className="text-8xl font-black text-zinc-900 mb-2 font-oswald tracking-tight">404</div>
        <div className="text-5xl mb-6">🗞️</div>
        <h1 className="text-2xl font-bold text-white mb-3 font-oswald uppercase tracking-tight">Trang không tồn tại</h1>
        <p className="text-zinc-400 text-xs mb-8 max-w-md leading-relaxed">
          Đường dẫn bạn đang truy cập không tồn tại hoặc bài viết đã bị gỡ bỏ. Hãy quay lại trang chủ để cập nhật các tin tức mới nhất!
        </p>
        <div className="flex flex-wrap gap-3 justify-center font-oswald">
          <Link
            href="/"
            className="px-6 py-2.5 bg-primary hover:bg-primary-dark text-black text-xs font-black uppercase tracking-wider rounded-xl transition-all shadow-md shadow-primary/15"
          >
            🏠 Về Trang Chủ
          </Link>
          <Link
            href="/search"
            className="px-6 py-2.5 bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 text-zinc-300 hover:text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all"
          >
            🔍 Tìm Kiếm Tin Tức
          </Link>
        </div>
      </div>
    </PublicLayout>
  );
}
