"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { useLang } from "@/app/i18n/LangProvider";
import { DICTIONARIES, LANGS, type Lang } from "@/app/i18n/dictionary";
import { commitLangSwap, peekLangSwap } from "@/app/i18n/swap";

const LABELS: Record<Lang, string> = { pt: "PT", en: "EN" };
const NAMES: Record<Lang, string> = { pt: "Português", en: "English" };

function Chars({ text, className }: { text: string; className: string }) {
  return (
    <>
      {text.split("").map((char, index) => (
        <span className={className} key={`${char}-${index}`}>
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </>
  );
}

export default function LangSwitch() {
  const pathname = usePathname();
  const { lang, t } = useLang();
  const [active, setActive] = useState<Lang>(lang);
  const [ready, setReady] = useState(false);
  const busyRef = useRef(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const knobRef = useRef<HTMLSpanElement>(null);
  const veilRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<Record<Lang, HTMLButtonElement | null>>({
    pt: null,
    en: null,
  });

  /* Na home o switch só aparece depois da cortina de loading. Nas outras
     rotas não há esse loading, por isso mostra de imediato. */
  useEffect(() => {
    const home = pathname === "/" || pathname === "";
    if (!home) {
      setReady(true);
      return;
    }

    setReady(false);
    const curtain = document.querySelector(".intro-curtain");
    const curtainGone =
      !curtain || getComputedStyle(curtain).display === "none";
    const unlocked = document.documentElement.style.overflow !== "hidden";
    if (curtainGone && unlocked) {
      setReady(true);
      return;
    }

    const onOpened = () => setReady(true);
    window.addEventListener("intro-opened", onOpened);
    return () => window.removeEventListener("intro-opened", onOpened);
  }, [pathname]);

  const origin = () => {
    const rect = rootRef.current?.getBoundingClientRect();
    if (!rect) return `${window.innerWidth}px 0px`;
    return `${rect.left + rect.width / 2}px ${rect.top + rect.height / 2}px`;
  };

  const radius = () => Math.hypot(window.innerWidth, window.innerHeight) * 1.05;

  /* O knob é posicionado em px a partir dos botões: as larguras de "PT" e
     "EN" não são iguais e só se sabem depois da fonte carregar. */
  useEffect(() => {
    const knob = knobRef.current;
    if (!knob) return;
    const place = () => {
      if (busyRef.current) return;
      const button = buttonsRef.current[lang];
      if (!button) return;
      gsap.set(knob, { x: button.offsetLeft, width: button.offsetWidth });
    };
    place();
    document.fonts?.ready.then(place);
    window.addEventListener("resize", place);
    return () => window.removeEventListener("resize", place);
  }, [lang]);

  /* Do outro lado do reload: o véu já está a cobrir (classe posta no <head>
     antes do primeiro paint) e só se recolhe para dentro do switch quando o
     scroll tiver voltado ao sítio. */
  useEffect(() => {
    const veil = veilRef.current;
    if (!veil || !peekLangSwap()) return;

    const chars = veil.querySelectorAll(".lang-veil-char");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let tl: gsap.core.Timeline | null = null;
    let done = false;

    const finish = () => {
      document.documentElement.classList.remove("is-lang-swap");
      gsap.set(veil, { visibility: "hidden", clearProps: "clipPath,opacity" });
    };

    const reveal = () => {
      if (done) return;
      done = true;
      if (reduce) {
        tl = gsap.timeline({ onComplete: finish });
        tl.to(veil, { opacity: 0, duration: 0.4, ease: "power2.out" });
        return;
      }
      const at = origin();
      gsap.set(veil, { clipPath: `circle(${radius()}px at ${at})` });
      tl = gsap.timeline({ delay: 0.25, onComplete: finish });
      tl.to(chars, {
        yPercent: -115,
        duration: 0.55,
        ease: "power3.in",
        stagger: 0.03,
      }).to(
        veil,
        {
          clipPath: `circle(0px at ${at})`,
          duration: 1.05,
          ease: "expo.inOut",
        },
        0.2
      );
    };

    const onOpened = (event: Event) => {
      const y = (event as CustomEvent<{ y?: number }>).detail?.y ?? 0;
      if (!y) reveal();
    };

    window.addEventListener("lang-restored", reveal);
    window.addEventListener("intro-opened", onOpened);
    const fallback = window.setTimeout(reveal, 1800);

    return () => {
      window.removeEventListener("lang-restored", reveal);
      window.removeEventListener("intro-opened", onOpened);
      window.clearTimeout(fallback);
      tl?.kill();
    };
  }, []);

  const nudge = (target: Lang, on: boolean) => {
    const knob = knobRef.current;
    const from = buttonsRef.current[active];
    if (!knob || !from || busyRef.current || target === active) return;
    // Antecipação: o knob inclina-se para o lado que está a ser apontado.
    const reach = on ? 7 : 0;
    const toLeft = target === "pt";
    gsap.to(knob, {
      x: from.offsetLeft - (toLeft ? reach : 0),
      width: from.offsetWidth + reach,
      duration: on ? 0.45 : 0.6,
      ease: on ? "power3.out" : "elastic.out(1, 0.5)",
      overwrite: "auto",
    });
  };

  const choose = (next: Lang) => {
    if (busyRef.current || next === active) return;
    const knob = knobRef.current;
    const veil = veilRef.current;
    const from = buttonsRef.current[active];
    const to = buttonsRef.current[next];
    if (!knob || !veil || !from || !to) return;

    busyRef.current = true;
    setActive(next);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(knob, { x: to.offsetLeft, width: to.offsetWidth });
      gsap.set(veil, { visibility: "visible", opacity: 0, clipPath: "none" });
      gsap.to(veil, {
        opacity: 1,
        duration: 0.3,
        onComplete: () => commitLangSwap(next),
      });
      return;
    }

    const left = Math.min(from.offsetLeft, to.offsetLeft);
    const right = Math.max(
      from.offsetLeft + from.offsetWidth,
      to.offsetLeft + to.offsetWidth
    );

    const tl = gsap.timeline();

    // Gota: estica até cobrir os dois lados, depois larga o de origem.
    tl.to(knob, {
      x: left,
      width: right - left,
      scaleY: 0.74,
      duration: 0.28,
      ease: "power2.in",
      overwrite: true,
    }).to(knob, {
      x: to.offsetLeft,
      width: to.offsetWidth,
      scaleY: 1,
      duration: 0.75,
      ease: "elastic.out(1, 0.5)",
    });

    tl.fromTo(
      to.querySelectorAll(".lang-switch-char"),
      { yPercent: 110 },
      { yPercent: 0, duration: 0.5, ease: "power3.out", stagger: 0.06 },
      0.16
    ).fromTo(
      from.querySelectorAll(".lang-switch-char"),
      { yPercent: -110 },
      { yPercent: 0, duration: 0.5, ease: "power3.out", stagger: 0.06 },
      0.2
    );

    // O véu nasce do próprio switch e cobre o ecrã antes do reload.
    tl.add(() => {
      const at = origin();
      const chars = veil.querySelectorAll(".lang-veil-char");
      gsap.set(veil, {
        visibility: "visible",
        clipPath: `circle(0px at ${at})`,
      });
      gsap.set(chars, { yPercent: 115 });
      gsap
        .timeline({ onComplete: () => commitLangSwap(next) })
        .to(veil, {
          clipPath: `circle(${radius()}px at ${at})`,
          duration: 1,
          ease: "expo.inOut",
        })
        .to(
          chars,
          { yPercent: 0, duration: 0.7, ease: "power3.out", stagger: 0.035 },
          0.5
        )
        .to({}, { duration: 0.15 });
    }, 0.42);
  };

  const veilWord = DICTIONARIES[active].switcher.veil;

  return (
    <>
      <div
        className={`site-corner${ready ? " is-ready" : ""}`}
        aria-hidden={ready ? undefined : true}
        inert={!ready ? true : undefined}
      >
        <a className="site-showroom" href="/work">
          {t.switcher.showroom}
        </a>
        <div
          ref={rootRef}
          className="lang-switch"
          role="group"
          aria-label={t.switcher.label}
        >
          <span ref={knobRef} className="lang-switch-knob" aria-hidden="true" />
          {LANGS.map((code) => (
            <button
              key={code}
              ref={(node) => {
                buttonsRef.current[code] = node;
              }}
              type="button"
              lang={code}
              className="lang-switch-opt"
              aria-pressed={active === code}
              aria-label={NAMES[code]}
              onClick={() => choose(code)}
              onPointerEnter={() => nudge(code, true)}
              onPointerLeave={() => nudge(code, false)}
            >
              <span className="lang-switch-word">
                <Chars text={LABELS[code]} className="lang-switch-char" />
              </span>
            </button>
          ))}
        </div>
      </div>

      <div ref={veilRef} className="lang-veil" aria-hidden="true">
        <p className="lang-veil-word">
          <Chars text={veilWord} className="lang-veil-char" />
        </p>
      </div>
    </>
  );
}
