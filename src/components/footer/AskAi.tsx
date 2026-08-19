import { useState } from "react";

import lv from "@/i18n/lv";
import { AiIcon } from "@/components/footer/ai-icons";

/**
 * "Vaicā AI par PPWR" — opens an AI assistant with a pre-filled Latvian prompt.
 * Prompt + targets live in i18n so the block is portable to other projects.
 */
export function AskAi() {
  const { label, lead, prompt, copy, copied, disclaimer, targets } = lv.footer.askAi;
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(prompt);
      setIsCopied(true);
      window.setTimeout(() => setIsCopied(false), 2000);
    } catch {
      /* clipboard unavailable — the links still work */
    }
  };

  const q = encodeURIComponent(prompt);

  return (
    <div>
      <span className="form-label">{label}</span>
      <p className="mt-2 max-w-[52ch] text-sm text-muted-foreground">{lead}</p>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        {targets.map((t) => (
          <a
            key={t.name}
            href={t.url.replace("{q}", q)}
            target="_blank"
            rel="noreferrer"
            title={`${label} — ${t.name}`}
            aria-label={`${label} — ${t.name}`}
            className="inline-flex items-center gap-2 border border-border-strong px-3 py-2 font-mono text-[11px] font-bold uppercase tracking-[0.12em] transition-colors hover:border-primary hover:border-dashed hover:text-primary"
          >
            <AiIcon name={t.icon} className="h-4 w-4 shrink-0" />
            <span>{t.name}</span>
          </a>
        ))}
        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center border border-dashed border-border-strong px-3 py-2 font-mono text-[11px] font-bold uppercase tracking-[0.12em] transition-colors hover:border-primary hover:text-primary"
        >
          {isCopied ? copied : copy}
        </button>
      </div>

      <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
        {disclaimer}
      </p>
    </div>
  );
}
