import { useContext } from "react";

import { AppContext } from "@/app/layout";

export default function Concept() {
  const { firstLoad } = useContext(AppContext);

  return (
    <div className="container relative bg-white pt-[130px] pb-10">
      <div className="text-center">
        <div
          className={`animate__animated animate__fadeInDown ${
            !firstLoad ? "animationDelay3000" : "animationDelay600"
          }`}
        >
          <h1 className="font-bold text-4xl sm:text-7xl uppercase">
            Circuito internacional <br /> de vila real
          </h1>
        </div>

        <div className="flex justify-evenly my-8 sm:my-16 flex-col sm:flex-row gap-6">
          <div
            className={`w-3/4 sm:w-2/6 m-auto animate__animated animate__fadeInDown ${
              !firstLoad ? "animationDelay3200" : "animationDelay800"
            }`}
          >
            <img
              src="/work/circuito-internacional-de-vila-real/Ativo_1.png"
              alt="Ativo 1"
              className="w-full"
            />
          </div>

          <div
            className={`w-3/4 sm:w-2/6 m-auto animate__animated animate__fadeInDown ${
              !firstLoad ? "animationDelay3400" : "animationDelay1000"
            }`}
          >
            <img
              src="/work/circuito-internacional-de-vila-real/Ativo_3.png"
              alt="Ativo 3"
              className="w-full"
            />
          </div>
        </div>

        <div
          className={`animate__animated animate__fadeInDown ${
            !firstLoad ? "animationDelay3600" : "animationDelay1200"
          }`}
        >
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
        </div>
      </div>
    </div>
  );
}
