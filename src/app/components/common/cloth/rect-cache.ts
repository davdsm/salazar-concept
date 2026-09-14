export function createRectCache(el: HTMLElement) {
  let rect = el.getBoundingClientRect();
  const update = () => { rect = el.getBoundingClientRect(); };
  addEventListener("scroll", update, { passive: true, capture: true });
  addEventListener("resize", update, { passive: true });
  const ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(update) : null;
  ro?.observe(el);
  return {
    get current() { return rect; },
    destroy() {
      removeEventListener("scroll", update, { capture: true } as any);
      removeEventListener("resize", update);
      ro?.disconnect();
    },
  };
}
