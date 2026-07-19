import { Link } from "@tanstack/react-router";
import { PlayCircle, ArrowRight } from "lucide-react";
import type { Course } from "@/lib/courses";
import { formatPrice } from "@/lib/courses";
import { getVideoThumbnailUrl } from "@/lib/video";

export function CourseCard({ course }: { course: Course }) {
  const label = course.type === "co-vua" ? "Cờ Vua" : "Cờ Tướng";
  const thumbnail = getVideoThumbnailUrl(course.lessons[0]);
  return (
    <Link
      to="/khoa-hoc/$slug"
      params={{ slug: course.slug }}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-card transition-transform active:scale-[0.99]"
    >
      <div className="relative aspect-video overflow-hidden bg-navy">
        {thumbnail ? (
          <img
            src={thumbnail}
            alt={course.title}
            loading="lazy"
            className="h-full w-full object-cover opacity-90 transition-transform duration-500 group-hover:scale-105"
          />
        ) : null}
        <span className="absolute inset-0 grid place-items-center">
          <PlayCircle className="h-12 w-12 text-gold drop-shadow-lg" />
        </span>
        <span className="absolute left-3 top-3 rounded-full bg-navy/85 px-3 py-1 text-xs font-semibold text-navy-foreground">
          {label}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
          <span className="rounded-full bg-accent px-2 py-0.5 text-accent-foreground">{course.level}</span>
          <span>{course.lessons.length} bài học</span>
        </div>
        <h3 className="font-display text-lg font-bold leading-snug">{course.title}</h3>
        <p className="text-sm text-muted-foreground">{course.instructor}</p>
        <div className="mt-auto flex items-center justify-between pt-3">
          <span className="text-base font-bold text-gold">{formatPrice(course.price)}</span>
          <span className="inline-flex items-center gap-1 text-sm font-semibold text-foreground">
            Xem học <ArrowRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}
