"use client";

import React from "react";
import Container from "../../components/ui/Container";
import Badge from "../../components/ui/BadgeSection";
import Card from "../../components/ui/CardPortfolio";
import Button from "../../components/ui/Button";
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

interface PortfolioProps {
  projects?: Project[];
}

export default function Portfolio({ projects = [] }: PortfolioProps) {
  const displayedProjects = projects.slice(0, 4);

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
    <section id="portfolio" className="py-24 bg-bg-brand">
      <Container>
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-end mb-20">
          <div className="lg:col-span-8">
            <Badge className="mb-6">Portfolio</Badge>
            <h2 className="text-section-title font-mori font-medium tracking-tight text-text-primary leading-tight">
              Turning ideas into <br /> real digital experiences.
            </h2>
          </div>
          <div className="lg:col-span-4">
            <p className="text-sm md:text-body text-text-secondary leading-relaxed lg:text-right">
              Explore a curated selection of projects where technical thinking meets clean, high-performance code.
            </p>
          </div>
        </div>

        {/* Project Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16 lg:gap-y-24 mb-20"
        >
          {displayedProjects.map((project, idx) => (
            <motion.div key={project._id || idx} variants={itemVariants}>
              <Card
                index={(idx + 1).toString().padStart(2, "0")}
                title={project.title}
                category={project.category || "Project"}
                year={project.year || ""}
                imageSrc={project.thumbnail ? urlFor(project.thumbnail).url() : undefined}
                href={`/portfolio/${project.slug}`}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* View All Button CTA */}
        <div className="flex justify-center font-mori">
          <Button
            variant="primary"
            as="a"
            href="/portfolio"
            className="rounded-full px-10 py-4 font-bold text-sm"
          >
            View All
          </Button>
        </div>
      </Container>
    </section>
  );
}
