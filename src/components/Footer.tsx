'use client';

import Link from 'next/link';
import { CATEGORIES } from '@/data/articles';

export default function Footer() {
  return (
    <footer className="bg-zinc-950 border-t border-zinc-900 mt-16 relative overflow-hidden">
      {/* Subtle border line on top */}
      <div className="h-1 bg-gradient-to-r from-primary to-primary-dark" />

      <div className="max-w-7xl mx-auto px-4 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Widget */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4 group">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-black font-black text-lg shadow-md shadow-primary/10">
                V
              </div>
              <div>
                <span className="text-xl font-black text-white tracking-tight font-oswald">Viet</span>
                <span className="text-xl font-black text-primary tracking-tight font-oswald">News</span>
              </div>
            </Link>
            <p className="text-zinc-400 text-xs leading-relaxed mb-5">
              Cập nhật tin tức mới nhất, chính xác và nhanh nhất về Công nghệ, Du lịch, Thể thao và Khoa học.
            </p>
            <div className="flex gap-2.5">
              {['Facebook', 'YouTube', 'Twitter', 'Instagram'].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="w-8 h-8 rounded-lg layer-1 hover:border-primary/50 flex items-center justify-center text-zinc-400 hover:text-primary text-[10px] font-black uppercase tracking-wider font-oswald transition-all"
                  title={social}
                >
                  {social.substring(0, 2)}
                </a>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white font-bold mb-4 text-xs uppercase tracking-wider font-oswald">Chủ Đề</h3>
            <ul className="space-y-2.5">
              {CATEGORIES.map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={`/category/${cat.slug}`}
                    className="text-zinc-400 hover:text-primary text-xs uppercase tracking-wider font-oswald font-semibold flex items-center gap-2 transition-colors group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-800 group-hover:bg-primary transition-colors" />
                    <span>{cat.icon}</span>
                    <span>{cat.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold mb-4 text-xs uppercase tracking-wider font-oswald">Liên Kết</h3>
            <ul className="space-y-2.5">
              {[
                { label: 'Trang Chủ', href: '/' },
                { label: 'Tìm Kiếm', href: '/search' },
                { label: 'Liên Hệ', href: '/contact' },
                { label: 'Admin', href: '/admin' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-zinc-400 hover:text-primary text-xs uppercase tracking-wider font-oswald font-semibold flex items-center gap-2 transition-colors group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-800 group-hover:bg-primary transition-colors" />
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white font-bold mb-4 text-xs uppercase tracking-wider font-oswald">Nhận Bản Tin</h3>
            <p className="text-zinc-400 text-xs mb-4 leading-relaxed">Đăng ký nhận tin tức nóng hổi được biên soạn gửi trực tiếp đến hộp thư của bạn mỗi ngày.</p>
            <div className="flex flex-col gap-2">
              <input
                type="email"
                placeholder="Email của bạn..."
                className="px-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-lg text-white text-xs placeholder-zinc-550 focus:outline-none focus:border-primary font-medium"
              />
              <button className="px-4 py-2.5 bg-primary hover:bg-primary-dark text-black text-xs font-black uppercase tracking-wider rounded-lg transition-colors font-oswald w-full">
                ĐĂNG KÝ
              </button>
            </div>
          </div>
        </div>

        {/* Bottom copyright section */}
        <div className="mt-12 pt-6 border-t border-zinc-900 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-zinc-500 text-xs font-semibold">
            © {new Date().getFullYear()} <span className="text-primary">VietNews</span>. Mọi quyền được bảo lưu.
          </p>
          <div className="flex gap-5">
            <a href="#" className="text-zinc-500 hover:text-zinc-350 text-xs font-medium transition-colors">Chính Sách Bảo Mật</a>
            <a href="#" className="text-zinc-500 hover:text-zinc-350 text-xs font-medium transition-colors">Điều Khoản Sử Dụng</a>
            <a href="#" className="text-zinc-500 hover:text-zinc-350 text-xs font-medium transition-colors">Sơ Đồ Trang</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
