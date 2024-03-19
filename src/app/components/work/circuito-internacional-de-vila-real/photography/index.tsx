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

export default function Photography() {
  return (
    <div className="container pt-16">
      <div>
        <AnimationOnScroll animateIn="animate__fadeInUp">
          <h1 className="font-bold text-3xl md:text-5xl uppercase text-center">
            Photography
          </h1>
        </AnimationOnScroll>

        <AnimationOnScroll
          animateIn="animate__fadeInUp"
          className="animationDelay200"
        >
          <Slider {...settings} className="mt-6">
            {Array(36)
              .fill(0)
              .map((value, index) => (
                <img
                  key={"photography" + index}
                  src={`/work/circuito-internacional-de-vila-real/photography/${
                    index + 1
                  }.jpg`}
                  className="h-[75vh] object-cover"
                />
              ))}
          </Slider>
        </AnimationOnScroll>
      </div>
    </div>
  );
}
