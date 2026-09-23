"use client";

import React, { useState, useRef } from "react";
import Container from "@/app/components/ui/Container";
import Badge from "@/app/components/ui/BadgeSection";
import Card from "@/app/components/ui/CardPortfolio";
import Button from "@/app/components/ui/Button";
import { motion } from "framer-motion";
import { urlFor } from "@/lib/sanity";

interface Project {
  _id: string;
  title: string;
  slug: string;
  category?: string;
  year?: string;
  thumbnail?: any;
}

interface PortfolioClientProps {
  projects: Project[];
}

export default function PortfolioClient({ projects }: PortfolioClientProps) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const gridRef = useRef<HTMLDivElement>(null);

  // Dynamic list of categories from projects
  const categories = [
    "All",
    ...Array.from(new Set(projects.map((p) => p.category).filter(Boolean))),
  ];

  // Filter projects by category
  const filteredProjects =
    selectedCategory === "All"
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);

  // Paginate filtered projects
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProjects = filteredProjects.slice(
    startIndex,
    startIndex + itemsPerPage,
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
          <Badge className="mb-6">Portfolio</Badge>
          <h1 className="text-hero font-mori font-medium tracking-tight text-text-primary leading-[0.9] -ml-1">
            Projects.
          </h1>
        </div>
        <div className="lg:col-span-4">
          <p className="text-sm md:text-body text-text-secondary leading-relaxed lg:max-w-[340px] lg:ml-auto">
            I'm Ryandita, a Fullstack Developer & AI/ML Engineer who builds end-to-end applications powered by smart, data-driven solutions.
          </p>
        </div>
      </div>

      {/* Category Filter Buttons */}
      <div className="flex flex-wrap gap-3 mb-12 font-mori">
        {categories.map((category) => {
          const isActive = selectedCategory === category;
          const count =
            category === "All"
              ? projects.length
              : projects.filter((p) => p.category === category).length;
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

      {/* Paginated Project Grid */}
      {filteredProjects.length > 0 ? (
        <motion.div
          key={`${selectedCategory}-${currentPage}`}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16 lg:gap-y-24 mb-20"
        >
          {paginatedProjects.map((project, idx) => {
            const projectIndex = (startIndex + idx + 1)
              .toString()
              .padStart(2, "0");
            return (
              <motion.div
                key={project._id || projectIndex}
                variants={itemVariants}
              >
                <Card
                  index={projectIndex}
                  title={project.title}
                  category={project.category || "Project"}
                  year={project.year || ""}
                  imageSrc={
                    project.thumbnail
                      ? urlFor(project.thumbnail).url()
                      : undefined
                  }
                  href={`/portfolio/${project.slug}`}
                />
              </motion.div>
            );
          })}
        </motion.div>
      ) : (
        <div className="text-center py-24 font-mori">
          <p className="text-text-secondary text-body">
            No projects found in this category.
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
    </Container>
  );
}
