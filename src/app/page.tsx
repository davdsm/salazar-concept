"use client";

import Layout from "@/app/components/common/layout";
import Entry from "@/app/components/home/entry";
import Concept from "@/app/components/home/concept";
import Work from "@/app/components/home/work";
import Clients from "@/app/components/home/clients";
// import Culture from "@/app/components/culture";
import Form from "@/app/components/home/form";

export default function Home() {
  return (
    <Layout entryComponent={<Entry />} keepLogo>
      <div className="pb-40">
        <Concept />

        <Work />

        <Clients />

        <Form />
      </div>

      {/* <Culture /> */}
    </Layout>
  );
}
