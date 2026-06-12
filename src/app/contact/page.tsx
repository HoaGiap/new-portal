'use client';

import { useState } from 'react';
import PublicLayout from '@/components/PublicLayout';

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
      <div className="bg-gradient-to-b from-primary/5 to-zinc-950 py-12 px-4 border-b border-zinc-900 relative overflow-hidden text-center">
        <div className="absolute top-0 right-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-primary-dark text-black text-2xl mb-4 shadow-lg shadow-primary/20 font-black">
            ✉️
          </div>
          <h1 className="text-3xl font-black text-white mb-2 font-oswald uppercase tracking-tight">Liên Hệ Với Chúng Tôi</h1>
          <p className="text-zinc-400 text-xs font-semibold uppercase tracking-wider font-oswald max-w-sm mx-auto">
            Bạn có câu hỏi, góp ý hoặc muốn hợp tác? Hãy để lại tin nhắn cho VietNews!
          </p>
        </div>
      </div>

      <section className="py-12 px-4 bg-zinc-950">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Info */}
            <div className="space-y-5">
              <div>
                <div className="flex items-center gap-3 mb-5 pb-3 border-b border-zinc-900">
                  <div className="w-1.5 h-6 bg-primary rounded-full" />
                  <h2 className="font-bold text-white text-base font-oswald uppercase tracking-tight">Thông Tin Liên Hệ</h2>
                </div>
                <div className="space-y-3">
                  {contactInfo.map((item) => (
                    <div key={item.label} className="layer-1 rounded-xl p-3.5 hover:border-primary/30 transition-all flex items-start gap-3 shadow-md">
                      <span className="text-xl flex-shrink-0 mt-0.5">{item.icon}</span>
                      <div className="min-w-0">
                        <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider font-oswald mb-0.5">{item.label}</p>
                        {item.href ? (
                          <a href={item.href} className="text-zinc-200 hover:text-primary text-sm font-semibold transition-colors truncate block">{item.value}</a>
                        ) : (
                          <p className="text-zinc-200 text-sm font-semibold truncate">{item.value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Social */}
              <div className="layer-1 rounded-xl p-4 shadow-md">
                <p className="text-xs font-bold text-white mb-3 uppercase tracking-wider font-oswald">Theo Dõi Chúng Tôi</p>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { name: 'Facebook', color: 'hover:text-primary border-zinc-800 hover:border-primary/30', icon: 'FB' },
                    { name: 'YouTube', color: 'hover:text-red-400 border-zinc-800 hover:border-red-450/30', icon: 'YT' },
                    { name: 'Twitter', color: 'hover:text-sky-400 border-zinc-800 hover:border-sky-450/30', icon: 'TW' },
                    { name: 'Instagram', color: 'hover:text-pink-400 border-zinc-800 hover:border-pink-450/30', icon: 'IG' },
                  ].map((s) => (
                    <a
                      key={s.name}
                      href="#"
                      className={`flex items-center justify-center gap-1.5 px-3 py-2 bg-zinc-950 border ${s.color} rounded-lg text-zinc-400 text-[10px] font-black uppercase tracking-wider font-oswald transition-all`}
                    >
                      <span className="opacity-80">{s.icon}</span>
                      <span>{s.name}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              <div className="layer-1 rounded-2xl p-6 shadow-xl">
                {submitted ? (
                  <div className="text-center py-12 animate-fade-in max-w-sm mx-auto">
                    <div className="text-5xl mb-4">🎉</div>
                    <h3 className="text-xl font-bold text-white mb-2 font-oswald uppercase">Gửi Thành Công!</h3>
                    <p className="text-zinc-400 text-xs mb-6 leading-relaxed">
                      Cảm ơn bạn đã liên hệ với ban biên tập VietNews! Chúng tôi đã nhận được tin nhắn và sẽ phản hồi sớm nhất.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="px-6 py-2.5 bg-primary hover:bg-primary-dark text-black text-xs font-black uppercase tracking-wider rounded-xl transition-all shadow-md font-oswald"
                    >
                      Gửi Tin Nhắn Khác
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate className="space-y-4">
                    <div className="flex items-center gap-3 mb-5 pb-3 border-b border-zinc-850">
                      <div className="w-1.5 h-6 bg-primary rounded-full" />
                      <h2 className="font-bold text-white text-base font-oswald uppercase tracking-tight">Gửi Tin Nhắn</h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Name */}
                      <div>
                        <label htmlFor="contact-name" className="block text-xs font-bold uppercase tracking-wider font-oswald text-zinc-300 mb-1.5">
                          Họ và tên <span className="text-red-550 font-sans">*</span>
                        </label>
                        <input
                          id="contact-name"
                          type="text"
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          placeholder="Nguyễn Văn A"
                          className={`w-full px-4 py-2.5 bg-zinc-950 border rounded-xl text-white placeholder-zinc-550 focus:outline-none focus:ring-2 transition-all text-sm font-medium ${
                            errors.name ? 'border-red-500 focus:ring-red-500/20' : 'border-zinc-800 focus:border-primary focus:ring-primary/10'
                          }`}
                        />
                        {errors.name && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.name}</p>}
                      </div>

                      {/* Email */}
                      <div>
                        <label htmlFor="contact-email" className="block text-xs font-bold uppercase tracking-wider font-oswald text-zinc-300 mb-1.5">
                          Email <span className="text-red-550 font-sans">*</span>
                        </label>
                        <input
                          id="contact-email"
                          type="email"
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          placeholder="email@example.com"
                          className={`w-full px-4 py-2.5 bg-zinc-950 border rounded-xl text-white placeholder-zinc-550 focus:outline-none focus:ring-2 transition-all text-sm font-medium ${
                            errors.email ? 'border-red-500 focus:ring-red-500/20' : 'border-zinc-800 focus:border-primary focus:ring-primary/10'
                          }`}
                        />
                        {errors.email && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.email}</p>}
                      </div>
                    </div>

                    {/* Subject */}
                    <div>
                      <label htmlFor="contact-subject" className="block text-xs font-bold uppercase tracking-wider font-oswald text-zinc-300 mb-1.5">
                        Chủ đề <span className="text-red-550 font-sans">*</span>
                      </label>
                      <select
                        id="contact-subject"
                        name="subject"
                        value={form.subject}
                        onChange={handleChange}
                        className={`w-full px-4 py-2.5 bg-zinc-950 border rounded-xl text-white focus:outline-none focus:ring-2 transition-all text-sm font-semibold font-oswald uppercase tracking-wider ${
                          errors.subject ? 'border-red-500 focus:ring-red-500/20' : 'border-zinc-800 focus:border-primary focus:ring-primary/10'
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
                      <label htmlFor="contact-message" className="block text-xs font-bold uppercase tracking-wider font-oswald text-zinc-300 mb-1.5">
                        Nội dung tin nhắn <span className="text-red-550 font-sans">*</span>
                      </label>
                      <textarea
                        id="contact-message"
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        placeholder="Nhập nội dung tin nhắn của bạn tại đây..."
                        rows={5}
                        className={`w-full px-4 py-2.5 bg-zinc-950 border rounded-xl text-white placeholder-zinc-550 focus:outline-none focus:ring-2 transition-all resize-none text-sm font-medium ${
                          errors.message ? 'border-red-500 focus:ring-red-500/20' : 'border-zinc-800 focus:border-primary focus:ring-primary/10'
                        }`}
                      />
                      <div className="flex justify-between items-center mt-1">
                        {errors.message ? <p className="text-red-500 text-xs font-medium">{errors.message}</p> : <span />}
                        <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-wider font-oswald">{form.message.length} ký tự</p>
                      </div>
                    </div>

                    <button
                      type="submit"
                      id="contact-submit"
                      disabled={loading}
                      className="w-full py-3.5 bg-primary hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed text-black font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-md shadow-primary/10 flex items-center justify-center gap-2 font-oswald"
                    >
                      {loading ? (
                        <>
                          <svg className="w-4 h-4 animate-spin text-black" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                          </svg>
                          Đang gửi...
                        </>
                      ) : (
                        <>
                          <svg className="w-4 h-4 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                          </svg>
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
