import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-zinc-950 text-zinc-100 font-sans">
      <Header />
      <main className="flex-1 pt-16 md:pt-24">{children}</main>
      <Footer />
    </div>
  );
}
