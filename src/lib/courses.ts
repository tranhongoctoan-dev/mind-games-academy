import { getVideoThumbnailUrl } from "./video";

export type CourseType = "co-vua" | "co-tuong";
export type VideoProvider = "youtube" | "bunny";

export interface Lesson {
  title: string;
  videoId: string;
  provider?: VideoProvider;
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
  coverImage?: string;
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
    price: 50000,
    coverImage: "/__l5e/assets-v1/fb0d3ab2-6212-4269-a6a6-619dc9620b00/cover-10-sai-lam.jpg",
    lessons: [
      {
        title: "Bài 1: Xe cần xuất nhanh",
        videoId: "5793ee13-5ffe-4df3-9d9d-d353e769c2e3",
        provider: "bunny",
        duration: "03:25",
        free: true,
      },
      {
        title: "Bài 2: Mã vội qua sông",
        videoId: "b8422379-e828-45fb-91b1-d3d1ed0b01f6",
        provider: "bunny",
        duration: "02:40",
        free: true,
      },
      {
        title: "Bài 3: Pháo tránh nổ vội",
        videoId: "62cc6fd6-45f1-46cd-aa18-6bd12d1fcecf",
        provider: "bunny",
        duration: "04:22",
      },
      {
        title: "Bài 4: Tốt vội xông lên",
        videoId: "01a898ee-cfc4-47fa-83ee-e2924ae13e17",
        provider: "bunny",
        duration: "04:37",
      },
      {
        title: "Bài 5: Tướng sớm lộ diện",
        videoId: "0bfb2e6d-ec23-4f60-a0b4-655e9a5fda6a",
        provider: "bunny",
        duration: "05:29",
      },
      {
        title: "Bài 6: Sĩ bổ sai hướng",
        videoId: "cfec36b4-ad45-4f35-a761-d2c2703f6ede",
        provider: "bunny",
        duration: "04:42",
      },
      {
        title: "Bài 7: Bổ tượng sai hướng",
        videoId: "ca614363-0fab-4255-999e-9f9f71c84657",
        provider: "bunny",
        duration: "04:52",
      },
      {
        title: "Bài 8: Tranh đoạt tiên thủ",
        videoId: "5b1e6251-c84f-412c-8d75-86cbbb83a41d",
        provider: "bunny",
        duration: "06:08",
      },
      {
        title: "Bài 9: Trận hình hài hòa",
        videoId: "85bd85a0-169d-49f8-bb64-62858e64efb6",
        provider: "bunny",
        duration: "06:36",
      },
      {
        title: "Bài 10: Tham ăn quân",
        videoId: "41afcf32-7f67-4fe3-ac4a-b6c16d894bab",
        provider: "bunny",
        duration: "05:51",
      },
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
    price: 75000,
    lessons: [
      { title: "Bài 1: Nguyên tắc tàn cuộc", videoId: "223hheie0P0", duration: "05:30", free: true },
      { title: "Bài 2: Tàn Xe cơ bản", videoId: "223hheie0P0", duration: "06:15", free: true },
      { title: "Bài 3: Tàn Pháo Mã", videoId: "223hheie0P0", duration: "07:02" },
      { title: "Bài 4: Bài tập tổng hợp", videoId: "223hheie0P0", duration: "08:00" },
    ],
  },
];

export function getCourse(slug: string) {
  return courses.find((c) => c.slug === slug);
}

export function getCourseCoverImage(course: Course): string | null {
  if (course.coverImage) return course.coverImage;
  const first = course.lessons[0];
  return first ? getVideoThumbnailUrl(first) : null;
}

export function formatPrice(price: number) {
  return price.toLocaleString("vi-VN") + "đ";
}
