"use client";

import { useState, useEffect } from "react";

import Header from "@/app/components/header";
import Entry from "@/app/components/entry";
import Concept from "@/app/components/concept";
import Work from "@/app/components/work";
import Clients from "@/app/components/clients";
import Culture from "@/app/components/culture";
import Footer from "@/app/components/footer";
import Loading from "@/app/components/loader";
import Form from "@/app/components/form";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    setTimeout(() => setIsLoading(false), 4000);
  }, []);

  return (
    <main className={isLoading ? "h-screen overflow-hidden" : ""}>
      {isLoading && <Loading />}

      <Header />

      <Entry />

      <Concept />

      <Work />

      <Clients />

      <Form />

      <Culture />

      <Footer />
    </main>
  );
}
