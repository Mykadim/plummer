"use client";

import { useState } from "react";
import Header from "@/components/Header";
import TrustBar from "@/components/TrustBar";
import Overview from "@/components/Overview";
import ServicesSection from "@/components/ServicesSection";
import ReviewsSection from "@/components/ReviewsSection";
import PhotosSection from "@/components/PhotosSection";
import BookingModal from "@/components/BookingModal";
import StickyFooter from "@/components/StickyFooter";
import ImageCarousel from "@/components/ImageCarousel";
import ScrollReveal from "@/components/ScrollReveal";
import { HERO_SLIDES, BUSINESS } from "@/lib/data";
import type { Service } from "@/lib/data";

type Tab = "overview" | "services" | "reviews" | "photos";

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [bookingOpen, setBookingOpen] = useState(false);
  const [preselectedService, setPreselectedService] = useState<Service | null>(null);

  function openBooking(service?: Service) {
    setPreselectedService(service ?? null);
    setBookingOpen(true);
  }

  function closeBooking() {
    setBookingOpen(false);
    setPreselectedService(null);
  }

  return (
    <>
      <TrustBar />
      <Header
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onBook={() => openBooking()}
      />

      <main className="flex-1 pb-28 sm:pb-10">
        <div className="max-w-6xl mx-auto px-4 pt-6">
          <ScrollReveal variant="fade" duration={900}>
            <ImageCarousel slides={HERO_SLIDES} priority autoPlayMs={5500} />
          </ScrollReveal>

          <ScrollReveal variant="up" delay={150} className="mt-4 flex flex-wrap gap-3 justify-center sm:justify-start">
            <button type="button" onClick={() => openBooking()} className="btn-primary">
              Book Appointment
            </button>
            <a href={BUSINESS.phoneHref} className="px-6 py-3 rounded-full bg-white border-2 border-slate-200 font-bold text-slate-800 hover:border-brand-blue hover:text-brand-blue transition shadow-sm">
              {BUSINESS.phone}
            </a>
          </ScrollReveal>
        </div>

        <div className="max-w-6xl mx-auto w-full px-4 py-8">
          {activeTab === "overview" && <Overview onBook={() => openBooking()} />}
          {activeTab === "services" && (
            <ServicesSection onSelectService={(s) => openBooking(s)} />
          )}
          {activeTab === "reviews" && <ReviewsSection />}
          {activeTab === "photos" && <PhotosSection />}
        </div>
      </main>

      <footer className="hidden sm:block border-t border-slate-200 bg-white py-8 mt-4">
        <ScrollReveal variant="fade" className="max-w-6xl mx-auto px-4 flex flex-wrap items-center justify-between gap-4 text-sm text-slate-500">
          <p>© {new Date().getFullYear()} Crystal Drain & Plumbing</p>
          <p>Secured with SSL · Licensed & Insured · Toronto, ON</p>
        </ScrollReveal>
      </footer>

      <StickyFooter onBook={() => openBooking()} />
      <BookingModal
        open={bookingOpen}
        onClose={closeBooking}
        preselectedService={preselectedService}
      />
    </>
  );
}
