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
