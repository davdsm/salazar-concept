import { AnimationOnScroll } from "react-animation-on-scroll";

export default function GraphicLine() {
  return (
    <div className="container pt-14 relative">
      <AnimationOnScroll animateIn="animate__fadeInUp">
        <div>
          <h1 className="font-bold text-4xl sm:text-5xl uppercase">
            GRAPHIC LINE
          </h1>

          <div className="grid gap-x-3.5 gap-y-16 mt-12 grid-cols-1 sm:grid-cols-3">
            <div className="relative">
              <img
                src="/work/circuito-internacional-de-vila-real/IMG_6232.PNG"
                alt="Graphic Line 1"
              />

              <img
                src="/work/circuito-internacional-de-vila-real/IMG_6233.PNG"
                alt="Graphic Line 1 - 2"
                className="absolute -top-[40px] left-px opacity-90"
              />
            </div>

            <div className="relative">
              <img
                src="/work/circuito-internacional-de-vila-real/IMG_6236.PNG"
                alt="Graphic Line 2"
              />

              <img
                src="/work/circuito-internacional-de-vila-real/IMG_6237.PNG"
                alt="Graphic Line 2 - 2"
                className="absolute -top-[40px] sm:-top-[97px] right-px opacity-90"
              />
            </div>

            <div className="relative">
              <img
                src="/work/circuito-internacional-de-vila-real/IMG_6240.PNG"
                alt="Graphic Line 3"
              />

              <img
                src="/work/circuito-internacional-de-vila-real/IMG_6241.PNG"
                alt="Graphic Line 3 - 3"
                className="absolute -top-[40px] sm:-top-[105px] opacity-90"
              />
            </div>
          </div>

          <p className="font-bold my-12 text-base sm:text-2xl uppercase">
            WE CHOOSE A SPECIAL TEXTURE BASED ON THE TRACK TAR. THE COLORS ARE
            REPRESENTATIV OF THE TWO COMPANIES AND THE ELEMENTS ARE EASILY
            IDENTIFIABLE BY WHAT THEY REPRESENT.
          </p>

          <div className="flex flex-wrap">
            <img
              src="/work/circuito-internacional-de-vila-real/IMG_6234.PNG"
              alt="Graphic Line 4"
              className="w-1/2 sm:w-1/4"
            />
            <img
              src="/work/circuito-internacional-de-vila-real/IMG_6235.PNG"
              alt="Graphic Line 5"
              className="w-1/2 sm:w-1/4"
            />
            <img
              src="/work/circuito-internacional-de-vila-real/IMG_6238.PNG"
              alt="Graphic Line 6"
              className="w-1/2 sm:w-1/4"
            />
            <img
              src="/work/circuito-internacional-de-vila-real/IMG_6239.PNG"
              alt="Graphic Line 7"
              className="w-1/2 sm:w-1/4"
            />
          </div>

          <div className="flex flex-wrap">
            <img
              src="/work/circuito-internacional-de-vila-real/IMG_6242.PNG"
              alt="Graphic Line 8"
              className="w-1/2 sm:w-1/4"
            />
            <img
              src="/work/circuito-internacional-de-vila-real/IMG_6243.PNG"
              alt="Graphic Line 9"
              className="w-1/2 sm:w-1/4"
            />
            <img
              src="/work/circuito-internacional-de-vila-real/IMG_6249.PNG"
              alt="Graphic Line 10"
              className="w-full sm:w-1/4"
            />
            <img
              src="/work/circuito-internacional-de-vila-real/IMG_6250.PNG"
              alt="Graphic Line 11"
              className="w-full sm:w-1/4"
            />
          </div>
        </div>
      </AnimationOnScroll>
    </div>
  );
}
