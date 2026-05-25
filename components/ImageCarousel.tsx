"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { ChevronIcon } from "./Icons";

export type CarouselSlide = {
  src: string;
  alt: string;
  title?: string;
  subtitle?: string;
};

type Props = {
  slides: CarouselSlide[];
  autoPlayMs?: number;
  aspectClass?: string;
  showDots?: boolean;
  showCaptions?: boolean;
  priority?: boolean;
};

export default function ImageCarousel({
  slides,
  autoPlayMs = 5000,
  aspectClass = "aspect-[21/9] sm:aspect-[2.4/1]",
  showDots = true,
  showCaptions = true,
  priority = false,
}: Props) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const go = useCallback(
    (dir: 1 | -1) => {
      setIndex((i) => (i + dir + slides.length) % slides.length);
    },
    [slides.length]
  );

  useEffect(() => {
    if (paused || slides.length <= 1) return;
    const id = setInterval(() => go(1), autoPlayMs);
    return () => clearInterval(id);
  }, [paused, autoPlayMs, go, slides.length]);

  if (slides.length === 0) return null;

  const slide = slides[index];

  return (
    <div
      className="relative rounded-3xl overflow-hidden shadow-2xl ring-1 ring-black/5 group"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className={`relative w-full ${aspectClass} bg-slate-900`}>
        {slides.map((s, i) => (
          <div
            key={s.src}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              i === index ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <Image
              src={s.src}
              alt={s.alt}
              fill
              priority={priority && i === 0}
              quality={95}
              sizes="100vw"
              className="object-cover"
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-20 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-navy/40 to-transparent z-20 pointer-events-none" />

        {showCaptions && (slide.title || slide.subtitle) && (
          <div className="absolute bottom-0 left-0 right-0 z-30 p-6 sm:p-8 text-white">
            {slide.subtitle && (
              <p className="text-sm sm:text-base font-medium text-blue-200 mb-1 tracking-wide uppercase">
                {slide.subtitle}
              </p>
            )}
            {slide.title && (
              <h2 className="text-2xl sm:text-4xl font-bold leading-tight drop-shadow-lg">
                {slide.title}
              </h2>
            )}
          </div>
        )}

        {slides.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous slide"
              className="absolute left-3 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white/15 backdrop-blur-md text-white flex items-center justify-center hover:bg-white/30 opacity-0 group-hover:opacity-100 transition"
            >
              <ChevronIcon direction="left" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next slide"
              className="absolute right-3 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white/15 backdrop-blur-md text-white flex items-center justify-center hover:bg-white/30 opacity-0 group-hover:opacity-100 transition"
            >
              <ChevronIcon direction="right" />
            </button>
          </>
        )}
      </div>

      {showDots && slides.length > 1 && (
        <div className="absolute bottom-4 right-6 z-30 flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`h-2 rounded-full transition-all ${
                i === index ? "w-8 bg-white" : "w-2 bg-white/40 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
