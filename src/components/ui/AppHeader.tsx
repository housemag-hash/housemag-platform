"use client";

import HMLogo from "@/components/logo/HMLogo";

type HeaderVariant = "main" | "back" | "profile";

interface AppHeaderProps {
  variant?: HeaderVariant;
  title?: string;
  onBack?: () => void;
  rightSlot?: React.ReactNode;
}

function SearchIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
      stroke="#8C8C8C" strokeWidth="1.7" strokeLinecap="round">
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21l-4.35-4.35" />
    </svg>
  );
}

function BellIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
      stroke="#8C8C8C" strokeWidth="1.7" strokeLinecap="round">
      <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 01-3.46 0" />
    </svg>
  );
}

function BackIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
      stroke="#0A0A0A" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}

function BookmarkIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
      stroke="#8C8C8C" strokeWidth="1.8" strokeLinecap="round">
      <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" />
    </svg>
  );
}

function ShareIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
      stroke="#8C8C8C" strokeWidth="1.8" strokeLinecap="round">
      <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8" />
      <polyline points="16 6 12 2 8 6" />
      <line x1="12" y1="2" x2="12" y2="15" />
    </svg>
  );
}

const iconBtn = "w-[38px] h-[38px] flex items-center justify-center bg-transparent border-0 cursor-pointer rounded-lg flex-shrink-0";

export default function AppHeader({
  variant = "main",
  title,
  onBack,
  rightSlot,
}: AppHeaderProps) {
  const base =
    "sticky top-0 z-50 flex items-center h-[54px] px-4 gap-2 " +
    "bg-white/97 backdrop-blur-[10px] border-b border-[#EFEFEF]";

  // ── BACK variant: voltar | logo H centrada | ações ──────────────────────
  if (variant === "back") {
    return (
      <header className={base}>
        <button onClick={onBack} className={iconBtn} aria-label="Voltar">
          <BackIcon />
        </button>
        <div className="flex-1 flex justify-center">
          <HMLogo size={24} />
        </div>
        <div className="flex items-center gap-[2px]">
          {rightSlot ?? (
            <>
              <button className={iconBtn} aria-label="Salvar"><BookmarkIcon /></button>
              <button className={iconBtn} aria-label="Compartilhar"><ShareIcon /></button>
            </>
          )}
        </div>
      </header>
    );
  }

  // ── PROFILE variant: voltar | slug | ações ──────────────────────────────
  if (variant === "profile") {
    return (
      <header className={base}>
        <button onClick={onBack} className={iconBtn} aria-label="Voltar">
          <BackIcon />
        </button>
        {title && (
          <div className="flex-1 px-2 min-w-0">
            <p className="text-[12px] text-[#8C8C8C] truncate">{title}</p>
          </div>
        )}
        <div className="flex items-center gap-[2px] flex-shrink-0">
          {rightSlot ?? (
            <button className={iconBtn} aria-label="Compartilhar"><ShareIcon /></button>
          )}
        </div>
      </header>
    );
  }

  // ── MAIN variant (padrão): logo H esquerda | ações direita ─────────────
  return (
    <header className={base}>
      <HMLogo size={26} />
      <div className="flex-1" />
      <div className="flex items-center gap-[2px]">
        {rightSlot ?? (
          <>
            <button className={iconBtn} aria-label="Buscar"><SearchIcon /></button>
            <button className={`${iconBtn} relative`} aria-label="Notificações">
              <BellIcon />
              <span className="absolute top-[7px] right-[8px] w-[6px] h-[6px] bg-[#E63946] rounded-full border-[1.5px] border-white" />
            </button>
          </>
        )}
      </div>
    </header>
  );
}
