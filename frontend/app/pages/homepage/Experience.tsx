"use client";

import React from "react";
import Container from "../../components/ui/Container";
import Badge from "../../components/ui/BadgeSection";
import { motion } from "framer-motion";
import { ExperienceItem } from "@/data/experience";

interface ExperienceProps {
  experiences?: ExperienceItem[];
}

export default function Experience({ experiences = [] }: ExperienceProps) {

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
    <section id="experience" className="py-24 bg-bg-brand">
      {/* Header Container */}
      <Container>
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-end mb-20">
          <div className="lg:col-span-8">
            <Badge className="mb-6">Experiences</Badge>
            <h2 className="text-section-title font-mori font-medium tracking-tight text-text-primary leading-tight">
              Experience that shapes <br /> the way I engineer solutions.
            </h2>
          </div>
          <div className="lg:col-span-4">
            <p className="text-sm md:text-body text-text-secondary leading-relaxed lg:text-right">
              Each project reflects my approach to problem-solving, adaptability, and building things that actually work.
            </p>
          </div>
        </div>
      </Container>

      {/* Experience List (Full Width wrapper) */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="border-t border-border-brand/35 flex flex-col w-full"
      >
        {experiences.map((exp, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="border-b border-border-brand/35 transition-colors duration-500 hover:bg-card-bg group w-full"
          >
            <Container className="py-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Side: Job Info */}
              <div className="lg:col-span-8 flex flex-col">
                <h3 className="text-card-title font-mori font-medium text-text-primary leading-snug">
                  {exp.title}
                </h3>
                {(exp.company || exp.employmentType) && (
                  <div className="text-[14px] text-text-primary/80 font-medium mt-1">
                    {exp.company}
                    {exp.company && exp.employmentType && " · "}
                    {exp.employmentType}
                  </div>
                )}
                <span className="text-[14px] text-text-secondary font-normal mt-1 mb-3 block">
                  {exp.duration}
                </span>
                <p className="text-[14px] md:text-body text-text-secondary leading-relaxed max-w-full whitespace-pre-line">
                  {exp.description}
                </p>
              </div>

              {/* Right Side: Big Year Range */}
              <div className="lg:col-span-4 flex lg:justify-end items-center h-full">
                <span className="text-[48px] md:text-[64px] font-mori font-bold tracking-tight text-text-primary leading-none lg:text-right select-none">
                  {exp.years}
                </span>
              </div>
            </Container>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
