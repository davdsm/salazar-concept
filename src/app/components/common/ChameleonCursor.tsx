"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

/** Cursor camaleão partilhado por todas as páginas. */
export default function ChameleonCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const finePointer = window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    ).matches;
    if (!finePointer) {
      cursor.style.display = "none";
      return;
    }

    document.documentElement.classList.add("has-chameleon-cursor");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    gsap.set(cursor, {
      xPercent: -50,
      yPercent: -50,
      transformOrigin: "50% 50%",
      autoAlpha: 0,
      rotation: 0,
    });

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

    const syncLinkHover = (event: MouseEvent) => {
      const node = event.target;
      const onLink =
        node instanceof Element && !!node.closest("a, button");
      cursor.classList.toggle("is-on-link", onLink);
    };

    const onMove = (event: MouseEvent) => {
      showCursor();
      syncLinkHover(event);
      const nx = (event.clientX / window.innerWidth) * 2 - 1;
      const inset = cursor.offsetWidth * 0.42;
      cursorX(
        gsap.utils.clamp(inset, window.innerWidth - inset, event.clientX)
      );
      cursorY(
        gsap.utils.clamp(inset, window.innerHeight - inset, event.clientY)
      );
      cursorRot(reduce ? 0 : nx * 35);
      window.dispatchEvent(
        new CustomEvent("sc-pointer", {
          detail: { x: event.clientX, y: event.clientY, nx, ny: (event.clientY / window.innerHeight) * 2 - 1 },
        })
      );
    };

    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.documentElement.classList.remove("has-chameleon-cursor");
    };
  }, []);

  return (
    <div ref={cursorRef} className="chameleon-cursor" aria-hidden="true">
      <img src="/logo/chameleon.svg?v=3" alt="" draggable={false} />
    </div>
  );
}
