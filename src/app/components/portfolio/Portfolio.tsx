"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MaskedLine from "@/app/components/intro/MaskedLine";
import SiteFooter from "@/app/components/intro/SiteFooter";
import { useLang } from "@/app/i18n/LangProvider";
import { PORTFOLIO_PROJECTS } from "@/app/components/portfolio/projects";

export default function Portfolio() {
  const { t } = useLang();
  const copy = t.portfolio;
  const categories = t.fame.categories;

  const rootRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const heroMediaRef = useRef<HTMLImageElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const listMediaRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    document.documentElement.classList.add("is-portfolio");
    return () => document.documentElement.classList.remove("is-portfolio");
  }, []);

  useEffect(() => {
    const hero = heroRef.current;
    const title = titleRef.current;
    const media = heroMediaRef.current;
    if (!hero || !title || !media) return;

    gsap.registerPlugin(ScrollTrigger);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const tweens: (gsap.core.Tween | gsap.core.Timeline)[] = [];
    const triggers: ScrollTrigger[] = [];

    const reveal = (heading: HTMLElement, delay = 0) => {
      const chars = heading.querySelectorAll(".text-char");
      if (reduce) {
        heading.classList.add("is-in");
        gsap.set(chars, { yPercent: 0 });
        return;
      }
      gsap.set(chars, { yPercent: 120, y: 0 });
      tweens.push(
        gsap.to(chars, {
          yPercent: 0,
          duration: 1.05,
          ease: "power3.out",
          stagger: 0.028,
          delay,
          onComplete: () => heading.classList.add("is-in"),
        })
      );
    };

    if (reduce) {
      gsap.set(media, { scale: 1 });
      gsap.set(hero.querySelector(".pf-hero-veil"), { autoAlpha: 0 });
    } else {
      gsap.set(media, { scale: 1.18 });
      gsap.set(hero.querySelector(".pf-hero-veil"), {
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
      });
      tweens.push(
        gsap
          .timeline()
          .to(hero.querySelector(".pf-hero-veil"), {
            clipPath: "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)",
            duration: 1.35,
            ease: "expo.inOut",
            onComplete: () => {
              gsap.set(hero.querySelector(".pf-hero-veil"), { autoAlpha: 0 });
            },
          })
          .to(media, { scale: 1, duration: 1.55, ease: "power3.out" }, 0)
      );
      triggers.push(
        ScrollTrigger.create({
          trigger: hero,
          start: "top top",
          end: "bottom top",
          scrub: true,
          onUpdate: (self) => {
            gsap.set(media, { yPercent: self.progress * 12 });
          },
        })
      );
    }

    reveal(title, 0.28);
    tweens.push(
      gsap.fromTo(
        hero.querySelectorAll(".pf-hero-fade"),
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.08,
          delay: reduce ? 0 : 0.55,
        }
      )
    );

    return () => {
      tweens.forEach((tw) => tw.kill());
      triggers.forEach((st) => st.kill());
    };
  }, []);

  /* Crossfade da imagem do índice tipográfico. */
  useEffect(() => {
    const stage = listMediaRef.current;
    if (!stage) return;
    const frames = stage.querySelectorAll<HTMLElement>(".pf-index-frame");
    if (!frames.length) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    frames.forEach((frame, index) => {
      const on = index === active;
      if (reduce) {
        gsap.set(frame, { autoAlpha: on ? 1 : 0, scale: 1 });
        return;
      }
      gsap.to(frame, {
        autoAlpha: on ? 1 : 0,
        scale: on ? 1 : 1.03,
        duration: on ? 0.55 : 0.4,
        ease: on ? "power3.out" : "power2.out",
        overwrite: "auto",
      });
    });
  }, [active]);

  return (
    <main ref={rootRef} className="portfolio">
      <header className="pf-top">
        <a className="pf-back" href="/">
          <span className="pf-back-arrow" aria-hidden="true">
            ←
          </span>
          <span>{copy.back}</span>
        </a>
        <a className="pf-brand" href="/" aria-label="Salazar Concept">
          <img src="/logo/wordmark.png" alt="" />
        </a>
        <p className="pf-top-label">{copy.eyebrow}</p>
      </header>

      <section ref={heroRef} className="pf-hero">
        <div className="pf-hero-copy">
          <p className="pf-eyebrow pf-hero-fade">{copy.eyebrow}</p>
          <h1 ref={titleRef} className="pf-title">
            {copy.titleLines.map((line) => (
              <span className="pf-title-line" key={line}>
                <MaskedLine text={line} />
              </span>
            ))}
          </h1>
          <p className="pf-lede pf-hero-fade">{copy.lede}</p>
          <div className="pf-hero-meta pf-hero-fade">
            <span>{String(PORTFOLIO_PROJECTS.length).padStart(2, "0")}</span>
            <span className="pf-hero-meta-sep" aria-hidden="true" />
            <span>{copy.scroll}</span>
          </div>
        </div>

        <div className="pf-hero-visual">
          <div className="pf-hero-stage">
            <img
              ref={heroMediaRef}
              className="pf-hero-media"
              src={PORTFOLIO_PROJECTS[0].src}
              alt=""
              draggable={false}
            />
            <div className="pf-hero-veil" aria-hidden="true" />
            <div className="pf-hero-shade" aria-hidden="true" />
          </div>
          <figure className="pf-hero-aside pf-hero-aside-a pf-hero-fade">
            <img src={PORTFOLIO_PROJECTS[1].src} alt="" draggable={false} />
          </figure>
          <figure className="pf-hero-aside pf-hero-aside-b pf-hero-fade">
            <img src={PORTFOLIO_PROJECTS[2].src} alt="" draggable={false} />
          </figure>
        </div>
      </section>

      <section className="pf-index" aria-label={copy.eyebrow}>
        <div className="pf-index-media" ref={listMediaRef} aria-hidden="true">
          {PORTFOLIO_PROJECTS.map((project, index) => (
            <div
              key={project.id}
              className={`pf-index-frame${active === index ? " is-active" : ""}`}
            >
              <img src={project.src} alt="" draggable={false} />
            </div>
          ))}
        </div>

        <ol className="pf-index-list">
          {PORTFOLIO_PROJECTS.map((project, index) => {
            const isActive = active === index;
            return (
              <li key={project.id}>
                <button
                  type="button"
                  className={`pf-index-row${isActive ? " is-active" : ""}`}
                  aria-current={isActive ? "true" : undefined}
                  onMouseEnter={() => setActive(index)}
                  onFocus={() => setActive(index)}
                  onClick={() => setActive(index)}
                >
                  <span className="pf-index-num">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="pf-index-body">
                    <span className="pf-index-name">{project.client}</span>
                    <span className="pf-index-meta">
                      {categories[index]}
                      <span aria-hidden="true"> · </span>
                      {project.year}
                    </span>
                    <span
                      className={`pf-index-blurb${isActive ? " is-open" : ""}`}
                    >
                      {copy.projects[index].blurb}
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      </section>

      <SiteFooter />
    </main>
  );
}
