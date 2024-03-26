import { AnimationOnScroll } from "react-animation-on-scroll";

export default function Social() {
  return (
    <div className="container pt-16">
      <AnimationOnScroll animateIn="animate__fadeInUp">
        <div>
          <h1 className="font-bold text-3xl md:text-5xl uppercase">
            COMMUNICATION ON SOCIAL MEDIA
          </h1>

          <div className="flex justify-between mt-16 flex-col sm:flex-row gap-10">
            <AnimationOnScroll
              animateIn="animate__fadeInUp"
              className="sm:w-1/3"
            >
              <video controls className="w-full h-[70vh] object-cover">
                <source
                  src="/work/circuito-internacional-de-vila-real/redes.MP4"
                  type="video/mp4"
                />
              </video>
            </AnimationOnScroll>

            <AnimationOnScroll
              animateIn="animate__fadeInUp"
              className="sm:w-1/3 animationDelay200"
            >
              <video controls className="w-full h-[70vh] object-cover">
                <source
                  src="/work/circuito-internacional-de-vila-real/redes-2.mp4"
                  type="video/mp4"
                />
              </video>
            </AnimationOnScroll>
          </div>
        </div>
      </AnimationOnScroll>
    </div>
  );
}
