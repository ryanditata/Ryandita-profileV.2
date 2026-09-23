# AGENT.md

## Project Overview

This project is a personal portfolio website for a:

- Fullstack Developer
- AI/ML Engineer

The website should feel like:

Apple × Framer × Awwwards × Swiss Editorial Portfolio

Main characteristics:

- Minimalist
- Premium
- Modern
- Professional
- Editorial
- Clean
- Responsive

---

# Tech Stack

Framework:

- Next.js (App Router)
- TypeScript
- TailwindCSS
- Framer Motion

Package Manager:

- Bun

Icons:

- Lucide React

Animation:

- Framer Motion
- Smooth Scroll

---

# IMPORTANT NEXT.JS RULE

This project may use a newer Next.js version with breaking changes.

Before generating code:

Read:

node_modules/next/dist/docs/

Always follow:

- latest App Router conventions
- latest metadata conventions
- latest Server Component rules
- latest Client Component rules

Avoid outdated Pages Router patterns unless explicitly requested.

---

# Folder Structure

Use this structure strictly:

src/

app/
├── layout.tsx
├── page.tsx
├── globals.css

pages/
└── homepage/
└── index.tsx

components/

├── layouts/
│ ├── Navbar.tsx
│ └── Footer.tsx
│
├── sections/
│ ├── Hero.tsx
│ ├── Stats.tsx
│ ├── Services.tsx
│ ├── Experience.tsx
│ └── Portfolio.tsx
│
├── ui/
│ ├── Button.tsx
│ ├── Card.tsx
│ ├── Container.tsx
│ ├── Heading.tsx
│ └── Badge.tsx

data/

types/

lib/

public/

---

# Component Rules

layouts/

Contains:

- Navbar
- Footer

Must NOT contain:

Section content

---

sections/

Contains:

Homepage sections:

Hero

Services

Experience

Portfolio

Stats

Each section:

- Single responsibility
- Reusable
- No duplicated logic

---

ui/

Contains reusable components:

Button

Card

Container

Heading

Badge

Divider

Rules:

Reusable only

No page-specific logic

---

# Styling Rules

Use TailwindCSS only.

Avoid inline CSS.

Avoid styled-components.

Prefer utility classes.

---

# Color System

Background:

#F7F7F7

Primary text:

#171717

Secondary text:

#494949

Border:

#CFCFCF

Card:

#F4F4F4

Dark:

#171717

---

# Typography

Primary font:

PP Mori

Fallback:

Helvetica

Hierarchy:

Hero:
80–110px

Heading:
36–52px

Body:
14–16px

---

# Layout Rules

Desktop:

Margin left:
54px

Margin right:
54px

Tablet:

32px

Mobile:

24px

Use:

Container component

for all sections.

Never hardcode spacing repeatedly.

---

# Responsive Rules

Desktop:

1440+

Tablet:

768–1024

Mobile:

320–767

Portfolio:

Desktop:
2 columns

Mobile:
1 column

---

# Animation Rules

Preferred:

Fade up

Stagger animation

Hover scale

Reveal on scroll

Use:

Framer Motion

Avoid:

Heavy animation

---

# Naming Convention

Components:

PascalCase

Example:

Hero.tsx

Variables:

camelCase

Constants:

UPPER_CASE

---

# Code Rules

Always:

Use TypeScript types

Export default component

Keep files small

Avoid duplicate code

Prefer composition over repetition

---

# Accessibility Rules

Always include:

alt image

aria labels

semantic HTML

button accessibility

---

# Performance Rules

Prefer:

Server Components

Use Client Components only when needed:

- animation
- state
- interaction

Optimize images:

next/image

---

# Final UI Feeling

The final portfolio should feel:

Premium

Minimal

Swiss

Editorial

Creative

Professional

Like:

Apple Portfolio

Framer Portfolio

Awwwards Winner Sites

---

When generating code:

Always follow this AGENT.md before implementation.
