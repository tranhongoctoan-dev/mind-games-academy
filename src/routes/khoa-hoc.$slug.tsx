import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { Lock, Play, CheckCircle2, ArrowLeft, ShoppingCart, PlayCircle } from "lucide-react";
import { Header } from "@/components/Header";
import { PaymentModal } from "@/components/PaymentModal";
import { getCourse, formatPrice, type Lesson } from "@/lib/courses";
import { getVideoEmbedUrl, getVideoThumbnailUrl } from "@/lib/video";

export const Route = createFileRoute("/khoa-hoc/$slug")({
  loader: ({ params }) => {
    const course = getCourse(params.slug);
    if (!course) throw notFound();
    return { course };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Không tìm thấy khóa học" }, { name: "robots", content: "noindex" }] };
    const { course } = loaderData;
    const firstLesson = course.lessons[0];
    const ogImage = getVideoThumbnailUrl(firstLesson);

    return {
      meta: [
        { title: `${course.title} — Lớp Học Cờ Online` },
        { name: "description", content: course.description },
        { property: "og:title", content: course.title },
        { property: "og:description", content: course.description },
        ...(ogImage ? [{ property: "og:image", content: ogImage }] : []),
      ],
    };
  },
  notFoundComponent: () => (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="mx-auto max-w-md px-5 py-24 text-center">
        <h1 className="font-display text-2xl font-bold">Không tìm thấy khóa học</h1>
        <Link to="/khoa-hoc" className="mt-4 inline-block font-semibold text-gold">
          ← Quay lại danh sách khóa học
        </Link>
      </div>
    </div>
  ),
  component: CourseDetail,
});

function CourseDetail() {
  const { course } = Route.useLoaderData();
  const [activeIndex, setActiveIndex] = useState(0);
  const [payOpen, setPayOpen] = useState(false);

  const activeLesson = course.lessons[activeIndex];
  const isLocked = !activeLesson.free;
  const activeThumbnail = getVideoThumbnailUrl(activeLesson);
  const activeEmbedUrl = getVideoEmbedUrl(activeLesson);

  const handleSelect = (index: number) => {
    const lesson = course.lessons[index];
    if (lesson.free) {
      setActiveIndex(index);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setPayOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Video area */}
      <div className="bg-navy">
        <div className="mx-auto max-w-5xl">
          <div className="relative aspect-video w-full bg-black">
            {isLocked ? (
              <button
                onClick={() => setPayOpen(true)}
                className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-navy-foreground"
              >
                {activeThumbnail ? (
                  <img
                    src={activeThumbnail}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover opacity-25"
                  />
                ) : null}
                <span className="relative grid h-16 w-16 place-items-center rounded-full bg-gold/20 text-gold">
                  <Lock className="h-8 w-8" />
                </span>
                <span className="relative text-sm font-semibold">Bài học đã khóa — Mua để xem</span>
              </button>
            ) : activeEmbedUrl ? (
              <iframe
                key={activeLesson.videoId + activeIndex}
                className="absolute inset-0 h-full w-full"
                src={activeEmbedUrl}
                title={activeLesson.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <div className="absolute inset-0 grid place-items-center px-6 text-center text-sm text-navy-foreground">
                Video chưa sẵn sàng — vui lòng cấu hình VITE_BUNNY_LIBRARY_ID.
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-5 py-6">
        <Link to="/khoa-hoc" className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground">
          <ArrowLeft className="h-4 w-4" /> Tất cả khóa học
        </Link>

        <div className="mt-3 flex items-center gap-2 text-xs font-medium text-muted-foreground">
          <span className="rounded-full bg-accent px-2 py-0.5 text-accent-foreground">{course.level}</span>
          <span>{course.lessons.length} bài học</span>
        </div>
        <h1 className="mt-2 font-display text-2xl font-bold leading-snug">{course.title}</h1>
        <p className="mt-1 text-sm font-medium text-gold">{course.instructor}</p>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{course.description}</p>

        {/* Buy button */}
        <button
          onClick={() => setPayOpen(true)}
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-gold py-3.5 text-base font-bold text-gold-foreground shadow-gold active:scale-[0.99]"
        >
          <ShoppingCart className="h-5 w-5" />
          Mua khóa học · {formatPrice(course.price)}
        </button>

        {/* Lesson list */}
        <h2 className="mt-8 font-display text-lg font-bold">Danh sách bài học</h2>
        <ul className="mt-3 space-y-2">
          {course.lessons.map((lesson: Lesson, index: number) => {
            const isActive = index === activeIndex && lesson.free;
            return (
              <li key={index}>
                <button
                  onClick={() => handleSelect(index)}
                  className={`flex w-full items-center gap-3 rounded-2xl border p-3.5 text-left transition-colors ${
                    isActive
                      ? "border-gold bg-accent/50"
                      : "border-border bg-card hover:bg-secondary/60"
                  }`}
                >
                  <span
                    className={`grid h-10 w-10 shrink-0 place-items-center rounded-full ${
                      lesson.free ? "bg-navy text-gold" : "bg-secondary text-muted-foreground"
                    }`}
                  >
                    {lesson.free ? (
                      isActive ? <PlayCircle className="h-5 w-5" /> : <Play className="h-5 w-5" />
                    ) : (
                      <Lock className="h-5 w-5" />
                    )}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-semibold">{lesson.title}</span>
                    <span className="mt-0.5 flex items-center gap-2 text-xs text-muted-foreground">
                      <span>{lesson.duration}</span>
                      {lesson.free ? (
                        <span className="inline-flex items-center gap-1 font-semibold text-gold">
                          <CheckCircle2 className="h-3.5 w-3.5" /> Học thử miễn phí
                        </span>
                      ) : (
                        <span className="font-medium">Cần mua khóa học</span>
                      )}
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <PaymentModal
        open={payOpen}
        onClose={() => setPayOpen(false)}
        courseTitle={course.title}
        price={course.price}
      />
    </div>
  );
}
