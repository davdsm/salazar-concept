"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import InquiryCard from "@/app/components/intro/InquiryCard";
import MaskedLine from "@/app/components/intro/MaskedLine";

export default function SiteFooter() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    gsap.registerPlugin(ScrollTrigger);

    const gaps = footer.querySelectorAll<HTMLElement>(".site-footer-gap");
    const mid = footer.querySelector<HTMLElement>(".site-footer-mid");
    const chars = footer.querySelectorAll<HTMLElement>(
      ".site-footer-line .text-char"
    );

    if (!mid) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    /* A pausa antes de abrir é suspense num ecrã grande, onde o footer entra
       por baixo do que ainda se vê. Num telemóvel ele ocupa o ecrã inteiro e
       três segundos passam a ler-se como um ecrã preto que não responde. */
    const openDelay = window.matchMedia("(pointer: coarse)").matches ? 1.4 : 3;

    gsap.set(gaps, { flexGrow: 0 });
    gsap.set(mid, { height: 0, autoAlpha: 0, overflow: "hidden" });
    gsap.set(chars, { yPercent: 100, y: 0 });

    let opened = false;
    let delay: gsap.core.Tween | null = null;
    let openTl: gsap.core.Timeline | null = null;

    const open = () => {
      if (opened) return;
      opened = true;
      footer.classList.add("is-open");

      if (reduce) {
        gsap.set(gaps, { flexGrow: 1 });
        gsap.set(mid, { height: "auto", autoAlpha: 1, overflow: "visible" });
        gsap.set(chars, { yPercent: 0 });
        return;
      }

      openTl = gsap.timeline();
      openTl
        .to(
          gaps,
          { flexGrow: 1, duration: 2.8, ease: "power1.inOut" },
          0
        )
        .to(
          mid,
          { height: "auto", autoAlpha: 1, duration: 1.15, ease: "power2.out" },
          0.9
        )
        .to(
          chars,
          {
            yPercent: 0,
            y: 0,
            duration: 1.2,
            ease: "power3.out",
            stagger: 0.04,
          },
          1.05
        )
        .set(mid, { overflow: "visible" });
    };

    const close = () => {
      delay?.kill();
      delay = null;
      openTl?.kill();
      openTl = null;
      opened = false;
      footer.classList.remove("is-open");
      gsap.set(gaps, { flexGrow: 0 });
      gsap.set(mid, { height: 0, autoAlpha: 0, overflow: "hidden" });
      gsap.set(chars, { yPercent: 100, y: 0 });
    };

    const st = ScrollTrigger.create({
      trigger: footer,
      start: "top 50%",
      end: "bottom top",
      onEnter: () => {
        document.documentElement.classList.add("is-footer");
        delay?.kill();
        delay = gsap.delayedCall(openDelay, open);
      },
      onEnterBack: () => {
        document.documentElement.classList.add("is-footer");
        if (!opened) {
          delay?.kill();
          delay = gsap.delayedCall(openDelay, open);
        }
      },
      onLeaveBack: () => {
        document.documentElement.classList.remove("is-footer");
        close();
      },
    });

    return () => {
      delay?.kill();
      openTl?.kill();
      st.kill();
      document.documentElement.classList.remove("is-footer");
    };
  }, []);

  return (
    <footer ref={footerRef} className="site-footer">
      <div className="site-footer-top">
        <a className="site-footer-cta" href="mailto:geral@salazarconcept.com">
          <span>CONTACT US</span>
          <svg
            className="site-footer-arrow"
            viewBox="0 0 72 72"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M14 58 L58 14 M22 14 H58 V50"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="square"
            />
          </svg>
        </a>

        <div className="site-footer-cols">
          <div>
            <p>SALAZAR CONCEPT — STUDIO</p>
            <p>CREATIVE AGENCY</p>
            <a href="mailto:geral@salazarconcept.com">
              GERAL@SALAZARCONCEPT.COM
            </a>
          </div>
          <div>
            <p>FOLLOW</p>
            <a
              href="https://www.instagram.com/_salazarconcept_/"
              target="_blank"
              rel="noreferrer"
            >
              INSTAGRAM
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=61553893785070"
              target="_blank"
              rel="noreferrer"
            >
              FACEBOOK
            </a>
            <a
              href="https://www.linkedin.com/company/salazar-concept/"
              target="_blank"
              rel="noreferrer"
            >
              LINKEDIN
            </a>
          </div>
        </div>
      </div>

      <div className="site-footer-gap" aria-hidden="true" />

      <div className="site-footer-mid">
        <p className="site-footer-line">
          <MaskedLine text="So — what is your idea?" />
        </p>
        <InquiryCard />
      </div>

      <div className="site-footer-gap" aria-hidden="true" />
    </footer>
  );
}
