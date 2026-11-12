"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import gsap from "gsap";
import { useLang } from "@/app/i18n/LangProvider";
import {
  markPageEnter,
  notifyPageEntered,
} from "@/app/components/common/page-enter";

function labelFor(path: string, home: string, work: string) {
  if (path === "/work" || path.startsWith("/work/")) return work;
  return home;
}

function samePath(href: string, pathname: string) {
  try {
    const url = new URL(href, window.location.origin);
    const next = url.pathname.replace(/\/$/, "") || "/";
    const cur = pathname.replace(/\/$/, "") || "/";
    return next === cur && url.hash === "";
  } catch {
    return false;
  }
}

export default function PageTransition() {
  const router = useRouter();
  const pathname = usePathname();
  const { t } = useLang();
  const veilRef = useRef<HTMLDivElement>(null);
  const wordRef = useRef<HTMLParagraphElement>(null);
  const busyRef = useRef(false);
  const fromRef = useRef("50% 50%");
  const pendingPath = useRef<string | null>(null);

  useEffect(() => {
    const veil = veilRef.current;
    const word = wordRef.current;
    if (!veil || !word) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const radius = () =>
      Math.hypot(window.innerWidth, window.innerHeight) * 1.08;

    const finishEnter = () => {
      busyRef.current = false;
      pendingPath.current = null;
      document.documentElement.classList.remove("is-page-transit");
      gsap.set(veil, { visibility: "hidden", clearProps: "clipPath,opacity" });
      notifyPageEntered();
    };

    const enter = () => {
      if (!pendingPath.current) return;
      if (reduce) {
        gsap.to(veil, {
          opacity: 0,
          duration: 0.35,
          ease: "power2.out",
          onComplete: finishEnter,
        });
        return;
      }
      const chars = word.querySelectorAll(".page-veil-char");
      const at = fromRef.current;
      gsap.set(veil, {
        visibility: "visible",
        clipPath: `circle(${radius()}px at ${at})`,
      });
      const tl = gsap.timeline({ onComplete: finishEnter });
      tl.to(chars, {
        yPercent: -115,
        duration: 0.55,
        ease: "power3.in",
        stagger: 0.028,
      }).to(
        veil,
        {
          clipPath: `circle(0px at ${at})`,
          duration: 1.15,
          ease: "expo.inOut",
        },
        0.12
      );
    };

    /* Primeiro paint desta rota depois de um push: o véu já cobre; só
       recolhe quando a página nova está montada. Na home espera a intro. */
    if (pendingPath.current) {
      const onReady = () => enter();
      if (pathname === "/") {
        window.addEventListener("intro-opened", onReady, { once: true });
        const fallback = window.setTimeout(onReady, 2200);
        return () => {
          window.removeEventListener("intro-opened", onReady);
          window.clearTimeout(fallback);
        };
      }
      const raf = requestAnimationFrame(() => {
        requestAnimationFrame(onReady);
      });
      return () => cancelAnimationFrame(raf);
    }
  }, [pathname]);

  useEffect(() => {
    const veil = veilRef.current;
    const word = wordRef.current;
    if (!veil || !word) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const radius = () =>
      Math.hypot(window.innerWidth, window.innerHeight) * 1.08;

    const onClick = (event: MouseEvent) => {
      if (busyRef.current) return;
      if (event.defaultPrevented) return;
      if (event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const node = event.target;
      if (!(node instanceof Element)) return;
      const anchor = node.closest("a");
      if (!anchor) return;
      if (anchor.target === "_blank" || anchor.hasAttribute("download")) return;

      const href = anchor.getAttribute("href");
      if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) {
        return;
      }

      let url: URL;
      try {
        url = new URL(href, window.location.origin);
      } catch {
        return;
      }
      if (url.origin !== window.location.origin) return;
      if (samePath(url.href, pathname)) return;

      event.preventDefault();
      busyRef.current = true;
      pendingPath.current = url.pathname;

      const rect = anchor.getBoundingClientRect();
      fromRef.current = `${rect.left + rect.width / 2}px ${rect.top + rect.height / 2}px`;

      const nextPath = url.pathname.replace(/\/$/, "") || "/";
      const label = labelFor(
        nextPath,
        t.transition.home,
        t.transition.work
      ).toUpperCase();

      word.textContent = "";
      label.split("").forEach((char) => {
        const span = document.createElement("span");
        span.className = "page-veil-char";
        span.textContent = char === " " ? "\u00A0" : char;
        word.appendChild(span);
      });

      if (nextPath === "/" || nextPath === "") markPageEnter();

      document.documentElement.classList.add("is-page-transit");

      const go = () => {
        router.push(url.pathname + url.search + url.hash);
      };

      if (reduce) {
        gsap.set(veil, { visibility: "visible", opacity: 0, clipPath: "none" });
        gsap.to(veil, {
          opacity: 1,
          duration: 0.28,
          ease: "power2.out",
          onComplete: go,
        });
        return;
      }

      const chars = word.querySelectorAll(".page-veil-char");
      gsap.set(chars, { yPercent: 115 });
      gsap.set(veil, {
        visibility: "visible",
        clipPath: `circle(0px at ${fromRef.current})`,
      });
      const tl = gsap.timeline({ onComplete: go });
      tl.to(veil, {
        clipPath: `circle(${radius()}px at ${fromRef.current})`,
        duration: 0.95,
        ease: "expo.inOut",
      }).to(
        chars,
        {
          yPercent: 0,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.028,
        },
        0.28
      );
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [pathname, router, t.transition.home, t.transition.work]);

  return (
    <div ref={veilRef} className="page-veil" aria-hidden="true">
      <p ref={wordRef} className="page-veil-word" />
    </div>
  );
}
