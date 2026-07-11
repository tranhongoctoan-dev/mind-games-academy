export type CourseType = "co-vua" | "co-tuong";

export interface Lesson {
  title: string;
  youtubeId: string;
  duration: string;
  free?: boolean;
}

export interface Course {
  slug: string;
  type: CourseType;
  title: string;
  instructor: string;
  description: string;
  level: string;
  price: number;
  lessons: Lesson[];
}

export const courseTypeLabels: Record<CourseType, string> = {
  "co-vua": "Khóa học Cờ Vua",
  "co-tuong": "Khóa học Cờ Tướng",
};

export const courses: Course[] = [
  {
    slug: "10-sai-lam-khai-cuoc-co-tuong",
    type: "co-tuong",
    title: "10 Sai Lầm Khai Cuộc Thường Gặp",
    instructor: "Đặc cấp Đại sư Trịnh Duy Đồng",
    description:
      "Khóa học do Đặc cấp đại sư Trịnh Duy Đồng giảng dạy, giúp bạn tránh những sai lầm phổ biến trong giai đoạn khai cuộc.",
    level: "Cơ bản",
    price: 299000,
    lessons: [
      { title: "Bài 1: Tổng quan khai cuộc", youtubeId: "223hheie0P0", duration: "05:12", free: true },
      { title: "Bài 2: Sai lầm về phát triển quân", youtubeId: "223hheie0P0", duration: "06:40" },
      { title: "Bài 3: Sai lầm về Pháo đầu", youtubeId: "223hheie0P0", duration: "05:58" },
      { title: "Bài 4: Sai lầm về trung lộ", youtubeId: "223hheie0P0", duration: "07:10" },
      { title: "Bài 5: Tổng kết & thực hành", youtubeId: "223hheie0P0", duration: "08:24" },
    ],
  },
  {
    slug: "chien-thuat-tan-cuoc-co-tuong",
    type: "co-tuong",
    title: "Chiến Thuật Tàn Cuộc Cờ Tướng",
    instructor: "Kiện tướng Nguyễn Thành Bảo",
    description:
      "Nắm vững các thế tàn cơ bản và nâng cao để giành chiến thắng trong những ván cờ căng thẳng.",
    level: "Nâng cao",
    price: 349000,
    lessons: [
      { title: "Bài 1: Nguyên tắc tàn cuộc", youtubeId: "223hheie0P0", duration: "05:30", free: true },
      { title: "Bài 2: Tàn Xe cơ bản", youtubeId: "223hheie0P0", duration: "06:15" },
      { title: "Bài 3: Tàn Pháo Mã", youtubeId: "223hheie0P0", duration: "07:02" },
      { title: "Bài 4: Bài tập tổng hợp", youtubeId: "223hheie0P0", duration: "08:00" },
    ],
  },
  {
    slug: "nhap-mon-co-vua",
    type: "co-vua",
    title: "Nhập Môn Cờ Vua Từ Số 0",
    instructor: "Kiện tướng Lê Quang Long",
    description:
      "Bắt đầu từ cách đi của từng quân cờ đến những nguyên tắc chiến lược đầu tiên, dành cho người mới hoàn toàn.",
    level: "Cơ bản",
    price: 259000,
    lessons: [
      { title: "Bài 1: Cách đi của các quân cờ", youtubeId: "223hheie0P0", duration: "04:50", free: true },
      { title: "Bài 2: Giá trị quân cờ", youtubeId: "223hheie0P0", duration: "05:20" },
      { title: "Bài 3: Nguyên tắc khai cuộc", youtubeId: "223hheie0P0", duration: "06:10" },
      { title: "Bài 4: Chiếu hết cơ bản", youtubeId: "223hheie0P0", duration: "06:45" },
      { title: "Bài 5: Ván cờ đầu tiên", youtubeId: "223hheie0P0", duration: "07:30" },
    ],
  },
  {
    slug: "chien-luoc-trung-cuoc-co-vua",
    type: "co-vua",
    title: "Chiến Lược Trung Cuộc Cờ Vua",
    instructor: "Đại kiện tướng Đào Thiên Hải",
    description:
      "Hiểu về cấu trúc tốt, kiểm soát trung tâm và lên kế hoạch tấn công trong giai đoạn trung cuộc.",
    level: "Trung cấp",
    price: 329000,
    lessons: [
      { title: "Bài 1: Cấu trúc tốt", youtubeId: "223hheie0P0", duration: "05:40", free: true },
      { title: "Bài 2: Kiểm soát trung tâm", youtubeId: "223hheie0P0", duration: "06:25" },
      { title: "Bài 3: Tấn công cánh Vua", youtubeId: "223hheie0P0", duration: "07:15" },
      { title: "Bài 4: Phối hợp quân", youtubeId: "223hheie0P0", duration: "07:55" },
    ],
  },
];

export function getCourse(slug: string) {
  return courses.find((c) => c.slug === slug);
}

export function formatPrice(price: number) {
  return price.toLocaleString("vi-VN") + "đ";
}
