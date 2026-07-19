import type { Lesson } from "./courses";

const BUNNY_LIBRARY_ID =
  (import.meta.env.VITE_BUNNY_LIBRARY_ID as string | undefined) ?? "707946";

export function getLessonProvider(lesson: Lesson): "youtube" | "bunny" {
  return lesson.provider ?? "youtube";
}

export function getVideoEmbedUrl(lesson: Lesson): string {
  if (getLessonProvider(lesson) === "bunny") {
    if (!BUNNY_LIBRARY_ID) {
      console.warn("VITE_BUNNY_LIBRARY_ID chưa được cấu hình — không thể phát video Bunny Stream.");
      return "";
    }
    return `https://iframe.mediadelivery.net/embed/${BUNNY_LIBRARY_ID}/${lesson.videoId}?autoplay=false&preload=true`;
  }

  return `https://www.youtube.com/embed/${lesson.videoId}`;
}

export function getVideoThumbnailUrl(lesson: Lesson): string | null {
  if (getLessonProvider(lesson) === "bunny") {
    if (!BUNNY_LIBRARY_ID) return null;
    return `https://video.bunnycdn.com/${BUNNY_LIBRARY_ID}/${lesson.videoId}/thumbnail.jpg`;
  }

  return `https://i.ytimg.com/vi/${lesson.videoId}/hqdefault.jpg`;
}
