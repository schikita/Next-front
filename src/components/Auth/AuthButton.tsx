"use client";

import { useState, useEffect, useRef } from "react";
import { useUser } from "@/context/UserContext";
import UserMenu from "./UserMenu";
import AuthModal from "./AuthModal";
import { User } from "lucide-react"; // Импортируем иконку пользователя

const AuthButton = () => {
  const { user, logout } = useUser(); // Используем logout из контекста
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [avatar, setAvatar] = useState<string | null>(null);

  const menuRef = useRef<HTMLDivElement | null>(null); // Для UserMenu
  const modalRef = useRef<HTMLDivElement | null>(null); // Для AuthModal
  const buttonRef = useRef<HTMLButtonElement | null>(null); // Для кнопки входа

  // Обновляем аватар, когда меняется user
  useEffect(() => {
    // Если user и аватар есть, то обновляем состояние
    if (user?.avatar) {
      setAvatar(user.avatar);
    } else {
      setAvatar(null); // если нет аватара, оставляем пусто
    }
  }, [user]); // Срабатывает при изменении данных пользователя

  // Генерация инициалов
  const getInitials = () => {
    if (!user) return "?";
    const firstNameInitial = user.first_name?.charAt(0)?.toUpperCase() || "";
    const lastNameInitial = user.last_name?.charAt(0)?.toUpperCase() || "";
    return `${firstNameInitial}${lastNameInitial}` || user.username?.charAt(0)?.toUpperCase() || "?";
  };

  // Обработчик клика, чтобы скрыть меню и модальное окно при клике вне их
  const handleClickOutside = (e: MouseEvent) => {
    if (buttonRef.current && buttonRef.current.contains(e.target as Node)) {
      return;
    }

    if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
      setMenuOpen(false); // Закрываем меню, если клик был вне
    }

    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      setAuthModalOpen(false); // Закрываем модальное окно, если клик был вне
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside); // Добавляем слушатель
    return () => {
      document.removeEventListener("click", handleClickOutside); // Убираем слушатель при размонтировании компонента
    };
  }, []);

  // Переключаем меню
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="relative">
      <button
        ref={buttonRef} // Ссылка на кнопку входа
        className="p-2 rounded-full bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-500"
        onClick={() => (user ? toggleMenu() : setAuthModalOpen(true))}
      >
        {avatar ? (
          <img src={avatar} alt="Avatar" className="w-8 h-8 rounded-full object-cover" />
        ) : (
          <span className="w-8 h-8 flex items-center justify-center bg-gray-500 rounded-full text-white text-lg">
            <User className="w-6 h-6" />
          </span>
        )}
      </button>

      {/* Отображение меню пользователя */}
      {menuOpen && user && (
        <div ref={menuRef}> {/* Добавляем ref к меню */}
          <UserMenu closeMenu={() => setMenuOpen(false)} logout={logout} />
        </div>
      )}

      {/* Отображение модального окна для авторизации */}
      {isAuthModalOpen && !user && (
        <div
          ref={modalRef}
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center" // Стиль для затемненного фона
        >
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-96 relative">
            <button
              className="absolute top-4 right-4 text-gray-500"
              onClick={() => setAuthModalOpen(false)} // Закрытие модалки при нажатии на "✕"
            >
              ✕
            </button>
            <AuthModal onClose={() => setAuthModalOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthButton;
