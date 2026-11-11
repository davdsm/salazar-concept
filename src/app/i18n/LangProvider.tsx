"use client";

import { createContext, useContext } from "react";
import { DICTIONARIES, type Dictionary, type Lang } from "./dictionary";

const LangContext = createContext<{ lang: Lang; t: Dictionary }>({
  lang: "en",
  t: DICTIONARIES.en,
});

export function LangProvider({
  lang,
  children,
}: {
  lang: Lang;
  children: React.ReactNode;
}) {
  return (
    <LangContext.Provider value={{ lang, t: DICTIONARIES[lang] }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}
