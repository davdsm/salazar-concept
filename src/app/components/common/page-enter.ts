/* Entrada suave depois de uma transição de página: a home salta a cortina
   da intro (já coberta pelo véu da transição) e abre no estado final. */
const KEY = "sc-page-enter";

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
