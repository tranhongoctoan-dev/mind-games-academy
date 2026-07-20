import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState, useRef, useEffect, useCallback } from "react";
import { Lock, ArrowLeft, ShoppingCart, ChevronUp, ChevronDown, CheckCircle2, PlayCircle, Play, Maximize2, X } from "lucide-react";
import { Header } from "@/components/Header";
import { PaymentModal } from "@/components/PaymentModal";
import { getCourse, formatPrice, type Lesson } from "@/lib/courses";
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
  const [fullscreen, setFullscreen] = useState(false);
  const touchStartY = useRef<number | null>(null);
  const wheelLock = useRef(false);

  const total = course.lessons.length;
  const goTo = useCallback(
    (i: number) => setActiveIndex(Math.max(0, Math.min(total - 1, i))),
    [total]
  );

  const next = useCallback(() => goTo(activeIndex + 1), [goTo, activeIndex]);
  const prev = useCallback(() => goTo(activeIndex - 1), [goTo, activeIndex]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartY.current == null) return;
    const dy = e.changedTouches[0].clientY - touchStartY.current;
    if (Math.abs(dy) > 60) {
      if (dy < 0) next();
      else prev();
    }
    touchStartY.current = null;
  };
  const onWheel = (e: React.WheelEvent) => {
    if (wheelLock.current) return;
    if (Math.abs(e.deltaY) < 30) return;
    wheelLock.current = true;
    if (e.deltaY > 0) next();
    else prev();
    setTimeout(() => (wheelLock.current = false), 500);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") next();
      else if (e.key === "ArrowUp") prev();
      else if (e.key === "Escape") setFullscreen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  // Lock body scroll while fullscreen
  useEffect(() => {
    if (!fullscreen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [fullscreen]);

  const activeLesson = course.lessons[activeIndex];
  const isLocked = !activeLesson.free;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Inline feed player */}
      <div
        className="relative bg-navy select-none"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onWheel={onWheel}
      >
        <div className="mx-auto max-w-5xl">
          <div className="relative aspect-video w-full bg-black">
            {!fullscreen && (
              <FeedSlide
                key={`inline-${activeIndex}`}
                lesson={activeLesson}
                locked={isLocked}
                price={course.price}
                onBuy={() => setPayOpen(true)}
                onEnded={next}
                autoplay={false}
              />
            )}

            {/* Fullscreen toggle */}
            {!isLocked && !fullscreen && (
              <button
                onClick={() => setFullscreen(true)}
                aria-label="Xem toàn màn hình"
                className="absolute bottom-3 right-3 z-10 grid h-11 w-11 place-items-center rounded-full bg-black/60 text-white backdrop-blur active:scale-95"
              >
                <Maximize2 className="h-5 w-5" />
              </button>
            )}

            <div className="pointer-events-none absolute right-1 top-1/2 z-10 flex -translate-y-1/2 flex-col gap-1.5">
              <button
                onClick={prev}
                disabled={activeIndex === 0}
                aria-label="Bài trước"
                className="pointer-events-auto grid h-6 w-6 place-items-center rounded-full bg-black/30 text-white/80 opacity-40 backdrop-blur-sm transition hover:bg-black/60 hover:opacity-90 active:opacity-100 disabled:opacity-20"
              >
                <ChevronUp className="h-3.5 w-3.5" />
              </button>
              <button
                onClick={next}
                disabled={activeIndex === total - 1}
                aria-label="Bài tiếp theo"
                className="pointer-events-auto grid h-6 w-6 place-items-center rounded-full bg-gold/50 text-gold-foreground opacity-60 backdrop-blur-sm transition hover:bg-gold hover:opacity-100 disabled:opacity-20"
              >
                <ChevronDown className="h-3.5 w-3.5" />
              </button>
            </div>

            <div className="pointer-events-none absolute left-3 top-3 z-10 rounded-full bg-black/50 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
              {activeIndex + 1} / {total}
            </div>
          </div>
        </div>
        <p className="py-2 text-center text-xs text-navy-foreground/70">
          Vuốt lên / xuống hoặc dùng nút để chuyển bài
        </p>
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

      {/* Custom fullscreen overlay with swipe */}
      {fullscreen && (
        <div
          className="fixed inset-0 z-50 flex flex-col bg-black text-white select-none"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          onWheel={onWheel}
        >
          <div className="flex items-center justify-between px-4 py-3">
            <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold backdrop-blur">
              {activeIndex + 1} / {total}
            </span>
            <button
              onClick={() => setFullscreen(false)}
              aria-label="Đóng toàn màn hình"
              className="grid h-11 w-11 place-items-center rounded-full bg-white/10 backdrop-blur active:scale-95"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="relative flex-1">
            <FeedSlide
              key={`fs-${activeIndex}`}
              lesson={activeLesson}
              locked={isLocked}
              price={course.price}
              onBuy={() => setPayOpen(true)}
              onEnded={next}
              autoplay
              fill
            />

            <div className="pointer-events-none absolute right-3 top-1/2 flex -translate-y-1/2 flex-col gap-3">
              <button
                onClick={prev}
                disabled={activeIndex === 0}
                aria-label="Bài trước"
                className="pointer-events-auto grid h-12 w-12 place-items-center rounded-full bg-white/15 backdrop-blur disabled:opacity-30"
              >
                <ChevronUp className="h-6 w-6" />
              </button>
              <button
                onClick={next}
                disabled={activeIndex === total - 1}
                aria-label="Bài tiếp theo"
                className="pointer-events-auto grid h-12 w-12 place-items-center rounded-full bg-gold text-gold-foreground shadow-gold disabled:opacity-40"
              >
                <ChevronDown className="h-6 w-6" />
              </button>
            </div>
          </div>

          <p className="py-3 text-center text-xs text-white/70">
            Vuốt lên: bài tiếp · Vuốt xuống: bài trước
          </p>
        </div>
      )}

      <PaymentModal
        open={payOpen}
        onClose={() => setPayOpen(false)}
        courseTitle={course.title}
        price={course.price}
        transferNote={`KH ${course.slug}`.slice(0, 50)}
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
  autoplay = false,
  fill = false,
}: {
  lesson: Lesson;
  locked: boolean;
  price: number;
  onBuy: () => void;
  onEnded?: () => void;
  autoplay?: boolean;
  fill?: boolean;
}) {
  const thumb = getVideoThumbnailUrl(lesson);
  const embed = getVideoEmbedUrl(lesson, { autoplay });
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const provider = getLessonProvider(lesson);

  // Detect video-ended via postMessage (YouTube IFrame API) without needing SDK
  useEffect(() => {
    if (locked || !onEnded) return;
    const iframe = iframeRef.current;
    if (!iframe) return;

    if (provider === "youtube") {
      // Handshake to receive events
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
      // In case already loaded
      sendListening();

      const onMsg = (e: MessageEvent) => {
        if (typeof e.data !== "string") return;
        if (!e.origin.includes("youtube.com")) return;
        try {
          const data = JSON.parse(e.data);
          // Ended state === 0
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
  }, [locked, onEnded, provider, embed]);

  const posClass = fill ? "absolute inset-0 h-full w-full" : "absolute inset-0 h-full w-full";

  if (locked) {
    return (
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-6 text-center text-navy-foreground">
        {thumb ? (
          <img src={thumb} alt="" className="absolute inset-0 h-full w-full object-cover opacity-20" />
        ) : null}
        <span className="relative grid h-16 w-16 place-items-center rounded-full bg-gold/20 text-gold">
          <Lock className="h-8 w-8" />
        </span>
        <div className="relative">
          <p className="text-base font-bold">{lesson.title}</p>
          <p className="mt-1 text-sm text-navy-foreground/80">
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

  if (!embed) {
    return (
      <div className="absolute inset-0 grid place-items-center px-6 text-center text-sm text-navy-foreground">
        Video chưa sẵn sàng.
      </div>
    );
  }

  return (
    <iframe
      ref={iframeRef}
      className={posClass}
      src={embed}
      title={lesson.title}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
  );
}
