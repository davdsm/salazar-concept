import Image from "next/image";
import { Parallax } from "react-scroll-parallax";

export default function Loading() {
  return (
    <div className="h-screen flex absolute top-0 right-0 w-full z-10 loader-background-animation">
      <div className="w-full animate__animated animate__fadeIn">
        <div className="sm:w-[70%] m-auto relative h-full">
          <Parallax speed={-30} className="sm:w-[100%] m-auto relative h-full">
            <Image
              src="/logo.gif"
              fill
              alt="Salazar Concept"
              className="object-contain animal-animation"
              sizes="(min-width: 640px) 70vw, 100vw"
              priority
            />
          </Parallax>
        </div>
        <h1 className="break-words text-center sm:text-left w-[270px] sm:w-[570px] text-animation p-3 sm:p-0 text-white text-4xl sm:text-5xl font-bold absolute mix-blend-difference top-1/2 left-1/2 -translate-x-2/4 -translate-y-1/2 uppercase loader-animation">
          Embrace the
        </h1>
      </div>
    </div>
  );
}
