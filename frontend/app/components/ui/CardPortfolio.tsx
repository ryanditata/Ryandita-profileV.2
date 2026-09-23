"use client";

import React from "react";
import Image from "next/image";

interface CardProps {
  index: string;
  title: string;
  category: string;
  year: string;
  imageSrc?: string;
  href?: string;
}

export default function Card({
  index,
  title,
  category,
  year,
  imageSrc,
  href = "#",
}: CardProps) {
  return (
    <a href={href} className="group block w-full">
      {/* Thumbnail */}
      <div className="relative w-full aspect-[4/3] bg-card-bg rounded-image overflow-hidden mb-6">
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />
        ) : (
          <div className="w-full h-full bg-border-brand/20 flex items-center justify-center text-text-secondary font-mori">
            No Image
          </div>
        )}
      </div>

      {/* Metadata Row */}
      <div className="flex items-start justify-between w-full font-mori">
        <span className="text-sm text-text-secondary select-none">
          [{index}]
        </span>
        <div className="flex flex-col">
          <h4 className="text-body font-semibold text-text-primary leading-none mb-1 group-hover:text-text-secondary transition-colors duration-300">
            {title}
          </h4>
          <span className="text-sm text-text-secondary">{category}</span>
        </div>
        <span className="text-sm text-text-secondary">{year}</span>
      </div>
    </a>
  );
}
