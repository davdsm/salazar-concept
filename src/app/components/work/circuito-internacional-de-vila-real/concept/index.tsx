import { AnimationOnScroll } from "react-animation-on-scroll";

export default function Concept() {
  return (
    <div className="container pt-10 relative">
      <div className="text-center">
        <AnimationOnScroll animateIn="animate__fadeInUp">
          <h1 className="font-bold text-4xl sm:text-7xl uppercase">
            Circuito internacional <br /> de vila real
          </h1>
        </AnimationOnScroll>

        <div className="flex justify-evenly my-8 sm:my-16 flex-col sm:flex-row gap-6">
          <AnimationOnScroll
            animateIn="animate__fadeInUp"
            className="w-3/4 sm:w-2/6 m-auto"
          >
            <img
              src="/work/circuito-internacional-de-vila-real/Ativo_1.png"
              alt="Ativo 1"
              className="w-full"
            />
          </AnimationOnScroll>

          <AnimationOnScroll
            animateIn="animate__fadeInUp"
            className="w-3/4 sm:w-2/6 m-auto"
            style={{ animationDelay: `200ms !important` }}
          >
            <img
              src="/work/circuito-internacional-de-vila-real/Ativo_3.png"
              alt="Ativo 3"
              className="w-full"
            />
          </AnimationOnScroll>
        </div>

        <AnimationOnScroll animateIn="animate__fadeInUp">
          <p className="font-bold mt-5 text-base sm:text-2xl text-center uppercase">
            We were present at the 52nd circuito internacional de vila real to
            develop the communication plan for successful partnership between
            the companies jomarfa and isidovias. communication played a key role
            in creating a message of unity (#cruzamosametajuntos) and in
            projecting the work carried out by the two companies in preparing
            the track. jomarfa and isidovias combined all their efforts to offer
            a safe circuit, and salazar concept was commited to capturing and
            reporting the best moments of this circuit
          </p>
        </AnimationOnScroll>
      </div>
    </div>
  );
}
