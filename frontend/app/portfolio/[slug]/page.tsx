import React from "react";
import Navbar from "@/app/components/layouts/Navbar";
import Footer from "@/app/components/layouts/Footer";
import ProjectDetailClient from "./ProjectDetailClient";
import { client } from "@/lib/sanity";
import { projectBySlugQuery } from "@/lib/queries/projects";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export const revalidate = 0;

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;

  // Fetch project from Sanity by slug
  const project = await client.fetch(projectBySlugQuery, { slug });

  if (!project) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <main className="flex-grow pt-32 bg-bg-brand">
        <ProjectDetailClient project={project} />
      </main>
      <Footer />
    </>
  );
}
