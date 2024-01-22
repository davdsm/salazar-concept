import Image from "next/image";

import Social from "@/app/components/common/social";

export default function Entry() {
  return (
    <section className="h-screen bg-black relative">
      <Image src="/street.jpg" fill alt="Salazar Concept" />

      <Image
        src="/logo.png"
        alt="Salazar Concept"
        fill
        className="object-contain"
        priority
        sizes="100vw"
      />

      <div className="container text-white flex items-center justify-between absolute w-full bottom-10 sm:bottom-20 underline flex-col sm:flex-row gap-5 -translate-x-2/4 left-2/4">
        <Social />
      </div>
    </section>
  );
}
