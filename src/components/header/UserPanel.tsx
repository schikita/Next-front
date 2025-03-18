"use client";

import { useState, useEffect } from "react";
import { useUser } from "@/context/UserContext";
import AuthButton from "../Auth/AuthButton";
import UserMenu from "../Auth/UserMenu";

const UserPanel = () => {
  const { user, isLoading, logout } = useUser();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isAvatarValid, setIsAvatarValid] = useState(true);

  // Проверка, есть ли пользователь
  const userData = user || null;

  // URL аватарки
  const avatarSrc = userData?.avatar
    ? userData.avatar.startsWith("http")
      ? decodeURIComponent(userData.avatar)
      : `https://example.com${decodeURIComponent(userData.avatar)}`
    : null;

  // Проверка доступности аватара
  useEffect(() => {
    if (avatarSrc) {
      const img = new Image();
      img.src = avatarSrc;
      img.onload = () => setIsAvatarValid(true);
      img.onerror = () => setIsAvatarValid(false);
    }
  }, [avatarSrc]);

  const finalAvatarSrc = isAvatarValid ? avatarSrc : null;

  // Генерация инициалов из `name`
  const getInitials = () => {
    if (!userData?.name) return "?";
    const nameParts = userData.name.split(" ");
    return nameParts
      .slice(0, 2) // Берем первые два слова (например, "Милош Новак")
      .map((word) => word[0]?.toUpperCase() || "")
      .join("");
  };

  if (isLoading) {
    return <div className="w-9 h-9 rounded-full bg-gray-300 animate-pulse"></div>;
  }

  return userData ? (
    <div className="relative">
      <button onClick={() => setMenuOpen(!menuOpen)} className="focus:outline-none">
        {finalAvatarSrc ? (
          <img
            src={finalAvatarSrc}
            alt={userData.name || "Аватар"}
            className="w-9 h-9 rounded-full object-cover"
          />
        ) : (
          <div className="w-9 h-9 flex items-center justify-center bg-blue-600 text-white rounded-full text-lg font-semibold">
            {getInitials()}
          </div>
        )}
      </button>
      {menuOpen && <UserMenu closeMenu={() => setMenuOpen(false)} logout={logout} />}
    </div>
  ) : (
    <AuthButton />
  );
};

export default UserPanel;
