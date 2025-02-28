// src/components/logo/Logo.tsx

import React from "react";

// Логотип как компонент
const Logo = () => {
  return (
    <div className="flex items-center space-x-2">
      {/* Логотип как изображение */}
      <img src="/logo.png" alt="Логотип" className="w-30 h-12" />
      
    </div>
  );
};

export default Logo;
