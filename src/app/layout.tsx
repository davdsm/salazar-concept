"use client";

import { createContext, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import localFont from "next/font/local";
import "animate.css/animate.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
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
});

export const AppContext = createContext({
  firstLoad: false,
  pageTransition: (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    link: string
  ) => { },
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const [firstLoad, setFirstLoad] = useState(false);

  useEffect(() => {
    if (!firstLoad)
      setTimeout(() => {
        setFirstLoad(true);
      }, 2000);
  }, [firstLoad]);

  const pageTransition = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    link: string
  ) => {
    if (pathname !== link.split("?")[0]) {
      e.preventDefault();

      const cortin: HTMLElement = document.getElementById("cortin")!;
      cortin.className = "up";

      setTimeout(() => {
        cortin.className = "down";
      }, 1000);

      setTimeout(() => {
        router.push(link);
      }, 700);

      setTimeout(() => {
        cortin.className = "";
      }, 2000);
    }
  };

  return (
    <html lang="en" className="scroll-smooth">
      <head>

        <title>Salazar Concept - EMBRACE THE CONCEPT</title>
        <meta name="title" content="Salazar Concept - EMBRACE THE CONCEPT" />
        <meta name="description" content="True concepts are those that express a very strong definition and             are well consolidated by everyone around the world. the salazar             concept is a universal concept that was inspired by an icon capable             of looking at a market from a 360o angle and capable of camouflaging             itself and adapting to different ecosystems or business habitats." />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://salazarconcept.com/" />
        <meta property="og:title" content="Salazar Concept - EMBRACE THE CONCEPT" />
        <meta property="og:description" content="True concepts are those that express a very strong definition and             are well consolidated by everyone around the world. the salazar             concept is a universal concept that was inspired by an icon capable             of looking at a market from a 360o angle and capable of camouflaging             itself and adapting to different ecosystems or business habitats." />
        <meta property="og:image" content="blob:https://instant.tools/d851e8d9-6e0e-4e2f-8416-9a4848d81d79" />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://salazarconcept.com/" />
        <meta property="twitter:title" content="Salazar Concept - EMBRACE THE CONCEPT" />
        <meta property="twitter:description" content="True concepts are those that express a very strong definition and             are well consolidated by everyone around the world. the salazar             concept is a universal concept that was inspired by an icon capable             of looking at a market from a 360o angle and capable of camouflaging             itself and adapting to different ecosystems or business habitats." />
        <meta property="twitter:image" content="banner.png" />

      </head>
      <body className={n27.className}>
        <div id="cortin"></div>
        <AppContext.Provider value={{ firstLoad, pageTransition }}>
          {children}
        </AppContext.Provider>
      </body>
    </html>
  );
}
