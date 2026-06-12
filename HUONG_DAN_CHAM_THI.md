# 📖 TÀI LIỆU GIẢI THÍCH DỰ ÁN VÀ HƯỚNG DẪN CHẤM THI
## Dự án: VietNews - Cổng Thông Tin Tin Tức Hiện Đại 2026

Chào mừng thầy/cô (người chấm thi) đến với mã nguồn của dự án **VietNews**. Dự án này là một Single Page Application (SPA) tin tức hiện đại, được tối ưu hóa toàn diện về cả thiết kế (UI/UX), hiệu năng, và trải nghiệm người dùng (UX) dựa trên các công nghệ tiên tiến nhất hiện nay.

Dưới đây là phần thuyết minh chi tiết về kiến trúc, các tính năng nổi bật, công nghệ áp dụng và cấu trúc mã nguồn để hỗ trợ quá trình chấm thi đạt hiệu quả cao nhất.

---

## ⚡ 1. Hướng Dẫn Khởi Chạy Nhanh

Ứng dụng hiện đang được thiết lập sẵn và chạy ổn định. Dưới đây là các lệnh cơ bản:

```bash
# 1. Cài đặt các thư viện phụ thuộc (đã được tối ưu hóa cho React 19)
npm install --legacy-peer-deps

# 2. Khởi chạy máy chủ phát triển (Development Server)
npm run dev

# 3. Biên dịch và đóng gói phiên bản sản xuất (Production Build)
npm run build

# 4. Khởi chạy bản build sản xuất
npm run start
```
* **Địa chỉ truy cập**: Localhost mặc định chạy tại [http://localhost:3000](http://localhost:3000).

---

## 🛠️ 2. Công Nghệ Sử Dụng (Tech Stack)

* **Framework**: [Next.js 16.2.9 (App Router)](https://nextjs.org/) - Tối ưu hóa render trang (SSR/ISR) và định tuyến thông minh.
* **Thư viện UI**: [React 19.2.4](https://react.dev/) - Tích hợp các Hooks và cơ chế lập lịch xử lý thế hệ mới.
* **Kiểu dữ liệu**: [TypeScript 5](https://www.typescriptlang.org/) - Đảm bảo an toàn kiểu dữ liệu ở mức compile-time trên toàn bộ dự án.
* **Định cách style**: [TailwindCSS v4](https://tailwindcss.com/) - Sử dụng CSS-in-JS Engine mới nhất, xử lý nhanh hơn, hỗ trợ tối đa các biến CSS động.
* **Bộ Icon**: [Lucide React](https://lucide.dev/) - Chuẩn hóa toàn bộ icon giao diện hiện đại, tối ưu dung lượng gói tải.

---

## 📐 3. Kiến Trúc Mã Nguồn & Luồng Xử Lý Dữ Liệu

Dự án tuân thủ mô hình thư mục tiêu chuẩn của Next.js App Router với tổ chức logic chặt chẽ:

```
news-portal/
├── src/
│   ├── app/                      # Next.js App Router (Định tuyến & Layouts)
│   │   ├── layout.tsx            # Root layout chứa ArticlesProvider toàn cục
│   │   ├── page.tsx              # Trang chủ (Bố cục Hero, Tin mới nhất, Trending)
│   │   ├── globals.css           # Cấu hình thiết kế lớp CSS, chuyển động động
│   │   ├── category/[slug]/      # Trang hiển thị bài viết theo chuyên mục (lọc, phân trang)
│   │   ├── post/[id]/            # Trang chi tiết bài viết (Prose typography, bình luận)
│   │   ├── search/               # Trang tìm kiếm thời gian thực theo từ khóa và chủ đề
│   │   ├── contact/              # Trang liên hệ tích hợp xác thực form và bản đồ nhúng
│   │   └── admin/                # Phân hệ Admin Dashboard quản trị bài viết (CRUD)
│   ├── components/               # Các thành phần tái sử dụng (Header, Footer, Form, Editor...)
│   ├── context/                  # Quản lý trạng thái toàn cục & Lưu trữ dữ liệu
│   └── data/                     # Dữ liệu khởi tạo mẫu hệ thống (Mock Data)
```

### 💾 Giải pháp Quản Lý Trạng Thái và Persist Dữ Liệu (Không cần Database)
Để dự án chạy độc lập và chấm thi nhanh chóng mà không cần thiết lập cơ sở dữ liệu phức tạp, ứng dụng sử dụng **React Context API** phối hợp với **LocalStorage**:
* Tệp tin quản lý chính: [src/context/ArticlesContext.tsx](file:///d:/A_study_document/01_LapTrinhReact/news-portal/src/context/ArticlesContext.tsx)
* **Luồng xử lý**: Khi ứng dụng khởi chạy lần đầu, dữ liệu 8 bài viết mẫu từ [src/data/articles.ts](file:///d:/A_study_document/01_LapTrinhReact/news-portal/src/data/articles.ts) sẽ được nạp và lưu vào LocalStorage. Mọi hành động Thêm (Create), Đọc (Read), Cập nhật (Update), Xóa (Delete) bài viết và viết Bình luận mới đều được lưu trữ trực tiếp vào LocalStorage. Do đó, dữ liệu luôn được giữ lại nguyên vẹn ngay cả khi tải lại trang (F5).

---

## 🎨 4. Điểm Nhấn Thiết Kế (Perspective Design System)

Giao diện của website được nâng cấp hoàn toàn dựa trên xu hướng thiết kế **Perspective** năm 2025, tạo cảm giác vô cùng cao cấp:

1. **Phông Chữ Kép (Dual-Typeface)**:
   - **Oswald**: Phông chữ condensed mạnh mẽ, dùng riêng cho tất cả các thẻ tiêu đề (`H1`, `H2`, `H3`, `H4`), thanh trình đơn (Menu) và Logo để tạo điểm nhấn thị giác sắc nét.
   - **Poppins**: Phông sans-serif hiện đại, dễ đọc, được áp dụng cho nội dung văn bản thường và bài viết chi tiết để giảm mỏi mắt.
2. **Hệ Màu Single-Accent**: Sử dụng màu nền tối trung tính (#0A0A0A) kết hợp với một màu nhấn chủ đạo duy nhất là màu xanh lục bảo neon tươi mát `#00BD7D` (`primary`).
3. **Phân Lớp Chiều Sâu (Layering & Elevation)**:
   - `layer-0` (Nền body): Tối đen thuần khiết.
   - `layer-1` (Nền thẻ Card): Màu xám zinc-900 nổi bật trên nền body.
   - `layer-2` (Phần tử nổi bật): Màu xám zinc-800.
   - Đi kèm hiệu ứng viền phát sáng nhẹ (`card-glow`) và thay đổi độ cao khi người dùng di chuột (Micro-animations).
4. **Hệ Thống Sáng/Tối (Theme Toggle)**: Chuyển đổi linh hoạt chế độ Light/Dark thông qua React Context. Hệ thống tự động đồng bộ hóa màu sắc chữ để không bao giờ bị tệp màu vào nền.

---

## ✨ 5. Các Tính Năng Nổi Bật Dành Cho Điểm Cộng

Thầy/cô có thể tập trung đánh giá các thành phần phức tạp được tự phát triển dưới đây để chấm điểm kỹ năng thực hành React:

### 📝 Trình Soạn Thảo Văn Bản Phong Phú (Custom Rich Text Editor)
* **Vị trí tệp**: [src/components/RichTextEditor.tsx](file:///d:/A_study_document/01_LapTrinhReact/news-portal/src/components/RichTextEditor.tsx)
* **Đặc điểm**: Tự xây dựng (zero-dependency) sử dụng cơ chế `contentEditable` của React để đảm bảo không bị lỗi Hydration lỗi thời ở các framework lớn.
* **Tính năng**:
  - Hỗ trợ định dạng nhanh: In đậm, In nghiêng, Gạch chân.
  - Phân loại khối văn bản: Tiêu đề lớn (H2), Tiêu đề nhỏ (H3), Đoạn văn thường (P).
  - Định dạng danh sách: Danh sách dấu chấm (Unordered List) và Thứ tự số (Ordered List).
  - Chèn liên kết động (Link), khối trích dẫn (Blockquote) và xóa định dạng nhanh.
  - **Chế độ xem kép**: Nút bấm chuyển đổi thời gian thực giữa **Visual Editor** (soạn thảo trực quan) và **HTML Code** (soạn thảo thô mã HTML trực tiếp qua textarea) đồng bộ 2 chiều.

### 📊 Admin Panel Dashboard Toàn Diện
* **Vị trí trang quản trị**: [src/app/admin/page.tsx](file:///d:/A_study_document/01_LapTrinhReact/news-portal/src/app/admin/page.tsx)
* **Thanh điều hướng co giãn (Collapsible Sidebar)**: Được thiết kế trong [src/app/admin/layout.tsx](file:///d:/A_study_document/01_LapTrinhReact/news-portal/src/app/admin/layout.tsx), cho phép thu gọn sidebar chỉ hiển thị icon để giải phóng diện tích hiển thị trên các màn hình nhỏ, có tooltip giải thích hoạt động với hiệu ứng chuyển động mượt mà.
* **CRUD Hoàn Chỉnh**:
  - Xem danh sách bài viết dưới dạng bảng (phân loại chủ đề, tìm kiếm, xem nhanh số lượt xem).
  - Thêm mới bài viết (Validation đầy đủ các trường: Tiêu đề, Tóm tắt, Danh mục, Hình ảnh, Tác giả).
  - Chỉnh sửa bài viết (Nạp lại dữ liệu cũ vào form và cập nhật tức thì).
  - Xóa bài viết với hộp thoại xác nhận (Modal) an toàn.
  - Tích hợp thông báo Toast tự biến mất khi thực hiện các tác vụ thành công.

### 🔍 Tìm Kiếm Toàn Văn Real-time & Bộ Lọc Đa Năng
* **Tìm kiếm**: Người dùng nhập từ khóa tại [src/app/search/page.tsx](file:///d:/A_study_document/01_LapTrinhReact/news-portal/src/app/search/page.tsx), hệ thống sử dụng thuật toán tìm kiếm không dấu và có dấu trên cả tiêu đề lẫn nội dung bài viết.
* **Bộ lọc chủ đề**: Kết hợp lọc trực tiếp bằng thanh tab chủ đề để phân loại bài viết tức thời.
* **Trang chủ đề riêng biệt**: [src/app/category/[slug]/page.tsx](file:///d:/A_study_document/01_LapTrinhReact/news-portal/src/app/category/%5Bslug%5D/page.tsx) cho phép sắp xếp bài viết theo hai tiêu chí: "Mới nhất" (theo thời gian) hoặc "Xem nhiều nhất" (theo lượt đọc). Tích hợp nút **Tải thêm bài viết (Load More)** phân trang động phía máy khách.

### 🌟 Đồng Bộ Hóa Hệ Thống Icon Từ lucide.dev
* Để đáp ứng yêu cầu đồng bộ hóa cao nhất về thẩm mỹ, dự án đã thay thế 100% các icon SVG viết tay rải rác và các ký tự emoji cũ thành bộ biểu tượng chuẩn từ Lucide:
  - Các icon chức năng như `Search`, `Eye`, `Clock`, `Settings`, `Mail`, `Calendar`, `ChevronLeft`, `ChevronRight`... giúp giao diện nhất quán, rõ ràng.
  - Các biểu tượng mạng xã hội thương hiệu (`Facebook`, `YouTube`, `Twitter`, `Instagram`) tại chân trang được tối ưu hóa bằng SVG vector tùy chỉnh có cùng kích thước hình học với Lucide.

---

## 📈 6. Tiêu Chí Đánh Giá Kỹ Thuật (SEO & Performance)

* **SEO Meta**: Mỗi trang (Trang chủ, Chi tiết bài viết, Tìm kiếm...) đều cấu hình thẻ tiêu đề `<title>` động và thẻ `<meta description>` tương ứng giúp tối ưu hóa công cụ tìm kiếm.
* **Semantic HTML**: Mã nguồn sử dụng cấu trúc chuẩn HTML5 (`<header>`, `<nav>`, `<main>`, `<article>`, `<aside>`, `<footer>`) tăng khả năng tiếp cận và tối ưu SEO.
* **Micro-interactions**: Toàn bộ các nút bấm, liên kết và thẻ bài viết đều được tích hợp hiệu ứng chuyển đổi trạng thái (hover transitions, active scale, focus rings) để đem lại phản hồi mượt mà cho các hành động chạm vuốt.

Kính chúc thầy/cô có thời gian đánh giá dự án vui vẻ và đạt kết quả tốt nhất! Mọi thắc mắc về mã nguồn xin vui lòng kiểm tra trực tiếp tại cấu trúc các tệp tin liên kết ở trên.
