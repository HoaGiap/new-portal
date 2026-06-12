'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: '📊', exact: true },
  { href: '/admin/articles', label: 'Bài viết', icon: '📰' },
  { href: '/admin/articles/new', label: 'Thêm bài viết', icon: '✏️' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen flex bg-zinc-950 text-zinc-100 font-sans">
      {/* Sidebar */}
      <aside className="w-56 bg-zinc-900 border-r border-zinc-800 flex flex-col fixed left-0 top-0 bottom-0 z-40">
        {/* Logo */}
        <div className="p-4 border-b border-zinc-800">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-black font-black text-sm shadow-md shadow-primary/10">
              V
            </div>
            <div>
              <span className="text-sm font-bold text-white font-oswald uppercase">Viet</span>
              <span className="text-sm font-bold text-primary font-oswald uppercase">News</span>
            </div>
          </Link>
          <div className="mt-2.5 px-2 py-1 bg-primary/10 border border-primary/20 rounded-lg">
            <p className="text-[10px] text-primary font-black uppercase tracking-wider font-oswald text-center">⚙️ Admin Panel</p>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-3 space-y-1.5">
          {navItems.map((item) => {
            const isActive = item.exact ? pathname === item.href : pathname.startsWith(item.href) && item.href !== '/admin';
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider font-oswald transition-all ${
                  isActive
                    ? 'bg-primary text-black shadow-lg shadow-primary/25 font-black'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-3 border-t border-zinc-800">
          <Link
            href="/"
            className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider font-oswald text-zinc-400 hover:text-white hover:bg-zinc-800/60 transition-all"
          >
            <span>🏠</span>
            <span>Về Trang Chủ</span>
          </Link>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 ml-56 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-zinc-900/95 backdrop-blur-md border-b border-zinc-800 px-6 py-3 flex items-center justify-between">
          <div>
            <h1 className="text-white font-bold text-sm tracking-wide font-oswald uppercase">Admin Dashboard</h1>
            <p className="text-zinc-500 text-[10px] uppercase tracking-wider font-bold">VietNews Management System</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-xs text-zinc-400 font-semibold uppercase tracking-wider font-oswald">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Đang hoạt động
            </span>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-black text-sm font-black font-oswald">
              A
            </div>
          </div>
        </header>

        <main className="flex-1 p-6 bg-zinc-950">{children}</main>
      </div>
    </div>
  );
}
