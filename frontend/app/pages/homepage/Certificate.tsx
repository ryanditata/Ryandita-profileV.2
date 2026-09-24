"use client";

import React from "react";
import Image from "next/image";
import Container from "../../components/ui/Container";
import Badge from "../../components/ui/BadgeSection";
import Button from "../../components/ui/Button";
import { motion } from "framer-motion";
import { urlFor } from "@/lib/sanity";

export interface Certificate {
  _id: string;
  title: string;
  slug?: string;
  category?: string;
  year?: string;
  issuer?: string;
  image?: any;
  thumbnail?: any;
  credentialUrl?: string;
}

interface CertificateProps {
  certificates?: Certificate[];
}

export default function Certificate({ certificates = [] }: CertificateProps) {
  const displayedCertificates = certificates.slice(0, 4);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <section id="certificate" className="py-24 bg-bg-brand">
      <Container>
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-end mb-20">
          <div className="lg:col-span-8">
            <Badge className="mb-6">Certificates</Badge>
            <h2 className="text-section-title font-mori font-medium tracking-tight text-text-primary leading-tight">
              Validating expertise <br /> through certified knowledge.
            </h2>
          </div>
          <div className="lg:col-span-4">
            <p className="text-sm md:text-body text-text-secondary leading-relaxed lg:text-right">
              Explore recognized certifications and professional licenses verifying domain competency in modern engineering.
            </p>
          </div>
        </div>

        {/* Certificate Grid */}
        {displayedCertificates.length > 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16 lg:gap-y-24 mb-20"
          >
            {displayedCertificates.map((cert, idx) => {
              const imageSource = cert.image || cert.thumbnail;
              const imageUrl = imageSource ? urlFor(imageSource).url() : undefined;

              return (
                <motion.div key={cert._id || idx} variants={itemVariants}>
                  <a
                    href={cert.credentialUrl || "/certificate"}
                    target={cert.credentialUrl ? "_blank" : undefined}
                    rel={cert.credentialUrl ? "noopener noreferrer" : undefined}
                    className="group block w-full"
                  >
                    {/* Thumbnail */}
                    <div className="relative w-full aspect-[4/3] bg-card-bg rounded-image overflow-hidden mb-6 border border-border-brand/25 shadow-xs">
                      {imageUrl ? (
                        <Image
                          src={imageUrl}
                          alt={cert.title}
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
                      <span className="text-sm text-text-secondary select-none font-mono">
                        [{(idx + 1).toString().padStart(2, "0")}]
                      </span>
                      <div className="flex flex-col flex-1 px-4">
                        <h4 className="text-body font-semibold text-text-primary leading-snug mb-1 group-hover:text-text-secondary transition-colors duration-300">
                          {cert.title}
                        </h4>
                        <span className="text-sm text-text-secondary">
                          {cert.issuer || cert.category || "Certified Credential"}
                        </span>
                      </div>
                      <span className="text-sm text-text-secondary">
                        {cert.year || ""}
                      </span>
                    </div>
                  </a>
                </motion.div>
              );
            })}
          </motion.div>
        ) : null}

        {/* View All Button CTA */}
        <div className="flex justify-center font-mori">
          <Button
            variant="primary"
            as="a"
            href="/certificate"
            className="rounded-full px-10 py-4 font-bold text-sm"
          >
            View All Certificates
          </Button>
        </div>
      </Container>
    </section>
  );
}
