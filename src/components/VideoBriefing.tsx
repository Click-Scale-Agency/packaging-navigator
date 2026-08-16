import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

import lv from "@/i18n/lv";
import { briefings } from "@/data";
import { CropMarks, Press, SectionHead } from "@/components/primitives";
import tverisLogo from "@/assets/tveris-logo.jpeg.asset.json";

export function VideoBriefing() {
  const briefing = briefings[0];
  const [playing, setPlaying] = useState(false);
  const [openTopic, setOpenTopic] = useState<number | null>(0);

  if (!briefing) return null;

  const { source } = briefing;
  const thumb = `https://i.ytimg.com/vi/${source.videoId}/maxresdefault.jpg`;
  const embed = `https://www.youtube-nocookie.com/embed/${source.videoId}?start=${source.startSeconds}&autoplay=1&rel=0`;

  return (
    <section className="border-b border-dashed border-border-strong">
      <div className="mx-auto max-w-[1400px] px-5 py-20 md:px-10 md:py-28">
        <SectionHead
          id="video"
          kicker={lv.video.kicker}
          title={lv.video.title}
          lead={lv.video.lead}
        />

        <div className="mt-14 grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-12">
          {/* Video card */}
          <Press>
            <figure className="relative border border-border-strong bg-card p-3 md:p-4">
              <CropMarks />
              <div className="flex items-baseline justify-between gap-4 pb-3">
                <span className="form-label">{lv.video.sourceLabel}</span>
                <span className="data-value text-[11px] tracking-[0.14em] text-muted-foreground">
                  {source.publishedAt}
                </span>
              </div>
              <div className="relative aspect-video w-full border border-dashed border-border-strong bg-paper-deep/60">
                {playing ? (
                  <iframe
                    className="absolute inset-0 h-full w-full"
                    src={embed}
                    title={briefing.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <button
                    type="button"
                    onClick={() => setPlaying(true)}
                    className="group absolute inset-0 flex items-center justify-center"
                    aria-label={`${lv.video.play}: ${briefing.title}`}
                  >
                    <img
                      src={thumb}
                      alt={briefing.title}
                      loading="lazy"
                      width={1280}
                      height={720}
                      className="absolute inset-0 h-full w-full object-cover opacity-90 transition-opacity group-hover:opacity-100"
                    />
                    <span className="data-value relative border-2 border-dashed border-foreground bg-background/90 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em] transition-colors group-hover:border-primary group-hover:text-primary">
                      ▶ {lv.video.play}
                    </span>
                  </button>
                )}
              </div>
              <figcaption className="mt-3 flex flex-wrap items-center justify-between gap-3 border-t border-dashed border-border pt-3">
                <span className="flex items-center gap-2">
                  <img
                    src={tverisLogo.url}
                    alt={source.name}
                    loading="lazy"
                    className="h-4 w-auto"
                  />
                </span>
                <a
                  href={source.url}
                  target="_blank"
                  rel="noreferrer"
                  className="form-label text-primary underline decoration-dashed underline-offset-4"
                >
                  {lv.video.openYoutube}
                </a>
              </figcaption>
            </figure>
          </Press>

          {/* Key points */}
          <div>
            <Press>
              <h3 className="text-2xl leading-tight md:text-3xl">
                {lv.video.keyPointsTitle}
              </h3>
            </Press>
            <ol className="mt-6 border-t border-dashed border-border-strong">
              {briefing.keyPoints.map((point, i) => (
                <Press as="li" key={point} delay={i * 0.04}>
                  <div className="flex gap-4 border-b border-dashed border-border-strong py-4">
                    <span className="data-value pt-1 text-[11px] tracking-[0.18em] text-muted-foreground">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="max-w-[56ch] text-sm leading-relaxed text-muted-foreground">
                      {point}
                    </p>
                  </div>
                </Press>
              ))}
            </ol>
          </div>
        </div>

        {/* Detailed topics */}
        <Press>
          <h3 className="mt-16 text-2xl leading-tight md:text-3xl">
            {lv.video.topicsTitle}
          </h3>
        </Press>
        <div className="mt-6 max-w-[80ch] border-t border-dashed border-border-strong">
          {briefing.topics.map((topic, i) => {
            const isOpen = openTopic === i;
            return (
              <Press key={topic.title} delay={i * 0.04}>
                <div className="border-b border-dashed border-border-strong">
                  <button
                    type="button"
                    onClick={() => setOpenTopic(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-start gap-4 py-5 text-left transition-colors hover:text-primary"
                  >
                    <span className="data-value pt-1 text-[11px] tracking-[0.18em] text-muted-foreground">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="data-value flex-1 text-base leading-snug md:text-lg">
                      {topic.title}
                    </span>
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ type: "spring", stiffness: 220, damping: 24 }}
                      className="pt-1 text-lg leading-none"
                    >
                      +
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen ? (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="max-w-[66ch] pb-6 pl-10 text-sm leading-relaxed text-muted-foreground md:text-base">
                          {topic.body}
                        </p>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>
              </Press>
            );
          })}
        </div>

        <p className="data-value mt-8 text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
          {briefing.disclaimer}
        </p>
      </div>
    </section>
  );
}
