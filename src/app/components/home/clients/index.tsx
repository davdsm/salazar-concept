import { AnimationOnScroll } from "react-animation-on-scroll";
import Slider from "react-slick";

const clients = [
  { id: 1 },
  { id: 2 },
  { id: 3 },
  { id: 4 },
  { id: 5 },
  { id: 6 },
  { id: 7 },
  { id: 8 },
  { id: 9 },
  { id: 10 },
  { id: 11 },
  { id: 12 },
];

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

export default function Clients() {
  return (
    <AnimationOnScroll animateIn="animate__fadeInUp">
      <section className="container mt-16 pt-10 relative max-w-none">
        <div id="clients" className="absolute -top-[104px]"></div>

        <h1 className="font-bold text-4xl sm:text-8xl uppercase">Clients</h1>

        <Slider {...settings} className="mt-6">
          {clients.map(({ id }, index) => (
            <AnimationOnScroll
              key={`${id}-clients`}
              animateIn="animate__fadeInUp"
            >
              <div className="bg-[#f1f1f1] client rounded-full w-32 h-32 mx-auto">
                <img
                  src={`/home/clients/${index + 1}.png`}
                  className="scale-[0.7] mx-auto rounded-full w-32 h-32 object-contain"
                />
              </div>
            </AnimationOnScroll>
          ))}
        </Slider>
      </section>
    </AnimationOnScroll>
  );
}
