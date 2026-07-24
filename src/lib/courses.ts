import { getVideoThumbnailUrl } from "./video";

export type CourseType = "co-vua" | "co-tuong";
export type VideoProvider = "youtube" | "bunny";

export interface Lesson {
  title: string;
  videoId: string;
  provider?: VideoProvider;
  libraryId?: string;
  duration: string;
  free?: boolean;
}

export interface Course {
  slug: string;
  legacySlugs?: string[];
  type: CourseType;
  title: string;
  instructor: string;
  description: string;
  level: string;
  price: number;
  coverImage?: string;
  bunnyLibraryId?: string;
  lessons: Lesson[];
}

export const courseTypeLabels: Record<CourseType, string> = {
  "co-vua": "Khóa học Cờ Vua",
  "co-tuong": "Khóa học Cờ Tướng",
};

const rawCourses: Course[] = [
  {
    slug: "10-sai-lam-khai-cuoc-co-tuong",
    legacySlugs: ["10-sai-lam-khai-cuoc-thuong-gap"],
    type: "co-tuong",
    title: "10 Sai Lầm Khai Cuộc Thường Gặp",
    instructor: "Đặc cấp Đại sư Trịnh Duy Đồng",
    description:
      "Khóa học do Đặc cấp đại sư Trịnh Duy Đồng giảng dạy, giúp bạn tránh những sai lầm phổ biến trong giai đoạn khai cuộc.",
    level: "Cơ bản",
    price: 50000,
    coverImage: "/cover-trinh-duy-dong.jpg",
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
    slug: "bi-quyet-hoc-co",
    legacySlugs: ["chien-thuat-tan-cuoc-co-tuong"],
    type: "co-tuong",
    title: "Bí quyết học cờ",
    instructor: "Đặc cấp Đại sư Triệu Hâm Hâm",
    description:
      "Khóa học do Đặc cấp đại sư Triệu Hâm Hâm giảng dạy, chia sẻ bí quyết học cờ hiệu quả từ căn bản.",
    level: "Cơ bản",
    price: 50000,
    coverImage: "/cover-bi-quyet-hoc-co.jpg",
    bunnyLibraryId: "712397",
    lessons: [
      { title: "Bài 1", videoId: "613bef4c-ee9b-44d5-a52e-751d4a7df286", provider: "bunny", duration: "00:00", free: true },
      { title: "Bài 2", videoId: "4f9f48f0-56ae-4fb2-a3d1-be25b35ecc75", provider: "bunny", duration: "00:00", free: true },
      { title: "Bài 3", videoId: "9137aec6-fc6a-4a14-941c-7145dbeff1ee", provider: "bunny", duration: "00:00" },
      { title: "Bài 4", videoId: "627aaeec-4be3-40b3-95f0-fdaa7394c3c1", provider: "bunny", duration: "00:00" },
      { title: "Bài 5", videoId: "998bc08f-5f23-47c2-adf5-9e7a296c5181", provider: "bunny", duration: "00:00" },
      { title: "Bài 6", videoId: "0126a8f2-5ec9-4fb4-94d9-38016df5cdc9", provider: "bunny", duration: "00:00" },
      { title: "Bài 7", videoId: "0059cebb-7c29-4da5-bb8b-e08aca53fafa", provider: "bunny", duration: "00:00" },
      { title: "Bài 8", videoId: "a81b47ae-cd78-4ceb-a7f5-73bf8cee5e54", provider: "bunny", duration: "00:00" },
      { title: "Bài 9", videoId: "973666a5-a75e-48ec-b690-108c9f8930fa", provider: "bunny", duration: "00:00" },
      { title: "Bài 10", videoId: "bda2f200-7779-489a-b71a-416f80181f10", provider: "bunny", duration: "00:00" },
    ],
  },
];

export const courses: Course[] = rawCourses.map((c) =>
  c.bunnyLibraryId
    ? { ...c, lessons: c.lessons.map((l) => ({ ...l, libraryId: l.libraryId ?? c.bunnyLibraryId })) }
    : c
);


export function getCourse(slug: string) {
  return courses.find((c) => c.slug === slug || c.legacySlugs?.includes(slug));
}

export function getCourseCoverImage(course: Course): string | null {
  if (course.coverImage) return course.coverImage;
  const first = course.lessons[0];
  return first ? getVideoThumbnailUrl(first) : null;
}

export function formatPrice(price: number) {
  return price.toLocaleString("vi-VN") + "đ";
}
