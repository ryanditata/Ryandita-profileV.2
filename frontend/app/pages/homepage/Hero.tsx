"use client";

import React from "react";
import Image from "next/image";
import Container from "../../components/ui/Container";
import { motion } from "framer-motion";

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 1.05, clipPath: "inset(100% 0% 0% 0%)" },
    visible: {
      opacity: 1,
      scale: 1,
      clipPath: "inset(0% 0% 0% 0%)",
      transition: {
        duration: 1.2,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  return (
    <section
      id="personal"
      className="min-h-screen flex items-center pt-24 pb-16 overflow-hidden"
    >
      <Container>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-end"
        >
          {/* Left Column — Headings */}
          <div className="lg:col-span-8">
            {/* Main Headline */}
            <motion.h1
              variants={textVariants}
              className="text-hero font-mori font-medium tracking-tight text-text-primary leading-[0.9] flex flex-col"
            >
              <span>
                FULLSTACK <br className="block md:hidden" /> DEVELOPER
              </span>
              <span>
                AI/ML <br /> ENGINEER
              </span>
            </motion.h1>
          </div>

          {/* Right Column — Image & Bio */}
          <div className="lg:col-span-4 flex flex-col gap-8">
            {/* Profile Image with reveal effect */}
            <motion.div
              variants={imageVariants}
              className="relative w-full aspect-square bg-card-bg rounded-image overflow-hidden shadow-sm"
            >
              <Image
                src="/images/ryandita-hero.png"
                alt="Ryandita - Fullstack Developer & AI/ML Engineer"
                fill
                priority
                quality={90}
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover hover:scale-105 transition-transform duration-700 rounded-lg"
              />
            </motion.div>

            {/* Bio text */}
            <motion.p
              variants={textVariants}
              className="text-card-title font-mori font-normal text-text-primary leading-snug tracking-tight"
            >
              I'm <span className="font-bold">Ryandita</span>, a Fullstack Developer &
              AI/ML Engineer who builds end-to-end applications powered by smart, data-driven solutions.
            </motion.p>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
