import { createFileRoute, Link } from "@tanstack/react-router";
import { PlayCircle, Smartphone, GraduationCap, ArrowRight } from "lucide-react";
import { Header } from "@/components/Header";
import { CourseCard } from "@/components/CourseCard";
import { courses } from "@/lib/courses";
import heroChess from "@/assets/hero-chess.jpg";

export const Route = createFileRoute("/")({
  component: Index,
});

const features = [
  {
    icon: PlayCircle,
    title: "Video ngắn dễ hiểu",
    desc: "Mỗi bài học chỉ 3–6 phút, đi thẳng vào trọng tâm, dễ nhớ và dễ áp dụng.",
  },
  {
    icon: Smartphone,
    title: "Học trên điện thoại",
    desc: "Giao diện tối ưu cho di động, lướt xem bài học mượt mà như mạng xã hội.",
  },
  {
    icon: GraduationCap,
    title: "Lộ trình bài bản",
    desc: "Khóa học sắp xếp theo chương, từ căn bản đến nâng cao, kèm theo dõi tiến độ.",
  },
];

function Index() {
  const featured = courses.slice(0, 4);
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden bg-navy text-navy-foreground">
        <img
          src={heroChess}
          alt="Bàn cờ vua"
          width={1200}
          height={1200}
          className="absolute inset-0 h-full w-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/70 via-navy/85 to-navy" />
        <div className="relative mx-auto max-w-5xl px-5 py-16 sm:py-24">
          <span className="inline-flex items-center rounded-full border border-gold/50 px-3 py-1 text-xs font-medium text-gold">
            ✦ Nền tảng học cờ qua video ngắn
          </span>
          <h1 className="mt-5 font-display text-4xl font-extrabold leading-tight sm:text-5xl">
            Nâng tầm kỳ nghệ,
            <br />
            <span className="text-gold">mỗi ngày vài phút</span>
          </h1>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-navy-foreground/80">
            Học cờ tướng và cờ vua qua các video ngắn được thiết kế riêng cho điện thoại. Từ nước đi đầu tiên đến những đòn phối hợp tinh tế.
          </p>
          <Link
            to="/khoa-hoc"
            className="mt-7 inline-flex items-center gap-2 rounded-2xl bg-gold px-6 py-3.5 text-base font-bold text-gold-foreground shadow-gold active:scale-[0.99]"
          >
            Khám phá khóa học <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-5xl px-5 py-12">
        <div className="grid gap-4 sm:grid-cols-3">
          {features.map((f) => (
            <div key={f.title} className="rounded-2xl border border-border bg-card p-5 shadow-card">
              <span className="grid h-11 w-11 place-items-center rounded-full bg-accent text-gold">
                <f.icon className="h-6 w-6" />
              </span>
              <h3 className="mt-4 font-display text-lg font-bold">{f.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Courses */}
      <section className="mx-auto max-w-5xl px-5 pb-16">
        <div className="mb-5 flex items-end justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-gold">Khóa học</p>
            <h2 className="mt-1 font-display text-2xl font-bold">Bắt đầu hành trình của bạn</h2>
          </div>
          <Link to="/khoa-hoc" className="shrink-0 text-sm font-semibold text-gold">
            Xem tất cả →
          </Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          {featured.map((c) => (
            <CourseCard key={c.slug} course={c} />
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border bg-navy text-navy-foreground/70">
      <div className="mx-auto max-w-5xl px-5 py-8 text-center text-sm">
        <p className="font-display text-base font-bold text-navy-foreground">
          Lớp Học Cờ <span className="text-gold">Online</span>
        </p>
        <p className="mt-2">Học cờ vua & cờ tướng qua video ngắn.</p>
      </div>
    </footer>
  );
}
