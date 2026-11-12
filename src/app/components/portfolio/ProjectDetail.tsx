"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SiteFooter from "@/app/components/intro/SiteFooter";
import { useEnterReveal } from "@/app/components/common/useEnterReveal";
import { useLang } from "@/app/i18n/LangProvider";
import {
  getNextWorkProject,
  getWorkProject,
  type WorkProject,
} from "@/app/components/portfolio/projects";

export default function ProjectDetail({ slug }: { slug: string }) {
  const { t } = useLang();
  const copy = t.portfolio;
  const project = getWorkProject(slug) as WorkProject | undefined;
  const story = project ? copy.project.cases[project.id] : undefined;
  const next = project ? getNextWorkProject(slug) : undefined;
  const rootRef = useRef<HTMLElement>(null);
  const visualRef = useRef<HTMLElement | null>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    document.documentElement.classList.add("is-portfolio");

    const visual = visualRef.current;
    const image = imageRef.current;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      if (!visual || !image || reduce) return;

      gsap.fromTo(
        image,
        { yPercent: -12, scale: 1.22 },
        {
          yPercent: 12,
          scale: 1.22,
          ease: "none",
          scrollTrigger: {
            trigger: visual,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.15,
            invalidateOnRefresh: true,
          },
        }
      );
    }, visual ?? undefined);

    const settle = requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      cancelAnimationFrame(settle);
      ctx.revert();
      document.documentElement.classList.remove("is-portfolio");
    };
  }, [slug]);

  useEnterReveal(
    rootRef,
    [
      { selector: ".pd-back, .pd-brand", at: 0, stagger: 0.06, y: 18, duration: 0.75 },
      { selector: ".pd-visual", at: 0.05, y: 40, duration: 1.05 },
      {
        selector: ".pd-eyebrow, .pd-title, .pd-lede, .pd-body, .pd-cta",
        at: 0.12,
        stagger: 0.07,
        y: 32,
        duration: 0.9,
      },
      { selector: ".pd-thumb", at: 0.28, stagger: 0.08, y: 36, duration: 0.85 },
    ],
    [slug]
  );

  if (!project || !story) return null;

  const thumbs = project.gallery.slice(0, 3);
  const gallery = [project.src, ...project.gallery];

  return (
    <main ref={rootRef} className="project is-awaiting-enter">
      <header className="pd-top">
        <a className="pd-back" href="/work">
          <span className="pd-back-arrow" aria-hidden="true">
            ←
          </span>
          <span>{copy.project.back}</span>
        </a>
        <a className="pd-brand" href="/" aria-label="Salazar Concept">
          <img src="/logo/wordmark.png" alt="" />
        </a>
        <span className="pd-top-spacer" aria-hidden="true" />
      </header>

      <section className="pd-stage">
        <figure className="pd-visual" ref={visualRef}>
          <img
            ref={imageRef}
            className="pd-visual-img"
            src={project.src}
            alt=""
            draggable={false}
          />
        </figure>

        <div className="pd-copy">
          <div className="pd-copy-main">
            <p className="pd-eyebrow">
              {copy.filters[project.cat]}
              <span aria-hidden="true"> · </span>
              {project.year}
            </p>
            <h1 className="pd-title">{story.title}</h1>
            <p className="pd-lede">{story.lede}</p>
            <p className="pd-body">{story.body}</p>
            <a className="pd-cta" href="mailto:geral@salazarconcept.com">
              {copy.project.cta}
            </a>
          </div>

          <ul className="pd-thumbs">
            {thumbs.map((src, index) => (
              <li key={src} className="pd-thumb">
                <img src={src} alt="" draggable={false} />
                <span>{story.frames[index]}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="pd-chapters">
        <article className="pd-chapter">
          <h2>{copy.project.approach}</h2>
          <p>{story.approach}</p>
        </article>
        <article className="pd-chapter">
          <h2>{copy.project.outcome}</h2>
          <p>{story.outcome}</p>
        </article>
      </section>

      <section className="pd-gallery" aria-label={project.client}>
        {gallery.map((src, index) => (
          <figure
            key={`${src}-${index}`}
            className={`pd-shot${index === 0 ? " is-wide" : ""}`}
          >
            <img src={src} alt="" draggable={false} />
          </figure>
        ))}
      </section>

      {next ? (
        <a className="pd-next" href={`/work/${next.id}`}>
          <span className="pd-next-label">{copy.project.next}</span>
          <span className="pd-next-name">{next.client}</span>
          <span className="pd-next-meta">
            {copy.filters[next.cat]}
            <span aria-hidden="true"> · </span>
            {next.year}
          </span>
          <span className="pd-next-arrow" aria-hidden="true">
            →
          </span>
        </a>
      ) : null}

      <SiteFooter />
    </main>
  );
}
