'use client';

import React, { useState, useEffect } from "react";
import { useUser } from "@/context/UserContext"; // Получаем данные пользователя
import { useRouter } from "next/navigation"; // Используем useRouter для перенаправления
import AuthButton from "../Auth/AuthButton";
import UserMenu from "@/components/Auth/UserMenu";
import { getCookie } from 'cookies-next'; // Импортируем getCookie

const UserPanel = ({ setAuthModalOpen }: { setAuthModalOpen: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const { user, isLoading, logout } = useUser();
  const [menuOpen, setMenuOpen] = useState(false);
  const [avatarState, setAvatarState] = useState<string | null>(null);
  const router = useRouter(); // Используем useRouter для перенаправления

  // Проверка, есть ли пользователь
  const userData = user || null;

  const channelId = user ? user.id : ''; // Если пользователь авторизован, получаем его id, иначе пустая строка

  useEffect(() => {
    // Проверка аватара в cookies при загрузке
    const avatarFromCookies = getCookie('user-avatar');
    if (avatarFromCookies) {
      setAvatarState(avatarFromCookies as string); // Если есть, устанавливаем в состояние
    }
  }, []);

  // Формирование URL аватарки
  const avatarSrc = avatarState
    ? avatarState.startsWith('http') // Проверяем, если URL уже начинается с http
      ? avatarState // Если URL корректный, просто используем его
      : `https://zn.by/${avatarState.replace(/^\/+/, "")}` // Иначе добавляем базовый URL
    : null;

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

  // Обработчик нажатия на аватар
  const handleAvatarClick = () => {
    if (userData) {
      setMenuOpen(!menuOpen); // Если пользователь авторизован, показываем UserMenu
    } else {
      setAuthModalOpen(true); // Если не авторизован, открываем модальное окно авторизации
    }
  };

  if (isLoading) {
    return <div className="w-9 h-9 rounded-full bg-gray-300 animate-pulse"></div>;
  }

  return userData ? (
    <div className="relative">
      <button onClick={handleAvatarClick} className="focus:outline-none">
        {avatarSrc ? (
          <img
            src={avatarSrc} // Используем сохраненный аватар
            alt={userData.first_name || "Аватар"}
            className="w-9 h-9 rounded-full object-cover"
          />
        ) : (
          <div className="w-9 h-9 flex items-center justify-center bg-blue-600 text-white rounded-full text-lg font-semibold">
            {getInitials()}
          </div>
        )}
      </button>
      {menuOpen && <UserMenu closeMenu={() => setMenuOpen(false)} logout={logout} channelId={channelId} />}
    </div>
  ) : (
    <AuthButton />
  );
};

export default UserPanel;
