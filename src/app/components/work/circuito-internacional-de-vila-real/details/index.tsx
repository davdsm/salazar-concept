import Image from "next/image";
import { AnimationOnScroll } from "react-animation-on-scroll";

export default function Details() {
  return (
    <div className="container pt-28">
      <div className="flex items-center">
        <AnimationOnScroll className="w-2/5" animateIn="animate__fadeInUp">
          <h3 className="font-bold text-3xl uppercase border-b-2 border-black pb-3 mb-10">
            Comunicação
          </h3>
          <h3 className="font-bold text-3xl uppercase border-b-2 border-black pb-3 mb-10">
            BRANDING
          </h3>
          <h3 className="font-bold text-3xl uppercase border-b-2 border-black pb-3 mb-10">
            FOTOGRAFIA
          </h3>
          <h3 className="font-bold text-3xl uppercase border-b-2 border-black pb-3 mb-10">
            VÍDEO
          </h3>
          <h3 className="font-bold text-3xl uppercase border-b-2 border-black pb-3 mb-10">
            REDES SOCIAS
          </h3>
        </AnimationOnScroll>

        <AnimationOnScroll
          className="flex-1"
          animateIn="animate__fadeInUp"
          style={{ animationDelay: `200ms !important` }}
        >
          <Image
            src="/logo/logo.gif"
            alt="Salazar Concept"
            width={350}
            height={350}
            className="m-auto"
          />
        </AnimationOnScroll>
      </div>
    </div>
  );
}
