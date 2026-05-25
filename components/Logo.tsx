"use client";

import Image from "next/image";

type Props = {
  size?: number;
  showText?: boolean;
  className?: string;
};

export default function Logo({ size = 48, showText = false, className = "" }: Props) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div
        className="relative shrink-0 rounded-2xl overflow-hidden shadow-lg ring-2 ring-white/20 bg-white"
        style={{ width: size, height: size }}
      >
        <Image
          src="/images/logo.png"
          alt="Crystal Drain & Plumbing"
          fill
          className="object-cover"
          sizes={`${size}px`}
          priority
        />
      </div>
      {showText && (
        <div className="min-w-0">
          <p className="font-bold text-white leading-tight truncate">Crystal Drain</p>
          <p className="text-xs text-blue-200 font-medium">& Plumbing</p>
        </div>
      )}
    </div>
  );
}
