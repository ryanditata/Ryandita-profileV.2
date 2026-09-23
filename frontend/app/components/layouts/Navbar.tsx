"use client";

import React, { useState, useEffect } from "react";
import Container from "../ui/Container";
import Button from "../ui/Button";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const pathname = usePathname();
  const isHomepage = pathname === "/";

  const navLinks = [
    { name: "Personal", href: isHomepage ? "#personal" : "/#personal" },
    { name: "About Us", href: isHomepage ? "#about" : "/#about" },
    { name: "Services", href: isHomepage ? "#services" : "/#services" },
    { name: "Experience", href: isHomepage ? "#experience" : "/#experience" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "Certificate", href: "https://drive.google.com/drive/folders/1sjV2fh0T2FdIVkg_R6__dipTwwPkNDUw?usp=sharing", external: true },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 h-20 flex items-center ${
        isScrolled ? "bg-bg-brand/85 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <Container className="flex items-center justify-between">
        {/* Logo */}
        <a
          href="#"
          className="text-card-title font-mori font-bold tracking-tight text-text-primary"
        >
          Ryandita<span className="text-text-secondary">.</span>
        </a>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => {
            const isActive =
              link.href === "/portfolio" ? pathname === "/portfolio" : false;
            return (
              <a
                key={link.name}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                className={`text-body font-medium transition-colors duration-300 relative group ${
                  isActive
                    ? "text-text-primary"
                    : "text-text-secondary hover:text-text-primary"
                }`}
              >
                {link.name}
                <span
                  className={`absolute bottom-[-4px] left-0 h-[1.5px] bg-text-primary transition-all duration-300 ${
                    isActive ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </a>
            );
          })}
        </nav>

        {/* Contact CTA */}
        <div className="hidden md:block">
          <Button
            variant="outline"
            href="https://wa.me/62895361206884"
            target="_blank"
            rel="noopener noreferrer"
            as="a"
            className="px-6 py-2.5"
          >
            Contact Us
          </Button>
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-text-primary hover:text-text-secondary focus:outline-none cursor-pointer"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </Container>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="absolute top-20 left-0 w-full bg-bg-brand border-b border-border-brand/40 shadow-lg md:hidden z-40"
          >
            <div className="px-6 py-8 flex flex-col gap-6">
              {navLinks.map((link) => {
                const isActive =
                  link.href === "/portfolio"
                    ? pathname === "/portfolio"
                    : false;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`text-card-title font-medium transition-colors duration-300 ${
                      isActive
                        ? "text-text-primary font-bold"
                        : "text-text-secondary hover:text-text-primary"
                    }`}
                  >
                    {link.name}
                  </a>
                );
              })}
              <div className="pt-4 border-t border-border-brand/20">
                <Button
                  variant="outline"
                  href="https://wa.me/62895361206884"
                  target="_blank"
                  rel="noopener noreferrer"
                  as="a"
                  className="w-full"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Contact Us
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
