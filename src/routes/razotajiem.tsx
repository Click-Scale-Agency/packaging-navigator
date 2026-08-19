import { createFileRoute } from "@tanstack/react-router";

import lv from "@/i18n/lv";
import { canonicalUrl, socialImageMeta } from "@/lib/seo";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Producers } from "@/components/Producers";

export const Route = createFileRoute("/razotajiem")({
  head: () => {
    const title = lv.producers.meta.title;
    const description = lv.producers.meta.description;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { property: "og:url", content: canonicalUrl("/razotajiem") },
        ...socialImageMeta,
      ],
      links: [{ rel: "canonical", href: canonicalUrl("/razotajiem") }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: lv.producers.faq.items.map((it) => ({
              "@type": "Question",
              name: it.q,
              acceptedAnswer: {
                "@type": "Answer",
                text: it.a.replace(/\s*\[S\d+\]/g, ""),
              },
            })),
          }),
        },
      ],
    };
  },
  component: ProducersPage,
});

function ProducersPage() {
  return (
    <>
      <Header />
      <main>
        <Producers />
      </main>
      <Footer />
    </>
  );
}
