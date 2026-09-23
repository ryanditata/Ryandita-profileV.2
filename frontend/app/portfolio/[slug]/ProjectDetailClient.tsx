"use client";

import React from "react";
import Container from "@/app/components/ui/Container";
import Badge from "@/app/components/ui/BadgeSection";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { urlFor } from "@/lib/sanity";

interface Project {
  _id: string;
  title: string;
  slug: string;
  category?: string;
  year?: string;
  description?: string;
  thumbnail?: any;
  techStack?: string[];
  github?: string;
  demo?: string;
  gallery?: any[];
}

interface ProjectDetailClientProps {
  project: Project;
}

export default function ProjectDetailClient({ project }: ProjectDetailClientProps) {
  // Animation variants
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
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  const frame1Url = project.gallery && project.gallery[0]?.asset ? urlFor(project.gallery[0]).url() : null;
  const frame2Url = project.gallery && project.gallery[1]?.asset ? urlFor(project.gallery[1]).url() : null;
  const showcaseUrl = project.gallery && project.gallery[2]?.asset
    ? urlFor(project.gallery[2]).url()
    : (project.thumbnail ? urlFor(project.thumbnail).url() : null);

  return (
    <div className="w-full">
      <Container>
        {/* Subheading & Title */}
        <div className="mb-12">
          <Badge className="mb-6">Portfolio</Badge>
          <h1 className="text-hero font-mori font-medium tracking-tight text-text-primary leading-[0.9] -ml-1">
            {project.title}
          </h1>
        </div>

        {/* Project Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start mb-24 font-mori">
          {/* Tech Stack column */}
          <div className="lg:col-span-7">
            <h2 className="text-body font-semibold text-text-primary mb-4 select-none">
              Tech Stack
            </h2>
            <div className="flex flex-wrap gap-2.5">
              {project.techStack && project.techStack.length > 0 ? (
                project.techStack.map((tech, i) => (
                  <span
                    key={i}
                    className="px-4 py-2 border border-border-brand/40 bg-card-bg/40 text-text-secondary rounded-full text-[13px] font-medium tracking-tight select-none"
                  >
                    {tech}
                  </span>
                ))
              ) : (
                <span className="text-sm text-text-secondary italic">
                  Not specified
                </span>
              )}
            </div>
          </div>

          {/* Description & Links column */}
          <div className="lg:col-span-5">
            <p className="text-sm md:text-body text-text-secondary leading-relaxed mb-8">
              {project.description ||
                "A custom digital experience crafted using precise design principles and robust engineering to deliver a responsive, performant interface."}
            </p>

            {/* Links List */}
            <div className="flex flex-col border-t border-border-brand/40">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex justify-between items-center py-4 border-b border-border-brand/40 text-body text-text-primary hover:text-text-secondary transition-colors duration-300 group"
                >
                  <span>Github Repository</span>
                  <ArrowUpRight
                    size={18}
                    className="text-text-secondary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300"
                  />
                </a>
              )}
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex justify-between items-center py-4 border-b border-border-brand/40 text-body text-text-primary hover:text-text-secondary transition-colors duration-300 group"
                >
                  <span>Live Website</span>
                  <ArrowUpRight
                    size={18}
                    className="text-text-secondary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300"
                  />
                </a>
              )}
            </div>
          </div>
        </div>
      </Container>

      {/* Premium Gallery / Mockup Section - Full Width, No Gap, Touching */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="flex flex-col w-full"
      >
        {/* Row 1: Dual column screen previews */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-2 gap-0 w-full"
        >
          <div className="relative w-full aspect-[4/3] bg-card-bg overflow-hidden flex flex-col justify-end p-8 border-t border-b border-border-brand/20 md:border-r group">
            <div className="absolute inset-0 bg-border-brand/5 flex items-center justify-center font-mori overflow-hidden">
              {frame1Url ? (
                <Image
                  src={frame1Url}
                  alt={`${project.title} - Concept Frame 1`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover group-hover:scale-102 transition-transform duration-700"
                />
              ) : (
                <span className="text-text-secondary/70 text-sm font-semibold select-none group-hover:scale-102 transition-transform duration-700">
                  Concept Frame 1
                </span>
              )}
            </div>
          </div>
          <div className="relative w-full aspect-[4/3] bg-card-bg overflow-hidden flex flex-col justify-end p-8 border-b border-border-brand/20 md:border-t group">
            <div className="absolute inset-0 bg-border-brand/5 flex items-center justify-center font-mori overflow-hidden">
              {frame2Url ? (
                <Image
                  src={frame2Url}
                  alt={`${project.title} - Concept Frame 2`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover group-hover:scale-102 transition-transform duration-700"
                />
              ) : (
                <span className="text-text-secondary/70 text-sm font-semibold select-none group-hover:scale-102 transition-transform duration-700">
                  Concept Frame 2
                </span>
              )}
            </div>
          </div>
        </motion.div>

        {/* Row 2: Premium Single Full Width Image (like Row 1 but 1 column) */}
        <motion.div variants={itemVariants} className="w-full">
          <div className="relative w-full aspect-[16/9] bg-card-bg overflow-hidden flex flex-col justify-end group">
            <div className="absolute inset-0 bg-border-brand/5 flex items-center justify-center font-mori overflow-hidden">
              {showcaseUrl ? (
                <Image
                  src={showcaseUrl}
                  alt={`${project.title} - Showcase`}
                  fill
                  sizes="100vw"
                  className="object-cover group-hover:scale-102 transition-transform duration-700"
                  priority
                />
              ) : (
                <span className="text-text-secondary/60 text-sm font-semibold select-none">
                  Preview Canvas Showcase
                </span>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
