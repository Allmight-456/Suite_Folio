import { SITE_URL, footer } from "@/content/site";
import type { Project } from "@/content/schema";

/**
 * Structured data (TECH-ARCHITECTURE §5). Person on every page (in layout),
 * SoftwareSourceCode per /work page. Claims stay inside CONTENT.md's facts
 * registry — no invented metrics.
 */
export function PersonJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Ishan Kumar",
    jobTitle: "Backend & GenAI Engineer",
    url: SITE_URL,
    address: { "@type": "PostalAddress", addressLocality: "Bengaluru", addressCountry: "IN" },
    email: "bhardwajishansingh@gmail.com",
    sameAs: footer.links
      .filter((l) => l.href.startsWith("http"))
      .map((l) => l.href),
    knowsAbout: [
      "Backend engineering",
      "FastAPI",
      "Go",
      "PostgreSQL",
      "Retrieval-Augmented Generation",
      "Multi-agent systems",
      "Agent infrastructure",
    ],
  };
  return <Script data={data} />;
}

export function SoftwareJsonLd({ project }: { project: Project }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    name: project.name,
    description: project.oneLiner,
    codeRepository: project.repo,
    programmingLanguage: project.stack,
    author: { "@type": "Person", name: "Ishan Kumar", url: SITE_URL },
  };
  return <Script data={data} />;
}

function Script({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
