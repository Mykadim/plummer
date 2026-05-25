import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";

export type Booking = {
  id: string;
  serviceId: string;
  serviceName: string;
  date: string;
  time: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  address: string;
  notes?: string;
  createdAt: string;
};

type DbData = {
  bookings: Booking[];
  blockedSlots: { date: string; time: string }[];
  fullyBookedDates: string[];
};

const DB_PATH = path.join(process.cwd(), "data", "db.json");

const DEFAULT_DATA: DbData = {
  bookings: [],
  blockedSlots: [],
  fullyBookedDates: [],
};

function ensureDb(): DbData {
  const dir = path.dirname(DB_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(DB_PATH)) {
    fs.writeFileSync(DB_PATH, JSON.stringify(DEFAULT_DATA, null, 2));
    return { ...DEFAULT_DATA };
  }
  const raw = fs.readFileSync(DB_PATH, "utf-8");
  return JSON.parse(raw) as DbData;
}

function saveDb(data: DbData): void {
  const dir = path.dirname(DB_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}

export function getBookings(): Booking[] {
  return ensureDb().bookings;
}

export function getBookedSlotsForDate(date: string): string[] {
  const db = ensureDb();
  const fromBookings = db.bookings
    .filter((b) => b.date === date)
    .map((b) => b.time);
  const blocked = db.blockedSlots
    .filter((s) => s.date === date)
    .map((s) => s.time);
  return [...new Set([...fromBookings, ...blocked])];
}

export function isDateFullyBooked(date: string): boolean {
  const db = ensureDb();
  return db.fullyBookedDates.includes(date);
}

export function createBooking(
  input: Omit<Booking, "id" | "createdAt">
): Booking {
  const db = ensureDb();
  const booking: Booking = {
    ...input,
    id: uuidv4(),
    createdAt: new Date().toISOString(),
  };
  db.bookings.push(booking);
  saveDb(db);
  return booking;
}
