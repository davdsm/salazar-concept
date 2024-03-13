import { AnimationOnScroll } from "react-animation-on-scroll";

export default function Final() {
  return (
    <div className="container pt-20">
      <div className="flex flex-col md:flex-row gap-4">
        <AnimationOnScroll animateIn="animate__fadeInUp" className="sm:w-2/3">
          <img
            src="/work/circuito-internacional-de-vila-real/photography/32.jpg"
            alt="Cruzamos a meta juntos!"
            className="w-full"
          />
        </AnimationOnScroll>

        <AnimationOnScroll
          animateIn="animate__fadeInUp"
          className="sm:w-1/3"
          style={{ animationDelay: `200ms !important` }}
        >
          <p className="font-bold text-base sm:text-2xl uppercase">
            WE DEVELOP THE CUSTOMIZATION OF THE PARTNERSHIP SPOT. WE CONSOLIDATE
            THE IDENTITY AND THE POSITIONING IN THE CIRCUIT FROM A STRATEGIC
            PRESPECTIVE.
          </p>
        </AnimationOnScroll>
      </div>

      <div className="flex justify-center sm:justify-between mt-10 flex-wrap gap-10">
        <AnimationOnScroll
          animateIn="animate__fadeInUp"
          className="w-40 sm:w-60"
        >
          <img
            src="/work/circuito-internacional-de-vila-real/capacete.png"
            alt="Cruzamos a meta juntos!"
            className="w-full h-40 sm:h-60"
          />
        </AnimationOnScroll>

        <AnimationOnScroll
          animateIn="animate__fadeInUp"
          className="w-72 sm:w-80"
          style={{ animationDelay: `200ms !important` }}
        >
          <img
            src="/work/circuito-internacional-de-vila-real/carro.png"
            alt="Cruzamos a meta juntos!"
            className="w-full"
          />
        </AnimationOnScroll>
      </div>
    </div>
  );
}
