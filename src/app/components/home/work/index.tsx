import React from "react";
import { AnimationOnScroll } from "react-animation-on-scroll";

import Image from "next/image";
import Link from "next/link";

import { useOpenLinkAnimation } from "../../common/core";

const projects = [
  {
    id: 1,
    img: "/home/street.jpg",
    name: "Circuito Internacional de Vila Real",
    link: "/work/circuito-internacional-de-vila-real",
  },
  {
    id: 2,
    img: "/home/street.jpg",
    name: "Salazar concept is lorem ipsum?",
    link: "",
  },
  {
    id: 3,
    img: "/home/street.jpg",
    name: "Salazar concept is lorem ipsum?",
    link: "",
  },
  {
    id: 4,
    img: "/home/street.jpg",
    name: "Salazar concept is lorem ipsum?",
    link: "",
  },
  {
    id: 5,
    img: "/home/street.jpg",
    name: "Salazar concept is lorem ipsum?",
    link: "",
  },
  {
    id: 6,
    img: "/home/street.jpg",
    name: "Salazar concept is lorem ipsum?",
    link: "",
  },
];

export default function Work() {
  const { openLink } = useOpenLinkAnimation();

  return (
    <section className="container pt-10 mt-10 sm:mt-30 relative">
      <div id="work" className="absolute -top-[104px]"></div>

      <AnimationOnScroll animateIn="animate__fadeInUp">
        <h1 className="font-bold text-4xl sm:text-8xl uppercase">
          Discover our work
        </h1>
      </AnimationOnScroll>

      <div className="mt-6 mb-16 grid grid-cols-1 sm:grid-cols-2 gap-x-1 gap-y-10">
        {projects.map(({ id, name, img, link }, index) => (
          <Link
            onClick={(e) => openLink(e, link)}
            href={link}
            key={`${id}-${name}-projects`}
          >
            <AnimationOnScroll
              style={{ animationDelay: `${100 * index}ms !important` }}
              animateIn="animate__fadeInUp"
            >
              <div className="project">
                <div className="h-96 relative">
                  <Image src={img} fill alt={name} sizes="50vw" />
                </div>

                <p className="tracking-wider font-medium mt-2 text-base sm:text-xl uppercase">
                  {name}
                </p>
              </div>
            </AnimationOnScroll>
          </Link>
        ))}
      </div>

      <AnimationOnScroll animateIn="animate__fadeInUp">
        <a className="underline" href="#">
          Discover our work
        </a>
      </AnimationOnScroll>
    </section>
  );
}
