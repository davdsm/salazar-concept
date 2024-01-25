import Image from "next/image";

import Social from "@/app/components/common/social";

export default function Entry() {
  return (
    <section className="h-screen bg-black relative">
      <Image
        src="/street.jpg"
        fill
        alt="Salazar Concept"
        priority
        className="animate__animated animate__fadeIn animate__delay-4s"
      />

      <Image
        src="/logo.gif"
        alt="Salazar Concept"
        fill
        className="object-contain animate__animated animate__fadeIn"
        style={{ animationDelay: "4400ms !important" }}
        priority
        sizes="100vw"
      />

      <div
        style={{ animationDelay: "4600ms !important" }}
        className="animate__animated animate__fadeIn container text-white flex items-center justify-between absolute w-full bottom-10 sm:bottom-20 underline flex-col sm:flex-row gap-5 -translate-x-2/4 left-2/4"
      >
        <Social />
      </div>
    </section>
  );
}
