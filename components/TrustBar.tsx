import { LockIcon, VerifiedIcon } from "./Icons";
import { BUSINESS } from "@/lib/data";

export default function TrustBar() {
  return (
    <div className="bg-gradient-to-r from-brand-navy via-slate-900 to-brand-navy text-white text-xs sm:text-sm border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4 py-2 flex flex-wrap items-center justify-center gap-x-6 gap-y-1">
        <span className="flex items-center gap-1.5">
          <LockIcon className="w-3.5 h-3.5 text-emerald-400" />
          <span className="text-emerald-300 font-semibold">256-bit SSL Secured</span>
        </span>
        {BUSINESS.verified && (
          <span className="flex items-center gap-1.5">
            <VerifiedIcon className="w-3.5 h-3.5 text-sky-400" />
            Verified Business
          </span>
        )}
        {BUSINESS.backgroundCheck && (
          <span className="text-slate-300">Passed background check</span>
        )}
        <span className="text-slate-300">Licensed & Insured</span>
        <span className="text-slate-400 hidden sm:inline">·</span>
        <span className="text-amber-300 font-semibold">★ {BUSINESS.rating} · {BUSINESS.reviewCount} reviews</span>
      </div>
    </div>
  );
}
