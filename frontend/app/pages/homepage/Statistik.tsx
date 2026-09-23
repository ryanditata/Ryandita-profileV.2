"use client";

import React, { useEffect, useRef } from "react";
import Container from "../../components/ui/Container";
import Badge from "../../components/ui/BadgeSection";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";

function AnimatedCounter({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 40,
    stiffness: 80,
    restDelta: 0.001,
  });
  const isInView = useInView(ref, { once: true, margin: "0px" });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [motionValue, value, isInView]);

  useEffect(() => {
    return springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = Math.floor(latest).toString();
      }
    });
  }, [springValue]);

  return <span ref={ref}>0</span>;
}

export default function Stats({ projectCount = 0 }: { projectCount?: number }) {
  const statsData = [
    {
      value: projectCount,
      prefix: "",
      label: "Projects",
      description:
        "Successfully delivered high-quality fullstack and AI/ML solutions globally.",
    },
    {
      value: 10,
      prefix: "",
      label: "Clients",
      description: "Collaborated with diverse startups and companies on real-world tech products.",
    },
    {
      value: 100,
      prefix: "",
      suffix: "%",
      label: "Iterations",
      description:
        "Obsessed with performance, accuracy, and clean architecture in every build.",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <section id="about" className="py-24 bg-bg-brand">
      <Container>
        <Badge className="mb-12">About Me</Badge>

        {/* Intro Header Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-end mb-20"
        >
          <div className="lg:col-span-8">
            <h2 className="text-section-title font-mori font-medium tracking-tight text-text-primary leading-tight">
              Building intelligent systems isn't just my job it's what drives me.
            </h2>
          </div>
          <div className="lg:col-span-4">
            <p className="text-sm md:text-body text-text-secondary leading-relaxed lg:text-right">
              I believe great software happens when logic meets real-world impact. By combining fullstack development with AI/ML engineering, I build digital products that are scalable, intelligent, and user-centered.
            </p>
          </div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "0px" }}
          className="flex flex-col md:flex-row md:justify-between gap-12 md:gap-16 lg:gap-24"
        >
          {statsData.map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="flex flex-col gap-4"
            >
              <span className="text-hero font-mori font-bold tracking-tight text-text-primary leading-none">
                {stat.prefix}
                <AnimatedCounter value={stat.value} />
                {(stat as any).suffix}
              </span>
              <div className="flex flex-col gap-2">
                <p className="text-sm text-text-secondary leading-relaxed">
                  {stat.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
