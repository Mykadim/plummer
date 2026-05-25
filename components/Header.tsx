"use client";

import { BUSINESS } from "@/lib/data";
import { VerifiedIcon } from "./Icons";
import Logo from "./Logo";

type Tab = "overview" | "services" | "reviews" | "photos";

type Props = {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
  onBook: () => void;
};

const TABS: { id: Tab; label: string }[] = [
  { id: "overview", label: "Overview" },
  { id: "services", label: "Services" },
  { id: "reviews", label: "Reviews" },
  { id: "photos", label: "Photos" },
];

export default function Header({ activeTab, onTabChange, onBook }: Props) {
  return (
    <header className="sticky top-0 z-40 glass-dark text-white shadow-xl">
      <div className="max-w-6xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <Logo size={52} />
            <div className="min-w-0">
              <h1 className="text-base sm:text-lg font-bold flex items-center gap-1.5 truncate">
                {BUSINESS.name}
                <VerifiedIcon className="w-5 h-5 text-sky-400 shrink-0" />
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 truncate">{BUSINESS.tagline}</p>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-2 shrink-0">
            <button type="button" onClick={onBook} className="btn-outline text-sm py-2 px-4">
              Get quote
            </button>
            <a href={BUSINESS.phoneHref} className="btn-primary text-sm py-2 px-5">
              Call
            </a>
          </div>
        </div>

        <nav className="mt-3 flex gap-1 overflow-x-auto scrollbar-hide -mb-px">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => onTabChange(tab.id)}
              className={`px-4 py-2 text-xs sm:text-sm font-bold uppercase tracking-wider whitespace-nowrap border-b-2 transition ${
                activeTab === tab.id
                  ? "border-sky-400 text-white"
                  : "border-transparent text-slate-400 hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}
