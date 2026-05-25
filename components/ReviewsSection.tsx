"use client";

import { useMemo, useState } from "react";
import { BUSINESS, REVIEWS, REVIEW_TAGS } from "@/lib/data";
import { StarIcon } from "./Icons";
import ScrollReveal from "./ScrollReveal";

export default function ReviewsSection() {
  const [activeTag, setActiveTag] = useState("all");
  const [sort, setSort] = useState<"relevant" | "newest" | "highest">("relevant");

  const filtered = useMemo(() => {
    let list = [...REVIEWS];
    if (activeTag !== "all") {
      list = list.filter((r) => r.tags.includes(activeTag));
    }
    if (sort === "newest") list.reverse();
    return list;
  }, [activeTag, sort]);

  const distribution = [0, 0, 0, 2, 98];

  return (
    <section className="space-y-6">
      <ScrollReveal variant="up">
        <div className="card-premium p-6 sm:p-8 bg-gradient-to-br from-white to-amber-50/30">
          <h2 className="text-xl font-bold mb-5">Google review summary</h2>
          <div className="flex gap-8 items-center">
            <div className="flex-1 space-y-2.5">
              {[5, 4, 3, 2, 1].map((stars, i) => (
                <div key={stars} className="flex items-center gap-3 text-sm">
                  <span className="w-4 font-bold text-slate-600">{stars}</span>
                  <div className="flex-1 h-2.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-amber-400 to-amber-500 rounded-full transition-all duration-1000"
                      style={{ width: `${distribution[i]}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center shrink-0">
              <p className="text-5xl font-extrabold text-slate-900">{BUSINESS.rating}</p>
              <div className="flex text-amber-400 justify-center mt-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <StarIcon key={i} className="w-5 h-5" />
                ))}
              </div>
              <p className="text-sm text-slate-500 mt-2 font-medium">{BUSINESS.reviewCount} reviews</p>
            </div>
          </div>
        </div>
      </ScrollReveal>

      <ScrollReveal variant="up" delay={80}>
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
          {REVIEW_TAGS.map((tag) => (
            <button
              key={tag.id}
              type="button"
              onClick={() => setActiveTag(tag.id)}
              className={`shrink-0 px-4 py-2.5 rounded-full text-sm font-semibold border transition ${
                activeTag === tag.id
                  ? "bg-brand-navy text-white border-brand-navy shadow-lg"
                  : "bg-white text-slate-700 border-slate-200 hover:border-brand-blue hover:text-brand-blue"
              }`}
            >
              {tag.label}
              {tag.id !== "all" && (
                <span className={`ml-1 ${activeTag === tag.id ? "text-slate-300" : "text-slate-400"}`}>
                  ({tag.count})
                </span>
              )}
            </button>
          ))}
        </div>
      </ScrollReveal>

      <ScrollReveal variant="fade" delay={120}>
        <div className="flex gap-2 flex-wrap items-center">
          <span className="text-sm text-slate-500 font-medium">Sort by:</span>
          {(["relevant", "newest", "highest"] as const).map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setSort(s)}
              className={`px-4 py-2 rounded-full text-sm font-semibold border transition ${
                sort === s
                  ? "bg-brand-blue text-white border-brand-blue shadow-md"
                  : "bg-white border-slate-200 text-slate-600 hover:border-brand-blue"
              }`}
            >
              {s === "relevant" ? "Most relevant" : s === "newest" ? "Newest" : "Highest rating"}
            </button>
          ))}
        </div>
      </ScrollReveal>

      <div className="space-y-4">
        {filtered.map((review, i) => (
          <ScrollReveal key={review.id} variant="up" delay={i * 50}>
            <article className="card-premium p-5 sm:p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-blue to-blue-700 text-white flex items-center justify-center font-bold text-lg shrink-0 shadow-md">
                  {review.author[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-bold text-slate-900">{review.author}</h3>
                    {review.isLocalGuide && (
                      <span className="text-xs bg-blue-50 text-brand-blue px-2.5 py-0.5 rounded-full font-semibold">
                        Local Guide
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex text-amber-400">
                      {Array.from({ length: review.rating }).map((_, j) => (
                        <StarIcon key={j} className="w-4 h-4" />
                      ))}
                    </div>
                    <span className="text-xs text-slate-400">{review.date}</span>
                  </div>
                  <p className="mt-3 text-slate-700 text-sm sm:text-base leading-relaxed">
                    {review.text}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {review.tags.map((t) => (
                      <span
                        key={t}
                        className="text-xs bg-slate-100 text-slate-600 px-3 py-1 rounded-full font-medium"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
