import { AnimationOnScroll } from "react-animation-on-scroll";

export default function Video() {
  return (
    <div className="pt-20">
      <AnimationOnScroll animateIn="animate__fadeInUp">
        <video controls className="h-[80vh] w-screen object-cover">
          <source
            src="/work/circuito-internacional-de-vila-real/evento.mp4"
            type="video/mp4"
          />
        </video>
      </AnimationOnScroll>
    </div>
  );
}
