"use client";

import { useState } from "react";
import AppHeader from "@/components/ui/AppHeader";
import BottomNav from "@/components/ui/BottomNav";
import HMLogo from "@/components/logo/HMLogo";
import type { NavScreen } from "@/lib/types";
import {
  mockTracks, mockArticles, mockFestivalCards, mockClubNights,
  mockArtist, mockClub, mockUpcomingShows, mockBenefits,
} from "@/lib/mock-data";
import { badgeColors } from "@/lib/tokens";

// ── Shared primitives ──────────────────────────────────────────────────────

function Badge({ type }: { type: string }) {
  const s = badgeColors[type?.toUpperCase()] ?? badgeColors["NEWS"];
  return (
    <span
      className="inline-block text-[9px] font-bold tracking-[0.1em] uppercase px-[7px] py-[3px] rounded-[4px]"
      style={{ background: s.bg, color: s.text }}
    >
      {type}
    </span>
  );
}

function SecHead({ title, onAll }: { title: string; onAll?: () => void }) {
  return (
    <div className="flex items-center justify-between mb-[14px]">
      <h3 className="text-[13px] font-bold text-[#8C8C8C] uppercase tracking-[0.08em]">{title}</h3>
      {onAll && (
        <button onClick={onAll} className="bg-transparent border-0 text-[#C8F135] text-[12px] font-bold cursor-pointer">
          See all
        </button>
      )}
    </div>
  );
}

function Divider() {
  return <div className="h-2 bg-[#F6F6F6] my-5" />;
}

function ArticleRow({ type, title, time, readTime, views }: {
  type: string; title: string; time: string; readTime: string; views: string;
}) {
  return (
    <div className="flex gap-3 items-start py-[14px] border-b border-[#EFEFEF] cursor-pointer">
      <div className="w-[90px] h-[70px] rounded-[10px] bg-[#12121f] flex-shrink-0" />
      <div className="flex-1 min-w-0">
        <Badge type={type} />
        <p className="text-[14px] font-semibold text-[#0A0A0A] leading-[1.36] my-[5px]">{title}</p>
        <div className="flex gap-[10px] text-[11px] text-[#8C8C8C]">
          <span>🕐 {readTime}</span><span>👁 {views}</span><span>{time}</span>
        </div>
      </div>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C4C4C4"
        strokeWidth="1.8" strokeLinecap="round" className="flex-shrink-0 mt-0.5">
        <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" />
      </svg>
    </div>
  );
}

function TrackRow({ rank, title, artist, label, duration, movement, active, onPlay }: {
  rank: number; title: string; artist: string; label: string; duration: string;
  movement: "up" | "down" | "new"; active: boolean; onPlay: () => void;
}) {
  const mv =
    movement === "up"   ? <span className="text-[10px] text-[#22C55E] font-bold">↑</span> :
    movement === "down" ? <span className="text-[10px] text-[#E63946] font-bold">↓</span> :
                          <span className="text-[8px] text-[#3B82F6] font-bold">NEW</span>;
  return (
    <div className="flex items-center gap-[11px] py-[11px] border-b border-[#EFEFEF] cursor-pointer">
      <div className="min-w-[28px] flex flex-col items-center gap-[1px]">
        <span className="text-[12px] font-bold text-[#C4C4C4]">{String(rank).padStart(2, "0")}</span>
        {mv}
      </div>
      <div className="w-[46px] h-[46px] rounded-[8px] bg-[#1a1a2e] flex-shrink-0" />
      <div className="flex-1 min-w-0">
        <p className="text-[13px] font-semibold text-[#0A0A0A] truncate">{title}</p>
        <p className="text-[12px] text-[#8C8C8C] mt-0.5 truncate">{artist}</p>
        <p className="text-[11px] text-[#C4C4C4] mt-[1px]">{label}</p>
      </div>
      <span className="text-[11px] text-[#8C8C8C] flex-shrink-0">{duration}</span>
      <button
        onClick={(e) => { e.stopPropagation(); onPlay(); }}
        className="w-[34px] h-[34px] rounded-full border flex items-center justify-center cursor-pointer flex-shrink-0"
        style={{ borderColor: active ? "#0A0A0A" : "#E2E2E2", background: active ? "#C8F135" : "white" }}
      >
        <svg width="11" height="11" viewBox="0 0 24 24" fill="#0A0A0A">
          <polygon points="5 3 19 12 5 21 5 3" />
        </svg>
      </button>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAGAZINE
// ═══════════════════════════════════════════════════════════════════════════════
export function MagazineScreen({ onNav }: { onNav: (s: NavScreen) => void }) {
  const [tab, setTab] = useState("All");
  const tabs = ["All", "News", "Features", "Interviews", "Premieres", "Mixes", "Reviews"];
  return (
    <div className="bg-white min-h-full pb-[82px] font-sans">
      <AppHeader variant="main" rightSlot={
        <button className="w-[38px] h-[38px] flex items-center justify-center bg-transparent border-0 cursor-pointer">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8C8C8C" strokeWidth="1.7" strokeLinecap="round">
            <circle cx="11" cy="11" r="7" /><path d="M21 21l-4.35-4.35" />
          </svg>
        </button>
      } />
      <div className="px-5 pt-[14px]">
        <h1 className="text-[22px] font-extrabold text-[#0A0A0A] mb-3">Magazine</h1>
      </div>
      <div className="flex overflow-x-auto border-b border-[#EFEFEF] scrollbar-none">
        {tabs.map((t, i) => (
          <button key={t} onClick={() => setTab(t)}
            className="px-4 py-[11px] bg-transparent border-0 text-[13px] cursor-pointer whitespace-nowrap font-sans -mb-px"
            style={{
              borderBottom: tab === t ? "2.5px solid #0A0A0A" : "2.5px solid transparent",
              color: tab === t ? "#0A0A0A" : "#8C8C8C",
              fontWeight: tab === t ? 700 : 400,
            }}>
            {t}
          </button>
        ))}
      </div>
      <div
        onClick={() => onNav("article")}
        className="mx-5 mt-[14px] rounded-2xl overflow-hidden h-[228px] bg-gradient-to-br from-[#0d1520] to-[#1a0d28] relative cursor-pointer"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/[0.04] via-transparent to-black/[0.86]" />
        <div className="absolute top-[14px] left-[14px]"><Badge type="FEATURE" /></div>
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h2 className="text-[19px] font-extrabold text-white leading-[1.22] mb-[5px]">Victor Ruiz: The Evolution Continues</h2>
          <p className="text-[12px] text-white/60 mb-[7px]">From early influences to building his own sonic identity.</p>
          <span className="text-[11px] text-white/45">🕐 8 min · 31.2K reads</span>
        </div>
      </div>
      <div className="px-5 pt-3">
        <SecHead title="Latest Stories" />
        {mockArticles.map((a) => (
          <ArticleRow key={a.id} {...a} />
        ))}
      </div>
      <BottomNav active="magazine" onNav={onNav} />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// ARTICLE
// ═══════════════════════════════════════════════════════════════════════════════
export function ArticleScreen({ onNav }: { onNav: (s: NavScreen) => void }) {
  const [saved, setSaved] = useState(false);
  const related = [
    { badge: "FEATURE",  title: "Cristian Varela on Continuity",     time: "2d ago" },
    { badge: "NEWS",     title: "Time Warp reveals 2025 lineup",      time: "3d ago" },
    { badge: "PREMIERE", title: "UMEK – Stereo Control",              time: "4d ago" },
    { badge: "MIX",      title: "Enrico Live from Printworks",        time: "5d ago" },
  ];
  return (
    <div className="bg-white min-h-full pb-[82px] font-sans">
      <div className="sticky top-0 z-50 bg-white/97 backdrop-blur-[10px] border-b border-[#EFEFEF]">
        <div className="flex items-center h-[54px] px-4 gap-2">
          <button
            onClick={() => onNav("magazine")}
            className="w-[38px] h-[38px] flex items-center justify-center bg-transparent border-0 cursor-pointer"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0A0A0A" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <div className="flex-1 flex justify-center">
            <HMLogo size={24} />
          </div>
          <div className="flex gap-[2px]">
            <button onClick={() => setSaved((s) => !s)} className="w-[38px] h-[38px] flex items-center justify-center bg-transparent border-0 cursor-pointer">
              <svg width="20" height="20" viewBox="0 0 24 24" fill={saved ? "#0A0A0A" : "none"} stroke={saved ? "#0A0A0A" : "#8C8C8C"} strokeWidth="1.8" strokeLinecap="round">
                <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" />
              </svg>
            </button>
            <button className="w-[38px] h-[38px] flex items-center justify-center bg-transparent border-0 cursor-pointer">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8C8C8C" strokeWidth="1.8" strokeLinecap="round">
                <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8" /><polyline points="16 6 12 2 8 6" /><line x1="12" y1="2" x2="12" y2="15" />
              </svg>
            </button>
          </div>
        </div>
        <div className="h-[2px] bg-[#EFEFEF]">
          <div className="h-full w-[32%] bg-[#C8F135]" />
        </div>
      </div>
      <div className="h-[248px] bg-gradient-to-br from-[#0d1520] to-[#1a0d28] relative">
        <div className="absolute bottom-0 left-0 right-0 h-[80px] bg-gradient-to-t from-white to-transparent" />
      </div>
      <div className="px-5">
        <Badge type="FEATURE" />
        <h1 className="text-[24px] font-extrabold text-[#0A0A0A] leading-[1.2] my-[10px]">
          Victor Ruiz: The Evolution Continues
        </h1>
        <p className="text-[14px] text-[#4A4A4A] leading-[1.55] mb-4">
          From early influences to building his own sonic identity, Victor Ruiz opens up about creativity, club culture, and what&apos;s next.
        </p>
        <div className="flex items-center gap-3 mb-5 pb-4 border-b border-[#EFEFEF]">
          <div className="w-[38px] h-[38px] rounded-full bg-[#E2E2E2] flex-shrink-0" />
          <div>
            <p className="text-[13px] font-bold text-[#0A0A0A]">By Alex Browne</p>
            <div className="flex gap-[10px] text-[11px] text-[#8C8C8C] mt-0.5">
              <span>🕐 8 min</span><span>May 28, 2025</span><span>👁 31.2K</span>
            </div>
          </div>
        </div>
        {[
          "Two decades in, Victor Ruiz continues to evolve. With a signature sound that bridges techno's hypnotic depths and house's emotional pulse, his journey is a testament to trust, curiosity, and consistency.",
          "In this conversation, Victor reflects on his early influences, the importance of staying authentic, and how the underground continues to inspire his forward-thinking productions.",
          "From Barcelona to the world's most respected clubs — Fabric, Berghain, Warung — this is the story of an artist who never stops searching for the next rhythm, the next moment, the next evolution.",
        ].map((p, i) => (
          <p key={i} className="text-[15px] text-[#1C1C1C] leading-[1.74] mb-[18px]">{p}</p>
        ))}
      </div>
      <Divider />
      <div className="px-5">
        <SecHead title="Related Stories" onAll={() => onNav("magazine")} />
        <div className="flex gap-[10px] overflow-x-auto pb-2 scrollbar-none">
          {related.map((r, i) => (
            <div key={i} onClick={() => onNav("article")} className="flex-shrink-0 w-[148px] cursor-pointer">
              <div className="h-[104px] rounded-[10px] bg-[#0d1420] mb-2" />
              <Badge type={r.badge} />
              <p className="text-[13px] font-semibold text-[#0A0A0A] mt-1 leading-[1.3]">{r.title}</p>
              <p className="text-[11px] text-[#8C8C8C] mt-0.5">{r.time}</p>
            </div>
          ))}
        </div>
      </div>
      <BottomNav active="magazine" onNav={onNav} />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// CHARTS
// ═══════════════════════════════════════════════════════════════════════════════
export function ChartsScreen({ onNav }: { onNav: (s: NavScreen) => void }) {
  const [tab, setTab] = useState("Top Tracks");
  const [playing, setPlaying] = useState<number | null>(null);
  const tabs = ["Top Tracks", "Trending", "Rising Artists", "This Week", "Brasil"];
  return (
    <div className="bg-white min-h-full pb-[82px] font-sans">
      <AppHeader variant="main" />
      <div className="px-5 pt-[14px] pb-1">
        <h1 className="text-[22px] font-extrabold text-[#0A0A0A]">Charts</h1>
      </div>
      <div className="flex overflow-x-auto border-b border-[#EFEFEF] scrollbar-none">
        {tabs.map((t) => (
          <button key={t} onClick={() => setTab(t)}
            className="px-4 py-[11px] bg-transparent border-0 text-[13px] cursor-pointer whitespace-nowrap font-sans -mb-px"
            style={{
              borderBottom: tab === t ? "2.5px solid #0A0A0A" : "2.5px solid transparent",
              color: tab === t ? "#0A0A0A" : "#8C8C8C",
              fontWeight: tab === t ? 700 : 400,
            }}>
            {t}
          </button>
        ))}
      </div>
      <div className="mx-5 mt-[14px] bg-[#0A0A0A] rounded-[14px] p-4 flex items-center justify-between">
        <div>
          <p className="text-[10px] font-bold text-[#8C8C8C] uppercase tracking-[0.08em] mb-[2px]">
            Pulse Index · This Week
          </p>
          <div className="flex items-baseline gap-2">
            <span className="text-[34px] font-extrabold text-[#C8F135] leading-none">78</span>
            <span className="text-[12px] font-bold text-[#C8F135]">HIGH IMPACT</span>
          </div>
          <p className="text-[11px] text-[#8C8C8C] mt-1">↑ Up 12 pts · 2.4M streams tracked</p>
        </div>
        <div className="flex items-end gap-[3px] h-[44px]">
          {[30, 45, 38, 60, 52, 72, 78].map((v, i) => (
            <div key={i} className="w-[8px] rounded-t-[2px]"
              style={{ height: `${v}%`, background: i === 6 ? "#C8F135" : "rgba(255,255,255,0.12)" }} />
          ))}
        </div>
      </div>
      <div className="px-5 mt-1">
        {mockTracks.map((t, i) => (
          <TrackRow key={i} {...t} active={playing === i} onPlay={() => setPlaying(playing === i ? null : i)} />
        ))}
        <button className="w-full py-[13px] border border-[#E2E2E2] rounded-xl bg-white text-[#0A0A0A] text-[14px] font-semibold cursor-pointer flex items-center justify-center gap-[6px] mt-[10px] font-sans">
          See Full Chart →
        </button>
      </div>
      <Divider />
      <div className="px-5">
        <SecHead title="Trending Artists" />
        <div className="flex gap-[14px] overflow-x-auto pb-2 scrollbar-none">
          {["Massano", "Charlotte", "Petroski", "Enrico S.", "Öwnboss"].map((n, i) => (
            <div key={i} onClick={() => onNav("artist")} className="flex-shrink-0 text-center cursor-pointer w-[72px]">
              <div
                className="w-[64px] h-[64px] rounded-full mx-auto mb-[7px] border-2 border-[#EFEFEF]"
                style={{ background: ["#1a1a2e", "#1a0d1a", "#0d1a0d", "#0d1a1a", "#1a180d"][i] }}
              />
              <p className="text-[11px] font-bold text-[#0A0A0A]">{n}</p>
            </div>
          ))}
        </div>
      </div>
      <BottomNav active="charts" onNav={onNav} />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// EVENTS
// ═══════════════════════════════════════════════════════════════════════════════
export function EventsScreen({ onNav }: { onNav: (s: NavScreen) => void }) {
  const [filter, setFilter] = useState("All");
  const filters = ["All", "This Week", "Festivals", "Clubs", "Brasil", "Saved"];
  return (
    <div className="bg-white min-h-full pb-[82px] font-sans">
      <AppHeader variant="main" rightSlot={
        <div className="flex gap-[2px]">
          <button className="w-[38px] h-[38px] flex items-center justify-center bg-transparent border-0 cursor-pointer">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8C8C8C" strokeWidth="1.7" strokeLinecap="round">
              <circle cx="11" cy="11" r="7" /><path d="M21 21l-4.35-4.35" />
            </svg>
          </button>
          <button className="w-[38px] h-[38px] flex items-center justify-center bg-transparent border-0 cursor-pointer">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8C8C8C" strokeWidth="1.7" strokeLinecap="round">
              <line x1="4" y1="6" x2="20" y2="6" /><line x1="8" y1="12" x2="16" y2="12" /><line x1="11" y1="18" x2="13" y2="18" />
            </svg>
          </button>
        </div>
      } />
      <div className="px-5 pt-[14px]">
        <h1 className="text-[22px] font-extrabold text-[#0A0A0A] mb-3">Events</h1>
      </div>
      <div className="flex gap-2 px-5 pb-[14px] overflow-x-auto scrollbar-none">
        {filters.map((f) => (
          <button key={f} onClick={() => setFilter(f)}
            className="px-4 py-[7px] rounded-full border text-[13px] flex-shrink-0 cursor-pointer font-sans"
            style={{
              borderColor: filter === f ? "#0A0A0A" : "#E2E2E2",
              background: filter === f ? "#0A0A0A" : "white",
              color: filter === f ? "white" : "#4A4A4A",
              fontWeight: filter === f ? 600 : 400,
            }}>
            {f}
          </button>
        ))}
      </div>
      <div className="px-5">
        <SecHead title="Featured Festivals" />
        {mockFestivalCards.map((f, i) => (
          <div key={i} className="rounded-2xl overflow-hidden h-[190px] relative mb-3 cursor-pointer"
            style={{ background: i === 0 ? "linear-gradient(135deg,#0b0e1a,#180e28)" : "linear-gradient(135deg,#0e1a0b,#0e280e)" }}>
            <div className="absolute inset-0 bg-gradient-to-b from-black/[0.06] to-black/[0.86]" />
            <div className="absolute top-[14px] left-[14px] bg-white rounded-[8px] px-[9px] py-[5px] text-center">
              <p className="text-[9px] font-bold text-[#8C8C8C] uppercase tracking-[0.06em]">{f.month}</p>
              <p className="text-[18px] font-extrabold text-[#0A0A0A] leading-none">{f.day}</p>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-[14px]">
              <p className="text-[18px] font-extrabold text-white mb-[2px]">{f.name}</p>
              <p className="text-[12px] text-white/60 mb-1">{f.location}</p>
              <p className="text-[11px] text-white/45">{f.artists}</p>
            </div>
          </div>
        ))}
        <SecHead title="Upcoming Club Nights" />
        {mockClubNights.map((e, i) => (
          <div key={i} className="flex items-center gap-3 py-3 border-b border-[#EFEFEF] cursor-pointer">
            <div className="text-center min-w-[38px]">
              <p className="text-[9px] font-bold text-[#C8F135] uppercase tracking-[0.06em]">{e.month}</p>
              <p className="text-[22px] font-extrabold text-[#0A0A0A] leading-[1.1]">{e.day}</p>
            </div>
            <div className="w-[58px] h-[58px] rounded-[10px] bg-[#1a1a2e] flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-[14px] font-bold text-[#0A0A0A]">{e.artist}</p>
              <p className="text-[12px] font-semibold text-[#4A4A4A] my-0.5">{e.venue}</p>
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-[#8C8C8C]">{e.city} · {e.time}</span>
                <span className="text-[10px] font-semibold text-[#4A4A4A] bg-[#EFEFEF] rounded-[4px] px-[6px] py-[2px]">{e.genre}</span>
              </div>
            </div>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C4C4C4" strokeWidth="1.8" strokeLinecap="round" className="flex-shrink-0">
              <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" />
            </svg>
          </div>
        ))}
      </div>
      <BottomNav active="events" onNav={onNav} />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// ARTIST SMARTPAGE
// ═══════════════════════════════════════════════════════════════════════════════
export function ArtistScreen({ onNav }: { onNav: (s: NavScreen) => void }) {
  const [following, setFollowing] = useState(false);
  const [playing, setPlaying] = useState<number | null>(null);
  const a = mockArtist;
  return (
    <div className="bg-white min-h-full pb-[82px] font-sans">
      <AppHeader variant="back" onBack={() => onNav("profile")} />
      <div className="h-[190px] bg-gradient-to-br from-[#0d1520] to-[#1a0d20] relative overflow-hidden">
        <div className="absolute top-[14px] right-[14px] bg-[#C8F135] rounded-[6px] px-[10px] py-1 flex items-center gap-1">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="#3B82F6">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5l-4-4 1.41-1.41L10 13.67l6.59-6.59L18 8.5l-8 8z" />
          </svg>
          <span className="text-[10px] font-bold text-[#0A0A0A]">Verified Artist</span>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-[90px] bg-gradient-to-t from-white to-transparent" />
      </div>
      <div className="px-5 -mt-[52px]">
        <div className="flex items-end justify-between mb-3">
          <div
            className="w-[90px] h-[90px] rounded-full overflow-hidden bg-gradient-to-br from-[#2a2a4a] to-[#1a3a2a] border-[4px] border-white flex-shrink-0"
            style={{ aspectRatio: "1/1", boxShadow: "0 2px 12px rgba(0,0,0,0.12)" }}
          />
          <button
            onClick={() => setFollowing((f) => !f)}
            className="px-6 py-[10px] rounded-full text-[13px] font-bold cursor-pointer"
            style={{
              background: following ? "white" : "#0A0A0A",
              color: following ? "#0A0A0A" : "white",
              border: `1.5px solid ${following ? "#E2E2E2" : "#0A0A0A"}`,
            }}
          >
            {following ? "Following" : "Follow"}
          </button>
        </div>
        <div className="flex items-center gap-[6px] mb-1">
          <h1 className="text-[22px] font-extrabold text-[#0A0A0A] leading-none">{a.name}</h1>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="#3B82F6">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5l-4-4 1.41-1.41L10 13.67l6.59-6.59L18 8.5l-8 8z" />
          </svg>
        </div>
        <p className="text-[13px] text-[#8C8C8C] mb-1">@{a.username}</p>
        <p className="text-[12px] text-[#8C8C8C] mb-2">📍 {a.location} · {a.genres.join(" / ")}</p>
        <p className="text-[13px] text-[#4A4A4A] leading-[1.55] mb-4">{a.bio}</p>
        <div className="flex gap-2 mb-0">
          <button className="flex-1 h-[40px] rounded-full text-[13px] font-bold cursor-pointer font-sans"
            style={{ background: following ? "white" : "#C8F135", color: "#0A0A0A", border: `1.5px solid ${following ? "#E2E2E2" : "#C8F135"}` }}>
            + Follow
          </button>
          <button className="flex-1 h-[40px] rounded-full text-[13px] font-semibold bg-white text-[#0A0A0A] border border-[#E2E2E2] cursor-pointer font-sans">
            ▶ Listen
          </button>
          <button className="flex-1 h-[40px] rounded-full text-[13px] font-semibold bg-white text-[#0A0A0A] border border-[#E2E2E2] cursor-pointer font-sans">
            📋 Booking
          </button>
        </div>
      </div>
      <div className="mx-5 mt-4 grid grid-cols-4 gap-2">
        {["Spotify", "Instagram", "YouTube", "Beatport", "SoundCloud", "TikTok", "Website", "Booking"].map((n) => (
          <button key={n} className="flex flex-col items-center gap-[5px] bg-transparent border border-[#EFEFEF] rounded-xl py-[10px] cursor-pointer">
            <div className="w-[22px] h-[22px] rounded-full bg-[#F0F0F0]" />
            <span className="text-[9px] font-semibold text-[#8C8C8C]">{n}</span>
          </button>
        ))}
      </div>
      <Divider />
      <div className="mx-5 border border-[#EFEFEF] rounded-2xl overflow-hidden">
        <div className="flex">
          <div className="w-[130px] h-[130px] bg-gradient-to-br from-[#1a1a3a] to-[#0d2a1a] flex-shrink-0" />
          <div className="p-[14px] flex-1">
            <p className="text-[9px] font-bold text-[#8C8C8C] uppercase tracking-[0.1em] mb-[5px]">New Release / Pre-Save</p>
            <p className="text-[17px] font-extrabold text-[#0A0A0A] leading-[1.2] mb-1">Astralis</p>
            <p className="text-[12px] text-[#4A4A4A]">Release: Jun 14, 2025</p>
            <p className="text-[12px] text-[#4A4A4A]">Label: Dawn Patrol</p>
          </div>
        </div>
        <div className="px-[14px] pb-[14px] pt-3 flex gap-2">
          <button className="flex items-center gap-[6px] px-[14px] py-2 rounded-full border-0 text-[12px] font-bold text-white cursor-pointer font-sans" style={{ background: "#1DB954" }}>
            ● Pre-Save
          </button>
          <button className="flex items-center gap-[6px] px-[14px] py-2 rounded-full border-0 text-[12px] font-bold text-white cursor-pointer font-sans" style={{ background: "#00B4B4" }}>
            ● Beatport
          </button>
        </div>
      </div>
      <Divider />
      <div className="px-5">
        <SecHead title="Top Tracks" onAll={() => {}} />
        {mockTracks.slice(0, 5).map((t, i) => (
          <TrackRow key={i} {...t} rank={i + 1} active={playing === i} onPlay={() => setPlaying(playing === i ? null : i)} />
        ))}
      </div>
      <Divider />
      <div className="px-5">
        <SecHead title="Upcoming Shows" onAll={() => onNav("events")} />
        {mockUpcomingShows.slice(0, 3).map((s, i) => (
          <div key={i} className="flex items-center gap-[14px] py-3 border-b border-[#EFEFEF]">
            <div className="text-center min-w-[40px]">
              <p className="text-[9px] font-bold text-[#C8F135] uppercase tracking-[0.06em]">{s.month}</p>
              <p className="text-[21px] font-extrabold text-[#0A0A0A] leading-[1.1]">{s.day}</p>
            </div>
            <div className="flex-1">
              <p className="text-[14px] font-bold text-[#0A0A0A]">{s.event}</p>
              <p className="text-[12px] font-semibold text-[#4A4A4A] my-0.5">{s.venue}</p>
              <p className="text-[11px] text-[#8C8C8C]">{s.city}, {s.country} · {s.time}</p>
            </div>
            <button className="px-4 py-2 bg-[#C8F135] border-0 rounded-full text-[12px] font-bold text-[#0A0A0A] cursor-pointer flex-shrink-0 font-sans">
              Tickets
            </button>
          </div>
        ))}
      </div>
      <Divider />
      <div className="mx-5 bg-[#0A0A0A] rounded-2xl p-5 flex items-center gap-[14px]">
        <div className="w-[48px] h-[48px] rounded-xl bg-[#C8F135] flex items-center justify-center flex-shrink-0 text-[20px]">⬇</div>
        <div className="flex-1">
          <p className="text-[15px] font-extrabold text-white mb-[3px]">Press Kit</p>
          <p className="text-[12px] text-white/50">Bio, fotos, logos e releases oficiais.</p>
        </div>
        <button className="flex items-center gap-[6px] px-4 py-[10px] bg-[#C8F135] border-0 rounded-full text-[12px] font-extrabold text-[#0A0A0A] cursor-pointer flex-shrink-0 font-sans">
          ⬇ Download
        </button>
      </div>
      <div className="h-6" />
      <BottomNav active="profile" onNav={onNav} />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// CLUB SMARTPAGE
// ═══════════════════════════════════════════════════════════════════════════════
export function ClubScreen({ onNav }: { onNav: (s: NavScreen) => void }) {
  const [following, setFollowing] = useState(false);
  const c = mockClub;
  const upcoming = [
    { month: "JUN", day: "14", name: "Charlotte de Witte",     venue: "Greenvalley", city: "Camboriú, SC", time: "23:00" },
    { month: "JUL", day: "05", name: "Afterlife Experience BR", venue: "Greenvalley", city: "Camboriú, SC", time: "20:00" },
    { month: "JUL", day: "19", name: "Luciano & Friends",       venue: "Greenvalley", city: "Camboriú, SC", time: "22:00" },
  ];
  return (
    <div className="bg-white min-h-full pb-[82px] font-sans">
      <AppHeader variant="back" onBack={() => onNav("events")} />
      <div className="h-[200px] relative overflow-hidden bg-gradient-to-br from-[#0a0c18] to-[#0a1a14]">
        <div className="absolute top-[14px] right-[14px] bg-[#C8F135] rounded-[8px] px-[10px] py-1 flex items-center gap-1">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="#3B82F6">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5l-4-4 1.41-1.41L10 13.67l6.59-6.59L18 8.5l-8 8z" />
          </svg>
          <span className="text-[10px] font-bold text-[#0A0A0A]">Verified Venue</span>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-[90px] bg-gradient-to-t from-white to-transparent" />
      </div>
      <div className="px-5 -mt-[44px]">
        <div
          className="w-[80px] h-[80px] rounded-[18px] bg-gradient-to-br from-[#1a1a3a] to-[#0d2a1a] border-[3.5px] border-white mb-3 flex-shrink-0"
          style={{ aspectRatio: "1/1", boxShadow: "0 2px 14px rgba(0,0,0,0.14)" }}
        />
        <div className="flex items-start justify-between mb-2">
          <div>
            <div className="flex items-center gap-[6px] mb-1">
              <h1 className="text-[22px] font-extrabold text-[#0A0A0A]">{c.name}</h1>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="#3B82F6">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5l-4-4 1.41-1.41L10 13.67l6.59-6.59L18 8.5l-8 8z" />
              </svg>
            </div>
            <p className="text-[12px] text-[#8C8C8C] mb-1">📍 {c.city}, {c.country}</p>
            <div className="flex gap-[6px] flex-wrap">
              {c.genres.map((g) => (
                <span key={g} className="text-[11px] text-[#4A4A4A] bg-[#F0F0F0] rounded-full px-[10px] py-1 font-medium">{g}</span>
              ))}
            </div>
          </div>
          <button
            onClick={() => setFollowing((f) => !f)}
            className="px-5 py-[10px] rounded-full text-[13px] font-bold cursor-pointer flex-shrink-0 font-sans"
            style={{ background: following ? "white" : "#C8F135", color: "#0A0A0A", border: `1.5px solid ${following ? "#E2E2E2" : "#C8F135"}` }}
          >
            {following ? "✓ Following" : "+ Follow"}
          </button>
        </div>
        <p className="text-[13px] text-[#4A4A4A] leading-[1.55] mb-4">{c.bio}</p>
        <div className="flex gap-2 mb-0">
          <button className="flex-1 h-[40px] rounded-full bg-[#0A0A0A] text-white border-0 text-[13px] font-bold cursor-pointer font-sans">🎟 Tickets</button>
          <button className="flex-1 h-[40px] rounded-full bg-white text-[#0A0A0A] border border-[#E2E2E2] text-[13px] font-semibold cursor-pointer font-sans">♡ Save</button>
        </div>
      </div>
      <Divider />
      <div className="px-5">
        <SecHead title="Upcoming Events" onAll={() => {}} />
        {upcoming.map((e, i) => (
          <div key={i} className="py-[14px] border-b border-[#EFEFEF]">
            <div className="flex gap-3 items-start">
              <div className="text-center min-w-[38px]">
                <p className="text-[9px] font-bold text-[#C8F135] uppercase tracking-[0.06em]">{e.month}</p>
                <p className="text-[22px] font-extrabold text-[#0A0A0A] leading-[1.1]">{e.day}</p>
              </div>
              <div className="flex-1">
                <p className="text-[15px] font-bold text-[#0A0A0A]">{e.name}</p>
                <p className="text-[12px] text-[#4A4A4A] my-0.5">{e.venue}</p>
                <p className="text-[11px] text-[#8C8C8C] mb-2">{e.city} · {e.time}</p>
                <div className="flex gap-[6px]">
                  <button className="px-3 py-[7px] rounded-[8px] bg-[#0A0A0A] text-white border-0 text-[12px] font-bold cursor-pointer font-sans">🎟 Tickets</button>
                  <button className="px-3 py-[7px] rounded-[8px] bg-[#F6F6F6] text-[#0A0A0A] border border-[#E2E2E2] text-[12px] font-semibold cursor-pointer font-sans">Going?</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Divider />
      <div className="px-5">
        <SecHead title="Benefits & Giveaways" />
        {mockBenefits.map((b, i) => (
          <div key={i} className={`border rounded-[14px] p-[14px] flex gap-3 mb-[10px] ${b.accent ? "border-[#C8F135] bg-[#FAFFF0]" : "border-[#EFEFEF]"}`}>
            <div className={`w-[44px] h-[44px] rounded-[10px] flex items-center justify-center flex-shrink-0 text-[20px] ${b.accent ? "bg-[#C8F135]" : "bg-[#F0F0F0]"}`}>
              {b.type === "giveaway" ? "🎁" : "🎟"}
            </div>
            <div className="flex-1">
              <p className="text-[13px] font-bold text-[#0A0A0A] leading-[1.35] mb-[3px]">{b.title}</p>
              <p className="text-[12px] text-[#4A4A4A] mb-[8px] leading-[1.4]">{b.desc}</p>
              {b.deadline && <p className="text-[11px] text-[#E63946] font-semibold mb-2">⏰ Até {b.deadline}</p>}
              <button
                className="px-4 py-[7px] rounded-full border-0 text-[12px] font-bold cursor-pointer font-sans"
                style={{ background: b.accent ? "#0A0A0A" : "#C8F135", color: b.accent ? "white" : "#0A0A0A" }}
              >
                {b.cta}
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="h-6" />
      <BottomNav active="events" onNav={onNav} />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// PROFILE
// ═══════════════════════════════════════════════════════════════════════════════
export function ProfileScreen({ onNav }: { onNav: (s: NavScreen) => void }) {
  const menu: Array<{ icon: string; label: string; action: () => void }> = [
    { icon: "🔖", label: "My Saved Articles", action: () => onNav("magazine") },
    { icon: "📅", label: "My Saved Events",   action: () => onNav("events")   },
    { icon: "📊", label: "Dashboard",         action: () => {}               },
    { icon: "✏️", label: "Edit Smartpage",    action: () => onNav("artist")   },
    { icon: "📤", label: "Submit Content",    action: () => onNav("submit")   },
    { icon: "🎁", label: "My Benefits",       action: () => {}               },
    { icon: "⚙️", label: "Profile Settings", action: () => {}               },
    { icon: "🔔", label: "Notifications",     action: () => {}               },
    { icon: "❓", label: "Help & Support",    action: () => {}               },
  ];
  return (
    <div className="bg-white min-h-full pb-[82px] font-sans">
      <AppHeader variant="main" rightSlot={
        <button className="w-[38px] h-[38px] flex items-center justify-center bg-transparent border-0 cursor-pointer">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8C8C8C" strokeWidth="1.7" strokeLinecap="round">
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
          </svg>
        </button>
      } />
      <div className="px-5 pt-5 text-center">
        <div className="w-[80px] h-[80px] rounded-full aspect-square bg-[#1a1a2e] mx-auto mb-3 border-[3px] border-[#EFEFEF]" />
        <div className="flex items-center justify-center gap-[6px] mb-1">
          <h2 className="text-[20px] font-extrabold text-[#0A0A0A]">Massano</h2>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="#3B82F6">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5l-4-4 1.41-1.41L10 13.67l6.59-6.59L18 8.5l-8 8z" />
          </svg>
        </div>
        <div className="flex justify-center mb-1">
          <span className="text-[10px] font-semibold text-[#4A4A4A] bg-[#F0F0F0] border border-[#EFEFEF] px-[9px] py-[3px] rounded-full">🎧 Artist</span>
        </div>
        <p className="text-[11px] mb-[2px]">
          <span className="text-[#8C8C8C]">housemag.net/</span>
          <strong className="text-[#0A0A0A]">massano</strong>
        </p>
        <p className="text-[12px] text-[#8C8C8C] mb-4">Turin, Italy · Techno · Melodic Techno</p>
        <div className="flex justify-center gap-2 mb-6">
          <button onClick={() => onNav("artist")} className="px-[22px] py-[9px] bg-[#0A0A0A] text-white rounded-full border-0 text-[13px] font-bold cursor-pointer font-sans">
            View Smartpage
          </button>
          <button className="px-[22px] py-[9px] bg-[#C8F135] text-[#0A0A0A] rounded-full border-0 text-[13px] font-bold cursor-pointer font-sans">
            Dashboard
          </button>
        </div>
        <div className="grid grid-cols-3 border-t border-b border-[#EFEFEF] py-3 mb-2">
          {[["182K", "Followers"], ["341", "Events"], ["#12", "Charts"]].map(([v, l], i) => (
            <div key={l} className={`text-center ${i < 2 ? "border-r border-[#EFEFEF]" : ""}`}>
              <p className={`text-[16px] font-extrabold ${i === 2 ? "text-[#C8F135]" : "text-[#0A0A0A]"}`}>{v}</p>
              <p className="text-[10px] text-[#8C8C8C] mt-[3px]">{l}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="px-5 pt-2">
        {menu.map(({ icon, label, action }) => (
          <button key={label} onClick={action}
            className="flex items-center gap-[14px] w-full py-[14px] bg-transparent border-0 border-b border-[#EFEFEF] cursor-pointer font-sans">
            <span className="text-[18px] w-[24px] text-center flex-shrink-0">{icon}</span>
            <span className="text-[14px] text-[#0A0A0A] font-medium flex-1 text-left">{label}</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C4C4C4" strokeWidth="2" strokeLinecap="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        ))}
      </div>
      <BottomNav active="profile" onNav={onNav} />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// SUBMIT / PRESS ROOM
// ═══════════════════════════════════════════════════════════════════════════════
export function SubmitScreen({ onNav }: { onNav: (s: NavScreen) => void }) {
  const [type, setType] = useState("Music Release");
  const [focused, setFocused] = useState<string | null>(null);
  const types: Array<[string, string]> = [
    ["🎵", "Music Release"], ["🎪", "Event / Show"],
    ["📰", "Press Release"], ["👤", "Artist Profile"],
    ["🏢", "Label / Agency"], ["🏛️", "Club Listing"],
  ];
  const fields: Array<[string, string, string, string]> = [
    ["name",  "Artist / Release Name", "e.g. Massano – Undo My Head", "text"],
    ["label", "Label",                  "e.g. Drumcode",               "text"],
    ["date",  "Release Date",            "DD / MM / YYYY",              "text"],
    ["email", "Contact Email",           "press@yoursite.com",          "email"],
    ["link",  "Beatport / Spotify Link", "https://...",                 "url"],
  ];
  return (
    <div className="bg-white min-h-full pb-[82px] font-sans">
      <AppHeader variant="back" onBack={() => onNav("profile")} />
      <div className="px-5 pt-5">
        <div className="bg-[#0A0A0A] rounded-2xl p-5 mb-6">
          <HMLogo size={28} color="white" />
          <h1 className="text-[20px] font-extrabold text-white mt-3 mb-[6px]">Submit to House Mag</h1>
          <p className="text-[13px] text-white/55 leading-[1.5]">
            Alcance a comunidade da música eletrônica em housemag.net. Revisado em até 48 horas.
          </p>
        </div>
        <p className="text-[11px] font-bold text-[#0A0A0A] uppercase tracking-[0.08em] mb-[10px]">
          O que você está submetendo?
        </p>
        <div className="grid grid-cols-2 gap-2 mb-6">
          {types.map(([icon, id]) => (
            <button key={id} onClick={() => setType(id)}
              className="px-[14px] py-3 rounded-xl text-[13px] cursor-pointer font-sans flex items-center gap-2 text-left"
              style={{
                border: `1.5px solid ${type === id ? "#0A0A0A" : "#E2E2E2"}`,
                background: type === id ? "#C8F135" : "white",
                color: "#0A0A0A",
                fontWeight: type === id ? 700 : 400,
              }}>
              <span className="text-[16px]">{icon}</span>{id}
            </button>
          ))}
        </div>
        {fields.map(([id, label, placeholder, inputType]) => (
          <div key={id} className="mb-[15px]">
            <label className="block text-[11px] font-bold text-[#0A0A0A] uppercase tracking-[0.05em] mb-[6px]">
              {label}
            </label>
            <input
              type={inputType}
              placeholder={placeholder}
              onFocus={() => setFocused(id)}
              onBlur={() => setFocused(null)}
              className="w-full px-[14px] py-[13px] text-[14px] text-[#0A0A0A] bg-white rounded-[10px] outline-none font-sans"
              style={{ border: `1.5px solid ${focused === id ? "#0A0A0A" : "#E2E2E2"}`, transition: "border-color 0.15s" }}
            />
          </div>
        ))}
        <div className="mb-6">
          <label className="block text-[11px] font-bold text-[#0A0A0A] uppercase tracking-[0.05em] mb-[6px]">
            Notas adicionais
          </label>
          <textarea
            placeholder="Conte mais sobre o release, artista ou evento..."
            rows={4}
            onFocus={() => setFocused("notes")}
            onBlur={() => setFocused(null)}
            className="w-full px-[14px] py-[13px] text-[14px] text-[#0A0A0A] bg-white rounded-[10px] outline-none font-sans resize-y"
            style={{ border: `1.5px solid ${focused === "notes" ? "#0A0A0A" : "#E2E2E2"}`, transition: "border-color 0.15s" }}
          />
        </div>
        <button className="w-full py-4 bg-[#C8F135] border-0 rounded-xl text-[15px] font-extrabold text-[#0A0A0A] cursor-pointer font-sans">
          Submit for Review →
        </button>
        <p className="text-[12px] text-[#8C8C8C] text-center mt-3">Revisado em 48h · press@housemag.net</p>
        <div className="h-5" />
      </div>
      <BottomNav active="profile" onNav={onNav} />
    </div>
  );
}
