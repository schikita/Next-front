"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { getUser, refreshAccessToken, logoutUser } from "@/lib/api";
import { getCookie } from "cookies-next";

interface User {
  id: number;
  username: string;
  email: string;
  first_name?: string;
  last_name?: string;
  avatar?: string;
}

interface UserContextType {
  user: User | null;
  isLoading: boolean;
  login: (userData: User) => void;
  logout: () => Promise<void>;
  isAuthModalOpen: boolean;
  openAuthModal: () => void;
  closeAuthModal: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false); // Состояние для модального окна

  useEffect(() => {
    const checkUser = async () => {
      setIsLoading(true);
      try {
        let accessToken: string | null = getCookie("access-token")?.toString() || null;
        if (!accessToken) {
          console.warn("⚠️ Нет access-токена, пробуем обновить...");
          accessToken = await refreshAccessToken();
        }

        if (!accessToken) {
          console.warn("❌ Нет токенов, пользователь не авторизован.");
          setUser(null);
          return;
        }

        const fetchedUser = await getUser();
        if (fetchedUser) setUser(fetchedUser);
      } catch (error) {
        console.error("❌ Ошибка загрузки пользователя:", error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkUser();
  }, []);

  const login = (userData: User) => {
    console.log("🔹 Пользователь вошел:", userData);
    setUser(userData);
  };

  const logout = async () => {
    console.log("🔹 Пользователь вышел");
    try {
      await logoutUser();
    } catch (error) {
      console.error("❌ Ошибка при выходе:", error);
    }
    setUser(null);
  };

  const openAuthModal = () => setIsAuthModalOpen(true);
  const closeAuthModal = () => setIsAuthModalOpen(false);

  return (
    <UserContext.Provider value={{ user, isLoading, login, logout, isAuthModalOpen, openAuthModal, closeAuthModal }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
