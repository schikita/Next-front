"use client";

import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";

const UserMenu = ({ onClose }: { onClose: () => void }) => {
  const { user, logout } = useUser();
  const router = useRouter();

  if (!user) return null;

  // Выход из системы
  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
        body: JSON.stringify({ all_tokens: true }),
      });

      logout();
      router.push("/");
    } catch (err) {
      console.error("Ошибка при выходе");
    }
  };

  return (
    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-700 rounded-lg shadow-lg py-2">
      <button
        className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 w-full text-left"
        onClick={() => {
          router.push("/profile");
          onClose();
        }}
      >
        Личный кабинет
      </button>
      <button
        className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 w-full text-left"
        onClick={handleLogout}
      >
        Выйти
      </button>
    </div>
  );
};

export default UserMenu;
