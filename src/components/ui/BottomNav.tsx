"use client";

import type { NavScreen, BottomNavItem } from "@/lib/types";

// Re-exporta NavScreen para compatibilidade com imports existentes
export type { NavScreen };

interface BottomNavProps {
  active: NavScreen;
  onNav: (screen: NavScreen) => void;
}

interface NavItem {
  id: BottomNavItem;
  label: string;
  paths: string[];
  extra?: string;
}

const NAV_ITEMS: NavItem[] = [
  {
    id: "home",
    label: "Home",
    paths: [
      "M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z",
      "M9 21V12h6v9",
    ],
  },
  {
    id: "magazine",
    label: "Magazine",
    paths: [],
    extra: `<rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 7h8M8 11h8M8 15h5"/>`,
  },
  {
    id: "charts",
    label: "Charts",
    paths: [],
    extra: `<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>`,
  },
  {
    id: "events",
    label: "Events",
    paths: [],
    extra: `<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>`,
  },
  {
    id: "profile",
    label: "Profile",
    paths: [],
    extra: `<circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>`,
  },
];

function NavIcon({ item, active }: { item: NavItem; active: boolean }) {
  const stroke = active ? "#0A0A0A" : "#8C8C8C";
  const strokeWidth = active ? "2.2" : "1.6";

  if (item.extra) {
    return (
      <svg
        width="22" height="22" viewBox="0 0 24 24"
        fill="none" stroke={stroke} strokeWidth={strokeWidth}
        strokeLinecap="round" strokeLinejoin="round"
        dangerouslySetInnerHTML={{ __html: item.extra }}
      />
    );
  }

  return (
    <svg
      width="22" height="22" viewBox="0 0 24 24"
      fill="none" stroke={stroke} strokeWidth={strokeWidth}
      strokeLinecap="round" strokeLinejoin="round"
    >
      {item.paths.map((d, i) => <path key={i} d={d} />)}
    </svg>
  );
}

export default function BottomNav({ active, onNav }: BottomNavProps) {
  return (
    <nav className="sticky bottom-0 left-0 right-0 z-50 flex bg-white border-t border-[#EFEFEF]">
      {NAV_ITEMS.map((item) => {
        const isActive = active === item.id;
        return (
          <button
            key={item.id}
            onClick={() => onNav(item.id)}
            className="flex-1 flex flex-col items-center justify-center py-[9px] pb-[11px] gap-[3px] bg-transparent border-0 cursor-pointer relative"
            aria-label={item.label}
            aria-current={isActive ? "page" : undefined}
          >
            {isActive && (
              <span className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-[2.5px] bg-[#C8F135] rounded-b-[3px]" />
            )}
            <NavIcon item={item} active={isActive} />
            <span
              className={`text-[10px] leading-none ${
                isActive ? "text-[#0A0A0A] font-bold" : "text-[#8C8C8C] font-normal"
              }`}
            >
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
