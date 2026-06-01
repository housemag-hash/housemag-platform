// ─── HOUSE MAG — Design Tokens ───────────────────────────────────────────────
// Fonte única de verdade para cores, tipografia e espaçamento.
// Usar estes tokens em todos os componentes — nunca hardcodar valores.

export const colors = {
  accent:  "#C8F135",   // verde-limão principal da marca
  black:   "#0A0A0A",
  g800:    "#1C1C1C",
  g600:    "#4A4A4A",
  g400:    "#8C8C8C",
  g300:    "#C4C4C4",
  g200:    "#E2E2E2",
  g100:    "#EFEFEF",
  g50:     "#F6F6F6",
  white:   "#FFFFFF",
  red:     "#E63946",
  green:   "#22C55E",
  blue:    "#3B82F6",
  // Brands
  spotify:    "#1DB954",
  youtube:    "#FF0000",
  beatport:   "#00B4B4",
  soundcloud: "#FF5500",
  instagram:  "#E1306C",
  tiktok:     "#000000",
} as const;

// Badge colors por categoria editorial
export const badgeColors: Record<string, { bg: string; text: string }> = {
  NEWS:      { bg: "#E8F4FD", text: "#1A6FA8" },
  FEATURE:   { bg: "#FDF3E8", text: "#A85A1A" },
  INTERVIEW: { bg: "#F3E8FD", text: "#6A1AA8" },
  PREMIERE:  { bg: "#FDEAEA", text: "#A81A1A" },
  MIX:       { bg: "#E8FDEA", text: "#1AA830" },
  REVIEW:    { bg: "#FDFAE8", text: "#A8941A" },
  CHARTS:    { bg: "#F5FDE8", text: "#5A8A1A" },
  EVENT:     { bg: "#E8EAFD", text: "#1A2AA8" },
  RELEASE:   { bg: "#FDE8F5", text: "#A81A6A" },
  SPONSORED: { bg: "#FFF8E8", text: "#8A6A1A" },
};

// Tipos de perfil da plataforma
export const profileTypes = {
  artist:  { label: "Artist",  icon: "🎧" },
  club:    { label: "Club",    icon: "🏛️" },
  agency:  { label: "Agency",  icon: "🏢" },
  label:   { label: "Label",   icon: "💿" },
  manager: { label: "Manager", icon: "🤝" },
  event:   { label: "Event",   icon: "🎪" },
  fan:     { label: "Fan",     icon: "❤️" },
} as const;

export type ProfileType = keyof typeof profileTypes;
