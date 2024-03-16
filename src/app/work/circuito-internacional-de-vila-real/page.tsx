"use client";

import Layout from "@/app/components/common/layout";
import Concept from "@/app/components/work/circuito-internacional-de-vila-real/concept";
import Details from "@/app/components/work/circuito-internacional-de-vila-real/details";
import Entry from "@/app/components/work/circuito-internacional-de-vila-real/entry";
import Final from "@/app/components/work/circuito-internacional-de-vila-real/final";
import GraphicLine from "@/app/components/work/circuito-internacional-de-vila-real/graphicLine";
import Photography from "@/app/components/work/circuito-internacional-de-vila-real/photography";
import Poster from "@/app/components/work/circuito-internacional-de-vila-real/poster";
import Social from "@/app/components/work/circuito-internacional-de-vila-real/social";
import Video from "@/app/components/work/circuito-internacional-de-vila-real/video";

export default function CircuitoInternacionalDeVilaReal() {
  return (
    <Layout entryComponent={<Entry />}>
      <div className="bg-neutral-100 pb-40">
        <Concept />

        <GraphicLine />

        <Poster />

        <Photography />

        <Final />

        <Video />

        <Social />

        <Details />
      </div>
    </Layout>
  );
}
