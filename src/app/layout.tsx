import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "House Mag",
  description: "A principal plataforma de conexão da música eletrônica.",
  icons: { icon: "/logo/hm-symbol.svg" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
