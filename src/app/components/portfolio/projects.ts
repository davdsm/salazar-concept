export type WorkProject = {
  id: string;
  client: string;
  src: string;
  year: string;
  /** Chave de filtro (labels no dicionário). */
  cat: string;
  /** Imagens extra da página de projeto (além da capa). */
  gallery: readonly string[];
};

const img = {
  walkys: "/images/wall-of-fame/art-direction-walkys.jpg",
  tia: "/images/wall-of-fame/photography-tia-xica.jpg",
  taiponte: "/images/wall-of-fame/branding-taiponte.jpg",
  sekId: "/images/wall-of-fame/identity-sek.jpg",
  sekWeb: "/images/wall-of-fame/website-sek.jpg",
  movimento: "/images/legacy/detail-a.jpg",
  palco: "/images/legacy/hero.jpg",
  estudio: "/images/legacy/detail-b.jpg",
  fashion: "/images/industries/fashion.jpg",
  food: "/images/industries/food.jpg",
  sports: "/images/industries/sports.jpg",
  construction: "/images/industries/construction.jpg",
  story: "/images/story.jpg",
} as const;

/* Tia Xica primeiro; depois o resto do showroom. */
export const WORK_PROJECTS: readonly WorkProject[] = [
  {
    id: "tia-xica",
    client: "Tia Xica",
    src: img.tia,
    year: "2024",
    cat: "photography",
    gallery: [img.food, img.estudio, img.story, img.palco],
  },
  {
    id: "walkys",
    client: "Walkys",
    src: img.walkys,
    year: "2024",
    cat: "art-direction",
    gallery: [img.fashion, img.sports, img.movimento, img.story],
  },
  {
    id: "taiponte",
    client: "Taiponte",
    src: img.taiponte,
    year: "2023",
    cat: "branding",
    gallery: [img.construction, img.sekId, img.palco, img.estudio],
  },
  {
    id: "sek-identity",
    client: "SEK",
    src: img.sekId,
    year: "2025",
    cat: "identity",
    gallery: [img.sekWeb, img.taiponte, img.construction, img.story],
  },
  {
    id: "sek-website",
    client: "SEK",
    src: img.sekWeb,
    year: "2025",
    cat: "website",
    gallery: [img.sekId, img.story, img.fashion, img.palco],
  },
  {
    id: "movimento",
    client: "Movimento",
    src: img.movimento,
    year: "2023",
    cat: "direction",
    gallery: [img.palco, img.estudio, img.sports, img.story],
  },
  {
    id: "palco",
    client: "Palco",
    src: img.palco,
    year: "2022",
    cat: "campaign",
    gallery: [img.movimento, img.estudio, img.fashion, img.story],
  },
  {
    id: "estudio",
    client: "Estúdio",
    src: img.estudio,
    year: "2024",
    cat: "photography",
    gallery: [img.tia, img.food, img.movimento, img.palco],
  },
  {
    id: "atelier",
    client: "Atelier",
    src: img.fashion,
    year: "2024",
    cat: "fashion",
    gallery: [img.walkys, img.sports, img.movimento, img.story],
  },
  {
    id: "mesa",
    client: "Mesa",
    src: img.food,
    year: "2023",
    cat: "food",
    gallery: [img.tia, img.estudio, img.story, img.palco],
  },
  {
    id: "pista",
    client: "Pista",
    src: img.sports,
    year: "2025",
    cat: "sports",
    gallery: [img.walkys, img.fashion, img.movimento, img.construction],
  },
];

export const WORK_FILTERS = [
  "art-direction",
  "photography",
  "branding",
  "identity",
  "website",
  "direction",
  "campaign",
  "fashion",
  "food",
  "sports",
] as const;

export function getWorkProject(id: string) {
  return WORK_PROJECTS.find((p) => p.id === id);
}

export function getNextWorkProject(id: string) {
  const i = WORK_PROJECTS.findIndex((p) => p.id === id);
  if (i < 0) return undefined;
  return WORK_PROJECTS[(i + 1) % WORK_PROJECTS.length];
}
