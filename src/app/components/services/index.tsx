import Image from "next/image";

const services = [
  {
    id: 1,
    name: "Photography",
    img: "/logo.svg",
    details: [
      "Fotografia editorial",
      "Fotografia editorial",
      "Fotografia editorial",
      "Fotografia editorial",
      "Fotografia editorial",
      "Fotografia editorial",
    ],
  },
  {
    id: 2,
    name: "Design",
    img: "/logo.svg",
    details: [
      "Fotografia editorial",
      "Fotografia editorial",
      "Fotografia editorial",
      "Fotografia editorial",
      "Fotografia editorial",
      "Fotografia editorial",
    ],
  },
  {
    id: 3,
    name: "Video",
    img: "/logo.svg",
    details: [
      "Fotografia editorial",
      "Fotografia editorial",
      "Fotografia editorial",
      "Fotografia editorial",
      "Fotografia editorial",
      "Fotografia editorial",
    ],
  },
  {
    id: 4,
    name: "Communication",
    img: "/logo.svg",
    details: [
      "Fotografia editorial",
      "Fotografia editorial",
      "Fotografia editorial",
      "Fotografia editorial",
      "Fotografia editorial",
      "Fotografia editorial",
    ],
  },
  {
    id: 5,
    name: "Website",
    img: "/logo.svg",
    details: [
      "Fotografia editorial",
      "Fotografia editorial",
      "Fotografia editorial",
      "Fotografia editorial",
      "Fotografia editorial",
      "Fotografia editorial",
    ],
  },
  {
    id: 6,
    name: "Marketing",
    img: "/logo.svg",
    details: [
      "Fotografia editorial",
      "Fotografia editorial",
      "Fotografia editorial",
      "Fotografia editorial",
      "Fotografia editorial",
      "Fotografia editorial",
    ],
  },
];

export default function Services() {
  return (
    <section className="container pt-10 mt-20 sm:pt-20 relative">
      <div id="services" className="absolute -top-[104px]"></div>

      <h1 className="font-bold text-4xl sm:text-8xl uppercase">Services</h1>

      <h3 className="font-bold mt-6 text-2xl">What are you searching?</h3>

      <Image
        src="/logo.gif"
        alt="Salazar Concept"
        width={350}
        height={350}
        className="absolute right-32 -top-24 hidden lg:inline"
      />

      <div className="mt-6 sm:mt-10">
        {services.map(({ id, img, name, details }) => (
          <div
            key={id}
            className="flex mb-8 flex-col md:flex-row items-center text-center md:text-left"
          >
            <Image src={img} width={120} height={120} alt={name} />
            <div>
              <h2 className="font-bold text-3xl sm:text-6xl uppercase">
                {name}
              </h2>

              <div className="flex gap-3 mt-2 flex-wrap justify-center md:justify-start">
                {details.map((detail, index) => (
                  <p
                    key={`${detail}-${index}`}
                    className={`border border-black rounded-full px-1 py-1.5 text-xs uppercase ${
                      index === details.length - 1 ? "bg-black text-white" : ""
                    }`}
                  >
                    {detail}
                  </p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
