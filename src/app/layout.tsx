import type { Metadata } from "next";
import localFont from "next/font/local";
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
export const metadata: Metadata = {
  title: "Salazar Concept - EMBRACE THE CONCEPT",
  description:
    "TRUE CONCEPTS ARE THOSE THAT EXPRESS A VERY STRONG DEFINITION AND ARE WELL CONSOLIDATED BY EVERYONE AROUND THE WORLD. THE SALAZAR CONCEPT IS A UNIVERSAL CONCEPT THAT WAS INSPIRED BY AN ICON CAPABLE OF LOOKING AT A MARKET FROM A 360o ANGLE AND CAPABLE OF CAMOUFLAGING ITSELF AND ADAPTING TO DIFFERENT ECOSYSTEMS OR BUSINESS HABITATS.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={n27.className}>{children}</body>
    </html>
  );
}
