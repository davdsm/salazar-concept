"use client";

import { useLayoutEffect, type RefObject } from "react";
import gsap from "gsap";
import { whenPageEntered } from "@/app/components/common/page-enter";

type RevealGroup = {
  selector: string;
  /** Atraso relativo ao início da revelação. */
  at?: number;
  stagger?: number;
  y?: number;
  duration?: number;
};

/**
 * Fade + slide up dos alvos no fim da transição de página (ou no mount
 * directo). O root começa invisível via CSS `.is-awaiting-enter`.
 */
export function useEnterReveal(
  rootRef: RefObject<HTMLElement | null>,
  groups: RevealGroup[],
  deps: unknown[] = []
) {
  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    root.classList.add("is-awaiting-enter");

    const prepared = groups
      .map((group) => {
        const nodes = gsap.utils.toArray<HTMLElement>(
          root.querySelectorAll(group.selector)
        );
        if (!nodes.length) return null;
        return { ...group, nodes };
      })
      .filter(Boolean) as (RevealGroup & { nodes: HTMLElement[] })[];

    if (!prepared.length) {
      root.classList.remove("is-awaiting-enter");
      return;
    }

    if (reduce) {
      root.classList.remove("is-awaiting-enter");
      return;
    }

    const ctx = gsap.context(() => {
      prepared.forEach(({ nodes, y = 36 }) => {
        gsap.set(nodes, { opacity: 0, y, force3D: true });
      });
    }, root);

    root.classList.remove("is-awaiting-enter");

    let tl: gsap.core.Timeline | null = null;
    const stopWait = whenPageEntered(() => {
      tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      prepared.forEach(
        ({ nodes, at = 0, stagger = 0.07, y = 36, duration = 0.9 }) => {
          tl!.fromTo(
            nodes,
            { opacity: 0, y },
            {
              opacity: 1,
              y: 0,
              duration,
              stagger,
              clearProps: "transform",
            },
            at
          );
        }
      );
    });

    return () => {
      stopWait();
      tl?.kill();
      ctx.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
