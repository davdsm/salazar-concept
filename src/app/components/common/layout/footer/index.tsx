import Image from "next/image";

import Social from "@/app/components/common/social";
import { AnimationOnScroll } from "react-animation-on-scroll";

export default function Footer() {
  return (
    <footer className="bg-black text-white pt-10 pb-10">
      <div className="container">
        <AnimationOnScroll animateIn="animate__fadeIn">
          <Image
            src="/logo/logo.svg"
            alt="Salazar Concept"
            height={70}
            width={70}
            className="mx-auto"
          />
          <h1 className="text-5xl font-bold uppercase text-center word">
            Salazar <br />
            Concept
          </h1>
        </AnimationOnScroll>

        <div className="flex sm:justify-between mt-20 underline flex-col sm:flex-row sm:items-start items-center justify-center gap-20 text-center sm:text-left">
          <AnimationOnScroll
            animateIn="animate__fadeIn"
            style={{ animationDelay: `100ms !important` }}
          >
            <div className="flex flex-col gap-6">
              <a href="mailto:geral@salazarconcept.com">
                geral@salazarconcept.com
              </a>
            </div>
          </AnimationOnScroll>
          <AnimationOnScroll
            animateIn="animate__fadeIn"
            style={{ animationDelay: `200ms !important` }}
          >
            <a href="https://maps.app.goo.gl/UnisBiDkkTTtd26E9" target="_blank">
              Rua D. Afonso Henriques Nº 884 , <br /> 4805-549 Guimarães
            </a>
          </AnimationOnScroll>
          <AnimationOnScroll
            animateIn="animate__fadeIn"
            style={{ animationDelay: `300ms !important` }}
          >
            <div className="flex flex-col gap-6">
              <Social />
            </div>
          </AnimationOnScroll>
        </div>
      </div>
    </footer>
  );
}
