import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Inter } from 'next/font/google';
import './globals.css';
import { ArticlesProvider } from '@/context/ArticlesContext';
import { ThemeProvider } from '@/context/ThemeContext';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-plus-jakarta-sans',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'VietNews - Tin Tức Việt Nam & Thế Giới',
    template: '%s | VietNews',
  },
  description:
    'VietNews - Cập nhật tin tức mới nhất về Công nghệ, Du lịch, Thể thao và Khoa học. Đọc tin nhanh, chính xác và đáng tin cậy.',
  keywords: ['tin tức', 'công nghệ', 'du lịch', 'thể thao', 'khoa học', 'Việt Nam'],
  authors: [{ name: 'VietNews' }],
  openGraph: {
    type: 'website',
    locale: 'vi_VN',
    siteName: 'VietNews',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" className={`${plusJakartaSans.variable} ${inter.variable}`}>
      <body style={{ fontFamily: 'var(--font-inter), sans-serif' }}>
        <ThemeProvider>
          <ArticlesProvider>{children}</ArticlesProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
