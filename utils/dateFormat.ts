/**
 * Format a date string to display format: Mon DD, YYYY
 * Example: Nov 14, 2025
 */
export function formatDateToString(dateString: string): String {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

/**
 * Format a date or date string to display format: YYYY.MM.DD. (Day)
 * Example: 2025.11.14. (Fri)
 */
export function formatDateAndDayToString(date: Date | string): string {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const day = String(dateObj.getDate()).padStart(2, "0");
  const weekday = dateObj.toLocaleDateString("en-US", { weekday: "short" });
  return `${year}.${month}.${day}. (${weekday})`;
}

/**
 * Format a date string to dateInfo
 */
export function formatDate(dateString: string): {
  year: number;
  monthDay: string;
  weekday: string;
} {
  const date = new Date(dateString);
  return {
    year: date.getFullYear(),
    monthDay: `${String(date.getMonth() + 1).padStart(2, "0")}.${String(date.getDate()).padStart(2, "0")}`,
    weekday: date.toLocaleDateString("en-US", { weekday: "short" }),
  };
}
