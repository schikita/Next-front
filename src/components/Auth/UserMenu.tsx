"use client";

import React from "react";
import { useUser } from "@/context/UserContext";
import Link from "next/link";

interface UserMenuProps {
  closeMenu: () => void;
  logout: () => void;
  channelId: string | number; // Добавляем channelId в пропсы
}

const UserMenu: React.FC<UserMenuProps> = ({ closeMenu, logout, channelId }) => {
  const { user } = useUser();

  return (
    <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg">
      {user ? (
        <>
          <Link href="/profile" onClick={closeMenu} className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
            Личный кабинет
          </Link>
          <Link href={`/adminpage/${channelId}`} onClick={closeMenu} className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
  Мой канал
</Link>
          <button onClick={() => {
            logout(); // Логика выхода
            closeMenu(); // Закрыть меню
          }} className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
            Выйти
          </button>
        </>
      ) : (
        <button onClick={() => {
          closeMenu(); // Логика для входа
        }} className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
          Войти
        </button>
      )}
    </div>
  );
};

export default UserMenu;
