import { AnimationOnScroll } from "react-animation-on-scroll";

const clients = [
  { id: 1 },
  { id: 2 },
  { id: 3 },
  { id: 4 },
  { id: 5 },
  { id: 6 },
];

export default function Clients() {
  return (
    <AnimationOnScroll animateIn="animate__fadeInUp">
      <section className="container mt-16 pt-10 relative max-w-none">
        <div id="clients" className="absolute -top-[104px]"></div>

        <h1 className="font-bold text-4xl sm:text-8xl uppercase">Clients</h1>

        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4 items-center">
          {clients.map(({ id }, index) => (
            <AnimationOnScroll
              key={id}
              animateIn="animate__fadeIn"
              style={{ animationDelay: `${100 * index}ms !important` }}
            >
              <div className="client bg-black rounded-full w-32 h-32 mx-auto hover:drop-shadow-2xl"></div>
            </AnimationOnScroll>
          ))}
        </div>
      </section>
    </AnimationOnScroll>
  );
}
