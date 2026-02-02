import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Доктор Жусанбай — Уролог-андролог",
  description: "Консультации онлайн и оффлайн. Астана. AYANA Clinic.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body className="bg-white text-slate-900 antialiased">{children}</body>
    </html>
  );
}
