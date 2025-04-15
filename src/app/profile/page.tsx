"use client";  // Добавляем директиву для клиентского компонента

import React, { useEffect, useState } from "react";
import { useUser } from "@/context/UserContext"; // предполагается, что у вас есть контекст пользователя

const ProfilePage = () => {
  const { user, isLoading } = useUser();
  const [isPageLoaded, setIsPageLoaded] = useState(false);

  useEffect(() => {
    // После того как пользователь загрузился, устанавливаем флаг для отрисовки страницы
    if (user) {
      setIsPageLoaded(true);
    }
  }, [user]); // Эффект срабатывает, когда данные пользователя обновляются

  if (isLoading) {
    return <div>Загрузка...</div>; // Пока идет загрузка, показываем текст "Загрузка..."
  }

  if (!isPageLoaded) {
    return <div>Пожалуйста, подождите...</div>; // Пока данные пользователя не получены, показываем текст
  }

  return (
    <div>
   
      {/* Здесь ваш контент для профиля */}
    </div>
  );
};

export default ProfilePage;
