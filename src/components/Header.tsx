import { Link } from "@tanstack/react-router";
import { Crown } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-navy text-gold">
            <Crown className="h-5 w-5" />
          </span>
          <span className="font-display text-lg font-bold leading-none">
            Lớp Học Cờ <span className="text-gold">Online</span>
          </span>
        </Link>
        <nav className="flex items-center gap-1 text-sm font-medium">
          <Link
            to="/"
            className="rounded-full px-3 py-2 text-foreground/80 transition-colors hover:text-foreground"
            activeOptions={{ exact: true }}
            activeProps={{ className: "text-gold" }}
          >
            Trang chủ
          </Link>
          <Link
            to="/khoa-hoc"
            className="rounded-full px-3 py-2 text-foreground/80 transition-colors hover:text-foreground"
            activeProps={{ className: "text-gold" }}
          >
            Khóa học
          </Link>
        </nav>
      </div>
    </header>
  );
}
