"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const WORDMARK_RATIO = 136 / 928;

const VIMEO_SRC =
  "https://player.vimeo.com/video/832231383?background=1&autoplay=1&muted=1&loop=1&autopause=0";
const HERO_PHRASE = "ART FROM EVERY ANGLE.";
const STATEMENT = "WE DON'T CREATE TO BE SEEN.";
const STATEMENT_LINES = ["WE DON'T CREATE", "TO BE SEEN."] as const;
const SENSE = "WE CREATE TO BE FELT.";
const SENSE_LINES = ["WE CREATE", "TO BE FELT."] as const;
const ABOUT_TITLE = "Salazar Concept, Creative Agency,";
const ABOUT_BODY =
  "True concepts are those that express a very strong definition and are well consolidated by everyone around the world. The Salazar Concept is a universal concept that was inspired by an icon capable of looking at a market from a 360 angle and capable of camouflaging itself and adapting to different ecosystems or business habitats.";

function MaskedLine({
  text,
  wrapWords = false,
}: {
  text: string;
  wrapWords?: boolean;
}) {
  const chars = (value: string, keyPrefix: string) =>
    value.split("").map((char, index) => (
      <span className="text-clip" key={`${keyPrefix}-${char}-${index}`}>
        <span className={char === " " ? "text-char is-space" : "text-char"}>
          {char === " " ? "\u00A0" : char}
        </span>
      </span>
    ));

  if (!wrapWords) return <>{chars(text, "c")}</>;

  return (
    <span className="text-line">
      {text.split(" ").map((word, wordIndex, words) => (
        <span className="text-word" key={`${word}-${wordIndex}`}>
          {chars(word, `${wordIndex}`)}
          {wordIndex < words.length - 1 ? chars(" ", `s${wordIndex}`) : null}
        </span>
      ))}
    </span>
  );
}

function holeSize() {
  const vw = window.innerWidth;
  return {
    w: Math.min(288, Math.max(168, vw * 0.22)),
    h: Math.min(64, Math.max(42, vw * 0.048)),
  };
}

function setHoleClip(
  el: HTMLElement,
  holeW: number,
  holeH: number,
  vw: number,
  vh: number
) {
  if (holeW < 1 || holeH < 1) {
    el.style.clipPath = "none";
    return;
  }

  const x1 = (vw - holeW) / 2;
  const y1 = (vh - holeH) / 2;
  const x2 = x1 + holeW;
  const y2 = y1 + holeH;
  el.style.clipPath = `polygon(evenodd, 0px 0px, ${vw}px 0px, ${vw}px ${vh}px, 0px ${vh}px, 0px 0px, ${x1}px ${y1}px, ${x2}px ${y1}px, ${x2}px ${y2}px, ${x1}px ${y2}px, ${x1}px ${y1}px)`;
}

function resetScrollTop() {
  if (typeof window === "undefined") return;
  try {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
  } catch {
    // ignore
  }
  window.scrollTo(0, 0);
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
}

export default function Intro() {
  const curtainRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const topLineRef = useRef<HTMLParagraphElement>(null);
  const bottomLineRef = useRef<HTMLParagraphElement>(null);
  const slotRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const pctRef = useRef<HTMLSpanElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLIFrameElement>(null);
  const phraseRef = useRef<HTMLParagraphElement>(null);
  const statementRef = useRef<HTMLParagraphElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const brandRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);
  const senseRef = useRef<HTMLParagraphElement>(null);
  const aboutRef = useRef<HTMLElement>(null);

  useEffect(() => {
    resetScrollTop();

    const curtain = curtainRef.current;
    const copy = copyRef.current;
    const topLine = topLineRef.current;
    const bottomLine = bottomLineRef.current;
    const slot = slotRef.current;
    const progress = progressRef.current;
    const bar = barRef.current;
    const pct = pctRef.current;
    const hero = heroRef.current;
    const video = videoRef.current;
    const phrase = phraseRef.current;
    const statement = statementRef.current;
    const brand = brandRef.current;

    if (
      !curtain ||
      !copy ||
      !topLine ||
      !bottomLine ||
      !slot ||
      !progress ||
      !bar ||
      !pct ||
      !hero ||
      !video ||
      !phrase ||
      !statement ||
      !brand
    ) {
      return;
    }

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduce) {
      curtain.style.display = "none";
      document.documentElement.style.overflow = "";
      resetScrollTop();
      gsap.set(brand, { autoAlpha: 1 });
      gsap.set(statement, { display: "flex", autoAlpha: 1 });
      gsap.set(
        [
          ...phrase.querySelectorAll(".text-char"),
          ...statement.querySelectorAll(".text-char"),
        ],
        { yPercent: 0, y: 0 }
      );
      return;
    }

    document.documentElement.style.overflow = "hidden";
    resetScrollTop();

    const tracker = { value: 0 };
    const hole = { w: 0, h: 0 };
    let mediaReady = false;
    let progressDone = false;
    let opened = false;

    const viewport = () => ({
      vw: window.innerWidth,
      vh: window.innerHeight,
    });

    const applyHole = () => {
      const { vw, vh } = viewport();
      setHoleClip(curtain, hole.w, hole.h, vw, vh);
    };

    const openCurtain = () => {
      if (opened) return;
      opened = true;

      const { vw, vh } = viewport();
      const span = Math.hypot(vw, vh) * 1.35;

      gsap
        .timeline({
          onComplete: () => {
            gsap.set(curtain, { display: "none" });
            document.documentElement.style.overflow = "";
            resetScrollTop();
            window.dispatchEvent(new Event("intro-opened"));
          },
        })
        .to(progress, { opacity: 0, duration: 0.35, ease: "power2.out" }, 0)
        .to(hero, { scale: 1, duration: 2.05, ease: "power2.out" }, 0)
        .to(
          topLine,
          { y: -vh * 0.62, duration: 1.75, ease: "expo.inOut" },
          0.04
        )
        .to(
          bottomLine,
          { y: vh * 0.62, duration: 1.75, ease: "expo.inOut" },
          0.04
        )
        .to(
          hole,
          {
            w: span,
            h: span,
            duration: 1.75,
            ease: "expo.inOut",
            onUpdate: applyHole,
          },
          0.04
        )
        .to(
          phrase.querySelectorAll(".text-char"),
          {
            yPercent: 0,
            y: 0,
            duration: 0.95,
            ease: "power3.out",
            stagger: 0.048,
          },
          0.92
        )
        .to(
          brand,
          { autoAlpha: 1, duration: 1.05, ease: "power3.out" },
          0.78
        );
    };

    const tryOpen = () => {
      if (mediaReady && progressDone) openCurtain();
    };

    const markMediaReady = () => {
      if (mediaReady) return;
      mediaReady = true;
      tryOpen();
    };

    const onVimeoMessage = (event: MessageEvent) => {
      if (event.origin !== "https://player.vimeo.com") return;
      try {
        const data =
          typeof event.data === "string" ? JSON.parse(event.data) : event.data;
        if (data.event === "ready" || data.event === "play") {
          markMediaReady();
        }
      } catch {
        return;
      }
    };

    window.addEventListener("message", onVimeoMessage);
    video.addEventListener("load", markMediaReady);
    const mediaFallback = window.setTimeout(markMediaReady, 8000);

    const peek = holeSize();

    const ctx = gsap.context(() => {
      gsap.set(hero, { scale: 1.12 });
      gsap.set(copy, { opacity: 1 });
      gsap.set(slot, { width: 0, height: 0 });
      gsap.set(
        [
          ...topLine.querySelectorAll(".text-char"),
          ...bottomLine.querySelectorAll(".text-char"),
          ...phrase.querySelectorAll(".text-char"),
        ],
        { yPercent: 100, y: 0 }
      );
      gsap.set(statement.querySelectorAll(".text-char"), {
        yPercent: 130,
        y: 0,
      });
      gsap.set(statement, { display: "none", autoAlpha: 0 });
      hole.w = 0;
      hole.h = 0;
      applyHole();

      gsap.to(topLine.querySelectorAll(".text-char"), {
        yPercent: 0,
        y: 0,
        duration: 0.95,
        ease: "power3.out",
        stagger: 0.048,
        delay: 0.12,
      });

      gsap.to(bottomLine.querySelectorAll(".text-char"), {
        yPercent: 0,
        y: 0,
        duration: 0.95,
        ease: "power3.out",
        stagger: 0.048,
        delay: 0.28,
      });

      gsap.to(slot, {
        width: peek.w,
        height: peek.h,
        duration: 1.05,
        ease: "power3.out",
        delay: 1.2,
      });

      gsap.to(hole, {
        w: peek.w,
        h: peek.h,
        duration: 1.05,
        ease: "power3.out",
        delay: 1.2,
        onUpdate: applyHole,
      });

      gsap.to(tracker, {
        value: 100,
        duration: 2.55,
        delay: 0.4,
        ease: "power2.inOut",
        onUpdate: () => {
          bar.style.width = `${tracker.value}%`;
          pct.textContent = `${Math.round(tracker.value)}%`;
        },
        onComplete: () => {
          progressDone = true;
          gsap.delayedCall(0.35, tryOpen);
        },
      });
    }, curtain);

    const onResize = () => applyHole();
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("message", onVimeoMessage);
      video.removeEventListener("load", markMediaReady);
      window.clearTimeout(mediaFallback);
      ctx.revert();
      gsap.killTweensOf([tracker, hole]);
      document.documentElement.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    const phrase = phraseRef.current;
    const media = mediaRef.current;
    const cursor = cursorRef.current;

    if (!phrase || !media || !cursor) return;

    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (!finePointer) {
      cursor.style.display = "none";
      return;
    }

    document.documentElement.classList.add("has-chameleon-cursor");
    gsap.set(cursor, {
      xPercent: -50,
      yPercent: -50,
      transformOrigin: "50% 50%",
      autoAlpha: 0,
      rotation: 0,
    });
    gsap.set(phrase, { transformPerspective: 1200 });
    gsap.set(media, { scale: 1.12 });

    const lag = reduce ? 0.01 : 0.32;
    const tiltLag = reduce ? 0.01 : 0.55;
    const cursorX = gsap.quickTo(cursor, "x", {
      duration: lag,
      ease: "power3.out",
    });
    const cursorY = gsap.quickTo(cursor, "y", {
      duration: lag,
      ease: "power3.out",
    });
    const cursorRot = gsap.quickTo(cursor, "rotation", {
      duration: tiltLag,
      ease: "power3.out",
    });

    let visible = false;
    const showCursor = () => {
      if (visible) return;
      visible = true;
      gsap.to(cursor, { autoAlpha: 1, duration: 0.18, ease: "power2.out" });
    };

    if (reduce) {
      const onMove = (event: MouseEvent) => {
        showCursor();
        const inset = cursor.offsetWidth * 0.42;
        cursorX(
          gsap.utils.clamp(inset, window.innerWidth - inset, event.clientX)
        );
        cursorY(
          gsap.utils.clamp(inset, window.innerHeight - inset, event.clientY)
        );
        cursorRot(0);
      };
      window.addEventListener("mousemove", onMove);
      return () => {
        window.removeEventListener("mousemove", onMove);
        document.documentElement.classList.remove("has-chameleon-cursor");
      };
    }

    const phraseX = gsap.quickTo(phrase, "x", {
      duration: 0.95,
      ease: "power3.out",
    });
    const phraseY = gsap.quickTo(phrase, "y", {
      duration: 0.95,
      ease: "power3.out",
    });
    const phraseRX = gsap.quickTo(phrase, "rotateX", {
      duration: 0.95,
      ease: "power3.out",
    });
    const phraseRY = gsap.quickTo(phrase, "rotateY", {
      duration: 0.95,
      ease: "power3.out",
    });
    const mediaX = gsap.quickTo(media, "x", {
      duration: 1.25,
      ease: "power3.out",
    });
    const mediaY = gsap.quickTo(media, "y", {
      duration: 1.25,
      ease: "power3.out",
    });

    const onMove = (event: MouseEvent) => {
      showCursor();
      const nx = (event.clientX / window.innerWidth) * 2 - 1;
      const ny = (event.clientY / window.innerHeight) * 2 - 1;
      phraseX(nx * 48);
      phraseY(ny * 32);
      phraseRY(nx * 11);
      phraseRX(ny * -8);
      mediaX(nx * 22);
      mediaY(ny * 14);
      const inset = cursor.offsetWidth * 0.42;
      cursorX(
        gsap.utils.clamp(inset, window.innerWidth - inset, event.clientX)
      );
      cursorY(
        gsap.utils.clamp(inset, window.innerHeight - inset, event.clientY)
      );
      cursorRot(nx * 35);
    };

    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.documentElement.classList.remove("has-chameleon-cursor");
    };
  }, []);

  useEffect(() => {
    const brand = brandRef.current;
    const phrase = phraseRef.current;
    const statement = statementRef.current;
    const frame = frameRef.current;
    const track = trackRef.current;
    const story = storyRef.current;
    const sense = senseRef.current;
    const about = aboutRef.current;

    if (!brand || !phrase || !statement || !frame || !track || !story || !sense || !about) return;

    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.clearScrollMemory?.();
    resetScrollTop();

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const brandWidth = () => Math.min(200, window.innerWidth * 0.72);
    const brandTop = () => {
      const height = brandWidth() * WORDMARK_RATIO;
      const phraseSize = window.innerWidth * 0.062;
      return window.innerHeight / 2 - phraseSize / 2 - 22 - height;
    };

    const statementChars = statement.querySelectorAll(".text-char");
    const senseChars = sense.querySelectorAll(".text-char");

    gsap.set(brand, {
      xPercent: -50,
      left: "50%",
      top: brandTop(),
      width: brandWidth(),
    });
    gsap.set(statementChars, { yPercent: 130, y: 0 });
    gsap.set(statement, { display: "none", autoAlpha: 0 });
    gsap.set(senseChars, { yPercent: 130, y: 0 });
    gsap.set(sense, { display: "none", autoAlpha: 0 });
    gsap.set(about, { display: "none", autoAlpha: 0, y: 28 });
    gsap.set(story, { x: 0, y: () => window.innerHeight });

    if (reduce) {
      gsap.set(statementChars, { yPercent: 0, y: 0 });
      gsap.set(statement, { display: "none", autoAlpha: 0 });
      gsap.set(senseChars, { yPercent: 0, y: 0 });
      gsap.set(sense, { display: "none", autoAlpha: 0 });
      gsap.set(about, { display: "flex", autoAlpha: 1, y: 0 });
      gsap.set(story, { x: 0, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(frame, {
        top: 0,
        left: 0,
        right: "auto",
        bottom: "auto",
        width: "100%",
        height: "100%",
      });

      const aboutTitle = about.querySelector(".about-title");
      const aboutBody = about.querySelector(".about-body");
      const phraseChars = phrase.querySelectorAll(".text-char");

      type CopyId = "phrase" | "statement" | "sense" | "about" | "none";
      let active: CopyId = "phrase";
      let desired: CopyId = "phrase";
      let hiding = false;

      const copyEl = (id: Exclude<CopyId, "none">) =>
        ({ phrase, statement, sense, about }[id]);

      const copyChars = (id: CopyId) => {
        if (id === "statement") return statementChars;
        if (id === "sense") return senseChars;
        if (id === "phrase") return phraseChars;
        return null;
      };

      const enterCopy = (id: Exclude<CopyId, "none">) => {
        const el = copyEl(id);
        gsap.killTweensOf(el);

        if (id === "phrase") {
          gsap.set(el, { display: "flex" });
          gsap.to(el, {
            autoAlpha: 1,
            duration: 0.35,
            ease: "power2.out",
            overwrite: true,
          });
          return;
        }

        if (id === "about") {
          gsap.set(el, { display: "flex", y: 0 });
          if (aboutTitle) gsap.set(aboutTitle, { autoAlpha: 0, y: 22 });
          if (aboutBody) gsap.set(aboutBody, { autoAlpha: 0, y: 18 });
          gsap.to(el, {
            autoAlpha: 1,
            duration: 0.2,
            ease: "power2.out",
            overwrite: true,
          });
          if (aboutTitle) {
            gsap.to(aboutTitle, {
              autoAlpha: 1,
              y: 0,
              duration: 0.7,
              ease: "power3.out",
              overwrite: true,
            });
          }
          if (aboutBody) {
            gsap.to(aboutBody, {
              autoAlpha: 1,
              y: 0,
              duration: 0.75,
              ease: "power3.out",
              delay: 0.12,
              overwrite: true,
            });
          }
          return;
        }

        const chars = copyChars(id);
        if (chars) {
          gsap.killTweensOf(chars);
          gsap.set(chars, { yPercent: 130, y: 0 });
        }
        gsap.set(el, { display: "flex", autoAlpha: 1 });
        if (chars) {
          gsap.to(chars, {
            yPercent: 0,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            stagger: 0.028,
            overwrite: true,
          });
        }
      };

      const hideCopy = (id: Exclude<CopyId, "none">, done: () => void) => {
        const el = copyEl(id);
        const chars = copyChars(id);
        gsap.killTweensOf(el);
        if (chars) gsap.killTweensOf(chars);
        if (id === "about") {
          if (aboutTitle) gsap.killTweensOf(aboutTitle);
          if (aboutBody) gsap.killTweensOf(aboutBody);
        }
        gsap.to(el, {
          autoAlpha: 0,
          duration: id === "phrase" ? 0.95 : 0.4,
          ease: "power2.out",
          overwrite: true,
          onComplete: () => {
            gsap.set(el, { display: "none" });
            if (id === "about") gsap.set(el, { y: 28 });
            if (chars && id !== "phrase") gsap.set(chars, { yPercent: 130, y: 0 });
            done();
          },
        });
      };

      const syncCopy = () => {
        if (hiding || desired === active) return;

        const leaving = active;
        hiding = true;

        const showDesired = () => {
          hiding = false;
          active = desired;
          if (desired !== "none") enterCopy(desired);
        };

        if (leaving === "none") {
          showDesired();
          return;
        }

        hideCopy(leaving, showDesired);
      };

      const sideInset = () => Math.max(32, window.innerWidth * 0.07);
      const bannerHeight = () => window.innerHeight * 0.3;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: track,
          start: "top top",
          end: "+=450%",
          pin: true,
          scrub: 0.45,
          invalidateOnRefresh: true,
          onUpdate(self) {
            const p = self.progress;
            if (p >= 0.84) desired = "about";
            else if (p >= 0.56) desired = "sense";
            else if (p >= 0.33) desired = "statement";
            else if (p > 0.2) desired = "none";
            else desired = "phrase";
            syncCopy();
          },
        },
      });

      tl.fromTo(
        brand,
        { width: brandWidth, top: brandTop },
        {
          width: () => Math.min(300, window.innerWidth * 0.72),
          top: () => Math.max(18, window.innerWidth * 0.016),
          duration: 0.38,
          ease: "none",
        },
        0
      );

      tl.fromTo(
        frame,
        {
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          borderRadius: 0,
        },
        {
          top: 0,
          left: () => sideInset(),
          width: () => window.innerWidth - 2 * sideInset(),
          height: () => bannerHeight(),
          borderRadius: 0,
          duration: 0.38,
          ease: "none",
        },
        0
      );

      tl.to(
        frame,
        {
          top: () => -bannerHeight(),
          duration: 0.22,
          ease: "none",
        },
        0.38
      );

      tl.fromTo(
        story,
        { x: 0, y: () => window.innerHeight },
        { x: 0, y: 0, duration: 0.22, ease: "none" },
        0.38
      );

      tl.to(
        story,
        {
          y: () => -window.innerHeight * 1.2,
          duration: 0.55,
          ease: "none",
        },
        0.6
      );
    });

    const onOpened = () => {
      resetScrollTop();
      ScrollTrigger.refresh();
    };
    window.addEventListener("intro-opened", onOpened);

    const onPageShow = (event: PageTransitionEvent) => {
      if (event.persisted) {
        resetScrollTop();
        ScrollTrigger.refresh();
      }
    };
    window.addEventListener("pageshow", onPageShow);

    return () => {
      window.removeEventListener("intro-opened", onOpened);
      window.removeEventListener("pageshow", onPageShow);
      ctx.revert();
    };
  }, []);

  return (
    <>
      <main className="intro relative bg-[var(--beige)]">
        <section ref={trackRef} className="hero-sticky">
          <div ref={frameRef} className="hero-frame">
            <div
              ref={heroRef}
              className="hero-zoom origin-center will-change-transform"
            >
              <div ref={mediaRef} className="hero-media">
                <iframe
                  ref={videoRef}
                  className="hero-vimeo"
                  src={VIMEO_SRC}
                  title="Salazar Concept"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
          <p ref={phraseRef} className="hero-phrase" aria-label={HERO_PHRASE}>
            <MaskedLine text={HERO_PHRASE} />
          </p>
          <div className="story-stage">
            <div ref={storyRef} className="story-frame">
              <img src="/images/story.jpg" alt="" draggable={false} />
            </div>
          </div>
        </section>

      <div ref={curtainRef} className="intro-curtain" aria-hidden="true">
        <div ref={copyRef} className="intro-copy">
          <p ref={topLineRef} className="intro-line">
            <MaskedLine text="EMBRACE" />
          </p>
          <div ref={slotRef} className="intro-slot" />
          <p ref={bottomLineRef} className="intro-line">
            <MaskedLine text="THE CONCEPT" />
          </p>
        </div>

        <div ref={progressRef} className="intro-progress">
          <span ref={pctRef} className="intro-progress-pct">
            0%
          </span>
          <div className="intro-progress-track">
            <div ref={barRef} className="intro-progress-bar" />
          </div>
        </div>
      </div>

      </main>
      <p
        ref={statementRef}
        className="hero-statement"
        aria-label={STATEMENT}
      >
        {STATEMENT_LINES.map((line) => (
          <span className="hero-statement-line" key={line}>
            <MaskedLine text={line} />
          </span>
        ))}
      </p>
      <p
        ref={senseRef}
        className="hero-statement is-below"
        aria-label={SENSE}
      >
        {SENSE_LINES.map((line) => (
          <span className="hero-statement-line" key={line}>
            <MaskedLine text={line} />
          </span>
        ))}
      </p>
      <article
        ref={aboutRef}
        className="about-block"
        aria-label={ABOUT_TITLE}
      >
        <h2 className="about-title">{ABOUT_TITLE}</h2>
        <p className="about-body">{ABOUT_BODY}</p>
      </article>
      <div ref={brandRef} className="hero-brand">
        <img
          src="/logo/wordmark.png"
          alt="Salazar Concept"
          draggable={false}
        />
      </div>
      <div ref={cursorRef} className="chameleon-cursor" aria-hidden="true">
        <img src="/logo/chameleon.svg?v=3" alt="" draggable={false} />
      </div>
    </>
  );
}
