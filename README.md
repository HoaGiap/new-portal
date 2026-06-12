# 📰 VietNews - Website Tin Tức Việt Nam

Dự án website tin tức đầy đủ tính năng được xây dựng với **Next.js 15 (App Router)** + **TailwindCSS** + **TypeScript**.

---

## 🚀 Cài đặt & Chạy dự án

```bash
# 1. Cài đặt dependencies
npm install

# 2. Chạy development server
npm run dev

# 3. Mở trình duyệt tại
http://localhost:3000
```

---

## 📁 Cấu trúc dự án

```
src/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Root layout (ArticlesProvider)
│   ├── page.tsx                 # 🏠 Trang chủ
│   ├── globals.css              # Global styles
│   ├── not-found.tsx            # 404 page
│   ├── category/[slug]/
│   │   └── page.tsx             # 📂 Trang danh sách theo chủ đề
│   ├── post/[id]/
│   │   └── page.tsx             # 📄 Trang chi tiết bài viết
│   ├── search/
│   │   └── page.tsx             # 🔍 Trang tìm kiếm
│   ├── contact/
│   │   └── page.tsx             # 📧 Trang liên hệ
│   └── admin/
│       ├── layout.tsx           # Admin layout (sidebar)
│       ├── page.tsx             # ⚙️ Admin dashboard
│       └── articles/
│           ├── page.tsx         # Danh sách bài viết
│           ├── new/
│           │   └── page.tsx     # Thêm bài viết mới
│           └── edit/[id]/
│               └── page.tsx     # Sửa bài viết
├── components/
│   ├── Header.tsx               # Navigation header (responsive)
│   ├── Footer.tsx               # Footer với newsletter
│   ├── PostCard.tsx             # Card component (4 variants)
│   ├── ArticleForm.tsx          # Form thêm/sửa bài viết
│   └── PublicLayout.tsx         # Layout wrapper cho public pages
├── context/
│   └── ArticlesContext.tsx      # State management + localStorage
└── data/
    └── articles.ts              # Mock data (8 bài mẫu, 4 chủ đề)
```

---

## 🎯 Các trang có sẵn

| Trang | Đường dẫn | Mô tả |
|-------|-----------|-------|
| Trang chủ | `/` | Hero banner, tin mới nhất, trending |
| Chủ đề | `/category/cong-nghe` | Lọc bài theo chủ đề + Load More |
| Chi tiết | `/post/:id` | Nội dung đầy đủ, bài liên quan |
| Tìm kiếm | `/search?q=keyword` | Tìm theo tiêu đề/nội dung, lọc chủ đề |
| Liên hệ | `/contact` | Form có validation |
| Admin | `/admin` | Dashboard thống kê |
| Quản lý | `/admin/articles` | CRUD bài viết |
| Thêm mới | `/admin/articles/new` | Form thêm bài |
| Chỉnh sửa | `/admin/articles/edit/:id` | Form sửa bài |

---

## 📂 Chủ đề tin tức

- 💻 **Công Nghệ** - AI, Apple, Công nghệ mới
- ✈️ **Du Lịch** - Điểm đến, So sánh, Review
- ⚽ **Thể Thao** - Bóng đá, AFF Cup, Champions League  
- 🔬 **Khoa Học** - NASA, Năng lượng tái tạo, Vũ trụ

---

## 🛠️ Công nghệ sử dụng

- **Framework**: Next.js 15 (App Router)
- **Styling**: TailwindCSS v4
- **Language**: TypeScript
- **State**: React Context API + localStorage
- **Font**: Be Vietnam Pro (Google Fonts)
- **Data**: Mock data (localStorage persistence)

---

## ✨ Tính năng nổi bật

- ✅ Dark mode mặc định, thiết kế hiện đại
- ✅ Responsive trên mọi thiết bị
- ✅ Dữ liệu lưu qua localStorage (persist sau reload)
- ✅ CRUD bài viết đầy đủ (Admin)
- ✅ Tìm kiếm real-time với lọc chủ đề
- ✅ Form validation phía client
- ✅ Loading states & animations
- ✅ SEO metadata đầy đủ

---

*Dự án được xây dựng cho bài test kỹ năng Full-stack React/Next.js*
