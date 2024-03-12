import { AnimationOnScroll } from "react-animation-on-scroll";

export default function Final() {
  return (
    <div className="container pt-20">
      <AnimationOnScroll animateIn="animate__fadeInUp">
        <div className="flex  flex-col md:flex-row gap-4">
          <img
            src="/work/circuito-internacional-de-vila-real/photography/32.jpg"
            alt="Cruzamos a meta juntos!"
            className="sm:w-2/3"
          />

          <p className="font-bold text-base sm:text-2xl uppercase">
            WE DEVELOP THE CUSTOMIZATION OF THE PARTNERSHIP SPOT . WE
            CONSOLIDATE THE IDENTITY AND THE POSITIONING IN THE CIRCUIT FROM A
            STRATEGIC PRESPECTIVE.
          </p>
        </div>
      </AnimationOnScroll>
    </div>
  );
}
