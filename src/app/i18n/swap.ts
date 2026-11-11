import { LANG_COOKIE, type Lang } from "./dictionary";

/* Trocar de idioma recarrega a página (o texto vive dentro de timelines GSAP
   que guardam referências aos caracteres). Para não parecer um reload, a
   posição de scroll atravessa-o em sessionStorage e a intro é saltada. */
const KEY = "sc-lang-swap";

type Swap = { y: number };

let pending: Swap | null | undefined;

export function peekLangSwap(): Swap | null {
  if (pending !== undefined) return pending;
  pending = null;
  if (typeof window === "undefined") return pending;
  try {
    const raw = sessionStorage.getItem(KEY);
    sessionStorage.removeItem(KEY);
    if (raw) {
      const y = Number(JSON.parse(raw)?.y);
      pending = { y: Number.isFinite(y) ? Math.max(0, y) : 0 };
    }
  } catch {
    pending = null;
  }
  return pending;
}

export function commitLangSwap(next: Lang) {
  try {
    sessionStorage.setItem(KEY, JSON.stringify({ y: window.scrollY }));
  } catch {
    // sem storage perde-se só a posição
  }
  document.cookie = `${LANG_COOKIE}=${next}; path=/; max-age=31536000; samesite=lax`;
  // Um ?lang= no URL ganharia ao cookie acabado de escrever.
  const url = new URL(window.location.href);
  url.searchParams.delete("lang");
  if (url.href === window.location.href) window.location.reload();
  else window.location.replace(url.href);
}

export const LANG_SWAP_SCRIPT = `try{if(sessionStorage.getItem("${KEY}"))document.documentElement.classList.add("is-lang-swap")}catch(e){}`;
