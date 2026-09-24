"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { urlFor } from "@/lib/sanity";

export interface Certificate {
  _id?: string;
  title?: string;
  image?: any;
  thumbnail?: any;
  issuer?: string;
  year?: string;
  link?: string;
}

export interface ThreeDCertificateProps {
  certificates?: Certificate[];
  className?: string;
  reverse?: boolean;
  pauseOnHover?: boolean;
  speed?: string;
  repeat?: number;
}

export function CertificateCard({ certificate }: { certificate: Certificate }) {
  const imageSource = certificate.image || certificate.thumbnail;
  const imageUrl = imageSource ? urlFor(imageSource).url() : undefined;

  const content = (
    <div className="relative w-[300px] sm:w-[360px] md:w-[420px] aspect-[4/3] rounded-2xl overflow-hidden bg-card-bg border border-border-brand/35 shadow-sm hover:shadow-xl transition-all duration-500 hover:scale-[1.02] group select-none">
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt={certificate.title || "Certificate"}
          fill
          sizes="(max-width: 768px) 300px, 420px"
          className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center bg-card-bg text-text-secondary font-mori p-6 text-center">
          <span className="text-sm font-medium text-text-primary mb-1">
            {certificate.title || "Certificate"}
          </span>
          <span className="text-xs text-text-secondary">No Preview Image</span>
        </div>
      )}

      {/* Subtle overlay on hover */}
      {certificate.title && (
        <div className="absolute inset-0 bg-gradient-to-t from-dark-brand/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
          <div className="text-white-brand">
            <h4 className="font-mori font-bold text-sm tracking-tight leading-snug line-clamp-1">
              {certificate.title}
            </h4>
            {certificate.issuer && (
              <p className="text-xs text-white-brand/70 font-mori mt-0.5">
                {certificate.issuer} {certificate.year ? `• ${certificate.year}` : ""}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );

  if (certificate.link) {
    return (
      <a
        href={certificate.link}
        target="_blank"
        rel="noopener noreferrer"
        className="block cursor-pointer"
      >
        {content}
      </a>
    );
  }

  return content;
}

export default function ThreeDCertificate({
  certificates = [],
  className,
  reverse = false,
  pauseOnHover = true,
  speed = "35s",
  repeat = 4,
}: ThreeDCertificateProps) {
  const marqueeRef = useRef<HTMLDivElement>(null);

  if (!certificates || certificates.length === 0) {
    return null;
  }

  return (
    <div
      ref={marqueeRef}
      className={cn(
        "group flex overflow-hidden p-3 [--gap:1.5rem] [gap:var(--gap)] select-none",
        className
      )}
      style={
        {
          "--duration": speed,
          "--gap": "1.5rem",
        } as React.CSSProperties
      }
    >
      {Array.from({ length: repeat }).map((_, repeatIndex) => (
        <div
          key={repeatIndex}
          className={cn(
            "flex shrink-0 justify-around items-center [gap:var(--gap)] animate-marquee",
            pauseOnHover && "group-hover:[animation-play-state:paused]",
            reverse && "[animation-direction:reverse]"
          )}
        >
          {certificates.map((cert, itemIndex) => (
            <CertificateCard
              key={`${repeatIndex}-${cert._id || itemIndex}`}
              certificate={cert}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

// Named alias exports for flexibility
export { ThreeDCertificate as Certificate3D, ThreeDCertificate as Marquee };
