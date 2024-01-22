import Header from "@/app/components/header";
import Entry from "@/app/components/entry";
import Concept from "@/app/components/concept";
import Work from "@/app/components/work";
import Clients from "@/app/components/clients";
import Services from "@/app/components/services";
import Culture from "@/app/components/culture";
import Talk from "@/app/components/talk";
import Footer from "@/app/components/footer";

async function fakeLoader() {
  await new Promise((resolve) => setTimeout(resolve, 4000));
}

export default async function Home() {
  await fakeLoader();

  return (
    <main>
      <Header />

      <Entry />

      <Concept />

      <Work />

      <Clients />

      <Services />

      <Talk />

      <Culture />

      <Footer />
    </main>
  );
}
