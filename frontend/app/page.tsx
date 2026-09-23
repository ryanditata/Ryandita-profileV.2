import Navbar from "./components/layouts/Navbar";
import Hero from "./pages/homepage/Hero";
import Stats from "./pages/homepage/Statistik";
import Services from "./pages/homepage/Services";
import Experience from "./pages/homepage/Experience";
import Portfolio from "./pages/homepage/Portfolio";
import Footer from "./components/layouts/Footer";
import { client } from "@/lib/sanity";
import { experiencesQuery } from "@/lib/queries/experience";
import { projectsQuery } from "@/lib/queries/projects";

export const revalidate = 0;

export default async function Home() {
  const [experiences, projects] = await Promise.all([
    client.fetch(experiencesQuery),
    client.fetch(projectsQuery),
  ]);

  return (
    <>
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <Stats projectCount={projects.length} />
        <Services />
        <Experience experiences={experiences} />
        <Portfolio projects={projects} />
      </main>
      <Footer />
    </>
  );
}

