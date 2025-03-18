"use client";

import React from "react";

interface UserMenuProps {
  closeMenu: () => void;
  logout: () => void;
}

const UserMenu: React.FC<UserMenuProps> = ({ closeMenu, logout }) => {
  return (
    <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg">
      <button
        onClick={() => {
          logout(); // Вызываем logout
          closeMenu(); // Закрываем меню
        }}
        className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
      >
        Выйти
      </button>
    </div>
  );
};

export default UserMenu;
