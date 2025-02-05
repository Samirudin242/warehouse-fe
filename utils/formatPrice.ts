export function formatToRupiah(
  value: number,
  withSymbol: boolean = true
): string {
  if (isNaN(value)) {
    return "-";
  }

  const formatted = value.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  return withSymbol ? `Rp${formatted}` : formatted;
}
