"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MaskedLine from "@/app/components/intro/MaskedLine";

const LEGACY_LEAD = "A brand becomes something you never forget.";
const LEGACY_TITLE = "Made once.";
const LEGACY_TITLE_EM = "Impact forever.";
const LEGACY_BODY =
  "What we create is not made for the moment alone. It is shaped to hold its meaning, its beauty, and its place long after the first impression has passed. Every project is built to endure, with the same care on the hundredth day as on the first.";

export default function LegacySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const leadRef = useRef<HTMLParagraphElement>(null);
  const leftMaskRef = useRef<HTMLDivElement>(null);
  const leftImgRef = useRef<HTMLImageElement>(null);
  const shotARef = useRef<HTMLElement>(null);
  const shotBRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const lead = leadRef.current;
    const leftMask = leftMaskRef.current;
    const leftImg = leftImgRef.current;
    const shotA = shotARef.current;
    const shotB = shotBRef.current;
    const title = titleRef.current;

    if (!section || !lead || !leftMask || !leftImg || !shotA || !shotB || !title)
      return;

    gsap.registerPlugin(ScrollTrigger);

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const titleChars = title.querySelectorAll(".text-char");
    gsap.set(titleChars, { yPercent: reduce ? 0 : 130, y: 0 });

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
            // Medir depois do pin do Intro (refreshPriority 10) e do carousel
            // (5): ambos vivem acima desta secção e alteram a altura do
            // documento, logo a posição a que ela começa.
            refreshPriority: 0,
            invalidateOnRefresh: true,
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
            refreshPriority: 0,
            invalidateOnRefresh: true,
          },
        }
      );
    };

    const ctx = gsap.context(() => {
      /* Emerge do vazio que a precede: a máscara abre de baixo para cima ao
         ritmo do scroll, por isso as letras nascem do bege em vez de já lá
         estarem quando o carousel se afasta. */
      gsap.fromTo(
        lead,
        { clipPath: "inset(105% 0 0 0)", y: 34 },
        {
          clipPath: "inset(0% 0 0 0)",
          y: 0,
          ease: "none",
          immediateRender: false,
          scrollTrigger: {
            trigger: lead,
            start: "top 92%",
            end: "top 46%",
            scrub: 1.15,
            refreshPriority: 0,
            invalidateOnRefresh: true,
          },
        }
      );

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
            refreshPriority: 0,
            invalidateOnRefresh: true,
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
            refreshPriority: 0,
            invalidateOnRefresh: true,
          },
        }
      );
    }, section);

    const titleTl = gsap.timeline({ paused: true });
    title.querySelectorAll(".legacy-title-line").forEach((line, index) => {
      titleTl.to(
        line.querySelectorAll(".text-char"),
        {
          yPercent: 0,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.028,
        },
        index * 0.16
      );
    });

    let titleDelay: gsap.core.Tween | null = null;
    const titleIo = new IntersectionObserver(
      (entries) => {
        if (!entries[entries.length - 1]?.isIntersecting) return;
        titleIo.disconnect();
        titleDelay = gsap.delayedCall(0.12, () => titleTl.play());
      },
      { threshold: 0.4, rootMargin: "0px 0px -12% 0px" }
    );
    titleIo.observe(title);

    // Na primeira montagem o pin do Intro pode ainda não existir; adiar o
    // refresh para o fim do ciclo garante que já entrou na conta.
    const settle = requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      titleDelay?.kill();
      titleIo.disconnect();
      titleTl.kill();
      cancelAnimationFrame(settle);
      ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className="legacy" aria-labelledby="legacy-lead">
      <p ref={leadRef} id="legacy-lead" className="legacy-lead">
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
            <h2 ref={titleRef} className="legacy-title">
              <span className="legacy-title-line">
                <MaskedLine text={LEGACY_TITLE} />
              </span>
              <span className="legacy-title-line">
                <MaskedLine text={LEGACY_TITLE_EM} />
              </span>
            </h2>
            <p className="legacy-body">{LEGACY_BODY}</p>
          </article>
        </div>
      </div>
    </section>
  );
}
