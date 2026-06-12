'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { CATEGORIES } from '@/data/articles';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  const categoryColors: Record<string, string> = {
    'cong-nghe': 'text-primary',
    'du-lich': 'text-emerald-400',
    'the-thao': 'text-orange-400',
    'khoa-hoc': 'text-purple-400',
  };

  const categoryBadgeColors: Record<string, string> = {
    'cong-nghe': 'hover:text-primary hover:bg-primary/10',
    'du-lich': 'hover:text-emerald-400 hover:bg-emerald-400/10',
    'the-thao': 'hover:text-orange-400 hover:bg-orange-400/10',
    'khoa-hoc': 'hover:text-purple-400 hover:bg-purple-400/10',
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-zinc-950/95 backdrop-blur-md shadow-lg shadow-black/40 border-b border-zinc-800'
          : 'bg-zinc-950/80 backdrop-blur-sm border-b border-zinc-900/50'
      }`}
    >
      {/* Top Bar */}
      <div className="bg-zinc-900 text-zinc-400 text-xs py-2 border-b border-zinc-800/40 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <span className="flex items-center gap-2 font-medium">
            📅 Thứ Năm, 12 tháng 6 năm 2024 &nbsp;|&nbsp; Cập nhật liên tục 24/7
          </span>
          <span className="flex items-center gap-3">
            <a href="#" className="hover:text-primary transition-colors">Facebook</a>
            <span>•</span>
            <a href="#" className="hover:text-primary transition-colors">YouTube</a>
            <span>•</span>
            <a href="#" className="hover:text-primary transition-colors">Twitter</a>
          </span>
        </div>
      </div>

      {/* Main Nav */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group flex-shrink-0">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-black font-black text-xl shadow-lg shadow-primary/25 group-hover:scale-110 transition-transform">
              V
            </div>
            <div>
              <span className="text-xl font-black text-white tracking-tight font-oswald">Viet</span>
              <span className="text-xl font-black text-primary tracking-tight font-oswald">News</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-2 xl:gap-3 flex-1 justify-center max-w-2xl">
            <Link
              href="/"
              className={`px-3 py-1.5 rounded-lg text-sm font-semibold uppercase tracking-wider transition-all font-oswald ${
                pathname === '/'
                  ? 'text-primary bg-primary/10'
                  : 'text-zinc-300 hover:text-white hover:bg-zinc-800'
              }`}
            >
              Trang Chủ
            </Link>
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.id}
                href={`/category/${cat.slug}`}
                className={`px-3 py-1.5 rounded-lg text-sm font-semibold uppercase tracking-wider transition-all font-oswald flex items-center gap-1.5 ${
                  pathname === `/category/${cat.slug}`
                    ? `${categoryColors[cat.slug] || 'text-primary'} bg-zinc-800`
                    : `text-zinc-300 ${categoryBadgeColors[cat.slug] || 'hover:text-white hover:bg-zinc-800'}`
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
              </Link>
            ))}
            <Link
              href="/contact"
              className={`px-3 py-1.5 rounded-lg text-sm font-semibold uppercase tracking-wider transition-all font-oswald ${
                pathname === '/contact'
                  ? 'text-primary bg-primary/10'
                  : 'text-zinc-300 hover:text-white hover:bg-zinc-800'
              }`}
            >
              Liên Hệ
            </Link>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3 flex-shrink-0">
            {/* Search */}
            <form onSubmit={handleSearch} className="hidden md:flex items-center">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Tìm kiếm..."
                  className="w-36 xl:w-48 px-4 py-1.5 pl-9 text-sm bg-zinc-900 border border-zinc-800 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all focus:w-56"
                />
                <svg
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </form>

            {/* Admin */}
            <Link
              href="/admin"
              className="hidden md:flex items-center gap-1.5 px-3.5 py-1.5 bg-primary hover:bg-primary-dark text-black text-xs font-bold uppercase tracking-wider rounded-lg transition-all hover:shadow-lg hover:shadow-primary/25 font-oswald"
            >
              <svg className="w-3.5 h-3.5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              Admin
            </Link>

            {/* Hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-900 transition-all border border-zinc-800/80"
              aria-label="Toggle menu"
            >
              <div className="w-5 space-y-1.5">
                <span
                  className={`block h-0.5 bg-current transition-all ${
                    menuOpen ? 'rotate-45 translate-y-2' : ''
                  }`}
                />
                <span
                  className={`block h-0.5 bg-current transition-all ${
                    menuOpen ? 'opacity-0' : ''
                  }`}
                />
                <span
                  className={`block h-0.5 bg-current transition-all ${
                    menuOpen ? '-rotate-45 -translate-y-2' : ''
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden transition-all duration-300 overflow-hidden ${
          menuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-zinc-950 border-t border-zinc-900 px-4 py-4 space-y-2.5">
          <form onSubmit={handleSearch} className="flex mb-3">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm kiếm tin tức..."
              className="flex-1 px-4 py-2 text-sm bg-zinc-900 border border-zinc-800 rounded-l-lg text-white placeholder-zinc-500 focus:outline-none focus:border-primary"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-primary hover:bg-primary-dark text-black font-bold text-sm rounded-r-lg transition-colors font-oswald"
            >
              TÌM
            </button>
          </form>
          <Link
            href="/"
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-zinc-300 hover:text-white hover:bg-zinc-900 font-semibold font-oswald text-sm"
          >
            🏠 TRANG CHỦ
          </Link>
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              href={`/category/${cat.slug}`}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-zinc-300 hover:text-white hover:bg-zinc-900 font-semibold font-oswald text-sm"
            >
              <span>{cat.icon}</span>
              <span>{cat.name.toUpperCase()}</span>
            </Link>
          ))}
          <Link
            href="/contact"
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-zinc-300 hover:text-white hover:bg-zinc-900 font-semibold font-oswald text-sm"
          >
            📧 LIÊN HỆ
          </Link>
          <Link
            href="/admin"
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-primary hover:bg-primary-dark text-black font-black font-oswald text-sm justify-center"
          >
            ⚙️ ADMIN DASHBOARD
          </Link>
        </div>
      </div>
    </header>
  );
}
