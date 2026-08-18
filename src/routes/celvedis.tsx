import { createFileRoute } from "@tanstack/react-router";

import lv from "@/i18n/lv";
import { canonicalUrl, socialImageMeta } from "@/lib/seo";
import { ActionGuide } from "@/components/ActionGuide";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

export const Route = createFileRoute("/celvedis")({
  head: () => {
    const title = `${lv.guide.title} — ${lv.brand.name}`;
    const description = lv.guide.lead;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { property: "og:url", content: canonicalUrl("/celvedis") },
        ...socialImageMeta,
      ],
      links: [{ rel: "canonical", href: canonicalUrl("/celvedis") }],
    };
  },
  component: GuidePage,
});

function GuidePage() {
  return (
    <>
      <Header />
      <main>
        <ActionGuide />
      </main>
      <Footer />
    </>
  );
}
