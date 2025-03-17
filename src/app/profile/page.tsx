"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getUser } from "@/lib/api";

const ProfilePage = () => {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    getUser()
      .then(setUser)
      .catch((error) => {
        console.error("❌ Ошибка получения пользователя:", error);
        router.push("/");
      });
  }, [router]);

  if (!user) return <p>Загрузка...</p>;

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow rounded">
      <h1 className="text-2xl font-bold mb-4">Профиль</h1>
      <p><strong>Email:</strong>123</p>
      <p><strong>Имя:</strong> 123</p>
    </div>
  );
};

export default ProfilePage;
