import React from "react";
import Navbar from "@/app/components/layouts/Navbar";
import Footer from "@/app/components/layouts/Footer";
import CertificateClient from "./CertificateClient";
import { client } from "@/lib/sanity";
import { certificatesQuery } from "@/lib/queries/certificates";

export const revalidate = 0;

export default async function CertificatePage() {
  let certificates = [];
  try {
    certificates = await client.fetch(certificatesQuery);
  } catch (error) {
    console.warn("Could not fetch certificates from Sanity (schema might be empty or unmigrated):", error);
  }

  return (
    <>
      <Navbar />
      <main className="flex-grow pt-32 pb-24 bg-bg-brand">
        <CertificateClient certificates={certificates || []} />
      </main>
      <Footer />
    </>
  );
}
