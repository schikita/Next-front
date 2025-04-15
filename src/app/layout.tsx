'use client'; // Эта директива делает компонент клиентским

import React, { useState, useEffect } from "react"; // Добавляем useState и useEffect
import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/components/header/Header";
import { UserProvider } from "@/context/UserContext";
import "./globals.css";
import Footer from "@/components/footer/Footer";
import BackToTop from "@/components/BackToTop/BackToTop"; // Импортируем компонент
import AuthModal from "@/components/Auth/AuthModal"; // Подключаем модальное окно авторизации

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
  const [isAuthModalOpen, setAuthModalOpen] = useState(false); // Состояние для модального окна

  useEffect(() => {
    if (isAuthModalOpen) {
      document.body.classList.add("modal-open"); // Добавляем класс при открытии модального окна
    } else {
      document.body.classList.remove("modal-open"); // Убираем класс при закрытии
    }
  }, [isAuthModalOpen]);

  return (
    <html lang="ru">
      <head>
        <title>Новости Беларуси</title>
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <UserProvider>
          {isAuthModalOpen ? (
            <AuthModal onClose={() => setAuthModalOpen(false)} />
          ) : (
            <>
              <Header setAuthModalOpen={setAuthModalOpen} /> {/* Передаем функцию открытия модального окна */}
              <main className="container mx-auto px-0 sm:px-0 md:px-4">{children}</main>
              <Footer />
              <BackToTop />
            </>
          )}
        </UserProvider>
      </body>
    </html>
  );
}
