"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Scroll suave global.
 *
 * O site sentia-se lento durante o hero e o carousel (secções com pin e scrub
 * longo, onde muitos pixels de scroll dão pouco movimento) e depois acelerava
 * de repente na LegacySection, que rola 1:1 com o browser. O Lenis dá inércia
 * igual em toda a página, e a diferença de ritmo deixa de se notar como corte.
 */
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.35,
      // Curva de saída longa: o scroll continua a correr depois de largar a
      // roda, que é o que dá a sensação de peso.
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      // No telemóvel o scroll nativo já tem inércia própria; duplicá-la dá uma
      // sensação pastosa e rouba responsividade ao toque.
      syncTouch: false,
      touchMultiplier: 1.6,
    });

    // O ScrollTrigger tem de ler a posição que o Lenis está a interpolar, não
    // a do browser — senão os pins ficam um frame atrás e tremem.
    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    // Sem isto o GSAP "salta" tempo depois de um frame lento, e o scroll dá um
    // esticão em vez de recuperar suavemente.
    gsap.ticker.lagSmoothing(0);

    // A intro trava o scroll (overflow hidden) até a cortina abrir.
    const locked = document.documentElement.style.overflow === "hidden";
    if (locked) lenis.stop();
    const onOpened = () => {
      lenis.start();
      lenis.scrollTo(0, { immediate: true });
      ScrollTrigger.refresh();
    };
    window.addEventListener("intro-opened", onOpened);

    return () => {
      window.removeEventListener("intro-opened", onOpened);
      gsap.ticker.remove(raf);
      gsap.ticker.lagSmoothing(500, 33);
      lenis.destroy();
    };
  }, []);

  return null;
}
