import { NextResponse, type NextRequest } from "next/server";
import { LANG_COOKIE, LANG_HEADER, isLang, type Lang } from "@/app/i18n/dictionary";

/* Escolha explícita (cookie ou ?lang=) ganha sempre. Sem ela, quem abre o
   site a partir de Portugal vê português; o resto do mundo vê inglês. O país
   só existe na Vercel — localmente cai em inglês. */
export function middleware(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("lang");
  const cookie = request.cookies.get(LANG_COOKIE)?.value;
  const country =
    request.geo?.country ?? request.headers.get("x-vercel-ip-country");

  let lang: Lang = country?.toUpperCase() === "PT" ? "pt" : "en";
  if (isLang(cookie)) lang = cookie;
  if (isLang(query)) lang = query;

  const headers = new Headers(request.headers);
  headers.set(LANG_HEADER, lang);
  const response = NextResponse.next({ request: { headers } });

  if (isLang(query)) {
    response.cookies.set(LANG_COOKIE, query, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
      sameSite: "lax",
    });
  }
  return response;
}

export const config = {
  matcher: ["/((?!_next/|api/|.*\\.[a-zA-Z0-9]+$).*)"],
};
