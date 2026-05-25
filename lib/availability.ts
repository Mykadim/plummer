import { TIME_SLOTS } from "./data";
import { getBookedSlotsForDate, isDateFullyBooked } from "./db";
import { toDateString, parseDateString, getMonthDays } from "./dates";

export { toDateString, parseDateString, getMonthDays };

export function isPastDate(dateStr: string): boolean {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const d = parseDateString(dateStr);
  d.setHours(0, 0, 0, 0);
  return d < today;
}

export function getAvailableSlots(dateStr: string): string[] {
  if (isPastDate(dateStr) || isDateFullyBooked(dateStr)) {
    return [];
  }
  const booked = getBookedSlotsForDate(dateStr);
  const now = new Date();
  const isToday = toDateString(now) === dateStr;

  return TIME_SLOTS.filter((slot) => {
    if (booked.includes(slot)) return false;
    if (!isToday) return true;
    const [h, m] = slot.split(":").map(Number);
    const slotDate = parseDateString(dateStr);
    slotDate.setHours(h, m, 0, 0);
    return slotDate > now;
  });
}

export type DayStatus = "past" | "unavailable" | "available" | "full";

export function getDayStatus(year: number, month: number, day: number): DayStatus {
  const dateStr = toDateString(new Date(year, month, day));
  if (isPastDate(dateStr)) return "past";
  if (isDateFullyBooked(dateStr)) return "full";
  const slots = getAvailableSlots(dateStr);
  if (slots.length === 0) return "unavailable";
  return "available";
}
