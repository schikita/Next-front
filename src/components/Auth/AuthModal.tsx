"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { requestAuthCode, verifyAuthCode } from "@/lib/api";
import { useUser } from "@/context/UserContext";
import Link from "next/link";

const AuthModal = ({ onClose }: { onClose: () => void }) => {
  const router = useRouter();
  const { login } = useUser();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [acceptedPolicy, setAcceptedPolicy] = useState(false);

  const modalRef = useRef<HTMLDivElement | null>(null);

  // Обработчик клика вне модального окна
  const handleClickOutside = (e: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose(); // Закрываем модальное окно, если клик был вне
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside); // Добавляем слушатель кликов
    return () => {
      document.removeEventListener("click", handleClickOutside); // Убираем слушатель при размонтировании
    };
  }, []);

  const handleEmailSubmit = async () => {
    setLoading(true);
    setError("");

    if (!acceptedPolicy) {
      setError("Вы должны согласиться с политикой обработки данных.");
      setLoading(false);
      return;
    }

    try {
      await requestAuthCode(email);
      setStep(2);
    } catch {
      setError("Ошибка отправки кода");
    } finally {
      setLoading(false);
    }
  };

  const handleCodeSubmit = async () => {
    setLoading(true);
    setError("");

    try {
      const result = await verifyAuthCode(email, code);

      if (!result) {
        setError("⚠️ Неверный код подтверждения, попробуйте снова.");
        return;
      }

      document.cookie = `access-token=${result["access-token"]}; path=/`;
      document.cookie = `refresh-token=${result["refresh-token"]}; path=/`;

      login(result.user); // Обновляем контекст пользователя

      onClose();
      router.push("/profile");
    } catch (error) {
      console.error("❌ Ошибка верификации кода:", error);
      setError("Ошибка верификации кода");
    } finally {
      setLoading(false);
    }
  };

  const handlePolicyLinkClick = () => {
    onClose();
  };

  return (
    <div className="modal-overlay modal">
      <div
        ref={modalRef}
        className="modal-content"
      >
        <button className="modal-close" onClick={onClose}>
          ✕
        </button>

        {step === 1 ? (
          <>
            <h2 className="text-lg font-semibold mb-3">Введите email</h2>
            <input
              type="email"
              placeholder="Ваш email"
              className="w-full border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white bg-white dark:bg-gray-700 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="flex items-center mt-3">
              <input
                type="checkbox"
                checked={acceptedPolicy}
                onChange={(e) => setAcceptedPolicy(e.target.checked)}
                className="mr-2"
              />
              <label className="text-sm text-gray-600 dark:text-gray-300">
                Я соглашаюсь с{" "}
                <Link href="/data-processing-policy" className="text-blue-600 hover:underline" onClick={handlePolicyLinkClick}>
                  политикой обработки данных
                </Link>
              </label>
            </div>
            <button
              className={`w-full py-2 rounded mt-3 transition ${acceptedPolicy ? "bg-blue-500 hover:bg-blue-600" : "bg-gray-400 cursor-not-allowed"}`}
              onClick={handleEmailSubmit}
              disabled={!acceptedPolicy || loading}
            >
              {loading ? "Отправка..." : "Запросить код"}
            </button>
          </>
        ) : (
          <>
            <h2 className="text-lg font-semibold mb-3">Введите код</h2>
            <input
              type="text"
              placeholder="Код из email"
              className="w-full  border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white bg-white dark:bg-gray-700 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
            <button
              className="w-full bg-blue-500 text-white py-2 rounded mt-3 hover:bg-blue-600 transition"
              onClick={handleCodeSubmit}
              disabled={loading}
            >
              {loading ? "Проверка..." : "Подтвердить"}
            </button>
          </>
        )}

        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </div>
    </div>
  );
};

export default AuthModal;
