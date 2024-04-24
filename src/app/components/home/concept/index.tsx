import { AnimationOnScroll } from "react-animation-on-scroll";
import { Parallax } from "react-scroll-parallax";

export default function Concept() {
  return (
    <div className="container pt-10 relative">
      <div id="concept" className="absolute -top-[104px]"></div>

      <Parallax speed={-5}>
        <AnimationOnScroll animateIn="animate__fadeInUp">
          <a className="underline" href="#">
            Discover our work
          </a>
        </AnimationOnScroll>
      </Parallax>

      <AnimationOnScroll animateIn="animate__fadeInUp">
        <div className="text-center mt-14 sm:mt-20">
          <h1 className="font-bold text-4xl sm:text-8xl uppercase">
            Find more <br />
            about our concept
          </h1>

          <h3 className="font-bold mt-10 text-2xl sm:text-4xl uppercase">
            Embrace the concept
          </h3>

          <p className="font-bold mt-5 text-base sm:text-xl text-justify uppercase">
            True concepts are those that express a very strong definition and
            are well consolidated by everyone around the world. the salazar
            concept is a universal concept that was inspired by an icon capable
            of looking at a market from a 360 angle and capable of camouflaging
            itself and adapting to different ecosystems or business habitats.
          </p>
        </div>
      </AnimationOnScroll>
    </div>
  );
}
