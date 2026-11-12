import type { Metadata } from "next";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import {
  DICTIONARIES,
  LANG_HEADER,
  isLang,
  type Lang,
} from "@/app/i18n/dictionary";
import ProjectDetail from "@/app/components/portfolio/ProjectDetail";
import {
  WORK_PROJECTS,
  getWorkProject,
} from "@/app/components/portfolio/projects";

function requestLang(): Lang {
  const value = headers().get(LANG_HEADER);
  return isLang(value) ? value : "en";
}

export function generateStaticParams() {
  return WORK_PROJECTS.map((project) => ({ slug: project.id }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const lang = requestLang();
  const project = getWorkProject(params.slug);
  if (!project) return { title: "Salazar Concept" };
  const story = DICTIONARIES[lang].portfolio.project.cases[project.id];
  return {
    title: `${project.client} · Salazar Concept`,
    description: story?.lede ?? DICTIONARIES[lang].portfolio.meta,
  };
}

export default function ProjectPage({
  params,
}: {
  params: { slug: string };
}) {
  if (!getWorkProject(params.slug)) notFound();
  return <ProjectDetail slug={params.slug} />;
}
