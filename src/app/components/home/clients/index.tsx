import { useEffect, useState } from "react";

import { AnimationOnScroll } from "react-animation-on-scroll";
import Slider from "react-slick";
import PocketBase from "pocketbase";

import { API_URL } from "@/app/utils";

const settings = {
  dots: true,
  autoplay: true,
  arrows: false,
  slidesToShow: 6,
  slidesToScroll: 6,
  speed: 1500,
  pauseOnHover: false,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 4,
      },
    },
    {
      breakpoint: 640,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
  ],
};

type Client = {
  id: string;
  isVisible: boolean;
  collectionId: string;
  logo: string;
  name: string;
};

export default function Clients() {
  const [clients, setClients] = useState<Client[]>([]);

  useEffect(() => {
    const fetchClients = async () => {
      const pb = new PocketBase(API_URL);

      const items = await pb
        .collection("Clients")
        .getFullList<Client>({ sort: "order" });

      setClients(items);
    };

    fetchClients();
  }, []);

  return (
    <AnimationOnScroll animateIn="animate__fadeInUp">
      <section className="container mt-16 pt-10 relative max-w-none">
        <div id="clients" className="absolute -top-[104px]"></div>

        <h1 className="font-bold text-4xl sm:text-8xl uppercase">Clients</h1>

        <Slider {...settings} className="mt-6">
          {clients.map(({ id, isVisible, collectionId, logo, name }) => {
            if (!isVisible) return;

            return (
              <AnimationOnScroll key={id} animateIn="animate__fadeInUp">
                <div className="bg-[#f1f1f1] client rounded-full w-32 h-32 mx-auto">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`${API_URL}/api/files/${collectionId}/${id}/${logo}`}
                    className="scale-[0.7] mx-auto rounded-full w-32 h-32 object-contain"
                    alt={name}
                  />
                </div>
              </AnimationOnScroll>
            );
          })}
        </Slider>
      </section>
    </AnimationOnScroll>
  );
}
