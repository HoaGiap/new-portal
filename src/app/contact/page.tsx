'use client';

import { useState } from 'react';
import PublicLayout from '@/components/PublicLayout';
import { Loader2, Send } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const initialForm: FormData = { name: '', email: '', subject: '', message: '' };

export default function ContactPage() {
  const [form, setForm] = useState<FormData>(initialForm);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const validate = (): boolean => {
    const newErrors: Partial<FormData> = {};
    if (!form.name.trim()) newErrors.name = 'Vui lòng nhập họ tên';
    if (!form.email.trim()) newErrors.email = 'Vui lòng nhập email';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = 'Email không hợp lệ';
    if (!form.subject.trim()) newErrors.subject = 'Vui lòng chọn chủ đề';
    if (!form.message.trim()) newErrors.message = 'Vui lòng nhập nội dung';
    else if (form.message.trim().length < 20) newErrors.message = 'Nội dung phải có ít nhất 20 ký tự';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200)); // Simulate API
    setLoading(false);
    setSubmitted(true);
    setForm(initialForm);
  };

  const contactInfo = [
    { icon: '📍', label: 'Địa chỉ', value: '123 Nguyễn Huệ, Quận 1, TP.HCM', href: null },
    { icon: '📞', label: 'Điện thoại', value: '(+84) 28 3821 0000', href: 'tel:+842838210000' },
    { icon: '📧', label: 'Email', value: 'contact@vietnews.vn', href: 'mailto:contact@vietnews.vn' },
    { icon: '🕐', label: 'Giờ làm việc', value: 'T2 - T6: 8:00 - 17:00', href: null },
  ];

  return (
    <PublicLayout>
      {/* Hero */}
      <div className="bg-gradient-to-b from-primary/5 to-background py-12 px-6 border-b border-border-base/70 relative overflow-hidden text-center">
        <div className="absolute top-0 right-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-4xl mx-auto relative z-10 space-y-3">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-card border border-border-base text-black dark:text-white text-2xl mb-2 shadow-sm">
            ✉️
          </div>
          <h1 className="text-3xl font-black text-fg-main mb-2 font-plus-jakarta uppercase tracking-tight">Liên Hệ Với Chúng Tôi</h1>
          <p className="text-zinc-550 dark:text-zinc-400 text-xs font-semibold uppercase tracking-wider font-plus-jakarta max-w-sm mx-auto leading-relaxed">
            Bạn có câu hỏi, góp ý hoặc muốn hợp tác? Hãy gửi lời nhắn đến tòa soạn VietNews!
          </p>
        </div>
      </div>

      <section className="py-12 px-6 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Info & Map */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <div className="flex items-center gap-3 mb-5 pb-3 border-b border-border-base/70">
                  <div className="w-1.5 h-6 bg-primary rounded-full" />
                  <h2 className="font-bold text-fg-main text-base font-plus-jakarta uppercase tracking-tight">Thông Tin Liên Hệ</h2>
                </div>
                <div className="space-y-3">
                  {contactInfo.map((item) => (
                    <div key={item.label} className="bg-card border border-border-base rounded-2xl p-4 hover:border-primary/30 transition-all flex items-start gap-3.5 shadow-sm">
                      <span className="text-xl flex-shrink-0 mt-0.5">{item.icon}</span>
                      <div className="min-w-0">
                        <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider font-plus-jakarta mb-0.5">{item.label}</p>
                        {item.href ? (
                          <a href={item.href} className="text-fg-main hover:text-primary text-sm font-semibold transition-colors truncate block">{item.value}</a>
                        ) : (
                          <p className="text-fg-main text-sm font-semibold truncate">{item.value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Map block */}
              <div className="bg-card border border-border-base rounded-2xl p-2 shadow-sm overflow-hidden h-64 relative group">
                <iframe
                  title="VietNews Location Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.460232426297!2d106.70100201480076!3d10.776019392321852!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3919460232426297%3A0x10f76019392321852!2zTmd1eeG7hW4gSHXhu4ksIELhur5uIE5naMOpLCBRdeG6rW4gMSwgVGjDoG5oIHBo4buRIEjhu5MgQ2jDrSBNaW5o!5e0!3m2!1svi!2svn!4v1620000000000!5m2!1svi!2svn"
                  className="w-full h-full rounded-xl border-0"
                  allowFullScreen={false}
                  loading="lazy"
                />
              </div>
            </div>

            {/* Right Form */}
            <div className="lg:col-span-7">
              <div className="bg-card border border-border-base rounded-3xl p-6 md:p-8 shadow-premium">
                {submitted ? (
                  <div className="text-center py-12 animate-fade-in max-w-sm mx-auto space-y-4">
                    <div className="text-5xl">🎉</div>
                    <h3 className="text-xl font-bold text-fg-main font-plus-jakarta uppercase">Gửi Thành Công!</h3>
                    <p className="text-zinc-500 dark:text-zinc-400 text-xs leading-relaxed">
                      Cảm ơn bạn đã đóng góp ý kiến cho VietNews! Chúng tôi đã tiếp nhận và phản hồi tới bạn trong thời gian sớm nhất.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="px-6 py-2.5 bg-gradient-to-r from-primary to-accent hover:opacity-95 text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all shadow-md font-plus-jakarta"
                    >
                      Gửi Tin Nhắn Khác
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate className="space-y-5">
                    <div className="flex items-center gap-3 mb-3 pb-3 border-b border-border-base/70">
                      <div className="w-1.5 h-6 bg-primary rounded-full" />
                      <h2 className="font-bold text-fg-main text-base font-plus-jakarta uppercase tracking-tight">Gửi Tin Nhắn</h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Name */}
                      <div>
                        <label htmlFor="contact-name" className="block text-[10px] font-bold uppercase tracking-wider font-plus-jakarta text-zinc-500 mb-1.5">
                          Họ và tên <span className="text-red-500 font-sans">*</span>
                        </label>
                        <input
                          id="contact-name"
                          type="text"
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          placeholder="Nguyễn Văn A"
                          className={`w-full px-4 py-2.5 bg-card border rounded-xl text-fg-main placeholder-zinc-550 focus:outline-none focus:ring-4 focus:ring-primary/10 text-sm font-semibold ${
                            errors.name ? 'border-red-500' : 'border-border-base focus:border-primary'
                          }`}
                        />
                        {errors.name && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.name}</p>}
                      </div>

                      {/* Email */}
                      <div>
                        <label htmlFor="contact-email" className="block text-[10px] font-bold uppercase tracking-wider font-plus-jakarta text-zinc-500 mb-1.5">
                          Email <span className="text-red-500 font-sans">*</span>
                        </label>
                        <input
                          id="contact-email"
                          type="email"
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          placeholder="email@example.com"
                          className={`w-full px-4 py-2.5 bg-card border rounded-xl text-fg-main placeholder-zinc-550 focus:outline-none focus:ring-4 focus:ring-primary/10 text-sm font-semibold ${
                            errors.email ? 'border-red-500' : 'border-border-base focus:border-primary'
                          }`}
                        />
                        {errors.email && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.email}</p>}
                      </div>
                    </div>

                    {/* Subject */}
                    <div>
                      <label htmlFor="contact-subject" className="block text-[10px] font-bold uppercase tracking-wider font-plus-jakarta text-zinc-500 mb-1.5">
                        Chủ đề <span className="text-red-500 font-sans">*</span>
                      </label>
                      <select
                        id="contact-subject"
                        name="subject"
                        value={form.subject}
                        onChange={handleChange}
                        className={`w-full px-4 py-2.5 bg-card border rounded-xl text-fg-main focus:outline-none focus:ring-4 focus:ring-primary/10 text-sm font-semibold font-plus-jakarta uppercase tracking-wider ${
                          errors.subject ? 'border-red-500' : 'border-border-base focus:border-primary'
                        }`}
                      >
                        <option value="" disabled>Chọn chủ đề...</option>
                        <option value="Góp ý nội dung">Góp ý nội dung</option>
                        <option value="Hợp tác quảng cáo">Hợp tác quảng cáo</option>
                        <option value="Báo lỗi">Báo lỗi</option>
                        <option value="Gửi bài viết">Gửi bài viết</option>
                        <option value="Khác">Khác</option>
                      </select>
                      {errors.subject && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.subject}</p>}
                    </div>

                    {/* Message */}
                    <div>
                      <label htmlFor="contact-message" className="block text-[10px] font-bold uppercase tracking-wider font-plus-jakarta text-zinc-500 mb-1.5">
                        Nội dung tin nhắn <span className="text-red-500 font-sans">*</span>
                      </label>
                      <textarea
                        id="contact-message"
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        placeholder="Nhập nội dung tin nhắn của bạn tại đây..."
                        rows={5}
                        className={`w-full px-4 py-2.5 bg-card border rounded-xl text-fg-main placeholder-zinc-550 focus:outline-none focus:ring-4 focus:ring-primary/10 resize-none text-sm font-medium ${
                          errors.message ? 'border-red-500' : 'border-border-base focus:border-primary'
                        }`}
                      />
                      <div className="flex justify-between items-center mt-1">
                        {errors.message ? <p className="text-red-500 text-xs font-medium">{errors.message}</p> : <span />}
                        <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-wider font-plus-jakarta">{form.message.length} ký tự</p>
                      </div>
                    </div>

                    <button
                      type="submit"
                      id="contact-submit"
                      disabled={loading}
                      className="w-full py-3.5 bg-gradient-to-r from-primary to-accent hover:opacity-95 disabled:opacity-50 disabled:cursor-not-allowed text-white font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-md glow-primary flex items-center justify-center gap-2 font-plus-jakarta"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin text-white" />
                          Đang gửi...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 text-white" />
                          Gửi Tin Nhắn
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
