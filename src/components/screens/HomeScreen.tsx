"use client";

import { useState } from "react";
import AppHeader from "@/components/ui/AppHeader";
import BottomNav from "@/components/ui/BottomNav";
import type { NavScreen } from "@/lib/types";
import { mockHeroItems, mockChartPreview, mockLatestNews, mockSuggestedProfiles, mockBenefits } from "@/lib/mock-data";
import { badgeColors, colors } from "@/lib/tokens";

const BG_GRADIENTS = [
  "from-[#0b0d16] to-[#130d18]",
  "from-[#0d1208] to-[#1a1a0d]",
  "from-[#130d18] to-[#1a0d28]",
];

interface HomeScreenProps { onNav: (s: NavScreen) => void; }

export default function HomeScreen({ onNav }: HomeScreenProps) {
  const [heroIdx, setHeroIdx] = useState(0);
  const [feedTab, setFeedTab] = useState("For You");
  const [saved, setSaved] = useState<Record<string, boolean>>({});
  const hero = mockHeroItems[heroIdx];

  return (
    <div className="bg-white min-h-full pb-[82px] font-sans">
      <AppHeader variant="main" />

      {/* HERO */}
      <div
        className={`mx-4 mt-3 rounded-[18px] overflow-hidden h-[272px] relative cursor-pointer bg-gradient-to-br ${BG_GRADIENTS[heroIdx]}`}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/[0.04] to-black/[0.84]" />
        <div className="absolute top-4 left-4">
          <HeroBadge type={hero.type} />
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-[18px]">
          <h2 className="text-[21px] font-extrabold text-white leading-[1.22] mb-[6px]">{hero.title}</h2>
          <p className="text-[13px] text-white/70 mb-3 leading-[1.4]">{hero.subtitle}</p>
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-white/55">👁 {hero.reads} · {hero.time}</span>
            <div className="flex gap-[5px] items-center">
              {mockHeroItems.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => { e.stopPropagation(); setHeroIdx(i); }}
                  className="border-0 cursor-pointer p-0 transition-[width] duration-200"
                  style={{
                    width: i === heroIdx ? 22 : 6,
                    height: 6,
                    borderRadius: 3,
                    background: i === heroIdx ? colors.accent : "rgba(255,255,255,0.28)",
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* FEED TABS */}
      <div className="flex gap-2 px-4 py-3 overflow-x-auto scrollbar-none">
        {["For You", "News", "Charts", "Events", "Artists", "Releases"].map((t) => (
          <button
            key={t}
            onClick={() => setFeedTab(t)}
            className={`px-4 py-[7px] rounded-full border text-[13px] flex-shrink-0 cursor-pointer font-sans transition-all ${
              feedTab === t
                ? "border-[#0A0A0A] bg-[#0A0A0A] text-white font-semibold"
                : "border-[#E2E2E2] bg-white text-[#4A4A4A] font-normal"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* CHARTS PREVIEW */}
      <div className="mx-4 bg-[#0A0A0A] rounded-2xl p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="bg-[#C8F135] rounded-[5px] px-2 py-[3px] text-[9px] font-bold text-black tracking-[0.08em]">CHARTS</span>
            <span className="text-[13px] font-bold text-white">Top Tracks · This Week</span>
          </div>
          <button onClick={() => onNav("charts")} className="bg-transparent border-0 text-[#C8F135] text-[12px] font-semibold cursor-pointer">
            See all
          </button>
        </div>
        {mockChartPreview.map((t, i) => (
          <div
            key={i}
            className={`flex items-center gap-[10px] py-2 ${i < 2 ? "border-b border-white/[0.06]" : ""}`}
          >
            <span className="text-[12px] font-bold text-white/25 min-w-[22px] text-center">
              {String(t.rank).padStart(2, "0")}
            </span>
            <div className="w-[38px] h-[38px] rounded-[6px] bg-[#2a2a3a] flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-semibold text-white truncate">{t.title}</p>
              <p className="text-[11px] text-white/40 mt-0.5 truncate">{t.artist}</p>
            </div>
            <span className="text-[11px]">{t.movement === "up" ? "↑" : "↓"}</span>
            <button className="w-8 h-8 rounded-full border border-white/15 flex items-center justify-center cursor-pointer bg-transparent">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="white">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
            </button>
          </div>
        ))}
      </div>

      <div className="h-2 bg-[#F6F6F6] my-5" />

      {/* LATEST NEWS */}
      <div className="px-5">
        <SectionHead title="Latest News" onAll={() => onNav("magazine")} />
        {mockLatestNews.map((a) => (
          <ArticleRow
            key={a.id}
            {...a}
            saved={saved[a.id]}
            onSave={() => setSaved((s) => ({ ...s, [a.id]: !s[a.id] }))}
          />
        ))}
      </div>

      <div className="h-2 bg-[#F6F6F6] my-5" />

      {/* PROFILES TO FOLLOW */}
      <div className="px-5">
        <SectionHead title="Profiles to Follow" />
        <p className="text-[12px] text-[#8C8C8C] -mt-2 mb-3">Artists · Clubs · Agencies · Labels</p>
        {mockSuggestedProfiles.map((p, i) => (
          <ProfileRow key={i} {...p} onNav={onNav} />
        ))}
      </div>

      <div className="h-2 bg-[#F6F6F6] my-5" />

      {/* BENEFITS */}
      <div className="px-5">
        <SectionHead title="Benefits & Giveaways" />
        <div className="flex gap-[10px] overflow-x-auto pb-2 scrollbar-none">
          {mockBenefits.map((b, i) => (
            <div
              key={i}
              className={`border rounded-[14px] p-[14px] flex-shrink-0 w-[220px] ${
                b.accent ? "border-[#C8F135] bg-[#FAFFF0]" : "border-[#EFEFEF]"
              }`}
            >
              <p className="text-[11px] font-bold text-[#8C8C8C] uppercase tracking-[0.06em] mb-1">{b.type}</p>
              <p className="text-[13px] font-semibold text-[#0A0A0A] mb-[6px] leading-[1.35]">{b.title}</p>
              <p className="text-[11px] text-[#E63946] font-semibold">⏰ Até {b.deadline}</p>
            </div>
          ))}
        </div>
      </div>

      <BottomNav active="home" onNav={onNav} />
    </div>
  );
}

// ── Sub-components ─────────────────────────────────────────────────────────

function HeroBadge({ type }: { type: string }) {
  const s = badgeColors[type] ?? badgeColors["NEWS"];
  return (
    <span
      className="inline-block text-[9px] font-bold tracking-[0.1em] uppercase px-[7px] py-[3px] rounded-[4px]"
      style={{ background: s.bg, color: s.text }}
    >
      {type}
    </span>
  );
}

function SectionHead({ title, onAll }: { title: string; onAll?: () => void }) {
  return (
    <div className="flex items-center justify-between mb-[14px]">
      <h2 className="text-[15px] font-bold text-[#0A0A0A]">{title}</h2>
      {onAll && (
        <button onClick={onAll} className="bg-transparent border-0 text-[#C8F135] text-[12px] font-bold cursor-pointer">
          See all
        </button>
      )}
    </div>
  );
}

function ArticleRow({
  type, title, time, readTime, views, saved, onSave,
}: {
  type: string; title: string; time: string; readTime: string;
  views: string; saved?: boolean; onSave?: () => void;
}) {
  const s = badgeColors[type] ?? badgeColors["NEWS"];
  return (
    <div className="flex gap-3 items-start py-[14px] border-b border-[#EFEFEF] cursor-pointer">
      <div className="w-[90px] h-[70px] rounded-[10px] bg-[#12121f] flex-shrink-0" />
      <div className="flex-1 min-w-0">
        <span
          className="inline-block text-[9px] font-bold tracking-[0.1em] uppercase px-[7px] py-[3px] rounded-[4px]"
          style={{ background: s.bg, color: s.text }}
        >
          {type}
        </span>
        <p className="text-[14px] font-semibold text-[#0A0A0A] leading-[1.36] my-[5px]">{title}</p>
        <div className="flex items-center gap-[10px] text-[11px] text-[#8C8C8C]">
          <span>🕐 {readTime}</span>
          <span>👁 {views}</span>
          <span>{time}</span>
        </div>
      </div>
      <button
        onClick={(e) => { e.stopPropagation(); onSave?.(); }}
        className="bg-transparent border-0 cursor-pointer pt-[2px] flex-shrink-0"
      >
        <svg width="18" height="18" viewBox="0 0 24 24"
          fill={saved ? "#0A0A0A" : "none"}
          stroke={saved ? "#0A0A0A" : "#C4C4C4"}
          strokeWidth="1.8" strokeLinecap="round"
        >
          <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" />
        </svg>
      </button>
    </div>
  );
}

function ProfileRow({
  name, type, genre, slug, verified, onNav,
}: {
  name: string; type: string; genre: string;
  slug: string; verified: boolean; onNav: (s: NavScreen) => void;
}) {
  const [following, setFollowing] = useState(false);
  return (
    <div
      onClick={() => onNav(type === "club" ? "club" : "artist")}
      className="flex items-center gap-3 py-3 border-b border-[#EFEFEF] cursor-pointer"
    >
      <div className="w-[52px] h-[52px] rounded-full aspect-square bg-[#1a1a2e] flex-shrink-0" />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-[5px] mb-[2px]">
          <span className="text-[14px] font-bold text-[#0A0A0A]">{name}</span>
          {verified && (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="#3B82F6">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5l-4-4 1.41-1.41L10 13.67l6.59-6.59L18 8.5l-8 8z" />
            </svg>
          )}
        </div>
        <p className="text-[11px] text-[#8C8C8C]">{type} · {genre}</p>
        <p className="text-[11px] mt-0.5">
          <span className="text-[#8C8C8C]">housemag.net/</span>
          <strong className="text-[#0A0A0A]">{slug}</strong>
        </p>
      </div>
      <button
        onClick={(e) => { e.stopPropagation(); setFollowing((f) => !f); }}
        className="px-[14px] py-[6px] rounded-full text-[12px] font-bold cursor-pointer flex-shrink-0"
        style={{
          background: following ? "white" : "#0A0A0A",
          color: following ? "#0A0A0A" : "white",
          border: `1.5px solid ${following ? "#E2E2E2" : "#0A0A0A"}`,
        }}
      >
        {following ? "✓" : "Follow"}
      </button>
    </div>
  );
}
