import { projects } from "@/lib/data";
import CaseStudy from "./case-study";

// Force static params generation for export
export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <CaseStudy slug={slug} />;
}
