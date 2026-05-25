"use client";

import { BUSINESS } from "@/lib/data";
import { MessageIcon, PhoneIcon } from "./Icons";

type Props = { onBook: () => void };

export default function StickyFooter({ onBook }: Props) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 glass border-t border-slate-200/80 px-4 py-3 sm:hidden shadow-[0_-8px_30px_rgba(0,0,0,0.12)]">
      <div className="flex gap-3 max-w-lg mx-auto">
        <button
          type="button"
          onClick={onBook}
          className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-full border-2 border-brand-navy font-bold text-brand-navy hover:bg-brand-navy hover:text-white transition"
        >
          <MessageIcon className="w-5 h-5" />
          Get quote
        </button>
        <a
          href={BUSINESS.phoneHref}
          className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-full bg-gradient-to-r from-brand-blue to-blue-600 text-white font-bold shadow-lg shadow-brand-blue/30"
        >
          <PhoneIcon />
          Call
        </a>
      </div>
    </div>
  );
}
