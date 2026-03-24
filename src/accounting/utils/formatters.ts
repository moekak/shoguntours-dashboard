export function formatJPY(amount: number): string {
  return `¥${amount.toLocaleString('ja-JP')}`;
}

export function formatDate(dateStr: string): string {
  if (!dateStr) return '';
  // Accept ISO or YYYY-MM-DD and return YYYY/MM/DD
  return dateStr.replace(/-/g, '/').slice(0, 10);
}

export function today(): string {
  return new Date().toISOString().slice(0, 10);
}
