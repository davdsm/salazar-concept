import React, { useContext, useEffect, useState } from "react";
import { AnimationOnScroll } from "react-animation-on-scroll";

import PocketBase from "pocketbase";

import Image from "next/image";
import Link from "next/link";
import { AppContext } from "@/app/layout";
import { API_URL } from "@/app/utils";

type Project = {
  slug: string;
  isVisible: boolean;
  name: string;
  image: string;
  collectionId: string;
  id: string;
};

export default function Work() {
  const { pageTransition } = useContext(AppContext);

  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const pb = new PocketBase(API_URL);

      const items = await pb
        .collection("Projects")
        .getFullList<Project>({ sort: "order" });

      setProjects(items);
    };

    fetchProjects();
  }, []);

  return (
    <section className="container pt-10 mt-10 sm:mt-30 relative">
      <div id="work" className="absolute -top-[104px]"></div>

      <AnimationOnScroll animateIn="animate__fadeInUp">
        <h1 className="font-bold text-4xl sm:text-8xl uppercase">
          Discover our work
        </h1>
      </AnimationOnScroll>

      <div className="mt-6 mb-16 grid grid-cols-1 sm:grid-cols-2 gap-x-1 gap-y-10">
        {projects.map(
          ({ isVisible, slug, name, image, collectionId, id }, index) =>
            isVisible && (
              <Link
                href={`/work/${slug}`}
                key={slug}
                onClick={(e) => pageTransition(e, `/work/${slug}`)}
              >
                <AnimationOnScroll
                  className={`animationDelay${100 * index}`}
                  animateIn="animate__fadeInUp"
                >
                  <div className="project">
                    <div className="h-96 relative">
                      <Image
                        src={`${API_URL}/api/files/${collectionId}/${id}/${image}`}
                        fill
                        alt={name}
                        sizes="50vw"
                        className="object-cover"
                      />
                    </div>

                    <p className="tracking-wider font-medium mt-2 text-base sm:text-xl uppercase">
                      {name}
                    </p>
                  </div>
                </AnimationOnScroll>
              </Link>
            )
        )}
      </div>

      <AnimationOnScroll animateIn="animate__fadeInUp">
        <a className="underline" href="#">
          Discover our work
        </a>
      </AnimationOnScroll>
    </section>
  );
}
