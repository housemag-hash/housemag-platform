"use client";

import { useState } from "react";
import PhoneFrame from "@/components/ui/PhoneFrame";
import HMLogo from "@/components/logo/HMLogo";
import HomeScreen from "@/components/screens/HomeScreen";
import type { NavScreen } from "@/lib/types";
import {
  MagazineScreen,
  ArticleScreen,
  ChartsScreen,
  EventsScreen,
  ArtistScreen,
  ClubScreen,
  ProfileScreen,
  SubmitScreen,
} from "@/components/screens/screens";

// ─── Screen registry ──────────────────────────────────────────────────────────
// ScreenId é um alias de NavScreen — usamos o mesmo tipo unificado.
// Isso elimina o conflito: onNav aceita NavScreen completo em todo lugar.
type ScreenId = NavScreen;

interface ScreenMeta {
  id: ScreenId;
  label: string;
  num: string;
}

const SCREENS: ScreenMeta[] = [
  { id: "home",     label: "Home / For You",     num: "01" },
  { id: "magazine", label: "Magazine",            num: "02" },
  { id: "article",  label: "Article Detail",      num: "03" },
  { id: "charts",   label: "Charts",              num: "04" },
  { id: "events",   label: "Events",              num: "05" },
  { id: "artist",   label: "Artist Smartpage",    num: "06" },
  { id: "club",     label: "Club / Event Page",   num: "07" },
  { id: "profile",  label: "User Profile",        num: "08" },
  { id: "submit",   label: "Submit / Press Room", num: "09" },
];

// ─── Screen renderer ──────────────────────────────────────────────────────────
function ScreenContent({
  id,
  onNav,
}: {
  id: ScreenId;
  onNav: (s: NavScreen) => void;
}) {
  switch (id) {
    case "home":     return <HomeScreen     onNav={onNav} />;
    case "magazine": return <MagazineScreen onNav={onNav} />;
    case "article":  return <ArticleScreen  onNav={onNav} />;
    case "charts":   return <ChartsScreen   onNav={onNav} />;
    case "events":   return <EventsScreen   onNav={onNav} />;
    case "artist":   return <ArtistScreen   onNav={onNav} />;
    case "club":     return <ClubScreen     onNav={onNav} />;
    case "profile":  return <ProfileScreen  onNav={onNav} />;
    case "submit":   return <SubmitScreen   onNav={onNav} />;
    default:         return <HomeScreen     onNav={onNav} />;
  }
}

// ─── Design Review Page ───────────────────────────────────────────────────────
type Mode = "solo" | "overview";

export default function DesignReviewPage() {
  const [mode, setMode]               = useState<Mode>("solo");
  const [activeScreen, setActiveScreen] = useState<ScreenId>("home");

  // onNav recebe NavScreen completo — inclui "artist", "club", "article", "submit"
  const handleNav = (s: NavScreen) => {
    setActiveScreen(s);
  };

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        background: "#F0F0F0",
        fontFamily: "'DM Sans', -apple-system, 'Helvetica Neue', sans-serif",
      }}
    >
      {/* ── TOP BAR ──────────────────────────────────────────────────────── */}
      <header
        className="fixed top-0 left-0 right-0 z-[9999] h-[56px] flex items-center px-5 gap-4"
        style={{ background: "#0A0A0A", borderBottom: "2px solid #C8F135" }}
      >
        <HMLogo size={28} color="#C8F135" />
        <span className="text-[14px] font-bold text-white tracking-[0.04em]">House Mag</span>
        <span className="text-[10px] font-bold bg-[#C8F135] text-black px-2 py-[2px] rounded-[4px] tracking-[0.06em] uppercase">
          Design Review
        </span>
        <div className="flex-1" />
        <span className="text-[11px] text-white/40 hidden sm:block">
          {SCREENS.length} screens
        </span>
        <div className="flex gap-[6px]">
          {(["solo", "overview"] as Mode[]).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className="px-[14px] py-[6px] rounded-full text-[12px] font-semibold cursor-pointer border"
              style={{
                background:  mode === m ? "#C8F135" : "transparent",
                color:       mode === m ? "#0A0A0A" : "rgba(255,255,255,0.7)",
                borderColor: mode === m ? "#C8F135" : "rgba(255,255,255,0.2)",
              }}
            >
              {m === "solo" ? "📱 Solo" : "⊞ Overview"}
            </button>
          ))}
        </div>
      </header>

      {/* ── SCREEN TABS (solo only) ──────────────────────────────────────── */}
      {mode === "solo" && (
        <div
          className="fixed top-[56px] left-0 right-0 z-[9998] flex overflow-x-auto"
          style={{
            background: "#111",
            borderBottom: "1px solid #222",
            scrollbarWidth: "none",
          }}
        >
          {SCREENS.map(({ id, label, num }) => (
            <button
              key={id}
              onClick={() => setActiveScreen(id)}
              className="px-4 py-[10px] border-0 text-[12px] cursor-pointer whitespace-nowrap flex-shrink-0 -mb-px font-sans"
              style={{
                background:   "none",
                color:        activeScreen === id ? "#C8F135" : "rgba(255,255,255,0.5)",
                fontWeight:   activeScreen === id ? 700 : 400,
                borderBottom: activeScreen === id
                  ? "2.5px solid #C8F135"
                  : "2.5px solid transparent",
              }}
            >
              {num} · {label}
            </button>
          ))}
        </div>
      )}

      {/* ── CONTENT ─────────────────────────────────────────────────────── */}
      <main className="flex-1" style={{ paddingTop: mode === "solo" ? 104 : 56 }}>

        {/* SOLO */}
        {mode === "solo" && (
          <div className="flex justify-center px-5 py-8">
            <PhoneFrame size="full">
              <ScreenContent id={activeScreen} onNav={handleNav} />
            </PhoneFrame>
          </div>
        )}

        {/* OVERVIEW */}
        {mode === "overview" && (
          <div className="flex flex-wrap gap-7 justify-center px-6 py-8">
            {SCREENS.map(({ id, label, num }) => (
              <PhoneFrame
                key={id}
                size="overview"
                label={label}
                number={num}
                onClick={() => {
                  setActiveScreen(id);
                  setMode("solo");
                }}
              >
                {/* onNav no-op no overview — os frames são só para visualização */}
                <ScreenContent id={id} onNav={() => {}} />
              </PhoneFrame>
            ))}
          </div>
        )}
      </main>

      {/* ── FOOTER ──────────────────────────────────────────────────────── */}
      <footer className="text-center py-4 text-[11px]" style={{ color: "#8C8C8C" }}>
        House Mag Platform · Mobile MVP · {SCREENS.length} screens · housemag.net
      </footer>
    </div>
  );
}
