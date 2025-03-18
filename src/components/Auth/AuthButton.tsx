"use client";

import { useState } from "react";
import { User } from "lucide-react";
import AuthModal from "@/components/Auth/AuthModal";
import UserMenu from "@/components/Auth/UserMenu";
import { useUser } from "@/context/UserContext";

const AuthButton = () => {
  const { user } = useUser();
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="relative">
      <button
        className="p-2 rounded-full bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-500"
        onClick={() => (user ? setMenuOpen(!menuOpen) : setAuthModalOpen(true))}
      >
        <User className="w-6 h-6" />
      </button>

      {menuOpen && user && <UserMenu onClose={() => setMenuOpen(false)} />}
      {isAuthModalOpen && !user && <AuthModal onClose={() => setAuthModalOpen(false)} />}
    </div>
  );
};

export default AuthButton;
