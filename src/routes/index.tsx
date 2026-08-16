import { createFileRoute } from "@tanstack/react-router";

import lv from "@/i18n/lv";
import { Calculator } from "@/components/Calculator";
import { CountryCatalog } from "@/components/CountryCatalog";
import { Faq } from "@/components/Faq";
import { Footer } from "@/components/Footer";
import { FunctionNotCode } from "@/components/FunctionNotCode";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Timeline } from "@/components/Timeline";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: lv.meta.title },
      { name: "description", content: lv.meta.description },
      { property: "og:title", content: lv.meta.title },
      { property: "og:description", content: lv.meta.description },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Calculator />
        <CountryCatalog />
        <Timeline />
        <FunctionNotCode />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
