import { AnimationOnScroll } from "react-animation-on-scroll";

export default function Poster() {
  return (
    <div className="container pt-8">
      <div className="flex items-center text-center flex-col md:flex-row gap-10">
        <AnimationOnScroll animateIn="animate__fadeInUp" className="sm:w-1/2">
          <img
            src="/work/circuito-internacional-de-vila-real/cartaz.PNG"
            alt="Cartaz"
            className="w-full"
          />
        </AnimationOnScroll>

        <AnimationOnScroll
          animateIn="animate__fadeInUp"
          style={{ animationDelay: `200ms !important` }}
        >
          <h1 className="font-bold text-3xl md:text-5xl uppercase m-auto">
            EVENT POSTER ON SOCIAL MEDIA
          </h1>
        </AnimationOnScroll>
      </div>
    </div>
  );
}
