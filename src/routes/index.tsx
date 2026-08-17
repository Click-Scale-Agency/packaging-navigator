import { createFileRoute } from "@tanstack/react-router";

import lv from "@/i18n/lv";
import { briefings } from "@/data";
import { Calculator } from "@/components/Calculator";
import { CountryCatalog } from "@/components/CountryCatalog";
import { Faq } from "@/components/Faq";
import { Footer } from "@/components/Footer";
import { FunctionNotCode } from "@/components/FunctionNotCode";
import { GuidePromo } from "@/components/GuidePromo";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { MarketplaceNumbers } from "@/components/MarketplaceNumbers";
import { Timeline } from "@/components/Timeline";
import { VideoBriefing } from "@/components/VideoBriefing";

const briefing = briefings[0];
const briefingThumb = briefing
  ? `https://i.ytimg.com/vi/${briefing.source.videoId}/maxresdefault.jpg`
  : null;

export const Route = createFileRoute("/")({
  validateSearch: (
    search: Record<string, unknown>,
  ): { w?: string | undefined; ship?: string | undefined; cc?: string | undefined } => ({
    // Optional calculator pre-fill from the action guide deep-link.
    w: typeof search["w"] === "string" ? (search["w"] as string) : undefined,
    ship: typeof search["ship"] === "string" ? (search["ship"] as string) : undefined,
    cc: typeof search["cc"] === "string" ? (search["cc"] as string) : undefined,
  }),
  head: () => ({
    meta: [
      { title: lv.meta.title },
      { name: "description", content: lv.meta.description },
      { property: "og:title", content: lv.meta.title },
      { property: "og:description", content: lv.meta.description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      ...(briefingThumb
        ? [
            { property: "og:image", content: briefingThumb },
            { name: "twitter:image", content: briefingThumb },
          ]
        : []),
    ],
    scripts:
      briefing && briefingThumb
        ? [
            {
              type: "application/ld+json",
              children: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "VideoObject",
                name: briefing.title,
                description: briefing.keyPoints[0],
                thumbnailUrl: [briefingThumb],
                uploadDate: briefing.source.publishedAt,
                embedUrl: `https://www.youtube-nocookie.com/embed/${briefing.source.videoId}`,
                contentUrl: briefing.source.url,
                publisher: {
                  "@type": "Organization",
                  name: briefing.source.name,
                },
              }),
            },
          ]
        : [],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <GuidePromo />
        <Calculator />
        <CountryCatalog />
        <MarketplaceNumbers />
        <Timeline />
        <VideoBriefing />
        <FunctionNotCode />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
