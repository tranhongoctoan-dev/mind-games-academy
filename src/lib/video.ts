import type { Lesson } from "./courses";

const BUNNY_LIBRARY_ID =
  (import.meta.env.VITE_BUNNY_LIBRARY_ID as string | undefined) ?? "707946";

export function getLessonProvider(lesson: Lesson): "youtube" | "bunny" {
  return lesson.provider ?? "youtube";
}

export function getVideoEmbedUrl(lesson: Lesson, opts?: { autoplay?: boolean }): string {
  const autoplay = opts?.autoplay ? 1 : 0;
  if (getLessonProvider(lesson) === "bunny") {
    if (!BUNNY_LIBRARY_ID) {
      console.warn("VITE_BUNNY_LIBRARY_ID chưa được cấu hình — không thể phát video Bunny Stream.");
      return "";
    }
    return `https://iframe.mediadelivery.net/embed/${BUNNY_LIBRARY_ID}/${lesson.videoId}?autoplay=${autoplay}&preload=true`;
  }

  const origin = typeof window !== "undefined" ? `&origin=${encodeURIComponent(window.location.origin)}` : "";
  return `https://www.youtube.com/embed/${lesson.videoId}?enablejsapi=1&playsinline=1&rel=0&autoplay=${autoplay}${origin}`;
}

export function getVideoThumbnailUrl(lesson: Lesson): string | null {
  if (getLessonProvider(lesson) === "bunny") {
    if (!BUNNY_LIBRARY_ID) return null;
    return `https://video.bunnycdn.com/${BUNNY_LIBRARY_ID}/${lesson.videoId}/thumbnail.jpg`;
  }

  return `https://i.ytimg.com/vi/${lesson.videoId}/hqdefault.jpg`;
}
