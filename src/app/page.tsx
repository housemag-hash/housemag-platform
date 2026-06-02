"use client";

import { useState } from "react";
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

function renderScreen(screen: NavScreen, onNav: (s: NavScreen) => void) {
  switch (screen) {
    case "home":
      return <HomeScreen onNav={onNav} />;
    case "magazine":
      return <MagazineScreen onNav={onNav} />;
    case "article":
      return <ArticleScreen onNav={onNav} />;
    case "charts":
      return <ChartsScreen onNav={onNav} />;
    case "events":
      return <EventsScreen onNav={onNav} />;
    case "artist":
      return <ArtistScreen onNav={onNav} />;
    case "club":
      return <ClubScreen onNav={onNav} />;
    case "profile":
      return <ProfileScreen onNav={onNav} />;
    case "submit":
      return <SubmitScreen onNav={onNav} />;
    default:
      return <HomeScreen onNav={onNav} />;
  }
}

export default function MobileAppPage() {
  const [activeScreen, setActiveScreen] = useState<NavScreen>("home");

  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto min-h-screen w-full max-w-[430px] bg-white shadow-none md:shadow-2xl">
        {renderScreen(activeScreen, setActiveScreen)}
      </div>
    </main>
  );
}
