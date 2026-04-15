import { format, isToday, isTomorrow, isPast, differenceInHours } from "date-fns";

export function formatTaskDate(date) {
  if (!date) return "";

  const now = new Date();

  if (isPast(date) && !isToday(date)) {
    return "Overdue";
  }

  if (isToday(date)) {
    const hours = differenceInHours(date, now);

    if (hours <= 0) return "Due now";
    if (hours < 24) return `Due in ${hours}h`;

    return "Due today";
  }

  if (isTomorrow(date)) {
    return "Due tomorrow";
  }

  return `Due ${format(date, "MMM d")}`;
}