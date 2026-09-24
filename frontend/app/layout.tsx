import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const ppMori = localFont({
  src: [
    {
      path: "../public/fonts/ppmori-regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/ppmori.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-pp-mori",
});

export const metadata: Metadata = {
  title: "Ryandita - Portfolio",
  description:
    "Personal Portfolio of Ryandita, Fullstack Developer & AI/ML Engineer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${ppMori.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
