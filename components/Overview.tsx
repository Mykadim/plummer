"use client";

import { BUSINESS, HOURS, HIGHLIGHTS } from "@/lib/data";
import { StarIcon } from "./Icons";
import ScrollReveal from "./ScrollReveal";

type Props = { onBook: () => void };

export default function Overview({ onBook }: Props) {
  const today = new Date().toLocaleDateString("en-US", { weekday: "long" });
  const todayHours = HOURS.find((h) => h.day === today) ?? HOURS[0];

  return (
    <section className="space-y-6">
      <ScrollReveal variant="up">
        <div className="card-premium overflow-hidden">
          <div className="px-5 py-4 flex items-center gap-3 bg-gradient-to-r from-emerald-50 to-white border-b border-slate-100">
            <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-sm font-medium text-slate-700">Passed background check</span>
            <span className="ml-auto text-brand-blue text-sm font-bold">Details →</span>
          </div>

          <div className="px-5 py-5">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-blue to-blue-600 flex items-center justify-center text-2xl shadow-lg">
                🕐
              </div>
              <div>
                <p className="font-bold text-lg text-emerald-700">Open · Closes 8 p.m.</p>
                <p className="text-sm text-slate-500">
                  Today ({today}): {todayHours.open} – {todayHours.close}
                </p>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden border border-slate-100 shadow-inner">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gradient-to-r from-slate-800 to-brand-navy text-white">
                    <th className="px-4 py-3 font-bold">Day</th>
                    <th className="px-4 py-3 font-bold">Hours</th>
                    <th className="px-4 py-3 font-bold text-right">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {HOURS.map((row, i) => (
                    <tr
                      key={row.day}
                      className={`border-t border-slate-100 ${i % 2 === 0 ? "bg-white" : "bg-slate-50/80"}`}
                    >
                      <td className="px-4 py-3 font-semibold text-slate-800">{row.day}</td>
                      <td className="px-4 py-3 text-slate-600">
                        {row.open} – {row.close}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <span className="inline-flex items-center gap-1 text-emerald-600 font-bold text-xs bg-emerald-50 px-2.5 py-1 rounded-full">
                          Open
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <a
            href={BUSINESS.phoneHref}
            className="px-5 py-4 flex items-center gap-4 hover:bg-blue-50/50 transition block border-t border-slate-100"
          >
            <div className="w-10 h-10 rounded-full bg-brand-blue/10 flex items-center justify-center text-xl">📞</div>
            <span className="font-bold text-brand-blue text-lg">{BUSINESS.phone}</span>
          </a>

          <button
            type="button"
            onClick={onBook}
            className="w-full px-5 py-4 flex items-center gap-4 hover:bg-slate-50 transition text-left border-t border-slate-100"
          >
            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-xl">💬</div>
            <div>
              <p className="font-bold text-slate-900">Get quote</p>
              <p className="text-sm text-slate-500">Typically replies in a few hours</p>
            </div>
          </button>

          <div className="px-5 py-5 flex items-center gap-4 bg-gradient-to-r from-amber-50 to-orange-50 border-t border-amber-100">
            <div className="flex text-amber-400">
              {Array.from({ length: 5 }).map((_, i) => (
                <StarIcon key={i} className="w-6 h-6" />
              ))}
            </div>
            <span className="font-extrabold text-2xl text-slate-900">{BUSINESS.rating}</span>
            <span className="text-slate-600 font-medium">{BUSINESS.reviewCount} Reviews</span>
          </div>
        </div>
      </ScrollReveal>

      <ScrollReveal variant="up" delay={100}>
        <div className="card-premium p-6">
          <h3 className="font-bold text-slate-900 text-lg mb-4 flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-brand-blue/10 flex items-center justify-center">🏪</span>
            Highlights from the business
          </h3>
          <ul className="grid sm:grid-cols-2 gap-3">
            {HIGHLIGHTS.map((item) => (
              <li
                key={item}
                className="flex items-center gap-3 text-slate-700 text-sm bg-slate-50 rounded-xl px-4 py-3 border border-slate-100"
              >
                <span className="w-2 h-2 rounded-full bg-brand-blue shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </ScrollReveal>

      <ScrollReveal variant="scale" delay={200}>
        <button
          type="button"
          onClick={onBook}
          className="w-full py-5 rounded-2xl bg-gradient-to-r from-brand-navy via-slate-900 to-brand-navy text-white font-bold text-lg hover:shadow-2xl hover:scale-[1.01] active:scale-[0.99] transition-all shadow-xl"
        >
          Book an Appointment →
        </button>
      </ScrollReveal>
    </section>
  );
}
