"use client";

import React from "react";
import Container from "../ui/Container";
import Button from "../ui/Button";
import { InstagramIcon, WhatsappIcon, LinkedinIcon, YoutubeIcon, GithubIcon } from "../ui/SocialIcons";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();
  const isHomepage = pathname === "/";

  const navLinks = [
    { name: "Personal", href: isHomepage ? "#personal" : "/#personal" },
    { name: "About Us", href: isHomepage ? "#about" : "/#about" },
    { name: "Services", href: isHomepage ? "#services" : "/#services" },
    { name: "Experience", href: isHomepage ? "#experience" : "/#experience" },
    { name: "Portfolio", href: "/portfolio" },
  ];

  return (
    <footer className="bg-dark-brand text-white-brand pt-24 pb-12 overflow-hidden border-t border-white-brand/5">
      <Container>
        {/* Top Section — Headline & CTA */}
        <div className="flex flex-row items-start justify-between gap-8 mb-16">
          <h2 className="text-[40px] md:text-[64px] font-mori font-medium tracking-tight text-white-brand leading-[1.1]">
            Let's Connect <br /> There
          </h2>
          <div>
            <Button
              variant="secondary"
              as="a"
              className="rounded-full font-mori font-medium text-[14px]"
              href="https://wa.me/62895361206884"
              target="_blank"
              rel="noopener noreferrer"
            >
              Contact Us
            </Button>
          </div>
        </div>

        {/* First Divider */}
        <div className="w-full h-[1px] bg-white-brand/10 mb-12" />

        {/* Middle Section — Grid Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-stretch mb-16">
          {/* Brand & Bio column (Left) */}
          <div className="lg:col-span-7 flex flex-col justify-between min-h-[160px]">
            <div>
              <h3 className="text-[20px] font-mori font-bold text-white-brand mb-3 select-none">
                Ryandita.
              </h3>
              <p className="text-[14px] text-white-brand/60 leading-relaxed max-w-sm font-mori font-normal">
                I'm Ryandita, a Fullstack Developer & AI/ML Engineer who builds end-to-end applications powered by smart, data-driven solutions.
              </p>
            </div>

            {/* Social Icons (Instagram, WhatsApp, LinkedIn) */}
            <div className="flex items-center gap-4 mt-8 lg:mt-0">
              <a
                href="https://www.linkedin.com/in/ryandita/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white-brand/60 hover:text-white-brand transition-colors duration-300"
                aria-label="LinkedIn"
              >
                <LinkedinIcon size={20} />
              </a>
              <a
                href="https://github.com/ryanditata"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white-brand/60 hover:text-white-brand transition-colors duration-300"
                aria-label="Github"
              >
                <GithubIcon size={20} />
              </a>
              <a
                href="https://www.youtube.com/@ryanditata"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white-brand/60 hover:text-white-brand transition-colors duration-300"
                aria-label="Youtube"
              >
                <YoutubeIcon size={20} />
              </a>
              <a
                href="https://www.instagram.com/ryanditata_/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white-brand/60 hover:text-white-brand transition-colors duration-300"
                aria-label="Instagram"
              >
                <InstagramIcon size={20} />
              </a>
              <a
                href="https://wa.me/62895361206884"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white-brand/60 hover:text-white-brand transition-colors duration-300"
                aria-label="WhatsApp"
              >
                <WhatsappIcon size={20} />
              </a>
            </div>
          </div>

          {/* Contact Details & Nav Links (Right) */}
          <div className="lg:col-span-5 flex flex-col items-end justify-between min-h-[160px]">
            {/* Contacts Grid */}
            <div className="grid grid-cols-2 gap-8">
              <div>
                <span className="text-[16px] font-mori font-medium text-white-brand block mb-1">
                  Email Address
                </span>
                <a
                  href="mailto:ryanditata38@gmail.com"
                  className="text-[14px] text-white-brand/60 hover:text-white-brand transition-colors duration-300 font-mori"
                >
                  ryanditata38@gmail.com
                </a>
              </div>
              <div>
                <span className="text-[16px] font-mori font-medium text-white-brand block mb-1">
                  Phone Number
                </span>
                <a
                  href="tel:+62895361206884"
                  className="text-[14px] text-white-brand/60 hover:text-white-brand transition-colors duration-300 font-mori"
                >
                  +62 895 3612 06884
                </a>
              </div>
            </div>

            {/* Menu Links */}
            <nav className="flex flex-wrap items-center gap-x-6 gap-y-2 lg:justify-end text-[14px] text-white-brand/60 font-mori mt-8 lg:mt-0">
              {navLinks.map((link, idx) => (
                <a
                  key={idx}
                  href={link.href}
                  className="hover:text-white-brand transition-colors duration-300"
                >
                  {link.name}
                </a>
              ))}
            </nav>
          </div>
        </div>

        {/* Second Divider */}
        <div className="w-full h-[1px] bg-white-brand/10 mb-8" />

        {/* Copyright Section */}
        <div className="text-center">
          <span className="text-xs text-white-brand/40 font-mori select-none">
            All rights reserved @Ryandita
          </span>
        </div>
      </Container>
    </footer>
  );
}
