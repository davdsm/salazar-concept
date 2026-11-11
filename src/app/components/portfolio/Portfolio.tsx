"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MaskedLine from "@/app/components/intro/MaskedLine";
import { useLang } from "@/app/i18n/LangProvider";
import { PORTFOLIO_PROJECTS } from "@/app/components/portfolio/projects";

export default function Portfolio() {
  const { t } = useLang();
  const copy = t.portfolio;
  const categories = t.fame.categories;

  const rootRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const stripRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const outroTitleRef = useRef<HTMLHeadingElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<ScrollTrigger | null>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    document.documentElement.classList.add("is-portfolio");
    return () => document.documentElement.classList.remove("is-portfolio");
  }, []);

  /* Cursor de tinta: um ponto que cresce sobre as imagens e links — o
     contraste do branco pede um gesto mais fino do que o camaleão do home. */
  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;
    if (window.matchMedia("(pointer: coarse)").matches) {
      cursor.hidden = true;
      return;
    }

    document.documentElement.classList.add("has-pf-cursor");
    const setX = gsap.quickTo(cursor, "x", { duration: 0.45, ease: "power3.out" });
    const setY = gsap.quickTo(cursor, "y", { duration: 0.45, ease: "power3.out" });

    const onMove = (event: PointerEvent) => {
      setX(event.clientX);
      setY(event.clientY);
      const target = event.target as Element | null;
      cursor.classList.toggle(
        "is-hot",
        Boolean(target?.closest("a, button, .pf-card, .pf-rail-btn"))
      );
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.classList.remove("has-pf-cursor");
    };
  }, []);

  /* A revelação tipográfica vive fora do context do strip: o pin/rebuild
     não pode reverter as letras para o translateY(100%) do CSS global. */
  useEffect(() => {
    const hero = heroRef.current;
    const title = titleRef.current;
    const outroTitle = outroTitleRef.current;
    if (!hero || !title || !outroTitle) return;

    gsap.registerPlugin(ScrollTrigger);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const tweens: gsap.core.Tween[] = [];
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

    reveal(title, 0.1);
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
          delay: reduce ? 0 : 0.4,
        }
      )
    );

    if (reduce) {
      outroTitle.classList.add("is-in");
      gsap.set(outroTitle.querySelectorAll(".text-char"), { yPercent: 0 });
    } else {
      gsap.set(outroTitle.querySelectorAll(".text-char"), { yPercent: 120, y: 0 });
      triggers.push(
        ScrollTrigger.create({
          trigger: outroTitle,
          start: "top 78%",
          once: true,
          onEnter: () => {
            tweens.push(
              gsap.to(outroTitle.querySelectorAll(".text-char"), {
                yPercent: 0,
                duration: 0.95,
                ease: "power3.out",
                stagger: 0.024,
                onComplete: () => outroTitle.classList.add("is-in"),
              })
            );
          },
        })
      );
    }

    return () => {
      tweens.forEach((tw) => tw.kill());
      triggers.forEach((st) => st.kill());
    };
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    const strip = stripRef.current;
    const track = trackRef.current;
    const progress = progressRef.current;
    if (!root || !strip || !track || !progress) return;

    gsap.registerPlugin(ScrollTrigger);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = () => window.matchMedia("(max-width: 900px)").matches;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".pf-card");
      const distance = () =>
        Math.max(0, track.scrollWidth - window.innerWidth);

      const paintCard = (index: number, visibility: number) => {
        const card = cards[index];
        if (!card) return;
        const media = card.querySelector<HTMLElement>(".pf-card-media");
        const veil = card.querySelector<HTMLElement>(".pf-card-veil");
        const label = card.querySelector<HTMLElement>(".pf-card-copy");
        const angle = card.querySelector<HTMLElement>(".pf-card-angle");
        if (!media || !veil || !label) return;

        const open = Math.max(0, Math.min(1, (visibility - 0.12) / 0.72));
        /* O véu é branco: o clip-path é a parte AINDA tapada. open=0 cobre
           tudo; open=1 encolhe o polígono até uma linha na direita. */
        const edge = open * 100;
        const edgeBottom = open * 86;
        gsap.set(media, {
          scale: 1.14 - visibility * 0.14,
          rotate: (index % 2 === 0 ? -1.25 : 1.25) * (1 - visibility),
        });
        gsap.set(veil, {
          clipPath: `polygon(${edge}% 0, 100% 0, 100% 100%, ${edgeBottom}% 100%)`,
        });
        gsap.set(label, {
          y: 40 * (1 - open),
          opacity: open,
        });
        if (angle) {
          gsap.set(angle, {
            rotate: -18 + open * 18,
            opacity: 0.18 + open * 0.55,
          });
        }
      };

      const killStrip = () => {
        pinRef.current = null;
        ScrollTrigger.getAll()
          .filter((st) => st.vars.id === "pf-strip")
          .forEach((st) => st.kill());
        gsap.set(track, { clearProps: "transform" });
        gsap.set(progress, { scaleX: 0 });
      };

      const build = () => {
        killStrip();

        if (isMobile() || reduce) {
          cards.forEach((card, index) => {
            paintCard(index, 1);
            ScrollTrigger.create({
              id: "pf-strip",
              trigger: card,
              start: "top 60%",
              end: "bottom 40%",
              onToggle: (self) => {
                if (self.isActive) setActive(index);
              },
            });
            const media = card.querySelector(".pf-card-media");
            if (!media || reduce) return;
            gsap.fromTo(
              media,
              { scale: 1.08, yPercent: 5 },
              {
                scale: 1,
                yPercent: 0,
                ease: "none",
                scrollTrigger: {
                  id: "pf-strip",
                  trigger: card,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: true,
                },
              }
            );
          });
          return;
        }

        cards.forEach((_, index) => paintCard(index, index === 0 ? 1 : 0.15));

        const pin = ScrollTrigger.create({
          id: "pf-strip",
          trigger: strip,
          start: "top top",
          end: () => `+=${distance() + window.innerHeight * 0.4}`,
          pin: true,
          scrub: 0.85,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const travel = distance();
            const x = -travel * self.progress;
            gsap.set(track, { x });
            gsap.set(progress, { scaleX: self.progress });

            const width = track.scrollWidth / Math.max(1, cards.length);
            const focus = -x + window.innerWidth * 0.5;
            let best = 0;
            let bestScore = -Infinity;
            cards.forEach((_, index) => {
              const center = width * index + width * 0.5;
              const delta = (focus - center) / width;
              const visibility = 1 - Math.min(1.2, Math.abs(delta));
              paintCard(index, Math.max(0, visibility));
              if (visibility > bestScore) {
                bestScore = visibility;
                best = index;
              }
            });
            setActive((prev) => (prev === best ? prev : best));
          },
        });
        pinRef.current = pin;
      };

      build();
      const onResize = () => {
        build();
        ScrollTrigger.refresh();
      };
      window.addEventListener("resize", onResize);
      return () => window.removeEventListener("resize", onResize);
    }, root);

    return () => {
      pinRef.current = null;
      ctx.revert();
    };
  }, []);

  useEffect(() => {
    const el = counterRef.current;
    if (!el) return;
    el.textContent = String(active + 1).padStart(2, "0");
  }, [active]);

  const jumpTo = (index: number) => {
    const strip = stripRef.current;
    if (!strip) return;
    if (window.matchMedia("(max-width: 900px)").matches) {
      const card = strip.querySelectorAll(".pf-card")[index] as
        | HTMLElement
        | undefined;
      card?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    const pin = pinRef.current;
    if (!pin) return;
    const max = Math.max(1, PORTFOLIO_PROJECTS.length - 1);
    const y = pin.start + (pin.end - pin.start) * (index / max);
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  return (
    <main ref={rootRef} className="portfolio">
      <div ref={cursorRef} className="pf-cursor" aria-hidden="true" />

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

        <ul className="pf-film pf-hero-fade" aria-hidden="true">
          {PORTFOLIO_PROJECTS.map((project) => (
            <li key={project.id}>
              <img src={project.src} alt="" />
            </li>
          ))}
        </ul>
      </section>

      <section ref={stripRef} className="pf-strip" aria-label={copy.eyebrow}>
        <div className="pf-strip-hud">
          <div className="pf-counter" aria-live="polite">
            <span ref={counterRef}>01</span>
            <span className="pf-counter-of">
              {copy.of} {String(PORTFOLIO_PROJECTS.length).padStart(2, "0")}
            </span>
          </div>
          <nav className="pf-rail" aria-label={copy.indexLabel}>
            {PORTFOLIO_PROJECTS.map((project, index) => (
              <button
                key={project.id}
                type="button"
                className={`pf-rail-btn${active === index ? " is-active" : ""}`}
                aria-current={active === index ? "true" : undefined}
                onClick={() => jumpTo(index)}
              >
                <span className="pf-rail-num">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="pf-rail-name">{project.client}</span>
              </button>
            ))}
          </nav>
          <div className="pf-progress" aria-hidden="true">
            <div ref={progressRef} className="pf-progress-bar" />
          </div>
        </div>

        <div ref={trackRef} className="pf-track">
          {PORTFOLIO_PROJECTS.map((project, index) => (
            <article
              key={project.id}
              className="pf-card"
              data-index={index}
              aria-label={`${project.client} — ${categories[index]}`}
            >
              <div className="pf-card-frame">
                <div className="pf-card-angle" aria-hidden="true" />
                <div className="pf-card-media-wrap">
                  <img
                    className="pf-card-media"
                    src={project.src}
                    alt={`${project.client} — ${categories[index]}`}
                    draggable={false}
                  />
                  <div className="pf-card-veil" aria-hidden="true" />
                </div>
                <span className="pf-card-index" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <div className="pf-card-copy">
                <p className="pf-card-cat">
                  {categories[index]}
                  <span aria-hidden="true"> · </span>
                  {project.year}
                </p>
                <h2 className="pf-card-name">{project.client}</h2>
                <p className="pf-card-blurb">{copy.projects[index].blurb}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="pf-outro">
        <h2 ref={outroTitleRef} className="pf-outro-title">
          <MaskedLine text={copy.outroTitle} wrapWords />
        </h2>
        <p className="pf-outro-body">{copy.outroBody}</p>
        <a className="pf-outro-cta" href="/">
          <span>{copy.outroCta}</span>
          <span className="pf-outro-cta-icon" aria-hidden="true">
            →
          </span>
        </a>
      </section>
    </main>
  );
}
