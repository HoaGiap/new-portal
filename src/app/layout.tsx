import type { Metadata } from 'next';
import { Oswald, Poppins } from 'next/font/google';
import './globals.css';
import { ArticlesProvider } from '@/context/ArticlesContext';

const oswald = Oswald({
  subsets: ['latin', 'vietnamese'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-oswald',
  display: 'swap',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-poppins',
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
    <html lang="vi" className={`${oswald.variable} ${poppins.variable}`}>
      <body style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
        <ArticlesProvider>{children}</ArticlesProvider>
      </body>
    </html>
  );
}

