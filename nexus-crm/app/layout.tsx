import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import Sidebar from "./components/Sidebar";
import "./globals.css";

// Подключаем жирный круглый шрифт
const montserrat = Montserrat({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "Nexus CRM | Premium Business Tool",
  description: "Элитная система управления для вашего бизнеса",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className="h-full">
      <body
        className={`${montserrat.variable} font-sans antialiased flex bg-[#f8fafc] h-full text-slate-900`}
      >
        {/* Фиксированный Сайдбар (создадим следующим шагом) */}
        <Sidebar />

        {/* Основная рабочая область */}
        <main className="flex-1 relative overflow-y-auto h-screen">
          <div className="max-w-[1400px] mx-auto">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
