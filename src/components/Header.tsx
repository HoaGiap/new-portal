'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { CATEGORIES } from '@/data/articles';
import { useTheme } from '@/context/ThemeContext';
import { Search, Sun, Moon, Menu, X, Calendar, Home, Mail, Settings, Laptop, Plane, Trophy, FlaskConical } from 'lucide-react';

const categoryIcons: Record<string, React.ReactNode> = {
  'cong-nghe': <Laptop className="w-3.5 h-3.5" />,
  'du-lich': <Plane className="w-3.5 h-3.5" />,
  'the-thao': <Trophy className="w-3.5 h-3.5" />,
  'khoa-hoc': <FlaskConical className="w-3.5 h-3.5" />,
};

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
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
    setSearchOpen(false);
  }, [pathname]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  const categoryColors: Record<string, string> = {
    'cong-nghe': 'text-primary dark:text-primary',
    'du-lich': 'text-emerald-600 dark:text-emerald-450',
    'the-thao': 'text-orange-600 dark:text-orange-450',
    'khoa-hoc': 'text-purple-600 dark:text-purple-450',
  };

  const activeCategoryBg: Record<string, string> = {
    'cong-nghe': 'bg-primary/10 text-primary',
    'du-lich': 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
    'the-thao': 'bg-orange-500/10 text-orange-600 dark:text-orange-400',
    'khoa-hoc': 'bg-purple-500/10 text-purple-600 dark:text-purple-400',
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
        scrolled
          ? 'bg-card/80 dark:bg-zinc-950/80 backdrop-blur-md border-border-base shadow-premium'
          : 'bg-transparent border-transparent'
      }`}
    >
      {/* Top Banner (Time & Socials) */}
      <div className="border-b border-border-base/40 bg-card/40 dark:bg-zinc-900/20 text-zinc-500 dark:text-zinc-400 text-xs py-2 hidden md:block">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <span className="flex items-center gap-2 font-medium">
            <Calendar className="w-3.5 h-3.5 text-primary" /> Thứ Năm, 12 tháng 6 năm 2026 &nbsp;|&nbsp; Bản tin VietNews 24/7
          </span>
          <span className="flex items-center gap-4">
            <a href="#" className="hover:text-primary transition-colors">Facebook</a>
            <a href="#" className="hover:text-primary transition-colors">YouTube</a>
            <a href="#" className="hover:text-primary transition-colors">Twitter</a>
          </span>
        </div>
      </div>

      {/* Main Nav */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16 md:h-20 gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group flex-shrink-0">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary to-accent flex items-center justify-center text-white font-black text-xl shadow-lg glow-primary group-hover:scale-105 transition-all duration-300">
              V
            </div>
            <div>
              <span className="text-xl font-black text-fg-main tracking-tight font-plus-jakarta">Viet</span>
              <span className="text-xl font-black bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent tracking-tight font-plus-jakarta">News</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 flex-1 justify-center max-w-3xl">
            <Link
              href="/"
              className={`px-3 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all font-plus-jakarta ${
                pathname === '/'
                  ? 'bg-primary/10 text-primary'
                  : 'text-zinc-500 dark:text-zinc-300 hover:text-fg-main hover:bg-card-hover'
              }`}
            >
              Trang Chủ
            </Link>
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.id}
                href={`/category/${cat.slug}`}
                className={`px-3 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all font-plus-jakarta flex items-center gap-1.5 group ${
                  pathname === `/category/${cat.slug}`
                    ? activeCategoryBg[cat.slug] || 'bg-primary/10 text-primary font-black'
                    : `text-zinc-500 dark:text-zinc-300 hover:text-fg-main hover:bg-card-hover`
                }`}
              >
                <span className="flex items-center justify-center">{categoryIcons[cat.slug] || cat.icon}</span>
                <span className={pathname === `/category/${cat.slug}` ? '' : 'group-hover:text-fg-main'}>{cat.name}</span>
              </Link>
            ))}
            <Link
              href="/contact"
              className={`px-3 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all font-plus-jakarta ${
                pathname === '/contact'
                  ? 'bg-primary/10 text-primary'
                  : 'text-zinc-500 dark:text-zinc-300 hover:text-fg-main hover:bg-card-hover'
              }`}
            >
              Liên Hệ
            </Link>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3 flex-shrink-0">
            {/* Search Trigger */}
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2.5 rounded-xl text-zinc-600 dark:text-zinc-300 hover:bg-card-hover border border-transparent hover:border-border-base transition-all duration-300 flex items-center justify-center"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Dark/Light Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl text-zinc-600 dark:text-zinc-300 hover:bg-card-hover border border-transparent hover:border-border-base transition-all duration-300 flex items-center justify-center"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5 transition-transform duration-500 hover:rotate-45" />
              ) : (
                <Moon className="w-5 h-5 transition-transform duration-500 hover:-rotate-12" />
              )}
            </button>

            {/* Admin link */}
            <Link
              href="/admin"
              className="hidden md:flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md font-plus-jakarta"
            >
              <Settings className="w-3.5 h-3.5" /> Admin
            </Link>

            {/* Hamburger (Mobile Menu Toggle) */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden p-2.5 rounded-xl text-zinc-600 dark:text-zinc-300 hover:bg-card-hover border border-border-base transition-all duration-300 flex items-center justify-center"
              aria-label="Toggle Menu"
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
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
        <div className="bg-card border-t border-border-base px-6 py-6 space-y-3 shadow-xl">
          <Link
            href="/"
            className="flex items-center gap-2 px-3 py-2 rounded-xl text-zinc-700 dark:text-zinc-200 hover:bg-card-hover font-bold font-plus-jakarta text-xs uppercase tracking-wider"
          >
            <Home className="w-4 h-4 text-zinc-400" /> Trang Chủ
          </Link>
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              href={`/category/${cat.slug}`}
              className="flex items-center gap-2 px-3 py-2 rounded-xl text-zinc-700 dark:text-zinc-200 hover:bg-card-hover font-bold font-plus-jakarta text-xs uppercase tracking-wider"
            >
              <span className="flex items-center justify-center text-zinc-400">{categoryIcons[cat.slug] || cat.icon}</span>
              <span>{cat.name}</span>
            </Link>
          ))}
          <Link
            href="/contact"
            className="flex items-center gap-2 px-3 py-2 rounded-xl text-zinc-700 dark:text-zinc-200 hover:bg-card-hover font-bold font-plus-jakarta text-xs uppercase tracking-wider"
          >
            <Mail className="w-4 h-4 text-zinc-400" /> Liên Hệ
          </Link>
          <Link
            href="/admin"
            className="flex items-center gap-2 px-3 py-3 rounded-xl bg-gradient-to-r from-primary to-accent text-white font-black font-plus-jakarta text-xs uppercase tracking-wider justify-center shadow-lg"
          >
            <Settings className="w-4 h-4 text-white" /> Admin Panel
          </Link>
        </div>
      </div>

      {/* Fullscreen Search Modal */}
      {searchOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-6 bg-background/95 backdrop-blur-lg animate-fade-in">
          <button
            onClick={() => setSearchOpen(false)}
            className="absolute top-6 right-6 p-3 rounded-full hover:bg-card-hover border border-border-base/55 text-zinc-500 hover:text-fg-main transition-all duration-300 flex items-center justify-center"
            aria-label="Close search"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="max-w-2xl w-full text-center space-y-6">
            <div className="space-y-2">
              <h2 className="text-3xl font-black text-fg-main font-plus-jakarta uppercase tracking-tight">Tìm Kiếm Tin Tức</h2>
              <p className="text-zinc-500 text-sm font-semibold uppercase tracking-wider font-plus-jakarta">Khám phá nội dung thú vị trên VietNews</p>
            </div>
            
            <form onSubmit={handleSearch} className="relative w-full max-w-xl mx-auto">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Nhập từ khóa cần tìm..."
                className="w-full px-6 py-4 pl-14 pr-24 bg-card border border-border-base rounded-2xl text-fg-main placeholder-zinc-500 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 text-lg shadow-xl"
                autoFocus
              />
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-zinc-400" />
              <button
                type="submit"
                className="absolute right-3 top-1/2 -translate-y-1/2 px-5 py-2 bg-gradient-to-r from-primary to-accent hover:opacity-95 text-white font-bold text-sm rounded-xl transition-all shadow-md font-plus-jakarta"
              >
                TÌM KIẾM
              </button>
            </form>

            <div className="flex flex-wrap justify-center items-center gap-2 pt-2">
              <span className="text-zinc-500 text-xs font-bold uppercase tracking-wider font-plus-jakarta">Gợi ý chủ đề:</span>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => {
                    router.push(`/category/${cat.slug}`);
                    setSearchOpen(false);
                  }}
                  className="px-3.5 py-1.5 bg-card hover:bg-card-hover border border-border-base text-zinc-500 dark:text-zinc-300 hover:text-primary text-[10px] font-black uppercase tracking-wider font-plus-jakarta rounded-xl transition-all"
                >
                  {cat.icon} {cat.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
