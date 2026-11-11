import type { Metadata } from "next";
import { headers } from "next/headers";
import localFont from "next/font/local";
import {
  DICTIONARIES,
  LANG_HEADER,
  isLang,
  type Lang,
} from "@/app/i18n/dictionary";
import { LangProvider } from "@/app/i18n/LangProvider";
import { LANG_SWAP_SCRIPT } from "@/app/i18n/swap";
import SiteChrome from "@/app/components/common/SiteChrome";
import "./globals.css";

const n27 = localFont({
  src: [
    {
      path: "./font/n27-thin-webfont.woff2",
      weight: "100",
      style: "normal",
    },
    {
      path: "./font/n27-extralight-webfont.woff2",
      weight: "200",
      style: "normal",
    },
    {
      path: "./font/n27-light-webfont.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "./font/n27-regular-webfont.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./font/n27-medium-webfont.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./font/n27-bold-webfont.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "./font/n27-thinitalic-webfont.woff2",
      weight: "100",
      style: "italic",
    },
    {
      path: "./font/n27-extralightitalic-webfont.woff2",
      weight: "200",
      style: "italic",
    },
    {
      path: "./font/n27-lightitalic-webfont.woff2",
      weight: "300",
      style: "italic",
    },
    {
      path: "./font/n27-regularitalic-webfont.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "./font/n27-mediumitalic-webfont.woff2",
      weight: "500",
      style: "italic",
    },
    {
      path: "./font/n27-bolditalic-webfont.woff2",
      weight: "700",
      style: "italic",
    },
  ],
  display: "swap",
  variable: "--font-n27",
});

function requestLang(): Lang {
  const value = headers().get(LANG_HEADER);
  return isLang(value) ? value : "en";
}

export function generateMetadata(): Metadata {
  return {
    title: "Salazar Concept",
    description: DICTIONARIES[requestLang()].meta.description,
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const lang = requestLang();

  return (
    <html lang={lang} className={`${n27.variable} ${n27.className}`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if("scrollRestoration" in history)history.scrollRestoration="manual";window.scrollTo(0,0);}catch(e){}${LANG_SWAP_SCRIPT}`,
          }}
        />
      </head>
      <body>
        <LangProvider lang={lang}>
          <SiteChrome />
          {children}
        </LangProvider>
      </body>
    </html>
  );
}
