"use client";

import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import Image from "next/image";

import PocketBase from "pocketbase";

import { API_URL } from "@/app/utils";

import Layout from "@/app/components/common/layout";
import EntryComponent from "@/app/components/work/entryComponent";
import { AnimationOnScroll } from "react-animation-on-scroll";
import Slider from "react-slick";

const settings = {
  dots: false,
  autoplay: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  speed: 1500,
  pauseOnHover: false,
};

export default function Project({ params }: { params: { slug: string } }) {
  const [sections, setSections] = useState<any>(null);
  const [project, setProject] = useState<any>(null);

  useEffect(() => {
    const fetchSections = async () => {
      const pb = new PocketBase(API_URL);

      const items = await pb.collection("Sections").getFullList({
        filter: `project.slug = '${params.slug}'`,
        sort: "order",
        expand: "project.categories",
      });

      const project = await pb.collection("Projects").getOne(items[0].project, {
        expand: "subcategories",
      });

      setSections(items);
      setProject({
        name: project.name,
        details: [
          ...items[0].expand?.project.expand.categories.map(
            ({ name }: any) => name
          ),
          ...project.expand?.subcategories.map(({ name }: any) => name),
        ],
      });
    };

    fetchSections();
  }, [params.slug]);

  if (sections && !sections.length) redirect("/");

  return (
    <Layout
      entryComponent={
        <EntryComponent
          sections={sections?.filter(
            ({ isEntryComponent }: any) => isEntryComponent
          )}
          name={project?.name}
        />
      }
    >
      <div className="bg-neutral-100 pb-40">
        {sections?.map(
          ({
            id,
            title,
            images,
            images_hover,
            collectionId,
            text,
            isSlide,
            isSmallImages,
            isEntryComponent,
            videos,
          }: any) =>
            !isEntryComponent && (
              <div key={id} className="container pt-14">
                {title && images.length === 0 && (
                  <AnimationOnScroll animateIn="animate__fadeInUp">
                    <h1 className="font-bold text-4xl sm:text-5xl uppercase">
                      {title}
                    </h1>
                  </AnimationOnScroll>
                )}

                {images.length > 0 && !title && !text && !isSmallImages && (
                  <div className="flex gap-x-3.5 gap-y-16 flex-col sm:flex-row">
                    {images.map((img: string, index: number) => (
                      <AnimationOnScroll
                        className={`animationDelay${100 * index}`}
                        animateIn="animate__fadeInUp"
                        key={`${img}-${index}`}
                      >
                        <img
                          src={`${API_URL}/api/files/${collectionId}/${id}/${img}`}
                          className={
                            images_hover?.length ? "cursor-pointer" : ""
                          }
                          onMouseEnter={(e) =>
                            images_hover?.length &&
                            (e.currentTarget.src = `${API_URL}/api/files/${collectionId}/${id}/${images_hover[index]}`)
                          }
                          onMouseLeave={(e) =>
                            images_hover?.length &&
                            (e.currentTarget.src = `${API_URL}/api/files/${collectionId}/${id}/${img}`)
                          }
                        />
                      </AnimationOnScroll>
                    ))}
                  </div>
                )}

                {text && images.length === 0 && (
                  <AnimationOnScroll animateIn="animate__fadeInUp">
                    <p
                      className="font-bold text-base sm:text-2xl uppercase"
                      dangerouslySetInnerHTML={{ __html: text }}
                    />
                  </AnimationOnScroll>
                )}

                {!isSlide && title && images.length > 0 && (
                  <div className="flex items-center text-center flex-col md:flex-row gap-10">
                    <div className="flex gap-x-3.5 gap-y-16 flex-col sm:w-1/2">
                      {images.map((img: string, index: number) => (
                        <AnimationOnScroll
                          className={`animationDelay${100 * index}`}
                          animateIn="animate__fadeInUp"
                          key={`${img}-${index}`}
                        >
                          <img
                            src={`${API_URL}/api/files/${collectionId}/${id}/${img}`}
                            className={`${
                              images_hover?.length ? "cursor-pointer" : ""
                            }`}
                            onMouseEnter={(e) =>
                              images_hover?.length &&
                              (e.currentTarget.src = `${API_URL}/api/files/${collectionId}/${id}/${images_hover[index]}`)
                            }
                            onMouseLeave={(e) =>
                              images_hover?.length &&
                              (e.currentTarget.src = `${API_URL}/api/files/${collectionId}/${id}/${img}`)
                            }
                          />
                        </AnimationOnScroll>
                      ))}
                    </div>

                    <AnimationOnScroll
                      animateIn="animate__fadeInUp"
                      className="animationDelay200"
                    >
                      <h1 className="font-bold text-3xl md:text-5xl uppercase m-auto">
                        {title}
                      </h1>
                    </AnimationOnScroll>
                  </div>
                )}

                {isSlide && (
                  <>
                    {title && (
                      <AnimationOnScroll animateIn="animate__fadeInUp">
                        <h1 className="font-bold text-3xl md:text-5xl uppercase text-center">
                          {title}
                        </h1>
                      </AnimationOnScroll>
                    )}

                    <AnimationOnScroll
                      animateIn="animate__fadeInUp"
                      className="animationDelay200"
                    >
                      <Slider {...settings} className="mt-6">
                        {images?.map((value: string, index: number) => (
                          <img
                            key={"slider" + index}
                            src={`${API_URL}/api/files/${collectionId}/${id}/${value}`}
                            className="h-[75vh] object-contain"
                          />
                        ))}
                      </Slider>
                    </AnimationOnScroll>
                  </>
                )}

                {text && images.length > 0 && (
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex gap-x-3.5 gap-y-16 flex-col sm:flex-row sm:w-2/3">
                      {images.map((img: string, index: number) => (
                        <AnimationOnScroll
                          className={`animationDelay${100 * index}`}
                          animateIn="animate__fadeInUp"
                          key={`${img}-${index}`}
                        >
                          <img
                            src={`${API_URL}/api/files/${collectionId}/${id}/${img}`}
                            className={
                              images_hover?.length ? "cursor-pointer" : ""
                            }
                            onMouseEnter={(e) =>
                              images_hover?.length &&
                              (e.currentTarget.src = `${API_URL}/api/files/${collectionId}/${id}/${images_hover[index]}`)
                            }
                            onMouseLeave={(e) =>
                              images_hover?.length &&
                              (e.currentTarget.src = `${API_URL}/api/files/${collectionId}/${id}/${img}`)
                            }
                          />
                        </AnimationOnScroll>
                      ))}
                    </div>

                    <AnimationOnScroll
                      animateIn="animate__fadeInUp"
                      className="sm:w-1/3 animationDelay200"
                    >
                      <p
                        className="font-bold text-base sm:text-2xl uppercase"
                        dangerouslySetInnerHTML={{ __html: text }}
                      />
                    </AnimationOnScroll>
                  </div>
                )}

                {images.length > 0 && !title && !text && isSmallImages && (
                  <div className="hidden sm:flex justify-center sm:justify-between flex-wrap gap-10">
                    {images.map((img: string, index: number) => (
                      <AnimationOnScroll
                        className={`animationDelay${100 * index} w-52 h-52`}
                        animateIn="animate__fadeInUp"
                        key={`${img}-${index}`}
                      >
                        <img
                          src={`${API_URL}/api/files/${collectionId}/${id}/${img}`}
                          className={`${
                            images_hover?.length ? "cursor-pointer" : ""
                          } w-full h-full object-contain`}
                          onMouseEnter={(e) =>
                            images_hover?.length &&
                            (e.currentTarget.src = `${API_URL}/api/files/${collectionId}/${id}/${images_hover[index]}`)
                          }
                          onMouseLeave={(e) =>
                            images_hover?.length &&
                            (e.currentTarget.src = `${API_URL}/api/files/${collectionId}/${id}/${img}`)
                          }
                        />
                      </AnimationOnScroll>
                    ))}
                  </div>
                )}

                {videos.length === 1 && (
                  <AnimationOnScroll animateIn="animate__fadeInUp">
                    <video controls className="h-[80vh] w-screen object-cover">
                      <source
                        src={`${API_URL}/api/files/${collectionId}/${id}/${videos[0]}`}
                        type="video/mp4"
                      />
                    </video>
                  </AnimationOnScroll>
                )}

                {videos.length > 0 && (
                  <AnimationOnScroll animateIn="animate__fadeInUp">
                    <div>
                      {title && (
                        <h1 className="font-bold text-3xl md:text-5xl uppercase">
                          {title}
                        </h1>
                      )}

                      <div className="flex justify-between mt-16 flex-col sm:flex-row gap-10">
                        {videos.map((value: string, index: number) => (
                          <AnimationOnScroll
                            animateIn="animate__fadeInUp"
                            className="sm:w-1/3"
                            key={`${value}-${index}`}
                          >
                            <video
                              controls
                              className="w-full h-[70vh] object-cover"
                            >
                              <source
                                src={`${API_URL}/api/files/${collectionId}/${id}/${value}`}
                                type="video/mp4"
                              />
                            </video>
                          </AnimationOnScroll>
                        ))}
                      </div>
                    </div>
                  </AnimationOnScroll>
                )}
              </div>
            )
        )}

        <div className="container flex items-center pt-14">
          <AnimationOnScroll className="w-2/5" animateIn="animate__fadeInUp">
            {project?.details.map((cat: string) => (
              <h3
                key={cat}
                className="font-bold text-3xl uppercase border-b-2 border-black pb-3 mb-10"
              >
                {cat}
              </h3>
            ))}
          </AnimationOnScroll>

          <AnimationOnScroll
            className="flex-1"
            animateIn="animate__fadeInUp animationDelay200"
          >
            <Image
              src="/logo/logo.gif"
              alt="Salazar Concept"
              width={350}
              height={350}
              className="m-auto"
            />
          </AnimationOnScroll>
        </div>
      </div>
    </Layout>
  );
}
