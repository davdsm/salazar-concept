"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const LEGACY_LEAD = "A brand becomes something you never forget.";
const LEGACY_TITLE = "Made once.";
const LEGACY_TITLE_EM = "Impact forever.";
const LEGACY_BODY =
  "What we create is not made for the moment alone. It is shaped to hold its meaning, its beauty, and its place long after the first impression has passed. Every project is built to endure — with the same care on the hundredth day as on the first.";

export default function LegacySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftMaskRef = useRef<HTMLDivElement>(null);
  const leftImgRef = useRef<HTMLImageElement>(null);
  const shotARef = useRef<HTMLElement>(null);
  const shotBRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const leftMask = leftMaskRef.current;
    const leftImg = leftImgRef.current;
    const shotA = shotARef.current;
    const shotB = shotBRef.current;

    if (!section || !leftMask || !leftImg || !shotA || !shotB) return;

    gsap.registerPlugin(ScrollTrigger);

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduce) return;

    const reveal = (
      mask: Element,
      img: Element | null,
      trigger: Element,
      parallax: { from: number; to: number; scrub: number }
    ) => {
      gsap.fromTo(
        mask,
        { clipPath: "inset(100% 0 0 0)" },
        {
          clipPath: "inset(0% 0 0 0)",
          ease: "none",
          immediateRender: false,
          scrollTrigger: {
            trigger,
            start: "top 92%",
            end: "top 42%",
            scrub: 1.1,
          },
        }
      );

      if (!img) return;

      gsap.fromTo(
        img,
        { scale: 1.32, yPercent: parallax.from },
        {
          scale: 1,
          yPercent: parallax.to,
          ease: "none",
          immediateRender: false,
          scrollTrigger: {
            trigger,
            start: "top bottom",
            end: "bottom top",
            scrub: parallax.scrub,
          },
        }
      );
    };

    const ctx = gsap.context(() => {
      reveal(leftMask, leftImg, leftMask, {
        from: 10,
        to: -16,
        scrub: 1.45,
      });

      const shotAImg = shotA.querySelector("img");
      const shotBImg = shotB.querySelector("img");

      reveal(shotA, shotAImg, shotA, { from: 16, to: -28, scrub: 1.7 });
      reveal(shotB, shotBImg, shotB, { from: 8, to: -12, scrub: 0.45 });

      gsap.fromTo(
        shotA,
        { y: 90 },
        {
          y: -70,
          ease: "none",
          immediateRender: false,
          scrollTrigger: {
            trigger: shotA,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          },
        }
      );

      gsap.fromTo(
        shotB,
        { y: 20 },
        {
          y: -140,
          ease: "none",
          immediateRender: false,
          scrollTrigger: {
            trigger: shotB,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.5,
          },
        }
      );
    }, section);

    ScrollTrigger.refresh();

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="legacy" aria-labelledby="legacy-lead">
      <p id="legacy-lead" className="legacy-lead">
        {LEGACY_LEAD}
      </p>

      <div className="legacy-layout">
        <div className="legacy-left">
          <div ref={leftMaskRef} className="legacy-left-sticky">
            <img
              ref={leftImgRef}
              src="/images/legacy/hero.jpg"
              alt=""
              draggable={false}
            />
          </div>
        </div>

        <div className="legacy-right">
          <div className="legacy-gallery">
            <figure ref={shotARef} className="legacy-shot">
              <img
                src="/images/legacy/detail-a.jpg"
                alt=""
                draggable={false}
              />
            </figure>
            <figure ref={shotBRef} className="legacy-shot is-offset">
              <img
                src="/images/legacy/detail-b.jpg"
                alt=""
                draggable={false}
              />
            </figure>
          </div>

          <article className="legacy-story">
            <h2 className="legacy-title">
              {LEGACY_TITLE}{" "}
              <em>{LEGACY_TITLE_EM}</em>
            </h2>
            <p className="legacy-body">{LEGACY_BODY}</p>
          </article>
        </div>
      </div>
    </section>
  );
}
