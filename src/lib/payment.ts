// =========================================================================
// THÔNG TIN THANH TOÁN
// =========================================================================
export const paymentInfo = {
  bankName: "Ngân Hàng Tiên Phong (TPBank)",
  bankCode: "TPB", // Mã ngân hàng theo chuẩn VietQR
  accountNumber: "02386867901",
  accountHolder: "TRAN HO NGOC TOAN",
  zaloPhone: "0934813944",
};

/**
 * Sinh URL mã VietQR động theo chuẩn TPBank.
 * https://www.vietqr.io/danh-sach-api/link-qr/
 */
export function buildVietQrUrl(params: {
  amount: number;
  addInfo: string;
}): string {
  const base = `https://img.vietqr.io/image/${paymentInfo.bankCode}-${paymentInfo.accountNumber}-compact2.png`;
  const query = new URLSearchParams({
    amount: String(params.amount),
    addInfo: params.addInfo,
    accountName: paymentInfo.accountHolder,
  });
  return `${base}?${query.toString()}`;
}
