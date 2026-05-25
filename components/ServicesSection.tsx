"use client";

import Image from "next/image";
import { SERVICES } from "@/lib/data";
import type { Service } from "@/lib/data";
import ScrollReveal from "./ScrollReveal";

type Props = {
  onSelectService: (service: Service) => void;
};

export default function ServicesSection({ onSelectService }: Props) {
  return (
    <section>
      <ScrollReveal variant="up">
        <div className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Our Services</h2>
          <p className="text-slate-500 mt-2 max-w-xl">
            Select a service to book your appointment. All bookings are secured with SSL encryption.
          </p>
        </div>
      </ScrollReveal>

      <div className="grid sm:grid-cols-2 gap-5 reveal-stagger">
        {SERVICES.map((service, i) => (
          <ScrollReveal key={service.id} variant="up" delay={i * 60}>
            <button
              type="button"
              onClick={() => onSelectService(service)}
              className="group w-full text-left card-premium overflow-hidden hover:-translate-y-1"
            >
              <div className="relative h-44 sm:h-52 w-full bg-slate-900 overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.name}
                  fill
                  quality={95}
                  className="object-cover group-hover:scale-110 transition duration-500"
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <span className="absolute top-3 left-3 text-xs font-bold uppercase tracking-wider bg-white/90 text-brand-navy px-3 py-1 rounded-full">
                  {service.category}
                </span>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-lg text-slate-900 group-hover:text-brand-blue transition">
                  {service.name}
                </h3>
                <p className="text-sm text-slate-500 mt-1.5 line-clamp-2 leading-relaxed">
                  {service.description}
                </p>
                <span className="inline-flex items-center gap-1 mt-4 text-sm font-bold text-brand-blue group-hover:gap-2 transition-all">
                  Book this service →
                </span>
              </div>
            </button>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
