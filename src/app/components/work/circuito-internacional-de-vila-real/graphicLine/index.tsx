/* eslint-disable @next/next/no-img-element */
import { AnimationOnScroll } from "react-animation-on-scroll";

export default function GraphicLine() {
  return (
    <div className="container pt-14">
      <div>
        <AnimationOnScroll animateIn="animate__fadeInUp">
          <h1 className="font-bold text-4xl sm:text-5xl uppercase">
            GRAPHIC LINE
          </h1>
        </AnimationOnScroll>

        <div className="grid gap-x-3.5 gap-y-16 mt-12 grid-cols-1 sm:grid-cols-3">
          <AnimationOnScroll
            className="animationDelay200"
            animateIn="animate__fadeInUp"
          >
            <img
              src="/work/circuito-internacional-de-vila-real/IMG_6232.PNG"
              alt="Graphic Line 1"
              className="cursor-pointer"
              onMouseEnter={(e) =>
                (e.currentTarget.src =
                  "/work/circuito-internacional-de-vila-real/IMG_6233.PNG")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.src =
                  "/work/circuito-internacional-de-vila-real/IMG_6232.PNG")
              }
            />
          </AnimationOnScroll>

          <AnimationOnScroll
            className="relative animationDelay300"
            animateIn="animate__fadeInUp"
          >
            <img
              src="/work/circuito-internacional-de-vila-real/IMG_6236.PNG"
              alt="Graphic Line 2"
              className="cursor-pointer"
              onMouseEnter={(e) =>
                (e.currentTarget.src =
                  "/work/circuito-internacional-de-vila-real/IMG_6237.PNG")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.src =
                  "/work/circuito-internacional-de-vila-real/IMG_6236.PNG")
              }
            />
          </AnimationOnScroll>

          <AnimationOnScroll
            className="relative animationDelay400"
            animateIn="animate__fadeInUp"
          >
            <img
              src="/work/circuito-internacional-de-vila-real/IMG_6240.PNG"
              alt="Graphic Line 3"
              className="cursor-pointer"
              onMouseEnter={(e) =>
                (e.currentTarget.src =
                  "/work/circuito-internacional-de-vila-real/IMG_6241.PNG")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.src =
                  "/work/circuito-internacional-de-vila-real/IMG_6240.PNG")
              }
            />
          </AnimationOnScroll>
        </div>

        <AnimationOnScroll animateIn="animate__fadeInUp">
          <p className="font-bold my-12 text-base sm:text-2xl uppercase">
            WE CHOOSE A SPECIAL TEXTURE BASED ON THE TRACK TAR. THE COLORS ARE
            REPRESENTATIV OF THE TWO COMPANIES AND THE ELEMENTS ARE EASILY
            IDENTIFIABLE BY WHAT THEY REPRESENT.
          </p>
        </AnimationOnScroll>

        <div className="sm:flex">
          <AnimationOnScroll
            animateIn="animate__fadeInUp"
            className="flex flex-wrap w-full sm:w-1/2"
          >
            <img
              src="/work/circuito-internacional-de-vila-real/IMG_6234.PNG"
              alt="Graphic Line 4"
              className="w-1/2"
            />
            <img
              src="/work/circuito-internacional-de-vila-real/IMG_6235.PNG"
              alt="Graphic Line 5"
              className="w-1/2"
            />
          </AnimationOnScroll>
          <AnimationOnScroll
            animateIn="animate__fadeInUp"
            className="flex flex-wrap animationDelay300 w-full sm:w-1/2"
          >
            <img
              src="/work/circuito-internacional-de-vila-real/IMG_6238.PNG"
              alt="Graphic Line 6"
              className="w-1/2"
            />
            <img
              src="/work/circuito-internacional-de-vila-real/IMG_6239.PNG"
              alt="Graphic Line 7"
              className="w-1/2"
            />
          </AnimationOnScroll>
        </div>

        <div className="sm:flex">
          <AnimationOnScroll
            animateIn="animate__fadeInUp"
            className="flex flex-wrap w-full sm:w-1/2"
          >
            <img
              src="/work/circuito-internacional-de-vila-real/IMG_6242.PNG"
              alt="Graphic Line 8"
              className="w-1/2"
            />
            <img
              src="/work/circuito-internacional-de-vila-real/IMG_6243.PNG"
              alt="Graphic Line 9"
              className="w-1/2"
            />
          </AnimationOnScroll>
          <AnimationOnScroll
            animateIn="animate__fadeInUp"
            className="flex flex-wrap w-full sm:w-1/2 animationDelay300"
          >
            <img
              src="/work/circuito-internacional-de-vila-real/IMG_6249.PNG"
              alt="Graphic Line 10"
              className="w-1/2"
            />
            <img
              src="/work/circuito-internacional-de-vila-real/IMG_6250.PNG"
              alt="Graphic Line 11"
              className="w-1/2"
            />
          </AnimationOnScroll>
        </div>
      </div>
    </div>
  );
}
