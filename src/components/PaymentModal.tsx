import { useEffect } from "react";
import { X, Copy, MessageCircle } from "lucide-react";
import { paymentInfo, buildVietQrUrl } from "@/lib/payment";
import { formatPrice } from "@/lib/courses";

interface PaymentModalProps {
  open: boolean;
  onClose: () => void;
  courseTitle: string;
  price: number;
  transferNote?: string;
}

export function PaymentModal({ open, onClose, courseTitle, price, transferNote }: PaymentModalProps) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [open]);

  if (!open) return null;

  const addInfo = transferNote ?? `KH ${courseTitle}`.slice(0, 50);
  const qrUrl = buildVietQrUrl({ amount: price, addInfo });

  const copy = (text: string) => {
    navigator.clipboard?.writeText(text);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
      <div
        className="absolute inset-0 bg-navy/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden
      />
      <div className="relative z-10 max-h-[92vh] w-full max-w-md overflow-y-auto rounded-t-3xl border border-border bg-card p-5 shadow-card sm:rounded-3xl">
        <div className="mb-4 flex items-start justify-between gap-3">
          <div>
            <h2 className="font-display text-xl font-bold">Thanh toán khóa học</h2>
            <p className="mt-1 text-sm text-muted-foreground">{courseTitle}</p>
          </div>
          <button
            onClick={onClose}
            aria-label="Đóng"
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-secondary text-secondary-foreground"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mb-4 flex items-center justify-between rounded-2xl bg-navy px-4 py-3 text-navy-foreground">
          <span className="text-sm">Số tiền cần chuyển</span>
          <span className="text-xl font-bold text-gold">{formatPrice(price)}</span>
        </div>

        {/* VietQR */}
        <div className="mb-4 flex flex-col items-center">
          <div className="overflow-hidden rounded-2xl border-2 border-dashed border-gold/60 bg-white p-2">
            <img
              src={qrUrl}
              alt="Mã VietQR TPBank"
              className="h-64 w-64 object-contain"
              loading="lazy"
            />
          </div>
          <p className="mt-2 text-xs text-muted-foreground">Quét mã bằng app ngân hàng để chuyển khoản tự động</p>
        </div>

        {/* Bank info */}
        <div className="space-y-2">
          <InfoRow label="Ngân hàng" value={paymentInfo.bankName} />
          <InfoRow label="Số tài khoản" value={paymentInfo.accountNumber} onCopy={() => copy(paymentInfo.accountNumber)} />
          <InfoRow label="Chủ tài khoản" value={paymentInfo.accountHolder} />
          <InfoRow label="Nội dung CK" value={addInfo} onCopy={() => copy(addInfo)} />
        </div>

        {/* Instruction */}
        <div className="mt-4 rounded-2xl bg-accent/60 p-4 text-sm leading-relaxed text-accent-foreground">
          Vui lòng quét mã QR để chuyển khoản. Sau khi chuyển tiền thành công, chụp màn hình và gửi qua Zalo số{" "}
          <span className="font-bold text-gold">{paymentInfo.zaloPhone}</span> để được kích hoạt tài khoản ngay lập tức.
        </div>

        <a
          href={`https://zalo.me/${paymentInfo.zaloPhone}`}
          target="_blank"
          rel="noreferrer"
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-gold py-3.5 text-base font-bold text-gold-foreground shadow-gold active:scale-[0.99]"
        >
          <MessageCircle className="h-5 w-5" />
          Gửi ảnh qua Zalo
        </a>
      </div>
    </div>
  );
}

function InfoRow({ label, value, onCopy }: { label: string; value: string; onCopy?: () => void }) {
  return (
    <div className="flex items-center justify-between gap-2 rounded-xl border border-border bg-secondary/50 px-4 py-3">
      <span className="shrink-0 text-sm text-muted-foreground">{label}</span>
      <div className="flex min-w-0 items-center gap-2">
        <span className="truncate text-sm font-semibold">{value}</span>
        {onCopy && (
          <button onClick={onCopy} aria-label="Sao chép" className="shrink-0 text-gold">
            <Copy className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}
