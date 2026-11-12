/* Entrada suave depois de uma transição de página: a home salta a cortina
   da intro (já coberta pelo véu da transição) e abre no estado final. */
const KEY = "sc-page-enter";
const EVENT = "page-entered";

let pending: boolean | undefined;

export function markPageEnter() {
  pending = undefined;
  try {
    sessionStorage.setItem(KEY, "1");
  } catch {
    // sem storage a intro corre na íntegra
  }
}

export function peekPageEnter(): boolean {
  if (pending !== undefined) return pending;
  pending = false;
  if (typeof window === "undefined") return pending;
  try {
    const raw = sessionStorage.getItem(KEY);
    sessionStorage.removeItem(KEY);
    pending = raw === "1";
  } catch {
    pending = false;
  }
  return pending;
}

/** Disparado pelo véu quando a transição acaba de revelar a página nova. */
export function notifyPageEntered() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(EVENT));
}

/** Corre `cb` no fim da transição, ou já no próximo frame se não houver véu. */
export function whenPageEntered(cb: () => void): () => void {
  if (typeof window === "undefined") return () => {};

  let done = false;
  const run = () => {
    if (done) return;
    done = true;
    cb();
  };

  const inTransit =
    document.documentElement.classList.contains("is-page-transit");

  if (!inTransit) {
    const id = requestAnimationFrame(() => requestAnimationFrame(run));
    return () => cancelAnimationFrame(id);
  }

  window.addEventListener(EVENT, run, { once: true });
  const fallback = window.setTimeout(run, 2600);
  return () => {
    window.removeEventListener(EVENT, run);
    window.clearTimeout(fallback);
  };
}
