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
        {/* Custom Q/VK monogram recreated as a transparent SVG */}
        <svg
          viewBox="0 0 640 540"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="relative w-full h-full drop-shadow-sm transition-transform duration-300 group-hover:scale-105"
          aria-label="QAMVIR logo"
          role="img"
        >
          {/* Circular Q-shaped outer mark with a transparent center */}
          <path
            fill="currentColor"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M270 10C390 10 468 84 468 184L420 270C416 177 352 108 272 108C188 108 132 174 132 260C132 328 169 385 232 416L270 493C130 462 38 368 38 258C38 118 136 10 270 10ZM270 66C169 66 88 145 88 258C88 326 119 383 171 420C126 379 105 326 105 260C105 158 174 88 272 88C342 88 402 130 433 191C425 118 360 66 270 66Z"
          />
          {/* Angular central stroke */}
          <path
            fill="currentColor"
            d="M210 139L263 111L391 416L352 500H300L158 205L210 139ZM207 181L190 207L318 468H337L359 420L248 156L207 181Z"
            fillRule="evenodd"
            clipRule="evenodd"
          />
          {/* Rising diagonal and lower right arm */}
          <path
            fill="currentColor"
            d="M506 20H616L463 325L610 500H500L388 374L424 302L510 405L414 322L506 20Z"
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
