'use client';

import Link from 'next/link';
import { CATEGORIES } from '@/data/articles';
import { Laptop, Plane, Trophy, FlaskConical, Send } from 'lucide-react';

const Facebook = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    width="24"
    height="24"
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const Youtube = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    width="24"
    height="24"
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17z" />
    <polygon points="10 15 15 12 10 9" />
  </svg>
);

const Twitter = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    width="24"
    height="24"
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const Instagram = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    width="24"
    height="24"
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const categoryIcons: Record<string, React.ReactNode> = {
  'cong-nghe': <Laptop className="w-3.5 h-3.5 text-zinc-400 group-hover:text-primary transition-colors" />,
  'du-lich': <Plane className="w-3.5 h-3.5 text-zinc-400 group-hover:text-primary transition-colors" />,
  'the-thao': <Trophy className="w-3.5 h-3.5 text-zinc-400 group-hover:text-primary transition-colors" />,
  'khoa-hoc': <FlaskConical className="w-3.5 h-3.5 text-zinc-400 group-hover:text-primary transition-colors" />,
};

const socialIcons: Record<string, React.ReactNode> = {
  'Facebook': <Facebook className="w-4 h-4" />,
  'YouTube': <Youtube className="w-4 h-4" />,
  'Twitter': <Twitter className="w-4 h-4" />,
  'Instagram': <Instagram className="w-4 h-4" />,
};

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
                  className="w-8 h-8 rounded-lg layer-1 hover:border-primary/50 flex items-center justify-center text-zinc-400 hover:text-primary transition-all"
                  title={social}
                >
                  {socialIcons[social]}
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
                    {categoryIcons[cat.slug] || <span className="w-1.5 h-1.5 rounded-full bg-zinc-800 group-hover:bg-primary transition-colors" />}
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
              <button className="px-4 py-2.5 bg-primary hover:bg-primary-dark text-black text-xs font-black uppercase tracking-wider rounded-lg transition-colors font-oswald w-full flex items-center justify-center gap-2">
                <Send className="w-3.5 h-3.5 text-black" /> ĐĂNG KÝ
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
