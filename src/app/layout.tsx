import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/components/header/Header";
import { UserProvider } from "@/context/UserContext";
import "./globals.css";
import Footer from "@/components/footer/Footer";
import BackToTop from "@/components/BackToTop/BackToTop"; // Импортируем компонент

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <head>
        <title>Новости Беларуси</title>
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* ✅ Оборачиваем всё в `UserProvider` */}
        <UserProvider>
          <Header />
          <main className="container mx-auto px-0 sm:px-0 md:px-4">{children}</main>
          <Footer />
          <BackToTop /> {/* Размещение кнопки на всех страницах */}
        </UserProvider>
      </body>
    </html>
  );
}
