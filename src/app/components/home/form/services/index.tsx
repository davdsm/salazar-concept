import { AnimationOnScroll } from "react-animation-on-scroll";

import Image from "next/image";

import { services } from "..";
import { Parallax } from "react-scroll-parallax";

type servicesSelected = { service: string; selected: string[] }[];

export default function Services({
  servicesSelected,
  changeSelectedServices,
}: {
  servicesSelected: servicesSelected;
  changeSelectedServices: (newServices: servicesSelected) => void;
}) {
  const toggleService = (
    isSelected: boolean,
    serviceIndex: number,
    serviceDetail: string
  ) => {
    const newServices = [...servicesSelected];

    if (isSelected) {
      newServices[serviceIndex].selected.splice(
        newServices[serviceIndex].selected.indexOf(serviceDetail),
        1
      );
      changeSelectedServices(newServices);
      return;
    }

    newServices[serviceIndex].selected.push(serviceDetail);
    changeSelectedServices(newServices);
  };

  return (
    <section className="container pt-10 mt-20 sm:pt-20 relative">
      <div id="services" className="absolute -top-[104px]"></div>

      <AnimationOnScroll animateIn="animate__fadeInUp">
        <h1 className="font-bold text-4xl sm:text-8xl uppercase">Services</h1>

        <h3 className="font-bold mt-6 text-2xl">What are you searching?</h3>

        <Parallax speed={85}>
          <Image
            src="/logo/logo.gif"
            alt="Salazar Concept"
            width={350}
            height={350}
            className="absolute right-32 -top-24 hidden lg:inline"
          />
        </Parallax>
      </AnimationOnScroll>

      <div className="mt-6 sm:mt-10">
        {services.map(({ id, img, name, details }, servicesIndex) => (
          <AnimationOnScroll
            animateIn="animate__fadeInUp"
            key={`${id}-${name}-services`}
            className="flex mb-8 flex-col md:flex-row items-center text-center md:text-left"
          >
            <Image src={img} width={120} height={120} alt={name} />
            <div>
              <h2 className="font-bold text-3xl sm:text-6xl uppercase">
                {name}
              </h2>

              <div className="flex gap-3 mt-2 flex-wrap justify-center md:justify-start">
                {details.map((detail, index) => {
                  const isSelected =
                    servicesSelected[servicesIndex].selected.includes(detail);

                  return (
                    <AnimationOnScroll
                      animateIn="animate__fadeInUp"
                      key={`${detail}-${index}`}
                      className={`flex mb-8 flex-col md:flex-row items-center text-center md:text-left animationDelay${
                        100 * index
                      }`}
                    >
                      <p
                        className={`border border-black rounded-full px-1 py-1.5 text-xs uppercase cursor-pointer hover:bg-black hover:text-white ${
                          isSelected ? "bg-black text-white" : ""
                        }`}
                        onClick={() =>
                          toggleService(isSelected, servicesIndex, detail)
                        }
                      >
                        {detail}
                      </p>
                    </AnimationOnScroll>
                  );
                })}
              </div>
            </div>
          </AnimationOnScroll>
        ))}
      </div>
    </section>
  );
}
