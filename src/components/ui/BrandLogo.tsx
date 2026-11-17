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
        {/* Clean, smoothly curved vector version of the supplied monogram */}
        <svg
          viewBox="0 0 620 540"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="relative w-full h-full drop-shadow-sm transition-transform duration-300 group-hover:scale-105 text-neutral-900 dark:text-white"
          role="img"
          aria-label="QAMVIR logo"
          shapeRendering="geometricPrecision"
        >
          {/* Rounded outer Q-shaped ring */}
          <path
            d="M278 18
               C165 18 76 80 35 176
               C-7 275 22 388 101 456
               C143 492 192 513 246 520
               L205 431
               C137 401 95 337 95 260
               C95 158 171 83 274 83
               C344 83 405 122 434 184
               L474 100
               C430 48 360 18 278 18Z"
            fill="currentColor"
          />

          {/* Inner diagonal stroke of the monogram */}
          <path
            d="M202 142
               L251 112
               L390 421
               L354 520
               L296 520
               L151 210
               C148 204 149 197 153 192
               L202 142Z
               M204 181
               L185 202
               L316 478
               L333 478
               L356 420
               L236 151
               L204 181Z"
            fill="currentColor"
            fillRule="evenodd"
            clipRule="evenodd"
          />

          {/* Clean rising right-hand stroke and lower arm */}
          <path
            d="M510 22
               H615
               L454 357
               C450 365 451 374 457 381
               L590 520
               H485
               L371 397
               L411 313
               L444 348
               L510 22Z"
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
