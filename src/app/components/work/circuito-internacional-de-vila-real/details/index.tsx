import Image from "next/image";
import { AnimationOnScroll } from "react-animation-on-scroll";

export default function Details() {
  return (
    <div className="container pt-28">
      <AnimationOnScroll animateIn="animate__fadeInUp">
        <div className="flex items-center">
          <div className="w-2/5">
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
          </div>

          <div className="flex-1">
            <Image
              src="/logo/logo.gif"
              alt="Salazar Concept"
              width={350}
              height={350}
              className="m-auto"
            />
          </div>
        </div>
      </AnimationOnScroll>
    </div>
  );
}
