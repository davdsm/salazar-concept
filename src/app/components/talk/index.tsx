import { AnimationOnScroll } from "react-animation-on-scroll";

import Form from "./form";

const steps = [
  {
    id: 1,
    step: "01",
    question: "Salazar Concept is Lorem ipsum?",
    answer: "Salazar Concept is Lorem ipsum?",
  },
  {
    id: 2,
    step: "02",
    question: "Salazar Concept is Lorem ipsum?",
    answer: "Salazar Concept is Lorem ipsum?",
  },
  {
    id: 3,
    step: "03",
    question: "Salazar Concept is Lorem ipsum?",
    answer: "Salazar Concept is Lorem ipsum?",
  },
];

export default function Talk({
  handleSubmit,
}: {
  handleSubmit: (event: any) => void;
}) {
  return (
    <section className="container mt-10 pt-10 sm:mt-30 relative">
      <div id="talk" className="absolute -top-[104px]"></div>

      <AnimationOnScroll  animateIn="animate__fadeIn">
        <h1 className="font-bold text-4xl sm:text-8xl uppercase text-center">
          Work with us
        </h1>
      </AnimationOnScroll>

      <AnimationOnScroll  animateIn="animate__fadeIn">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-16 mt-14 sm:mt-20">
          <div>
            {steps.map(({ id, step, question, answer }) => (
              <div
                key={id}
                className="flex gap-10 mb-8 pb-8 border-b border-black"
              >
                <h4 className="font-medium uppercase text-xl whitespace-nowrap">
                  Step {step}
                </h4>

                <div>
                  <p className="underline mb-4 font-medium text-base">
                    {question}
                  </p>
                  <p className="font-medium text-base text-zinc-500">
                    {answer}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <Form handleSubmit={handleSubmit} />
        </div>
      </AnimationOnScroll>
    </section>
  );
}