import Image from "next/image";

export default function Loading() {
  return (
    <div className="bg-black h-screen flex">
      <div className="w-full">
        <div className="sm:w-[70%] m-auto relative h-full">
          <Image
            src="/logo.gif"
            fill
            alt="Salazar Concept"
            className="object-contain animate__animated animate__fadeIn"
            sizes="(min-width: 640px) 70vw, 100vw"
            priority
          />
        </div>
        <h1 className="break-words text-center sm:text-left w-[270px] sm:w-[570px] loading-animation p-3 sm:p-0 text-white text-4xl sm:text-5xl font-bold absolute mix-blend-difference top-1/2 left-1/2 -translate-x-2/4 -translate-y-1/2 uppercase">
          Embrace the
        </h1>
      </div>
    </div>
  );
}
