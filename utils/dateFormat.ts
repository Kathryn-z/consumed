/**
 * Format a date or date string to display format: YYYY.MM.DD. (Day)
 * Example: 2025.11.14. (Fri)
 */
export function formatDateConsumed(date: Date | string): string {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const day = String(dateObj.getDate()).padStart(2, "0");
  const weekday = dateObj.toLocaleDateString("en-US", { weekday: "short" });
  return `${year}.${month}.${day}. (${weekday})`;
}
