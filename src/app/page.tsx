"use client";

import { ParallaxProvider } from "react-scroll-parallax";
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
  return (
    <ParallaxProvider>
      <main className="main-animation">
        <div className="bg-black">
          <Loading />

          <Header />

          <Entry />
        </div>

        <Concept />

        <Work />

        <Clients />

        <Form />

        <Culture />

        <Footer />
      </main>
    </ParallaxProvider>
  );
}
