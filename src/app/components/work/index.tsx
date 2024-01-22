import Image from "next/image";

const projects = [
  {
    id: 1,
    img: "/street.jpg",
    name: "Salazar concept is lorem ipsum?",
  },
  {
    id: 2,
    img: "/street.jpg",
    name: "Salazar concept is lorem ipsum?",
  },
  {
    id: 3,
    img: "/street.jpg",
    name: "Salazar concept is lorem ipsum?",
  },
  {
    id: 4,
    img: "/street.jpg",
    name: "Salazar concept is lorem ipsum?",
  },
  {
    id: 5,
    img: "/street.jpg",
    name: "Salazar concept is lorem ipsum?",
  },
  {
    id: 6,
    img: "/street.jpg",
    name: "Salazar concept is lorem ipsum?",
  },
];

export default function Work() {
  return (
    <section className="container pt-10 mt-10 sm:mt-30 relative">
      <div id="work" className="absolute -top-[104px]"></div>

      <h1 className="font-bold text-4xl sm:text-8xl uppercase">
        Discover our work
      </h1>

      <div className="mt-6 mb-16 grid grid-cols-1 sm:grid-cols-2 gap-x-1 gap-y-10">
        {projects.map(({ id, name, img }) => (
          <div key={id}>
            <div className="h-96 relative">
              <Image src={img} fill alt={name} sizes="50vw" />
            </div>

            <p className="tracking-wider font-medium mt-2 text-base sm:text-xl uppercase">
              {name}
            </p>
          </div>
        ))}
      </div>

      <a className="underline" href="#">
        Discover our work
      </a>
    </section>
  );
}
