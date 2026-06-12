'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: '📊', exact: true },
  { href: '/admin/articles', label: 'Bài viết', icon: '📰' },
  { href: '/admin/articles/new', label: 'Thêm bài viết', icon: '✏️' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="min-h-screen flex bg-zinc-950 text-zinc-100 font-sans">
      {/* Sidebar */}
      <aside
        className={`bg-zinc-900 border-r border-zinc-800 flex flex-col fixed left-0 top-0 bottom-0 z-40 transition-all duration-300 ${
          isCollapsed ? 'w-20' : 'w-60'
        }`}
      >
        {/* Logo */}
        <div className="p-4 border-b border-zinc-800 flex items-center justify-between">
          {!isCollapsed && (
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-primary to-accent flex items-center justify-center text-white font-black text-sm shadow-md">
                V
              </div>
              <div>
                <span className="text-sm font-bold text-white font-plus-jakarta uppercase">Viet</span>
                <span className="text-sm font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent font-plus-jakarta uppercase">News</span>
              </div>
            </Link>
          )}
          {isCollapsed && (
            <Link href="/" className="w-8 h-8 rounded-lg bg-gradient-to-tr from-primary to-accent flex items-center justify-center text-white font-black text-sm mx-auto shadow-md">
              V
            </Link>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1 rounded-lg hover:bg-zinc-800 border border-transparent hover:border-zinc-800/80 text-zinc-400 hover:text-white transition-all hidden md:block"
            title={isCollapsed ? 'Mở rộng menu' : 'Thu gọn menu'}
          >
            {isCollapsed ? '➡️' : '⬅️'}
          </button>
        </div>

        {/* Panel Badge */}
        {!isCollapsed && (
          <div className="mx-4 mt-4 px-2 py-1.5 bg-primary/10 border border-primary/20 rounded-lg text-center">
            <p className="text-[10px] text-primary font-black uppercase tracking-wider font-plus-jakarta">⚙️ Admin Panel</p>
          </div>
        )}

        {/* Nav Links */}
        <nav className="flex-1 p-3 space-y-2 mt-2">
          {navItems.map((item) => {
            const isActive = item.exact ? pathname === item.href : pathname.startsWith(item.href) && item.href !== '/admin';
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center rounded-xl text-xs font-bold uppercase tracking-wider font-plus-jakarta transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-primary to-accent text-white shadow-lg shadow-primary/25 font-black'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'
                } ${isCollapsed ? 'p-3 justify-center' : 'px-3.5 py-3 gap-3'}`}
                title={isCollapsed ? item.label : undefined}
              >
                <span className="text-base">{item.icon}</span>
                {!isCollapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Footer Link */}
        <div className="p-3 border-t border-zinc-800">
          <Link
            href="/"
            className={`flex items-center rounded-xl text-xs font-bold uppercase tracking-wider font-plus-jakarta text-zinc-400 hover:text-white hover:bg-zinc-800/60 transition-all ${
              isCollapsed ? 'p-3 justify-center' : 'px-3.5 py-3 gap-3'
            }`}
            title={isCollapsed ? 'Về Trang Chủ' : undefined}
          >
            <span className="text-base">🏠</span>
            {!isCollapsed && <span>Về Trang Chủ</span>}
          </Link>
        </div>
      </aside>

      {/* Main Container */}
      <div
        className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ${
          isCollapsed ? 'ml-20' : 'ml-60'
        }`}
      >
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-zinc-900/95 backdrop-blur-md border-b border-zinc-800 px-6 py-4 flex items-center justify-between shadow-sm">
          <div>
            <h1 className="text-white font-bold text-sm tracking-wide font-plus-jakarta uppercase">Admin Dashboard</h1>
            <p className="text-zinc-500 text-[10px] uppercase tracking-wider font-bold">VietNews Management System</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-xs text-zinc-400 font-semibold uppercase tracking-wider font-plus-jakarta">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Đang hoạt động
            </span>
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-primary to-accent flex items-center justify-center text-white text-xs font-black font-plus-jakarta">
              A
            </div>
          </div>
        </header>

        <main className="flex-1 p-6 bg-zinc-950">{children}</main>
      </div>
    </div>
  );
}
