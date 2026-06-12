export interface Category {
  id: string;
  name: string;
  slug: string;
  color: string;
  icon: string;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  image: string;
  categoryId: string;
  categoryName: string;
  categorySlug: string;
  author: string;
  publishedAt: string;
  views: number;
}

export const CATEGORIES: Category[] = [
  { id: '1', name: 'Công Nghệ', slug: 'cong-nghe', color: 'blue', icon: '💻' },
  { id: '2', name: 'Du Lịch', slug: 'du-lich', color: 'green', icon: '✈️' },
  { id: '3', name: 'Thể Thao', slug: 'the-thao', color: 'orange', icon: '⚽' },
  { id: '4', name: 'Khoa Học', slug: 'khoa-hoc', color: 'purple', icon: '🔬' },
];

export const INITIAL_ARTICLES: Article[] = [
  {
    id: '1',
    title: 'ChatGPT-5 Ra Mắt: Cách Mạng AI Thay Đổi Mọi Ngành Nghề',
    slug: 'chatgpt-5-ra-mat-cach-mang-ai',
    summary:
      'OpenAI vừa công bố ChatGPT-5 với khả năng lý luận vượt trội, có thể thay thế nhiều công việc chuyên môn và mở ra kỷ nguyên mới của trí tuệ nhân tạo.',
    content: `<p>OpenAI vừa chính thức ra mắt ChatGPT-5, phiên bản được đánh giá là bước nhảy vọt lớn nhất trong lịch sử phát triển AI của hãng.</p>
<h2>Những cải tiến đột phá</h2>
<p>ChatGPT-5 sở hữu khả năng lý luận đa bước phức tạp, có thể giải quyết các bài toán khoa học, y tế và pháp lý ở cấp độ chuyên gia. Mô hình mới cũng có khả năng hiểu và tạo ra code phức tạp với độ chính xác gần như tuyệt đối.</p>
<h2>Tác động đến thị trường lao động</h2>
<p>Các chuyên gia kinh tế ước tính ChatGPT-5 có thể tự động hóa từ 30-40% công việc văn phòng trong vòng 5 năm tới. Tuy nhiên, đây cũng là cơ hội để con người tập trung vào các công việc sáng tạo và chiến lược hơn.</p>
<p>Hãng công nghệ lớn như Google, Microsoft, Meta đều đang gấp rút phát triển các mô hình cạnh tranh để không bị bỏ lại phía sau trong cuộc đua AI lịch sử này.</p>`,
    image: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&h=450&fit=crop',
    categoryId: '1',
    categoryName: 'Công Nghệ',
    categorySlug: 'cong-nghe',
    author: 'Nguyễn Minh Tuấn',
    publishedAt: '2024-06-10T08:00:00Z',
    views: 12500,
  },
  {
    id: '2',
    title: 'Việt Nam Lọt Top 10 Điểm Đến Hấp Dẫn Nhất Châu Á 2024',
    slug: 'viet-nam-top-10-diem-den-chau-a-2024',
    summary:
      'Tạp chí du lịch quốc tế Lonely Planet vừa xếp hạng Việt Nam là một trong 10 điểm đến hấp dẫn nhất châu Á năm 2024, với Hội An và Hạ Long dẫn đầu.',
    content: `<p>Việt Nam một lần nữa chứng tỏ sức hút mạnh mẽ trên bản đồ du lịch thế giới khi được Lonely Planet bình chọn vào top 10 điểm đến hấp dẫn nhất châu Á.</p>
<h2>Hội An - Thành phố của ánh đèn lồng</h2>
<p>Hội An tiếp tục là điểm nhấn với phố cổ được UNESCO công nhận di sản thế giới. Du khách quốc tế đặc biệt ấn tượng với lễ hội đèn lồng hàng tháng và ẩm thực phong phú đặc trưng của vùng đất này.</p>
<h2>Vịnh Hạ Long - Kỳ quan thiên nhiên</h2>
<p>Vịnh Hạ Long với hơn 1.600 hòn đảo đá vôi tiếp tục thu hút hàng triệu lượt khách. Các tour du thuyền qua đêm ngày càng được cải thiện về chất lượng dịch vụ và trải nghiệm.</p>
<p>Theo thống kê của Tổng cục Du lịch Việt Nam, lượng khách quốc tế trong 6 tháng đầu năm 2024 tăng 45% so với cùng kỳ năm ngoái.</p>`,
    image: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&h=450&fit=crop',
    categoryId: '2',
    categoryName: 'Du Lịch',
    categorySlug: 'du-lich',
    author: 'Trần Thị Lan',
    publishedAt: '2024-06-09T10:30:00Z',
    views: 8900,
  },
  {
    id: '3',
    title: 'Đội Tuyển Việt Nam Vô Địch AFF Cup 2024 Sau Trận Chung Kết Lịch Sử',
    slug: 'viet-nam-vo-dich-aff-cup-2024',
    summary:
      'Sau 120 phút thi đấu căng thẳng và loạt sút luân lưu nghẹt thở, đội tuyển Việt Nam đã giành chức vô địch AFF Cup 2024, mang về niềm vui cho hàng triệu người hâm mộ.',
    content: `<p>Sân vận động Mỹ Đình rực sáng trong đêm lịch sử khi đội tuyển Việt Nam chính thức giành chức vô địch AFF Cup 2024.</p>
<h2>Hành trình đến ngôi vương</h2>
<p>Dưới sự dẫn dắt của HLV Kim Sang-sik, đội tuyển Việt Nam đã trải qua hành trình đầy ấn tượng với 5 trận thắng liên tiếp trong vòng bảng và tứ kết, ghi được 18 bàn và chỉ thủng lưới 2 lần.</p>
<h2>Trận chung kết nghẹt thở</h2>
<p>Trận chung kết lượt về gặp Thái Lan diễn ra trong không khí căng thẳng đến nghẹt thở. Sau khi hòa 1-1 sau 90 phút, hai đội phải bước vào hiệp phụ rồi loạt sút luân lưu. Thủ môn Đặng Văn Lâm đã trở thành người hùng với 3 pha cản phá xuất sắc.</p>
<p>Hàng triệu người hâm mộ đổ xuống đường ăn mừng trong đêm lịch sử này, tạo nên không khí lễ hội khắp cả nước từ Bắc vào Nam.</p>`,
    image: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800&h=450&fit=crop',
    categoryId: '3',
    categoryName: 'Thể Thao',
    categorySlug: 'the-thao',
    author: 'Phạm Văn Hùng',
    publishedAt: '2024-06-08T18:00:00Z',
    views: 25000,
  },
  {
    id: '4',
    title: 'NASA Phát Hiện Hành Tinh Có Thể Có Sự Sống Ngoài Trái Đất',
    slug: 'nasa-phat-hien-hanh-tinh-co-su-song',
    summary:
      'Kính viễn vọng James Webb của NASA đã phát hiện ra dấu hiệu của hơi nước và carbon dioxide trong khí quyển của hành tinh K2-18b, gợi ý về khả năng tồn tại sự sống.',
    content: `<p>Một trong những khám phá thiên văn vĩ đại nhất thế kỷ 21 vừa được NASA công bố: kính viễn vọng James Webb đã phát hiện bằng chứng về khí quyển phức tạp trên hành tinh K2-18b.</p>
<h2>Hành tinh K2-18b là gì?</h2>
<p>K2-18b là một hành tinh nằm trong vùng có thể ở được của ngôi sao K2-18, cách Trái Đất khoảng 120 năm ánh sáng. Hành tinh này có khối lượng gấp 8,6 lần Trái Đất và được phân loại là "Hycean world".</p>
<h2>Những phát hiện đột phá</h2>
<p>James Webb đã phát hiện sự hiện diện của carbon dioxide, methane và dimethyl sulfide (DMS) - một hợp chất chỉ được biết là do sinh vật sống tạo ra trên Trái Đất. Đây là lần đầu tiên DMS được phát hiện ngoài hệ mặt trời.</p>`,
    image: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=800&h=450&fit=crop',
    categoryId: '4',
    categoryName: 'Khoa Học',
    categorySlug: 'khoa-hoc',
    author: 'Lê Thị Mai',
    publishedAt: '2024-06-07T14:00:00Z',
    views: 15800,
  },
  {
    id: '5',
    title: 'Apple Vision Pro Thế Hệ 2: Kính AR Thay Đổi Cách Chúng Ta Làm Việc',
    slug: 'apple-vision-pro-the-he-2',
    summary:
      'Apple vừa ra mắt Vision Pro thế hệ 2 với chip M3 Ultra, pin cải tiến 40% và giá rẻ hơn 30%, hứa hẹn đưa kính thực tế ảo vào cuộc sống hàng ngày của người dùng.',
    content: `<p>Apple đã chính thức ra mắt Vision Pro thế hệ 2 tại WWDC 2024, đánh dấu bước tiến lớn trong hành trình phổ cập kính thực tế hỗn hợp đến tay người tiêu dùng đại chúng.</p>
<h2>Cải tiến đáng kể về phần cứng</h2>
<p>Vision Pro 2 được trang bị chip M3 Ultra mới nhất, mang lại hiệu suất xử lý đồ họa tăng 60% so với thế hệ đầu. Thời lượng pin cũng được cải thiện đáng kể từ 2 giờ lên 3 giờ 20 phút sử dụng liên tục.</p>
<h2>Giá thành và tính khả dụng</h2>
<p>Điều gây bất ngờ lớn nhất là mức giá: Vision Pro 2 bắt đầu từ 2.499 USD, giảm 30% so với thế hệ đầu tiên. Apple cũng công bố kế hoạch bán tại 20 quốc gia mới.</p>`,
    image: 'https://images.unsplash.com/photo-1592478411213-6153e4ebc07d?w=800&h=450&fit=crop',
    categoryId: '1',
    categoryName: 'Công Nghệ',
    categorySlug: 'cong-nghe',
    author: 'Hoàng Đức Anh',
    publishedAt: '2024-06-06T09:00:00Z',
    views: 9800,
  },
  {
    id: '6',
    title: 'Bali vs Đà Nẵng: Điểm Đến Nào Phù Hợp Cho Kỳ Nghỉ Hè 2024?',
    slug: 'bali-vs-da-nang-diem-den-he-2024',
    summary:
      'So sánh toàn diện giữa Bali (Indonesia) và Đà Nẵng (Việt Nam) về chi phí, cảnh quan và trải nghiệm để giúp bạn chọn điểm đến hoàn hảo cho mùa hè năm nay.',
    content: `<p>Mùa hè 2024 đến gần, nhiều gia đình và cặp đôi đang đau đầu lựa chọn giữa hai thiên đường biển nổi tiếng nhất Đông Nam Á: Bali và Đà Nẵng.</p>
<h2>Chi phí và ngân sách</h2>
<p>Đà Nẵng chiến thắng rõ ràng về mặt chi phí. Với 5 triệu đồng/người, bạn có thể tận hưởng 4 ngày 3 đêm trọn gói tại Đà Nẵng bao gồm vé máy bay, khách sạn 4 sao và hầu hết các bữa ăn.</p>
<h2>Trải nghiệm văn hóa</h2>
<p>Bali có lợi thế về văn hóa Hindu độc đáo với hàng nghìn đền thờ và lễ hội truyền thống. Ngược lại, Đà Nẵng gần với các di sản UNESCO như Hội An và Huế, dễ dàng kết hợp trong một chuyến đi.</p>`,
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&h=450&fit=crop',
    categoryId: '2',
    categoryName: 'Du Lịch',
    categorySlug: 'du-lich',
    author: 'Nguyễn Thị Hoa',
    publishedAt: '2024-06-05T11:00:00Z',
    views: 7200,
  },
  {
    id: '7',
    title: 'Ronaldo Ghi Hat-trick, Al-Nassr Vào Chung Kết AFC Champions League',
    slug: 'ronaldo-hat-trick-al-nassr-chung-ket-afc',
    summary:
      'Cristiano Ronaldo xuất thần ghi hat-trick trong trận bán kết, đưa Al-Nassr lần đầu tiên trong lịch sử vào trận chung kết AFC Champions League Elite.',
    content: `<p>Cristiano Ronaldo đã có một buổi tối không thể quên tại sân King Saud University khi ghi hat-trick rực rỡ giúp Al-Nassr đánh bại Kawasaki Frontale với tỷ số 4-1.</p>
<h2>CR7 xuất thần ở tuổi 39</h2>
<p>Ở tuổi 39, Ronaldo vẫn chứng tỏ đẳng cấp không thể tranh cãi. Ba bàn thắng của anh bao gồm một cú đúp từ chấm phạt đền và một pha lội ngược dòng ngoạn mục từ ngoài vòng cấm.</p>
<h2>Lịch sử chờ đón</h2>
<p>Đây là lần đầu tiên trong lịch sử 30 năm tồn tại, Al-Nassr vào đến trận chung kết AFC Champions League. Đối thủ của họ sẽ là Urawa Red Diamonds đến từ Nhật Bản.</p>`,
    image: 'https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=800&h=450&fit=crop',
    categoryId: '3',
    categoryName: 'Thể Thao',
    categorySlug: 'the-thao',
    author: 'Đỗ Quang Minh',
    publishedAt: '2024-06-04T20:00:00Z',
    views: 18900,
  },
  {
    id: '8',
    title: 'Khoa Học Tạo Ra Pin Mặt Trời Hiệu Suất 47% - Kỷ Lục Thế Giới Mới',
    slug: 'pin-mat-troi-hieu-suat-47-phan-tram',
    summary:
      'Các nhà khoa học tại MIT đã phá vỡ kỷ lục thế giới khi chế tạo thành công pin mặt trời đạt hiệu suất chuyển đổi 47%, gần gấp đôi các tấm pin thương mại hiện nay.',
    content: `<p>Một đột phá khoa học có thể thay đổi tương lai năng lượng tái tạo toàn cầu vừa được công bố từ Viện Công nghệ Massachusetts (MIT).</p>
<h2>Công nghệ perovskite tiên tiến</h2>
<p>Pin mặt trời mới sử dụng cấu trúc nhiều lớp kết hợp giữa silicon truyền thống và vật liệu perovskite thế hệ mới. Cấu trúc tandem ba lớp này cho phép hấp thụ được nhiều phổ ánh sáng hơn, tăng đáng kể hiệu suất.</p>
<h2>Tiềm năng thương mại hóa</h2>
<p>Nhóm nghiên cứu ước tính với hiệu suất 47%, chi phí điện mặt trời có thể giảm xuống còn 1 cent/kWh vào năm 2030, rẻ hơn mọi nguồn năng lượng khác hiện có.</p>`,
    image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&h=450&fit=crop',
    categoryId: '4',
    categoryName: 'Khoa Học',
    categorySlug: 'khoa-hoc',
    author: 'Vũ Thị Thảo',
    publishedAt: '2024-06-03T09:30:00Z',
    views: 11200,
  },
];
