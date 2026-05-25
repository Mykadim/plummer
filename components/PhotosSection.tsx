"use client";

import Image from "next/image";
import { GALLERY, GALLERY_CAROUSEL } from "@/lib/data";
import ImageCarousel from "./ImageCarousel";
import ScrollReveal from "./ScrollReveal";

export default function PhotosSection() {
  return (
    <section className="space-y-8">
      <ScrollReveal variant="up">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Our Work</h2>
          <p className="text-slate-500 mt-2">
            Real projects from our team across Toronto and nearby areas.
          </p>
        </div>
      </ScrollReveal>

      <ScrollReveal variant="fade" delay={100}>
        <ImageCarousel
          slides={GALLERY_CAROUSEL}
          aspectClass="aspect-[16/10] sm:aspect-[21/9]"
          autoPlayMs={4000}
          showCaptions
        />
      </ScrollReveal>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
        {GALLERY.map((photo, i) => (
          <ScrollReveal
            key={photo.src}
            variant={i % 2 === 0 ? "left" : "right"}
            delay={(i % 4) * 80}
          >
            <div
              className={`relative rounded-2xl overflow-hidden bg-slate-200 shadow-md ring-1 ring-black/5 group ${
                i === 0 ? "col-span-2 row-span-2 aspect-[4/3]" : "aspect-square"
              }`}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                quality={95}
                className="object-cover group-hover:scale-110 transition duration-500"
                sizes="(max-width: 640px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <p className="absolute bottom-0 left-0 right-0 p-3 text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0">
                {photo.alt}
              </p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
