/**
 * ChannelBadge / ChannelIcon
 * -------------------------------------------------------------
 * Single source of truth for how a sales/ad channel is shown in the USA app.
 * Every place that displays a channel name should use <ChannelBadge> (icon +
 * name) or <ChannelIcon> (icon only) so the branding stays consistent.
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
  fg: string;
  ring?: boolean; // add a hairline ring for light backgrounds
  glyph: (c: string) => React.ReactNode;
}

const letter = (ch: string) => (c: string) =>
  (
    <span
      style={{ color: c, fontWeight: 800, fontSize: "62%", lineHeight: 1, fontFamily: "'Outfit', sans-serif" }}
    >
      {ch}
    </span>
  );

const CHANNELS: Record<ChannelKey, ChannelDef> = {
  amazon: {
    name: "Amazon",
    bg: "#232F3E",
    fg: "#FF9900",
    glyph: (c) => (
      <svg viewBox="0 0 24 24" width="70%" height="70%" fill="none">
        <text x="12" y="13.5" textAnchor="middle" fontSize="11" fontWeight="800" fill="#fff" fontFamily="'Outfit',sans-serif">a</text>
        <path d="M5 16.5c4 2.6 10 2.6 14 0" stroke={c} strokeWidth="1.7" strokeLinecap="round" fill="none" />
        <path d="M17.4 15.2l1.9-.2-.5 1.9" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </svg>
    ),
  },
  walmart: {
    name: "Walmart",
    bg: "#0071DC",
    fg: "#FFC220",
    glyph: (c) => (
      <svg viewBox="0 0 24 24" width="62%" height="62%">
        <g stroke={c} strokeWidth="2.1" strokeLinecap="round">
          <line x1="12" y1="3.5" x2="12" y2="8.5" />
          <line x1="12" y1="15.5" x2="12" y2="20.5" />
          <line x1="4.6" y1="7.8" x2="8.9" y2="10.3" />
          <line x1="15.1" y1="13.7" x2="19.4" y2="16.2" />
          <line x1="4.6" y1="16.2" x2="8.9" y2="13.7" />
          <line x1="15.1" y1="10.3" x2="19.4" y2="7.8" />
        </g>
      </svg>
    ),
  },
  shopify: {
    name: "Shopify",
    bg: "#5E8E3E",
    fg: "#fff",
    glyph: (c) => (
      <svg viewBox="0 0 24 24" width="66%" height="66%" fill="none">
        <path d="M15 6.5c-.4-.4-1-.6-1.6-.6-1.6 0-2.6 1.2-3.1 2.6l-3.8 1.2c-.3.1-.4.2-.5.5L5 18.2 13 20l1.4-11.8c0-.3-.1-.5-.3-.7z" fill={c} opacity="0.95" />
        <text x="11.3" y="16.2" fontSize="7.5" fontWeight="800" fill="#5E8E3E" fontFamily="'Outfit',sans-serif" textAnchor="middle">S</text>
      </svg>
    ),
  },
  ebay: {
    name: "eBay",
    bg: "#fff",
    fg: "#E53238",
    ring: true,
    glyph: () => (
      <svg viewBox="0 0 24 24" width="86%" height="86%">
        <text x="4.2" y="15.5" fontSize="9" fontWeight="800" fill="#E53238" fontFamily="'Outfit',sans-serif">e</text>
        <text x="9" y="15.5" fontSize="9" fontWeight="800" fill="#0064D2" fontFamily="'Outfit',sans-serif">B</text>
      </svg>
    ),
  },
  target: {
    name: "Target",
    bg: "#fff",
    fg: "#CC0000",
    ring: true,
    glyph: (c) => (
      <svg viewBox="0 0 24 24" width="74%" height="74%">
        <circle cx="12" cy="12" r="7" fill="none" stroke={c} strokeWidth="2.4" />
        <circle cx="12" cy="12" r="2.4" fill={c} />
      </svg>
    ),
  },
  instagram: {
    name: "Instagram",
    bg: "linear-gradient(45deg,#F58529,#DD2A7B,#8134AF,#515BD4)",
    fg: "#fff",
    glyph: (c) => (
      <svg viewBox="0 0 24 24" width="66%" height="66%" fill="none" stroke={c} strokeWidth="2">
        <rect x="4.5" y="4.5" width="15" height="15" rx="4.5" />
        <circle cx="12" cy="12" r="3.6" />
        <circle cx="16.4" cy="7.6" r="1" fill={c} stroke="none" />
      </svg>
    ),
  },
  facebook: {
    name: "Facebook",
    bg: "#1877F2",
    fg: "#fff",
    glyph: (c) => (
      <svg viewBox="0 0 24 24" width="72%" height="72%">
        <path d="M13.5 20v-7h2.1l.4-2.6h-2.5V8.7c0-.75.25-1.26 1.32-1.26H16V5.13C15.7 5.09 14.9 5 14 5c-1.9 0-3.2 1.16-3.2 3.3v1.9H8.6V13h2.2v7z" fill={c} />
      </svg>
    ),
  },
  tiktok: {
    name: "TikTok",
    bg: "#000000",
    fg: "#fff",
    glyph: () => (
      <svg viewBox="0 0 24 24" width="64%" height="64%">
        <path d="M14 4.5c.3 2 1.7 3.4 3.7 3.6v2.3c-1.2 0-2.4-.35-3.4-1v4.6c0 2.6-2 4.5-4.4 4.5A4.4 4.4 0 0 1 9.4 9.9v2.4a2 2 0 1 0 1.5 1.95V4.5z" fill="#25F4EE" transform="translate(-0.8,0.7)" />
        <path d="M14 4.5c.3 2 1.7 3.4 3.7 3.6v2.3c-1.2 0-2.4-.35-3.4-1v4.6c0 2.6-2 4.5-4.4 4.5A4.4 4.4 0 0 1 9.4 9.9v2.4a2 2 0 1 0 1.5 1.95V4.5z" fill="#FE2C55" transform="translate(0.8,-0.3)" />
        <path d="M14 4.5c.3 2 1.7 3.4 3.7 3.6v2.3c-1.2 0-2.4-.35-3.4-1v4.6c0 2.6-2 4.5-4.4 4.5A4.4 4.4 0 0 1 9.4 9.9v2.4a2 2 0 1 0 1.5 1.95V4.5z" fill="#fff" />
      </svg>
    ),
  },
  etsy: {
    name: "Etsy",
    bg: "#F1641E",
    fg: "#fff",
    glyph: letter("E"),
  },
  google: {
    name: "Google",
    bg: "#fff",
    fg: "#4285F4",
    ring: true,
    glyph: () => (
      <svg viewBox="0 0 24 24" width="78%" height="78%">
        <path d="M21 12.2c0-.7-.06-1.2-.18-1.8H12v3.3h5.05c-.1.85-.65 2.14-1.87 3l3 2.3C19.9 16.9 21 14.8 21 12.2z" fill="#4285F4" />
        <path d="M12 21c2.43 0 4.47-.8 5.96-2.18l-2.9-2.25c-.8.55-1.86.94-3.06.94-2.35 0-4.34-1.58-5.05-3.72l-3 2.32C5.4 19.1 8.46 21 12 21z" fill="#34A853" />
        <path d="M6.95 13.8A5.4 5.4 0 0 1 6.65 12c0-.63.11-1.24.3-1.8L3.95 7.87A9 9 0 0 0 3 12c0 1.45.35 2.82.96 4.04l2.99-2.24z" fill="#FBBC05" />
        <path d="M12 6.48c1.32 0 2.5.46 3.44 1.35l2.57-2.57C16.46 3.77 14.42 3 12 3 8.46 3 5.4 4.9 3.95 7.87l3 2.33C7.66 8.06 9.65 6.48 12 6.48z" fill="#EA4335" />
      </svg>
    ),
  },
  website: {
    name: "Website",
    bg: "#64748B",
    fg: "#fff",
    glyph: (c) => (
      <svg viewBox="0 0 24 24" width="70%" height="70%" fill="none" stroke={c} strokeWidth="1.8">
        <circle cx="12" cy="12" r="7.5" />
        <path d="M4.5 12h15M12 4.5c2 2.2 2 12.8 0 15M12 4.5c-2 2.2-2 12.8 0 15" />
      </svg>
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
  const key = normalizeChannel(channel);
  const def = CHANNELS[key];
  const px = SIZE_PX[size] ?? 20;
  const isGradient = def.bg.startsWith("linear-gradient");
  return (
    <span
      title={title ?? def.name}
      className={`inline-flex items-center justify-center rounded-[5px] shrink-0 overflow-hidden ${className}`}
      style={{
        width: px,
        height: px,
        background: def.bg,
        boxShadow: def.ring ? "inset 0 0 0 1px rgba(15,23,42,0.12)" : undefined,
        ...(isGradient ? {} : {}),
      }}
    >
      {def.glyph(def.fg)}
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
