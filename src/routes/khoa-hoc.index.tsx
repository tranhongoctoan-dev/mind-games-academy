import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Header } from "@/components/Header";
import { CourseCard } from "@/components/CourseCard";
import { courses, courseTypeLabels, type CourseType } from "@/lib/courses";

export const Route = createFileRoute("/khoa-hoc")({
  head: () => ({
    meta: [
      { title: "Tất cả khóa học — Lớp Học Cờ Online" },
      {
        name: "description",
        content: "Danh sách khóa học Cờ Vua và Cờ Tướng qua video ngắn, tối ưu cho điện thoại.",
      },
      { property: "og:title", content: "Tất cả khóa học — Lớp Học Cờ Online" },
      { property: "og:description", content: "Khóa học Cờ Vua và Cờ Tướng qua video ngắn." },
    ],
  }),
  component: CoursesPage,
});

function CoursesPage() {
  const [type, setType] = useState<CourseType>("co-vua");
  const filtered = courses.filter((c) => c.type === type);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="mx-auto max-w-5xl px-5 py-8">
        <h1 className="font-display text-3xl font-bold">Khóa học</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Chọn loại cờ bạn muốn học để xem danh sách khóa học phù hợp.
        </p>

        {/* Toggle */}
        <div className="mt-6 grid grid-cols-2 gap-1.5 rounded-2xl border border-border bg-secondary p-1.5">
          {(Object.keys(courseTypeLabels) as CourseType[]).map((t) => (
            <button
              key={t}
              onClick={() => setType(t)}
              className={`rounded-xl py-3 text-sm font-bold transition-colors ${
                type === t
                  ? "bg-navy text-navy-foreground shadow-card"
                  : "text-muted-foreground"
              }`}
            >
              {courseTypeLabels[t]}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          {filtered.map((c) => (
            <CourseCard key={c.slug} course={c} />
          ))}
        </div>
      </div>
    </div>
  );
}
