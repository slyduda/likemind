export function formatRelativeTime(date: Date): string {
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  const intervals: [number, Intl.RelativeTimeFormatUnit][] = [
    [60, "seconds"], // less than 60 seconds -> seconds ago
    [60 * 60, "minutes"], // less than 60 minutes -> minutes ago
    [60 * 60 * 24, "hours"], // less than 24 hours -> hours ago
    [60 * 60 * 24 * 7, "days"], // less than 7 days -> days ago
    [60 * 60 * 24 * 30, "weeks"], // less than 30 days -> weeks ago
    [60 * 60 * 24 * 365, "months"], // less than 365 days -> months ago
    [Infinity, "years"], // fallback -> years ago
  ];

  for (const [threshold, unit] of intervals) {
    if (seconds < threshold) {
      const value = Math.round(seconds / (threshold / 60));
      return new Intl.RelativeTimeFormat("en", { numeric: "auto" }).format(
        -value,
        unit,
      );
    }
  }

  return ""; // Fallback in case something goes wrong
}

export function formatDate(date: Date): string {
  const formatter = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const parts = formatter.formatToParts(date);
  const dayPart = parts.find((part) => part.type === "day");
  const suffix = getDaySuffix(dayPart?.value || "");

  return formatter
    .format(date)
    .replace(dayPart?.value || "", `${dayPart?.value}${suffix}`);
}

function getDaySuffix(day: string): string {
  const dayNum = parseInt(day, 10);
  if ([11, 12, 13].includes(dayNum)) return "th"; // Special cases for 11th, 12th, 13th
  const lastDigit = dayNum % 10;
  if (lastDigit === 1) return "st";
  if (lastDigit === 2) return "nd";
  if (lastDigit === 3) return "rd";
  return "th";
}
