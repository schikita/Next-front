"use client";

import { useState, useEffect } from "react";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation"; // Импортируем useRouter
import AuthButton from "../Auth/AuthButton";
import UserMenu from "../Auth/UserMenu";

const UserPanel = () => {
  const { user, isLoading, logout } = useUser();
  const [menuOpen, setMenuOpen] = useState(false);
  const [avatar, setAvatar] = useState<string | null>(null);
  const router = useRouter(); // Используем useRouter для перенаправления

  // Проверка, есть ли пользователь
  const userData = user || null;

  // Формирование URL аватарки
  const avatarSrc = userData?.avatar
    ? `https://zn.by/${userData.avatar.replace(/^\/+/, "")}` // Убираем ведущие слэши, если они есть
    : null;

  useEffect(() => {
    if (avatarSrc) {
      setAvatar(avatarSrc);
    }
  }, [avatarSrc]);

  // Генерация инициалов из `name`
  const getInitials = () => {
    if (!userData?.first_name) return "?";
    const nameParts = userData.first_name.split(" ");
    return nameParts
      .slice(0, 2) // Берем первые два слова (например, "Милош Новак")
      .map((word) => word[0]?.toUpperCase() || "")
      .join("");
  };

  // Обработчик выхода с перенаправлением на главную
  const handleLogout = async () => {
    try {
      await logout(); // Выполняем выход
      router.push("/"); // Перенаправляем на главную страницу
    } catch (error) {
      console.error("Ошибка при выходе:", error);
    }
  };

  if (isLoading) {
    return <div className="w-9 h-9 rounded-full bg-gray-300 animate-pulse"></div>;
  }

  return userData ? (
    <div className="relative">
      <button onClick={() => setMenuOpen(!menuOpen)} className="focus:outline-none">
        {avatar ? (
          <img
            src={avatar}
            alt={userData.first_name || "Аватар"}
            className="w-9 h-9 rounded-full object-cover"
          />
        ) : (
          <div className="w-9 h-9 flex items-center justify-center bg-blue-600 text-white rounded-full text-lg font-semibold">
            {getInitials()}
          </div>
        )}
      </button>
      {menuOpen && <UserMenu closeMenu={() => setMenuOpen(false)} logout={handleLogout} />} {/* Изменили на handleLogout */}
    </div>
  ) : (
    <AuthButton />
  );
};

export default UserPanel;
