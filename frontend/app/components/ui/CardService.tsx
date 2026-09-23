"use client";

import React from "react";
import { ArrowRight } from "lucide-react";

interface CardServiceProps {
  title: string;
  description: string;
  isActive: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  className?: string;
}

export default function CardService({
  title,
  description,
  isActive,
  onMouseEnter,
  onMouseLeave,
  className = "",
}: CardServiceProps) {
  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`group p-6 sm:p-7 lg:p-8 rounded-[24px] flex flex-col justify-between relative overflow-hidden transition-all duration-500 cursor-pointer border border-dark-brand/5 shadow-xs select-none ${
        isActive
          ? "bg-dark-brand text-white-brand"
          : "bg-[#f5f5f5] text-dark-brand"
      } ${className}`}
    >
      {/* Pattern */}
      <img
        src="/assets/pattern-card.svg"
        alt="Pattern"
        className={`absolute bottom-0 left-0 w-64 h-64 -translate-x-12 translate-y-12 pointer-events-none transition-all duration-500 ${
          isActive
            ? "opacity-100 scale-100 rotate-[15deg]"
            : "opacity-0 scale-90 rotate-0"
        }`}
      />

      {/* Content */}
      <div>
        <h3
          className={`text-4xl sm:text-5xl lg:text-[40px] xl:text-[44px] 2xl:text-[48px] leading-[1.08] font-mori font-medium tracking-tight mb-3 transition-colors duration-500 break-words ${
            isActive ? "text-white-brand" : "text-dark-brand"
          }`}
        >
          {title}
        </h3>
        <p
          className={`text-base md:text-[16px] lg:text-[17px] leading-relaxed font-mori font-normal max-w-[300px] transition-colors duration-500 ${
            isActive ? "text-white-brand/70" : "text-dark-brand/70"
          }`}
        >
          {description}
        </p>
      </div>

      <div className="flex justify-end mt-auto pt-8">
        <div
          className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 ${
            isActive
              ? "bg-white-brand text-dark-brand"
              : "bg-dark-brand text-white-brand"
          }`}
        >
          <ArrowRight
            size={20}
            className="transition-transform duration-500 group-hover:translate-x-1"
          />
        </div>
      </div>
    </div>
  );
}
