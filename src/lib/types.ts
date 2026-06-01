// ─── HOUSE MAG — Tipos globais ────────────────────────────────────────────────
// Fonte única de verdade para tipos compartilhados entre componentes.
// TODOS os arquivos devem importar NavScreen daqui — nunca redefinir.

/**
 * Todas as "telas" navegáveis da plataforma.
 * Inclui tanto os itens do BottomNav (home/magazine/charts/events/profile)
 * quanto as sub-páginas (article/artist/club/submit) que não aparecem
 * na nav mas são destinos de navegação interna.
 */
export type NavScreen =
  | "home"
  | "magazine"
  | "article"
  | "charts"
  | "events"
  | "artist"
  | "club"
  | "profile"
  | "submit";

/** Itens que aparecem na BottomNav. Subconjunto de NavScreen. */
export type BottomNavItem = Extract<
  NavScreen,
  "home" | "magazine" | "charts" | "events" | "profile"
>;
