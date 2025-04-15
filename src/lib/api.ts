"use client";

import { setCookie, getCookie, deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";

const BASE_URL = "https://zn.by/api";

/** 🔹 Запрос кода для входа/регистрации */
export const requestAuthCode = async (email: string) => {
  const response = await fetch(`${BASE_URL}/auth/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });

  if (!response.ok) throw new Error("Ошибка отправки кода");
};

/** 🔹 Проверка кода и вход */
export const verifyAuthCode = async (email: string, code: string) => {
  try {
    const response = await fetch("https://zn.by/api/auth/verify/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, code }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.detail || "Ошибка верификации кода");
    }

    console.log("✅ Код подтвержден:", data);
    return data; // Вернем объект с user, access-token и refresh-token
  } catch (error) {
    console.error("❌ Ошибка верификации кода:");
    return null;
  }
};


/** 🔹 Обновление access-токена */
export const refreshAccessToken = async (): Promise<string | null> => {
  const refreshToken = getCookie("refresh-token")?.toString();

  if (!refreshToken) {
    console.warn("⚠️ Нет refresh-токена, пропускаем обновление.");
    return null;
  }

  console.log("📤 Отправляем refresh-токен:", refreshToken);

  try {
    const response = await fetch(`${BASE_URL}/auth/token/refresh/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh: refreshToken }),
    });

    const data = await response.json();
    if (!response.ok || !data.access) {
      console.error("❌ Ошибка обновления токена:", response.status, data);
      if (response.status === 401) {
        console.warn("⚠️ Refresh-токен истёк, разлогиниваем...");
        await logoutUser();
      }
      return null;
    }

    setCookie("access-token", data.access, { secure: false, sameSite: "lax", path: "/" });

    return data.access;
  } catch (error) {
    console.error("❌ Ошибка при обновлении токена:", error);
    await logoutUser();
    return null;
  }
};

/** 🔹 Получение данных пользователя */
export async function getUser() {
  let accessToken: string | null = getCookie("access-token")?.toString() || null;

  if (!accessToken) {
    console.warn("⚠️ Нет access-токена, пробуем обновить...");
    accessToken = await refreshAccessToken();
    if (!accessToken) {
      console.warn("❌ Не удалось получить новый токен, пользователь не авторизован.");
      return null;
    }
  }

  try {
    const response = await fetch(`${BASE_URL}/auth/user/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (response.status === 401) {
      console.warn("⚠️ Access-токен истёк, пробуем обновить...");
      accessToken = await refreshAccessToken();
      if (!accessToken) {
        console.warn("❌ Не удалось обновить токен, разлогиниваем.");
        await logoutUser();
        return null;
      }
      return await getUser();
    }

    if (!response.ok) {
      console.error(`❌ Ошибка загрузки пользователя: ${response.status}`, await response.text());
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error("❌ Ошибка загрузки пользователя:", error);
    return null;
  }
}

/** 🔹 Выход из аккаунта */
export const logoutUser = async () => {
  console.log("🔹 Разлогиниваем пользователя...");
  deleteCookie("access-token");
  deleteCookie("refresh-token");

  try {
    const response = await fetch(`${BASE_URL}/auth/logout/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      console.warn("⚠️ Ошибка при выходе:", await response.text());
    }
  } catch (error) {
    console.error("❌ Ошибка при выходе из аккаунта:", error);
  }
};


/** 🔹 Обновление логотипа канала */
export const updateChannelLogo = async (channelId: string, file: File) => {
  const formData = new FormData();
  formData.append("favicon", file);

  try {
    const response = await fetch(`${BASE_URL}/api/v1/channels/${channelId}/logo`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${getCookie("access-token")}`, // Добавляем токен авторизации
      },
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Ошибка при обновлении логотипа");
    }

    return data; // Возвращаем объект с обновленным логотипом канала
  } catch (error) {
    console.error("Ошибка при обновлении логотипа канала:", error);
    throw error;
  }
};


// Метод для обновления данных канала (например, имя, описание и т.д.)
export const updateChannel = async (
  channelId: string,
  channelData: FormData | object,
  method: string = "PATCH"
) => {
  const isFormData = channelData instanceof FormData;

  // Устанавливаем заголовки для запроса
  const headers = isFormData
    ? { "Content-Type": "multipart/form-data" } // Если это FormData, добавляем нужный Content-Type
    : { "Content-Type": "application/json" }; // Иначе передаем данные как JSON

  // Формируем запрос
  const response = await fetch(`${BASE_URL}/api/v1/sources/${channelId}/`, {
    method: method,
    headers: headers,
    body: isFormData ? channelData : JSON.stringify(channelData), // Если это FormData, передаем как есть, иначе сериализуем объект
  });

  if (!response.ok) {
    throw new Error("Ошибка при обновлении канала");
  }

  return await response.json(); // Возвращаем данные из ответа
};

export const deleteNews = async (newsId: number) => {
  try {
    // Отправляем DELETE запрос на сервер
    const response = await fetch(`${BASE_URL}/api/v1/news/${newsId}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        // Если требуется авторизация, добавьте заголовок с токеном
        // Authorization: `Bearer ${accessToken}`,
      },
    });

    // Проверяем успешность запроса
    if (!response.ok) {
      throw new Error("Не удалось удалить новость.");
    }

    // Возвращаем результат из ответа (если нужно)
    return await response.json();
  } catch (error) {
    console.error("❌ Ошибка при удалении новости:", error);
    throw error; // Бросаем ошибку дальше, чтобы обработать её в компоненте
  }
};

// В вашем файле @/lib/api.ts

// Метод для получения публикаций канала
export const getPublications = async (channelId: number) => {
  const response = await fetch(`${BASE_URL}/api/v1/news/?source=${channelId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Ошибка загрузки публикаций');
  }

  const data = await response.json();
  return data.results; // Возвращаем массив публикаций
};
