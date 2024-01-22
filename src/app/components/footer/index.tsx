import Image from "next/image";

import Social from "@/app/components/common/social";

export default function Footer() {
  return (
    <footer className="bg-black text-white pt-10 mt-40 pb-10">
      <div className="container">
        <Image
          src="/logo.svg"
          alt="Salazar Concept"
          height={70}
          width={70}
          className="mx-auto"
        />
        <h1 className="text-5xl font-bold uppercase text-center word">
          Salazar <br />
          Concept
        </h1>

        <div className="flex sm:justify-between mt-20 underline flex-col sm:flex-row sm:items-start items-center justify-center gap-20 text-center sm:text-left">
          <div className="flex flex-col gap-6">
            <a href="mailto:email@salazar.com">email@salazar.com</a>
            <a href="tel:+351000000000">+351 000 000 000</a>
          </div>

          <div>
            <a href="https://maps.app.goo.gl/UnisBiDkkTTtd26E9" target="_blank">
              Morada Morada <br /> 8765-0987 Guimarães
            </a>
          </div>

          <div className="flex flex-col gap-6">
            <Social />
          </div>
        </div>
      </div>
    </footer>
  );
}
