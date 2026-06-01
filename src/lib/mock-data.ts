// ─── HOUSE MAG — Mock Data ────────────────────────────────────────────────────
// Todos os dados mockados em um único lugar.
// Quando conectar API/banco, substituir estas exportações por hooks/fetchers.

export const mockHeroItems = [
  {
    id: "1",
    type: "FEATURE",
    title: "Afterlife Tulum 2025: Full Lineup Revealed",
    subtitle: "Tale Of Us return to the Jungle with 40+ artists across 3 days.",
    reads: "24.1K",
    time: "1h ago",
  },
  {
    id: "2",
    type: "CHARTS",
    title: "Massano tops House Mag Charts for 3rd consecutive week",
    subtitle: "Undo My Head stays at #1 — the longest run of 2025.",
    reads: "18.4K",
    time: "3h ago",
  },
  {
    id: "3",
    type: "INTERVIEW",
    title: "ANNA & Antdot: 'Astralis changed everything for us'",
    subtitle: "The duo open up about their landmark collaboration.",
    reads: "31.2K",
    time: "5h ago",
  },
] as const;

export const mockChartPreview = [
  { rank: 1, title: "Undo My Head",  artist: "Massano & Kevin de Vries",     movement: "up"   as const },
  { rank: 2, title: "Drifter",        artist: "Adam Beyer & Layton Giordani", movement: "up"   as const },
  { rank: 3, title: "Disco Tools",    artist: "HI-LO",                       movement: "down" as const },
];

export const mockTracks = [
  { rank: 1, title: "Undo My Head",    artist: "Massano & Kevin de Vries",     label: "Drumcode",         duration: "06:23", movement: "up"   as const },
  { rank: 2, title: "Drifter",          artist: "Adam Beyer & Layton Giordani", label: "Drumcode",         duration: "07:16", movement: "up"   as const },
  { rank: 3, title: "Disco Tools",      artist: "HI-LO",                       label: "Helix Records",    duration: "05:48", movement: "down" as const },
  { rank: 4, title: "Hidden Tension",   artist: "Enrico Sangiuliano",           label: "Ninetozero",       duration: "06:31", movement: "up"   as const },
  { rank: 5, title: "The Realm",        artist: "Charlotte de Witte",           label: "KNTXT",            duration: "06:02", movement: "new"  as const },
  { rank: 6, title: "Exhale",           artist: "Amelie Lens",                  label: "EXHALE",           duration: "07:10", movement: "down" as const },
  { rank: 7, title: "Never Give Up",    artist: "Mathame",                      label: "Afterlife",        duration: "06:55", movement: "up"   as const },
  { rank: 8, title: "Shadows",          artist: "Hot Since 82",                 label: "Knee Deep",        duration: "06:40", movement: "up"   as const },
];

export const mockLatestNews = [
  { id: "n1", type: "NEWS",     title: "Charlotte de Witte announces KNTXT showcase at Berghain in June", time: "2h ago",  readTime: "3 min",  views: "8.4K"  },
  { id: "n2", type: "PREMIERE", title: "Premiere: Enrico Sangiuliano – Hidden Tension on Ninetozero",     time: "5h ago",  readTime: "2 min",  views: "5.1K"  },
  { id: "n3", type: "NEWS",     title: "Warung Beach Club confirms 2025 summer residency lineup",          time: "8h ago",  readTime: "4 min",  views: "11.2K" },
];

export const mockArticles = [
  { id: "a1", type: "NEWS",      title: "Charlotte de Witte announces KNTXT showcase at Berghain in June",   time: "2h ago",  readTime: "3 min",  views: "8.4K"  },
  { id: "a2", type: "PREMIERE",  title: "Premiere: Enrico Sangiuliano – Hidden Tension on Ninetozero",       time: "5h ago",  readTime: "2 min",  views: "5.1K"  },
  { id: "a3", type: "INTERVIEW", title: "Peggy Gou on her debut album, Berlin, and what comes next",         time: "1d ago",  readTime: "10 min", views: "19.3K" },
  { id: "a4", type: "NEWS",      title: "Tomorrowland 2025 reveals second wave including Fisher",             time: "1d ago",  readTime: "4 min",  views: "14.7K" },
  { id: "a5", type: "FEATURE",   title: "The rise of Brazilian techno on the global stage",                  time: "2d ago",  readTime: "7 min",  views: "22.1K" },
  { id: "a6", type: "MIX",       title: "HAAi drops a new RA podcast — her most personal yet",               time: "2d ago",  readTime: "56 min", views: "9.8K"  },
  { id: "a7", type: "REVIEW",    title: "Drumcode A-Sides XIII: a definitive collection of techno's finest", time: "3d ago",  readTime: "5 min",  views: "7.2K"  },
];

export const mockSuggestedProfiles = [
  { name: "Alok",        type: "artist"  as const, genre: "Brazilian Bass · Techno", slug: "alok",        verified: true  },
  { name: "Greenvalley", type: "club"    as const, genre: "Club · Festival Venue",   slug: "greenvalley", verified: true  },
  { name: "Dance Art",   type: "agency"  as const, genre: "Bookings · PR",           slug: "danceart",    verified: false },
  { name: "Marina Lima", type: "manager" as const, genre: "Artist Management",       slug: "marinalima",  verified: false },
];

export const mockUpcomingShows = [
  { month: "JUN", day: "07", event: "Fabric London",     venue: "Fabric",        city: "London",       country: "UK",      time: "23:00" },
  { month: "JUN", day: "21", event: "Awakenings",        venue: "NDSM Fuse",     city: "Amsterdam",    country: "NL",      time: "22:00" },
  { month: "JUL", day: "05", event: "Greenvalley",       venue: "Greenvalley",   city: "Camboriú",     country: "BR",      time: "22:00" },
  { month: "JUL", day: "19", event: "Tomorrowland",      venue: "Main Stage",    city: "Boom",         country: "Belgium", time: "20:00" },
  { month: "AUG", day: "02", event: "Warung Beach Club", venue: "Warung",        city: "Itajaí",       country: "BR",      time: "22:00" },
];

export const mockFestivalCards = [
  { name: "Time Warp 2025",  location: "Mannheim, Germany",  month: "MAY", day: "24", going: "15.2K", artists: "Sven Väth · Adam Beyer · Charlotte de Witte" },
  { name: "Afterlife Tulum", location: "Tulum, Mexico",      month: "JUN", day: "07", going: "9.8K",  artists: "Tale Of Us · Mathame · MASSANO"              },
];

export const mockClubNights = [
  { month: "MAY", day: "23", artist: "Enrico Sangiuliano", venue: "AWAKENINGS",  city: "Amsterdam, NL",     time: "23:00", genre: "Techno"     },
  { month: "MAY", day: "24", artist: "Sara Landry",        venue: "Hï IBIZA",    city: "Ibiza, Spain",       time: "00:00", genre: "Techno"     },
  { month: "MAY", day: "24", artist: "Joseph Capriati",    venue: "CIRCOLOCO",   city: "DC-10, Ibiza",       time: "16:00", genre: "House"      },
  { month: "MAY", day: "25", artist: "Charlotte de Witte", venue: "KNTXT",       city: "Berghain, Berlin",  time: "23:59", genre: "Techno"     },
  { month: "JUN", day: "01", artist: "Boris Brejcha",      venue: "Greenvalley", city: "Florianópolis, BR", time: "22:00", genre: "HT Minimal" },
];

export const mockArtist = {
  name:     "Massano",
  username: "massano",
  slug:     "massano",
  location: "Turin, Italy",
  genres:   ["Techno", "Melodic Techno", "Dark Techno"],
  verified: true,
  bio:      "Purity in sound. Depth in emotion. Drumcode & Afterlife. Bringing hypnotic, melodic techno to dancefloors around the world.",
};

export const mockClub = {
  name:     "Greenvalley",
  slug:     "greenvalley",
  type:     "Club · Festival Venue",
  city:     "Camboriú",
  country:  "Brazil",
  genres:   ["Techno", "House", "Electronic"],
  verified: true,
  bio:      "O maior open air do Brasil. Uma experiência única de música eletrônica entre a natureza de Camboriú, SC.",
};

export const mockBenefits = [
  { type: "giveaway", title: "Sorteio: 2 ingressos + backstage pass",      desc: "Salve este evento e concorra. Resultado em 3 dias.", deadline: "5 Jun",  cta: "Participar", accent: true  },
  { type: "discount", title: "15% off no próximo lote para membros HM",    desc: "Use o código HOUSEMAG no checkout da Sympla.",       deadline: "10 Jun", cta: "Usar cupom", accent: false },
];
