"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import Container from "@/app/components/ui/Container";
import Badge from "@/app/components/ui/BadgeSection";
import Button from "@/app/components/ui/Button";
import { motion, AnimatePresence } from "framer-motion";
import { urlFor } from "@/lib/sanity";
import { ArrowUpRight, X, ExternalLink } from "lucide-react";

export interface Certificate {
  _id: string;
  title: string;
  slug?: string;
  issuer?: string;
  year?: string;
  category?: string;
  image?: any;
  credentialUrl?: string;
  description?: string;
}

interface CertificateClientProps {
  certificates: Certificate[];
}

export default function CertificateClient({ certificates = [] }: CertificateClientProps) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [previewCert, setPreviewCert] = useState<Certificate | null>(null);
  const itemsPerPage = 6;
  const gridRef = useRef<HTMLDivElement>(null);

  // Dynamic categories
  const categories = [
    "All",
    ...Array.from(new Set(certificates.map((c) => c.category).filter(Boolean) as string[])),
  ];

  // Filtered certificates
  const filteredCertificates =
    selectedCategory === "All"
      ? certificates
      : certificates.filter((c) => c.category === selectedCategory);

  const totalPages = Math.ceil(filteredCertificates.length / itemsPerPage);

  // Paginated certificates
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCertificates = filteredCertificates.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    if (gridRef.current) {
      const topOffset =
        gridRef.current.getBoundingClientRect().top + window.scrollY - 120;
      window.scrollTo({ top: topOffset, behavior: "smooth" });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <Container>
      {/* Page Header */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-end mb-20">
        <div className="lg:col-span-8">
          <Badge className="mb-6">Certificates</Badge>
          <h1 className="text-hero font-mori font-medium tracking-tight text-text-primary leading-[0.9] -ml-1">
            Certificates.
          </h1>
        </div>
        <div className="lg:col-span-4">
          <p className="text-sm md:text-body text-text-secondary leading-relaxed lg:max-w-[340px] lg:ml-auto">
            A verified collection of professional certifications and credentials validating engineering skills, cloud architecture, and artificial intelligence solutions.
          </p>
        </div>
      </div>

      {/* Category Filter Buttons */}
      <div className="flex flex-wrap gap-3 mb-12 font-mori">
        {categories.map((category) => {
          const isActive = selectedCategory === category;
          const count =
            category === "All"
              ? certificates.length
              : certificates.filter((c) => c.category === category).length;
          return (
            <Button
              key={category}
              onClick={() => handleCategoryChange(category || "All")}
              variant={isActive ? "primary" : "outline"}
              className="!px-6 !py-2.5 text-[15px] font-mori"
            >
              {category}
              <span className={`ml-2 text-[12px] font-semibold opacity-60`}>
                ({count})
              </span>
            </Button>
          );
        })}
      </div>

      {/* Grid Anchor for Scroll */}
      <div ref={gridRef} />

      {/* Paginated Certificate Grid */}
      {filteredCertificates.length > 0 ? (
        <motion.div
          key={`${selectedCategory}-${currentPage}`}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16 lg:gap-y-24 mb-20"
        >
          {paginatedCertificates.map((cert, idx) => {
            const globalIndex = startIndex + idx + 1;
            const imageUrl = cert.image ? urlFor(cert.image).url() : undefined;

            return (
              <motion.div
                key={cert._id || idx}
                variants={itemVariants}
                className="group block w-full cursor-pointer"
                onClick={() => setPreviewCert(cert)}
              >
                {/* Thumbnail / Image Frame */}
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
                    <div className="w-full h-full bg-border-brand/15 flex items-center justify-center text-text-secondary font-mori text-sm">
                      No Preview Available
                    </div>
                  )}

                  {/* Quick view overlay button */}
                  <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-dark-brand/70 backdrop-blur-md text-white-brand flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ArrowUpRight size={18} />
                  </div>
                </div>

                {/* Metadata Row */}
                <div className="flex items-start justify-between w-full font-mori">
                  <span className="text-sm text-text-secondary select-none font-mono">
                    [{globalIndex.toString().padStart(2, "0")}]
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
              </motion.div>
            );
          })}
        </motion.div>
      ) : (
        <div className="text-center py-24 font-mori">
          <p className="text-text-secondary text-body">
            No certificates found in this category.
          </p>
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 mt-16 font-mori">
          {Array.from({ length: totalPages }).map((_, idx) => {
            const pageNumber = idx + 1;
            const isActive = currentPage === pageNumber;
            return (
              <button
                key={pageNumber}
                onClick={() => handlePageChange(pageNumber)}
                className={`w-12 h-12 flex items-center justify-center rounded-full text-[14px] font-bold transition-all duration-300 cursor-pointer ${
                  isActive
                    ? "bg-card-bg text-text-primary"
                    : "text-text-secondary hover:bg-card-bg/50 hover:text-text-primary"
                }`}
              >
                {pageNumber}
              </button>
            );
          })}
        </div>
      )}

      {/* Lightbox / Certificate Preview Modal */}
      <AnimatePresence>
        {previewCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-dark-brand/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
            onClick={() => setPreviewCert(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative max-w-4xl w-full bg-bg-brand rounded-2xl overflow-hidden shadow-2xl border border-border-brand/30"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="p-5 flex items-center justify-between border-b border-border-brand/20">
                <div>
                  <h3 className="font-mori font-bold text-lg text-text-primary">
                    {previewCert.title}
                  </h3>
                  <p className="text-xs text-text-secondary font-mori mt-0.5">
                    {previewCert.issuer} {previewCert.year ? `• ${previewCert.year}` : ""}
                  </p>
                </div>
                <button
                  onClick={() => setPreviewCert(null)}
                  className="p-2 rounded-full hover:bg-card-bg text-text-secondary hover:text-text-primary transition-colors cursor-pointer"
                  aria-label="Close preview"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Modal Image */}
              <div className="relative w-full aspect-[4/3] bg-card-bg max-h-[70vh]">
                {previewCert.image ? (
                  <Image
                    src={urlFor(previewCert.image).url()}
                    alt={previewCert.title}
                    fill
                    className="object-contain"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-text-secondary font-mori">
                    No image available
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              {previewCert.credentialUrl && (
                <div className="p-4 bg-card-bg/60 border-t border-border-brand/20 flex justify-end">
                  <Button
                    variant="primary"
                    as="a"
                    href={previewCert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full px-5 py-2 text-xs inline-flex items-center gap-2"
                  >
                    <span>Verify Credential</span>
                    <ExternalLink size={14} />
                  </Button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Container>
  );
}
