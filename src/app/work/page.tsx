import type { Metadata } from "next";
import { headers } from "next/headers";
import {
  DICTIONARIES,
  LANG_HEADER,
  isLang,
  type Lang,
} from "@/app/i18n/dictionary";
import Portfolio from "@/app/components/portfolio/Portfolio";

function requestLang(): Lang {
  const value = headers().get(LANG_HEADER);
  return isLang(value) ? value : "en";
}

export function generateMetadata(): Metadata {
  const lang = requestLang();
  return {
    title: "Portfolio — Salazar Concept",
    description: DICTIONARIES[lang].portfolio.meta,
  };
}

export default function WorkPage() {
  return <Portfolio />;
}
