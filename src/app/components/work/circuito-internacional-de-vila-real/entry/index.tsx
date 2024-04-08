import { useCallback, useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";

export default function Entry() {
  const videoRef = useRef<HTMLVideoElement>();

  const { ref: inViewRef, inView } = useInView({
    delay: 1000,
    triggerOnce: true,
  });

  const setRefs = useCallback(
    (node: HTMLVideoElement) => {
      videoRef.current = node;
      inViewRef(node);
    },
    [inViewRef]
  );

  useEffect(() => {
    if (inView) videoRef.current!.play();
  }, [inView]);

  return (
    <section className="h-screen bg-black overflow-hidden">
      <video
        muted
        loop
        className="h-screen object-cover w-full"
        ref={setRefs}
      >
        <source
          src="/work/circuito-internacional-de-vila-real/banner-abertura.mp4"
          type="video/mp4"
        />
      </video>
    </section>
  );
}
