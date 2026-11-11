"use client";

import ChameleonCursor from "@/app/components/common/ChameleonCursor";
import PageTransition from "@/app/components/common/PageTransition";
import SmoothScroll from "@/app/components/common/smooth-scroll";
import LangSwitch from "@/app/components/intro/LangSwitch";

/** Chrome persistente entre rotas: cursor, scroll, idioma e transição. */
export default function SiteChrome() {
  return (
    <>
      <SmoothScroll />
      <ChameleonCursor />
      <PageTransition />
      <LangSwitch />
    </>
  );
}
