"use client";

import { useCallback, useEffect, useState } from "react";
import { SERVICES, formatTimeSlot } from "@/lib/data";
import type { Service } from "@/lib/data";
import { toDateString } from "@/lib/dates";
import { CloseIcon, ChevronIcon, LockIcon } from "./Icons";

type DayStatus = "past" | "unavailable" | "available" | "full";

type Props = {
  open: boolean;
  onClose: () => void;
  preselectedService?: Service | null;
};

const MONTH_NAMES = [
  "JAN", "FEB", "MAR", "APR", "MAY", "JUN",
  "JUL", "AUG", "SEP", "OCT", "NOV", "DEC",
];
const DAY_HEADERS = ["Mn", "Tu", "We", "Th", "Fr", "Sa", "Su"];

export default function BookingModal({ open, onClose, preselectedService }: Props) {
  const today = new Date();
  const [step, setStep] = useState<"service" | "datetime" | "details" | "done">("service");
  const [service, setService] = useState<Service | null>(preselectedService ?? null);
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [monthOffset, setMonthOffset] = useState(0);
  const [days, setDays] = useState<(number | null)[]>([]);
  const [statuses, setStatuses] = useState<(DayStatus | null)[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [slots, setSlots] = useState<string[]>([]);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    address: "",
    notes: "",
  });

  const displayMonth = ((viewMonth + monthOffset) % 12 + 12) % 12;
  const displayYear = viewYear + Math.floor((viewMonth + monthOffset) / 12);

  const reset = useCallback(() => {
    setStep(preselectedService ? "datetime" : "service");
    setService(preselectedService ?? null);
    setSelectedDate(null);
    setSelectedTime(null);
    setSlots([]);
    setError("");
    setForm({ customerName: "", customerEmail: "", customerPhone: "", address: "", notes: "" });
    setMonthOffset(0);
  }, [preselectedService]);

  useEffect(() => {
    if (open) reset();
  }, [open, reset]);

  useEffect(() => {
    if (!open || step !== "datetime") return;
    fetch(`/api/availability?year=${displayYear}&month=${displayMonth}`)
      .then((r) => r.json())
      .then((data) => {
        setDays(data.days);
        setStatuses(data.statuses);
      });
  }, [open, step, displayYear, displayMonth]);

  useEffect(() => {
    if (!selectedDate) {
      setSlots([]);
      return;
    }
    fetch(`/api/availability?date=${selectedDate}`)
      .then((r) => r.json())
      .then((data) => setSlots(data.slots ?? []));
  }, [selectedDate]);

  const monthTabs = Array.from({ length: 5 }, (_, i) => {
    const m = (viewMonth + monthOffset - 2 + i + 12) % 12;
    const y = viewYear + Math.floor((viewMonth + monthOffset - 2 + i) / 12);
    return { label: `${MONTH_NAMES[m]} ${y}`, offset: monthOffset - 2 + i };
  });

  function selectDay(day: number) {
    const dateStr = toDateString(new Date(displayYear, displayMonth, day));
    const idx = days.indexOf(day);
    const status = statuses[idx];
    if (status !== "available") return;
    setSelectedDate(dateStr);
    setSelectedTime(null);
  }

  async function submitBooking(e: React.FormEvent) {
    e.preventDefault();
    if (!service || !selectedDate || !selectedTime) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          serviceId: service.id,
          date: selectedDate,
          time: selectedTime,
          ...form,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Booking failed");
        return;
      }
      setStep("done");
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-lg max-h-[95vh] overflow-y-auto bg-white rounded-t-3xl sm:rounded-2xl shadow-2xl">
        <div className="sticky top-0 z-10 bg-black text-white px-4 py-4 flex items-center gap-3">
          <button type="button" onClick={onClose} aria-label="Close" className="p-1 hover:opacity-80">
            <CloseIcon />
          </button>
          <h2 className="flex-1 text-center font-bold text-lg pr-8">Appointment Time</h2>
        </div>

        <div className="px-2 py-1 flex items-center justify-center gap-1 text-xs text-emerald-700 bg-emerald-50 border-b border-emerald-100">
          <LockIcon className="w-3.5 h-3.5" />
          Secure booking · Your data is encrypted
        </div>

        {step === "service" && (
          <div className="p-4">
            <p className="font-bold text-slate-800 mb-3">Select Service</p>
            <ul className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden">
              {SERVICES.map((s) => (
                <li key={s.id}>
                  <button
                    type="button"
                    onClick={() => {
                      setService(s);
                      setStep("datetime");
                    }}
                    className="w-full px-4 py-3.5 text-left hover:bg-slate-50 font-medium text-slate-800"
                  >
                    {s.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {step === "datetime" && service && (
          <div className="pb-6">
            <p className="px-4 pt-3 text-sm text-slate-600">
              Service: <span className="font-semibold text-slate-900">{service.name}</span>
              <button
                type="button"
                onClick={() => setStep("service")}
                className="ml-2 text-brand-blue text-xs font-medium"
              >
                Change
              </button>
            </p>

            <div className="flex items-center px-2 mt-4">
              <button
                type="button"
                onClick={() => setMonthOffset((o) => o - 1)}
                className="p-2 text-slate-600 hover:bg-slate-100 rounded-full"
                aria-label="Previous month"
              >
                <ChevronIcon direction="left" />
              </button>
              <div className="flex-1 flex overflow-x-auto scrollbar-hide gap-4 justify-center">
                {monthTabs.map((tab) => (
                  <button
                    key={tab.label}
                    type="button"
                    onClick={() => setMonthOffset(tab.offset)}
                    className={`shrink-0 pb-2 text-sm font-bold tracking-wide whitespace-nowrap border-b-4 transition ${
                      tab.offset === monthOffset
                        ? "border-black text-black"
                        : "border-transparent text-slate-400"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
              <button
                type="button"
                onClick={() => setMonthOffset((o) => o + 1)}
                className="p-2 text-slate-600 hover:bg-slate-100 rounded-full"
                aria-label="Next month"
              >
                <ChevronIcon direction="right" />
              </button>
            </div>

            <div className="grid grid-cols-7 gap-2 px-4 mt-2">
              {DAY_HEADERS.map((d) => (
                <div key={d} className="text-center text-xs font-medium text-slate-500 py-1">
                  {d}
                </div>
              ))}
              {days.map((day, i) => {
                if (day === null) {
                  return <div key={`empty-${i}`} />;
                }
                const status = statuses[i] ?? "past";
                const dateStr = toDateString(new Date(displayYear, displayMonth, day));
                const isSelected = selectedDate === dateStr;
                const base =
                  "w-10 h-10 sm:w-11 sm:h-11 mx-auto rounded-full flex items-center justify-center text-sm font-semibold transition";
                let cls = base;
                if (status === "past" || status === "unavailable") {
                  cls += " bg-slate-300 text-white cursor-not-allowed";
                } else if (status === "full") {
                  cls += " bg-black text-white cursor-not-allowed";
                } else if (isSelected) {
                  cls += " bg-black text-white ring-2 ring-offset-2 ring-black";
                } else {
                  cls += " bg-black text-white hover:opacity-80 cursor-pointer";
                }
                return (
                  <button
                    key={`day-${day}-${i}`}
                    type="button"
                    disabled={status !== "available"}
                    onClick={() => selectDay(day)}
                    className={cls}
                  >
                    {status === "full" ? "✕" : String(day).padStart(2, "0")}
                  </button>
                );
              })}
            </div>

            {selectedDate && (
              <div className="px-4 mt-6">
                <h3 className="font-bold text-slate-900 mb-3">Select Time</h3>
                {slots.length === 0 ? (
                  <p className="text-sm text-slate-500">No times available this day.</p>
                ) : (
                  <div className="grid grid-cols-3 gap-2">
                    {slots.map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => {
                          setSelectedTime(slot);
                          setStep("details");
                        }}
                        className={`py-2.5 px-2 rounded-full text-sm font-semibold transition ${
                          selectedTime === slot
                            ? "bg-black text-white"
                            : "bg-black text-white hover:opacity-85"
                        }`}
                      >
                        {formatTimeSlot(slot)}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {step === "details" && service && selectedDate && selectedTime && (
          <form onSubmit={submitBooking} className="p-4 space-y-4">
            <div className="bg-slate-50 rounded-xl p-4 text-sm space-y-1">
              <p><strong>Service:</strong> {service.name}</p>
              <p><strong>Date:</strong> {selectedDate}</p>
              <p><strong>Time:</strong> {formatTimeSlot(selectedTime)}</p>
            </div>
            {error && (
              <p className="text-red-600 text-sm bg-red-50 px-3 py-2 rounded-lg">{error}</p>
            )}
            <input
              required
              placeholder="Full name *"
              value={form.customerName}
              onChange={(e) => setForm({ ...form, customerName: e.target.value })}
              className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-blue focus:border-transparent outline-none"
            />
            <input
              required
              type="email"
              placeholder="Email *"
              value={form.customerEmail}
              onChange={(e) => setForm({ ...form, customerEmail: e.target.value })}
              className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-blue focus:border-transparent outline-none"
            />
            <input
              required
              type="tel"
              placeholder="Phone *"
              value={form.customerPhone}
              onChange={(e) => setForm({ ...form, customerPhone: e.target.value })}
              className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-blue focus:border-transparent outline-none"
            />
            <input
              required
              placeholder="Service address *"
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-blue focus:border-transparent outline-none"
            />
            <textarea
              placeholder="Notes (optional)"
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              rows={3}
              className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-blue focus:border-transparent outline-none resize-none"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-brand-blue text-white font-bold rounded-xl hover:bg-brand-blue-dark disabled:opacity-60 transition"
            >
              {loading ? "Confirming…" : "Confirm Secure Booking"}
            </button>
            <button
              type="button"
              onClick={() => setStep("datetime")}
              className="w-full text-sm text-slate-500"
            >
              ← Back to calendar
            </button>
          </form>
        )}

        {step === "done" && (
          <div className="p-8 text-center">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
              ✓
            </div>
            <h3 className="text-xl font-bold text-slate-900">Booking Confirmed!</h3>
            <p className="text-slate-600 mt-2 text-sm">
              We&apos;ll contact you shortly to confirm your appointment.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-6 px-8 py-3 bg-slate-900 text-white font-semibold rounded-full"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
