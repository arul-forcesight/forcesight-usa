/**
 * ChannelBadge / ChannelIcon
 * -------------------------------------------------------------
 * Single source of truth for how a sales/ad channel is shown in the USA app.
 * Every place that displays a channel name should use <ChannelBadge> (icon +
 * name) or <ChannelIcon> (icon only) so the branding stays consistent.
 *
 * Rendering model (kept deliberately simple so it never breaks at small sizes):
 *   a brand-colored rounded square + ONE centered glyph.
 *   - letter marks  -> a flex-centered HTML <span> (crisp at any size)
 *   - icon marks    -> a path-only inline SVG (no fragile <text> elements)
 *
 * USA market only. Legacy Indian channels (Blinkit / Meesho / Flipkart) are
 * normalized to their USA equivalents so no stray names slip through.
 */
import React from "react";

export type ChannelKey =
  | "amazon"
  | "walmart"
  | "shopify"
  | "ebay"
  | "target"
  | "instagram"
  | "facebook"
  | "tiktok"
  | "etsy"
  | "google"
  | "website";

interface ChannelDef {
  name: string;
  bg: string;
  /** Either a single-letter monogram OR a path-only SVG mark. */
  letter?: string;
  mark?: (px: number) => React.ReactNode;
}

// Path-only SVG marks (no <text>), sized as a share of the icon box.
const svg = (pct: number, node: React.ReactNode) => (px: number) => (
  <svg
    width={px * pct}
    height={px * pct}
    viewBox="0 0 24 24"
    fill="none"
    style={{ display: "block" }}
    aria-hidden="true"
  >
    {node}
  </svg>
);

const CHANNELS: Record<ChannelKey, ChannelDef> = {
  amazon: {
    name: "Amazon",
    bg: "#232F3E",
    // orange smile — the recognizable Amazon mark
    mark: svg(
      0.72,
      <>
        <path d="M4.5 15.5c4.3 3 10.7 3 15 0" stroke="#FF9900" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M17 14.7l2.4-.4-.5 2.4" stroke="#FF9900" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8.5 12.2c0-1.1 1.4-1.7 3.1-1.7 1.4 0 2.7.4 2.7 1.9v2.2" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M14.3 12.4c-.7.5-1.9.7-3 .7-1 0-1.9.5-1.9 1.4 0 .8.7 1.3 1.7 1.3 1.6 0 2.9-.7 3.2-1.7" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
  },
  walmart: {
    name: "Walmart",
    bg: "#0071DC",
    // yellow spark
    mark: svg(
      0.62,
      <g stroke="#FFC220" strokeWidth="2.2" strokeLinecap="round">
        <line x1="12" y1="3" x2="12" y2="8.4" />
        <line x1="12" y1="15.6" x2="12" y2="21" />
        <line x1="4.2" y1="7.5" x2="8.9" y2="10.2" />
        <line x1="15.1" y1="13.8" x2="19.8" y2="16.5" />
        <line x1="4.2" y1="16.5" x2="8.9" y2="13.8" />
        <line x1="15.1" y1="10.2" x2="19.8" y2="7.5" />
      </g>
    ),
  },
  shopify: { name: "Shopify", bg: "#5E8E3E", letter: "S" },
  ebay: { name: "eBay", bg: "#E53238", letter: "e" },
  target: {
    name: "Target",
    bg: "#CC0000",
    // bullseye
    mark: svg(
      0.72,
      <>
        <circle cx="12" cy="12" r="7.2" stroke="#fff" strokeWidth="2.4" />
        <circle cx="12" cy="12" r="2.6" fill="#fff" />
      </>
    ),
  },
  instagram: {
    name: "Instagram",
    bg: "linear-gradient(45deg,#F58529,#DD2A7B,#8134AF,#515BD4)",
    // camera
    mark: svg(
      0.64,
      <>
        <rect x="4.3" y="4.3" width="15.4" height="15.4" rx="4.6" stroke="#fff" strokeWidth="2" />
        <circle cx="12" cy="12" r="3.7" stroke="#fff" strokeWidth="2" />
        <circle cx="16.6" cy="7.4" r="1.15" fill="#fff" />
      </>
    ),
  },
  facebook: { name: "Facebook", bg: "#1877F2", letter: "f" },
  tiktok: {
    name: "TikTok",
    bg: "#000000",
    // music note
    mark: svg(
      0.58,
      <path
        d="M14.2 3.5c.35 2.3 1.9 3.75 4.1 3.95v2.55c-1.3 0-2.6-.4-3.7-1.1v5c0 2.85-2.2 4.9-4.85 4.9a4.85 4.85 0 0 1-.6-9.65v2.65a2.2 2.2 0 1 0 1.65 2.13V3.5z"
        fill="#fff"
      />
    ),
  },
  etsy: { name: "Etsy", bg: "#F1641E", letter: "E" },
  google: { name: "Google", bg: "#4285F4", letter: "G" },
  website: {
    name: "Website",
    bg: "#64748B",
    mark: svg(
      0.72,
      <g stroke="#fff" strokeWidth="1.8" strokeLinecap="round">
        <circle cx="12" cy="12" r="7.5" />
        <path d="M4.5 12h15M12 4.5c2.1 2.3 2.1 12.7 0 15M12 4.5c-2.1 2.3-2.1 12.7 0 15" />
      </g>
    ),
  },
};

/** Map any raw channel string (incl. legacy Indian names & ad-platform labels) to a canonical key. */
export function normalizeChannel(raw?: string | null): ChannelKey {
  const s = (raw || "").toLowerCase().trim();
  if (!s) return "website";
  // Legacy Indian channels → USA equivalents
  if (s.includes("blinkit")) return "walmart";
  if (s.includes("flipkart")) return "amazon";
  if (s.includes("meesho")) return "tiktok";
  // USA channels & ad platforms (substring match handles "Amazon PPC", "Instagram Shop", etc.)
  if (s.includes("amazon")) return "amazon";
  if (s.includes("walmart")) return "walmart";
  if (s.includes("shopify")) return "shopify";
  if (s.includes("ebay") || s.includes("e-bay")) return "ebay";
  if (s.includes("target")) return "target";
  if (s.includes("instagram") || s === "ig") return "instagram";
  if (s.includes("facebook") || s.includes("meta") || s === "fb") return "facebook";
  if (s.includes("tiktok") || s.includes("tik tok")) return "tiktok";
  if (s.includes("etsy")) return "etsy";
  if (s.includes("google")) return "google";
  if (s.includes("website") || s.includes("d2c") || s.includes("direct")) return "website";
  return "website";
}

export function channelName(raw?: string | null): string {
  return CHANNELS[normalizeChannel(raw)].name;
}

const SIZE_PX: Record<string, number> = { xs: 16, sm: 20, md: 24, lg: 28 };

export function ChannelIcon({
  channel,
  size = "sm",
  className = "",
  title,
}: {
  channel: string;
  size?: "xs" | "sm" | "md" | "lg";
  className?: string;
  title?: string;
}) {
  const def = CHANNELS[normalizeChannel(channel)];
  const px = SIZE_PX[size] ?? 20;
  return (
    <span
      title={title ?? def.name}
      className={`inline-flex items-center justify-center shrink-0 overflow-hidden ${className}`}
      style={{ width: px, height: px, background: def.bg, borderRadius: Math.round(px * 0.28) }}
    >
      {def.mark ? (
        def.mark(px)
      ) : (
        <span
          style={{
            color: "#fff",
            fontWeight: 800,
            fontSize: Math.round(px * 0.56),
            lineHeight: 1,
            fontFamily: "'Outfit', sans-serif",
          }}
        >
          {def.letter}
        </span>
      )}
    </span>
  );
}

export function ChannelBadge({
  channel,
  size = "sm",
  showName = true,
  nameOverride,
  className = "",
  textClassName = "",
}: {
  channel: string;
  size?: "xs" | "sm" | "md" | "lg";
  showName?: boolean;
  nameOverride?: string;
  className?: string;
  textClassName?: string;
}) {
  const def = CHANNELS[normalizeChannel(channel)];
  return (
    <span className={`inline-flex items-center gap-1.5 align-middle ${className}`}>
      <ChannelIcon channel={channel} size={size} />
      {showName && (
        <span className={textClassName || "whitespace-nowrap"}>{nameOverride ?? def.name}</span>
      )}
    </span>
  );
}

export default ChannelBadge;
