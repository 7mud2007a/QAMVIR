"use client";

import React from "react";
import { useApp } from "@/context/AppContext";

interface BrandLogoProps {
  className?: string;
  showText?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = "w-9 h-9",
  showText = true,
}) => {
  const { language } = useApp();

  return (
    <div className="flex items-center gap-3 select-none group cursor-pointer">
      <div className={`relative flex items-center justify-center ${className}`}>
        {/* Logo traced from the supplied artwork; transparent background */}
        <svg
          viewBox="0 0 606 526"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="relative w-full h-full drop-shadow-sm transition-transform duration-300 group-hover:scale-105 text-neutral-900 dark:text-white"
          role="img"
          aria-label="QAMVIR logo"
        >
          <path
            d="M604 19 L513 20 L332 401 L322 411 L307 405 L180 130 L167 137 L143 165 L129 193 L127 212 L275 526 L356 526 L387 463 L397 457 L412 468 L459 526 L564 525 L437 372 L436 363 Z"
            fill="currentColor"
          />
          <path
            d="M275 2 L219 0 L184 5 L142 18 L93 46 L56 81 L32 115 L14 154 L2 203 L0 248 L8 297 L23 339 L42 372 L81 415 L108 435 L147 455 L193 468 L212 469 L168 374 L136 349 L116 326 L100 295 L91 263 L92 204 L117 144 L149 110 L188 88 L231 78 L279 85 L317 103 L352 136 L377 181 L384 214 L436 107 L415 76 L363 33 L326 15 Z"
            fill="currentColor"
          />
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col">
          <span className="text-xl font-black tracking-tight text-neutral-950 dark:text-white font-sans leading-none">
            {language === "ar" ? "QAMVIR" : "QAMVIR"}
          </span>
          <span className="text-[10px] tracking-widest text-neutral-500 dark:text-neutral-400 font-mono uppercase mt-1">
            {language === "ar" ? "تصميم وتطوير ويب" : "Web Developer"}
          </span>
        </div>
      )}
    </div>
  );
};
