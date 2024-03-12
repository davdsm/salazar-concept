import Image from "next/image";

import Social from "@/app/components/common/social";

export default function Entry() {
  return (
    <section className="h-screen bg-black relative overflow-hidden">
      <Image
        src="/home/street.jpg"
        fill
        alt="Salazar Concept"
        priority
        className="entry-animation h-screen object-cover"
      />

      <div className="z-10 right-0 left-0 container text-white flex items-center justify-between absolute w-full bottom-10 sm:bottom-20 underline flex-col sm:flex-row gap-5">
        <Social />
      </div>
    </section>
  );
}
