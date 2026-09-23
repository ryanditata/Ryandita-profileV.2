import React from "react";
import Navbar from "@/app/components/layouts/Navbar";
import Footer from "@/app/components/layouts/Footer";
import PortfolioClient from "./PortfolioClient";
import { client } from "@/lib/sanity";
import { projectsQuery } from "@/lib/queries/projects";

export const revalidate = 0;

export default async function PortfolioPage() {
  const projects = await client.fetch(projectsQuery);

  return (
    <>
      <Navbar />
      <main className="flex-grow pt-32 pb-24 bg-bg-brand">
        <PortfolioClient projects={projects} />
      </main>
      <Footer />
    </>
  );
}
