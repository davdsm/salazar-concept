"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import SiteFooter from "@/app/components/intro/SiteFooter";
import { useEnterReveal } from "@/app/components/common/useEnterReveal";
import { useLang } from "@/app/i18n/LangProvider";
import {
  WORK_FILTERS,
  WORK_PROJECTS,
} from "@/app/components/portfolio/projects";

export default function Portfolio() {
  const { t } = useLang();
  const copy = t.portfolio;
  const [filter, setFilter] = useState<string>("all");
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    document.documentElement.classList.add("is-portfolio");
    return () => document.documentElement.classList.remove("is-portfolio");
  }, []);

  useEnterReveal(
    rootRef,
    [
      { selector: ".pf-back, .pf-brand", at: 0, stagger: 0.06, y: 18, duration: 0.75 },
      { selector: ".pf-intro-title", at: 0.06, y: 42, duration: 1 },
      { selector: ".pf-intro-lede", at: 0.16, y: 28, duration: 0.9 },
      { selector: ".pf-filter", at: 0.22, stagger: 0.04, y: 18, duration: 0.7 },
      { selector: ".pf-tile", at: 0.28, stagger: 0.055, y: 48, duration: 0.95 },
    ],
    []
  );

  const chips = useMemo(() => {
    const present = new Set(WORK_PROJECTS.map((p) => p.cat));
    return WORK_FILTERS.filter((id) => present.has(id));
  }, []);

  const projects = useMemo(
    () =>
      filter === "all"
        ? WORK_PROJECTS
        : WORK_PROJECTS.filter((p) => p.cat === filter),
    [filter]
  );

  return (
    <main ref={rootRef} className="portfolio is-awaiting-enter">
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
        <span className="pf-top-spacer" aria-hidden="true" />
      </header>

      <section className="pf-intro">
        <h1 className="pf-intro-title">{copy.title}</h1>
        <p className="pf-intro-lede">{copy.lede}</p>
      </section>

      <div className="pf-filters" role="toolbar" aria-label={copy.filterLabel}>
        <button
          type="button"
          className={`pf-filter${filter === "all" ? " is-on" : ""}`}
          aria-pressed={filter === "all"}
          onClick={() => setFilter("all")}
        >
          {copy.filterAll}
        </button>
        {chips.map((id) => (
          <button
            key={id}
            type="button"
            className={`pf-filter${filter === id ? " is-on" : ""}`}
            aria-pressed={filter === id}
            onClick={() => setFilter(id)}
          >
            {copy.filters[id]}
          </button>
        ))}
      </div>

      <section className="pf-grid" aria-label={copy.eyebrow}>
        {projects.map((project) => (
          <a
            key={project.id}
            className="pf-tile"
            href={`/work/${project.id}`}
            aria-label={`${project.client} · ${copy.filters[project.cat]}`}
          >
            <img src={project.src} alt="" draggable={false} />
            <span className="pf-tile-copy">
              <span className="pf-tile-name">{project.client}</span>
              <span className="pf-tile-cat">{copy.filters[project.cat]}</span>
            </span>
          </a>
        ))}
      </section>

      <SiteFooter />
    </main>
  );
}
