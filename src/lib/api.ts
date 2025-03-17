"use client";

import { setCookie, getCookie, deleteCookie } from "cookies-next";

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
  const payload = { email: email.trim(), code: code.trim() }; // Убираем пробелы
  console.log("📤 Отправка данных:", payload);

  const response = await fetch(`${BASE_URL}/auth/verify/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const responseData = await response.json();

  if (!response.ok) {
    console.error("❌ Ошибка верификации кода:", response.status, responseData);
    throw new Error("Неверный код");
  }

  console.log("✅ Токены получены:", responseData);

  setCookie("access-token", responseData.access, { secure: true, sameSite: "lax", path: "/" });
  setCookie("refresh-token", responseData.refresh, { secure: true, sameSite: "lax", path: "/" });

  return responseData;
};


/** 🔹 Обновление access-токена */
export const refreshAccessToken = async (): Promise<string> => {
  const refreshToken = getCookie("refresh-token");

  if (!refreshToken) {
    console.warn("⚠️ Нет refresh-токена, разлогиниваем пользователя...");
    logoutUser();
    throw new Error("Нет refresh-токена");
  }

  console.log("📤 Отправляем refresh-токен:", refreshToken);

  let response, data;
  try {
    response = await fetch(`${BASE_URL}/auth/token/refresh/`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh: refreshToken }),
    });

    if (response.headers.get("content-type")?.includes("application/json")) {
      data = await response.json();
    } else {
      console.error("⚠️ Некорректный ответ сервера, не JSON");
      throw new Error("Сервер вернул некорректный ответ");
    }
  } catch (error) {
    console.error("❌ Ошибка при обновлении токена:", error);
    logoutUser();
    throw new Error("Ошибка обновления токена");
  }

  if (!response.ok) {
    console.error("❌ Ошибка обновления токена:", response.status, data);
    if (response.status === 401) {
      console.warn("⚠️ Refresh-токен истёк или недействителен, разлогиниваем...");
      logoutUser();
    }
    throw new Error(data?.detail || "Не удалось обновить токен");
  }

  console.log("✅ Новый access-токен получен:", data.access);
  setCookie("access-token", data.access, { secure: true, sameSite: "lax", path: "/" });

  return data.access;
};




/** 🔹 Получение данных пользователя */
export async function getUser() {
  let accessToken = getCookie("access-token");

  if (!accessToken) {
    try {
      console.warn("⚠️ Нет access-токена, пробуем обновить...");
      accessToken = await refreshAccessToken();
    } catch (error) {
      console.error("❌ Ошибка обновления токена:", error);
      logoutUser();
      throw new Error("Ошибка загрузки пользователя (нет токена)");
    }
  }

  const response = await fetch(`${BASE_URL}/auth/user/`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Authorization": `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });

  if (response.status === 401) {
    console.warn("⚠️ Access-токен истёк, пробуем обновить...");
    try {
      accessToken = await refreshAccessToken();
      return getUser(); // Повторяем запрос один раз
    } catch (error) {
      console.error("❌ Ошибка обновления токена, разлогиниваем:", error);
      logoutUser();
      throw new Error("Ошибка загрузки пользователя");
    }
  }

  if (!response.ok) {
    console.error(`❌ Ошибка загрузки пользователя: ${response.status}`, await response.text());
    throw new Error("Ошибка загрузки пользователя");
  }

  return response.json();
}


/** 🔹 Выход из аккаунта */
export const logoutUser = async () => {
  console.log("🔹 Разлогиниваем пользователя...");
  deleteCookie("access-token");
  deleteCookie("refresh-token");

  try {
    const response = await fetch(`${BASE_URL}/auth/logout/`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      console.warn("⚠️ Ошибка при выходе:", await response.text());
    }
  } catch (error) {
    console.error("❌ Ошибка при выходе из аккаунта:", error);
  }
};
