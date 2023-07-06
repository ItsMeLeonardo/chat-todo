import { DateTime } from "luxon";

export function timeAgo(paramDate: Date | string | number): string {
  const date = new Date(paramDate);

  const relative = DateTime.fromISO(date.toISOString())
    .setLocale("es")
    .toRelative();

  if (relative) return relative;

  return DateTime.fromISO(date.toString())
    .setLocale("es")
    .toFormat("dd/MM/yyyy");
}

export function getDuration(startDate: Date, endDate: Date): string {
  const start = DateTime.fromISO(startDate.toISOString());
  const end = DateTime.fromISO(endDate.toISOString());

  const diff = end.diff(start, ["years", "months", "days"]).toObject();

  const years = Math.floor(diff.years || 0);

  const months = Math.floor(diff.months || 0);

  const days = Math.floor(diff.days || 0);

  const yearsText = years > 0 ? `${years} años` : "";
  const monthsText = months > 0 ? `${months} meses` : "";
  const daysText = days > 0 ? `${days} días` : "";

  return `${yearsText} ${monthsText} ${daysText}`;
}
