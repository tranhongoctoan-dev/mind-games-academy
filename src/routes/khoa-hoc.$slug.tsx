import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState, useRef, useEffect, useCallback } from "react";
import { Lock, ArrowLeft, ShoppingCart, CheckCircle2, PlayCircle, Play } from "lucide-react";
import { Header } from "@/components/Header";
import { PaymentModal } from "@/components/PaymentModal";
import { getCourse, formatPrice, getCourseCoverImage, type Lesson } from "@/lib/courses";
import { getVideoEmbedUrl, getVideoThumbnailUrl, getLessonProvider } from "@/lib/video";

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

  const feedRef = useRef<HTMLDivElement | null>(null);
  const slideRefs = useRef<Array<HTMLElement | null>>([]);
  const total = course.lessons.length;

  // Track which slide is currently in view
  useEffect(() => {
    const container = feedRef.current;
    if (!container) return;
    const io = new IntersectionObserver(
      (entries) => {
        // Pick the entry with the highest visibility ratio
        let best: IntersectionObserverEntry | null = null;
        for (const e of entries) {
          if (!best || e.intersectionRatio > best.intersectionRatio) best = e;
        }
        if (best && best.isIntersecting) {
          const idx = Number((best.target as HTMLElement).dataset.index);
          if (!Number.isNaN(idx)) setActiveIndex(idx);
        }
      },
      { root: container, threshold: [0.5, 0.75, 1] }
    );
    slideRefs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, [total]);

  const goTo = useCallback((i: number) => {
    const el = slideRefs.current[i];
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const activeLesson = course.lessons[activeIndex];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* TikTok-style vertical scroll-snap feed */}
      <div
        ref={feedRef}
        className="relative h-[100dvh] w-full snap-y snap-mandatory overflow-y-scroll bg-black overscroll-contain"
        style={{ scrollSnapType: "y mandatory" }}
      >
        {course.lessons.map((lesson, index) => (
          <section
            key={index}
            data-index={index}
            ref={(el) => {
              slideRefs.current[index] = el;
            }}
            className="relative flex h-[100dvh] w-full snap-start snap-always items-center justify-center bg-black"
          >
            <FeedSlide
              lesson={lesson}
              locked={!lesson.free}
              price={course.price}
              onBuy={() => setPayOpen(true)}
              onEnded={() => goTo(index + 1)}
              active={index === activeIndex}
            />

            {/* Overlay: index + lesson title */}
            <div className="pointer-events-none absolute left-3 top-3 z-10 flex items-center gap-2">
              <span className="rounded-full bg-black/60 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
                {index + 1} / {total}
              </span>
            </div>
            <div className="pointer-events-none absolute inset-x-0 bottom-6 z-10 px-4 text-center">
              <p className="mx-auto max-w-md truncate rounded-full bg-black/50 px-4 py-1.5 text-sm font-semibold text-white backdrop-blur">
                {lesson.title}
              </p>
              <p className="mt-2 text-[11px] font-medium text-white/70">
                Vuốt lên để xem bài tiếp theo
              </p>
            </div>
          </section>
        ))}
      </div>

      <div className="mx-auto max-w-5xl px-5 py-6">
        <Link to="/khoa-hoc" className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground">
          <ArrowLeft className="h-4 w-4" /> Tất cả khóa học
        </Link>

        <div className="mt-3 flex items-center gap-2 text-xs font-medium text-muted-foreground">
          <span className="rounded-full bg-accent px-2 py-0.5 text-accent-foreground">{course.level}</span>
          <span>{total} bài học</span>
        </div>
        <h1 className="mt-2 font-display text-2xl font-bold leading-snug">{course.title}</h1>
        <p className="mt-1 text-sm font-medium text-gold">{course.instructor}</p>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{course.description}</p>

        <button
          onClick={() => setPayOpen(true)}
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-gold py-3.5 text-base font-bold text-gold-foreground shadow-gold active:scale-[0.99]"
        >
          <ShoppingCart className="h-5 w-5" />
          Mua khóa học · {formatPrice(course.price)}
        </button>

        <h2 className="mt-8 font-display text-lg font-bold">Danh sách bài học</h2>
        <ul className="mt-3 space-y-2">
          {course.lessons.map((lesson: Lesson, index: number) => {
            const isActive = index === activeIndex;
            return (
              <li key={index}>
                <button
                  onClick={() => goTo(index)}
                  className={`flex w-full items-center gap-3 rounded-2xl border p-3.5 text-left transition-colors ${
                    isActive ? "border-gold bg-accent/50" : "border-border bg-card hover:bg-secondary/60"
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
        transferNote={`KH ${course.slug}`.slice(0, 50)}
        coverImage={getCourseCoverImage(course)}
      />
    </div>
  );
}

function FeedSlide({
  lesson,
  locked,
  price,
  onBuy,
  onEnded,
  active,
}: {
  lesson: Lesson;
  locked: boolean;
  price: number;
  onBuy: () => void;
  onEnded?: () => void;
  active: boolean;
}) {
  const thumb = getVideoThumbnailUrl(lesson);
  const embed = getVideoEmbedUrl(lesson, { autoplay: active });
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const provider = getLessonProvider(lesson);

  useEffect(() => {
    if (locked || !onEnded || !active) return;
    const iframe = iframeRef.current;
    if (!iframe) return;

    if (provider === "youtube") {
      const sendListening = () => {
        iframe.contentWindow?.postMessage(
          JSON.stringify({ event: "listening", id: 1, channel: "widget" }),
          "*"
        );
        iframe.contentWindow?.postMessage(
          JSON.stringify({ event: "command", func: "addEventListener", args: ["onStateChange"] }),
          "*"
        );
      };
      const onLoad = () => sendListening();
      iframe.addEventListener("load", onLoad);
      sendListening();

      const onMsg = (e: MessageEvent) => {
        if (typeof e.data !== "string") return;
        if (!e.origin.includes("youtube.com")) return;
        try {
          const data = JSON.parse(e.data);
          if (data?.event === "onStateChange" && data?.info === 0) {
            onEnded();
          }
        } catch {
          /* ignore */
        }
      };
      window.addEventListener("message", onMsg);
      return () => {
        iframe.removeEventListener("load", onLoad);
        window.removeEventListener("message", onMsg);
      };
    }
  }, [locked, onEnded, provider, embed, active]);

  if (locked) {
    return (
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-6 text-center text-white">
        {thumb ? (
          <img src={thumb} alt="" className="absolute inset-0 h-full w-full object-cover opacity-25" />
        ) : null}
        <span className="relative grid h-16 w-16 place-items-center rounded-full bg-gold/20 text-gold">
          <Lock className="h-8 w-8" />
        </span>
        <div className="relative">
          <p className="text-base font-bold">{lesson.title}</p>
          <p className="mt-1 text-sm text-white/80">
            Khóa học cần thanh toán {formatPrice(price)} để xem tiếp
          </p>
        </div>
        <button
          onClick={onBuy}
          className="relative flex items-center justify-center gap-2 rounded-2xl bg-gold px-6 py-3 text-sm font-bold text-gold-foreground shadow-gold active:scale-[0.99]"
        >
          <ShoppingCart className="h-4 w-4" />
          Mở khóa · Quét VietQR TPBank
        </button>
      </div>
    );
  }

  if (!active) {
    // Show poster only; don't mount iframe to avoid multi-audio
    return (
      <div className="absolute inset-0">
        {thumb ? (
          <img src={thumb} alt={lesson.title} className="h-full w-full object-contain" />
        ) : (
          <div className="grid h-full w-full place-items-center text-sm text-white/70">…</div>
        )}
      </div>
    );
  }

  if (!embed) {
    return (
      <div className="absolute inset-0 grid place-items-center px-6 text-center text-sm text-white/70">
        Video chưa sẵn sàng.
      </div>
    );
  }

  return (
    <iframe
      ref={iframeRef}
      className="absolute inset-0 h-full w-full"
      src={embed}
      title={lesson.title}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
  );
}
