"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "className"> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "text";
  className?: string;
  as?: "button" | "a";
  href?: string;
  target?: string;
  rel?: string;
}

export default function Button({
  children,
  variant = "primary",
  className = "",
  as = "button",
  href,
  ...props
}: ButtonProps) {
  const baseStyle =
    "inline-flex items-center justify-center font-medium rounded-button transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-dark-brand cursor-pointer text-body px-8 py-3.5";

  const variantStyles = {
    primary:
      "bg-dark-brand text-white-brand hover:bg-dark-brand/90 hover:shadow-md",
    secondary:
      "bg-card-bg text-text-primary hover:bg-border-brand/35",
    outline:
      "border border-border-brand bg-transparent text-text-primary hover:bg-dark-brand hover:text-white-brand hover:border-dark-brand",
    text: "bg-transparent text-text-primary hover:text-text-primary/85 px-4 py-2",
  };

  const combinedClassName = `${baseStyle} ${variantStyles[variant]} ${className}`;

  if (as === "a" && href) {
    const MotionLink = motion.a as any;
    return (
      <MotionLink
        href={href}
        className={combinedClassName}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
        {...props}
      >
        {children}
      </MotionLink>
    );
  }

  return (
    <motion.button
      className={combinedClassName}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
      {...props}
    >
      {children}
    </motion.button>
  );
}
