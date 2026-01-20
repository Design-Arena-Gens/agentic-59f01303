import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Agente SEO Rank 1 · IA para dominar el top 1",
  description:
    "Automatiza auditorías, contenidos y autoridad con un agente SEO diseñado para escalar tráfico orgánico y alcanzar el top 1 en tu categoría.",
  openGraph: {
    title: "Agente SEO Rank 1",
    description:
      "Auditoría inteligente, sprints de contenido y autoridad automatizados para liderar la SERP.",
    url: "https://agentic-59f01303.vercel.app",
    siteName: "Agente SEO Rank 1",
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Agente SEO Rank 1",
    description:
      "Growth squads en LatAm utilizan nuestro agente SEO para multiplicar su tráfico orgánico.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
