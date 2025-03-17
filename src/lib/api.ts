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
    deleteCookie("access-token");
    deleteCookie("refresh-token");
    throw new Error("Нет refresh-токена");
  }

  console.log("📤 Отправляем refresh-токен:", refreshToken);

  const response = await fetch(`${BASE_URL}/auth/token/refresh/`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refresh: refreshToken }),
  });

  const data = await response.json();
  console.log("📥 Ответ сервера:", data);

  if (!response.ok) {
    console.error("❌ Ошибка обновления токена:", data);
    deleteCookie("access-token");
    deleteCookie("refresh-token");
    throw new Error("Не удалось обновить токен");
  }

  setCookie("access-token", data.access, { secure: true, sameSite: "Lax", path: "/" });
  console.log("✅ Новый access-токен получен:", data.access);

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
    console.warn("⚠️ Access-токен истек, пробуем обновить...");
    accessToken = await refreshAccessToken();
    return getUser(); // Повторяем запрос
  }

  if (!response.ok) {
    console.error(`❌ Ошибка загрузки пользователя: ${response.status}`, await response.text());
    throw new Error("Ошибка загрузки пользователя");
  }

  return response.json();
};

/** 🔹 Выход из аккаунта */
export const logoutUser = async () => {
  const accessToken = getCookie("access-token");

  if (!accessToken) {
    console.warn("⚠️ Токен отсутствует, пользователь уже разлогинен");
    return;
  }

  try {
    const response = await fetch(`${BASE_URL}/auth/logout/`, {
      method: "POST",
      headers: { "Authorization": `Bearer ${accessToken}` },
    });

    if (!response.ok) {
      console.error("❌ Ошибка выхода из аккаунта:", await response.text());
    }

    deleteCookie("access-token");
    deleteCookie("refresh-token");
    console.log("✅ Пользователь вышел из системы");
  } catch (error) {
    console.error("❌ Ошибка при выходе из аккаунта:", error);
  }
};
