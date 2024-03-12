import { AnimationOnScroll } from "react-animation-on-scroll";

export default function Poster() {
  return (
    <div className="container pt-8">
      <AnimationOnScroll animateIn="animate__fadeInUp">
        <div className="flex items-center text-center flex-col md:flex-row gap-10">
          <img
            src="/work/circuito-internacional-de-vila-real/cartaz.PNG"
            alt="Cartaz"
            className="sm:w-1/2"
          />

          <h1 className="font-bold text-3xl md:text-5xl uppercase m-auto">
            EVENT POSTER ON SOCIAL MEDIA
          </h1>
        </div>
      </AnimationOnScroll>
    </div>
  );
}
