export type PortfolioProject = {
  id: string;
  client: string;
  src: string;
  year: string;
};

/* Mesma ordem que o Wall of Fame e que as categorias / blurbs do dicionário. */
export const PORTFOLIO_PROJECTS: readonly PortfolioProject[] = [
  {
    id: "walkys",
    client: "Walkys",
    src: "/images/wall-of-fame/art-direction-walkys.jpg",
    year: "2024",
  },
  {
    id: "tia-xica",
    client: "Tia Xica",
    src: "/images/wall-of-fame/photography-tia-xica.jpg",
    year: "2024",
  },
  {
    id: "taiponte",
    client: "Taiponte",
    src: "/images/wall-of-fame/branding-taiponte.jpg",
    year: "2023",
  },
  {
    id: "sek-identity",
    client: "SEK",
    src: "/images/wall-of-fame/identity-sek.jpg",
    year: "2025",
  },
  {
    id: "sek-website",
    client: "SEK",
    src: "/images/wall-of-fame/website-sek.jpg",
    year: "2025",
  },
];
