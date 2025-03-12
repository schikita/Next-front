"use client";

import React from "react";

interface ShareButtonsProps {
  open: boolean;
  onClose: () => void;
  shareUrl: string;
  title: string;
  imageUrl?: string | null; // ✅ Добавляем поддержку изображения
}

const ShareButtons: React.FC<ShareButtonsProps> = ({ open, onClose, shareUrl, title, imageUrl }) => {
  if (!open) return null;

  const titleToShare = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedImage = imageUrl ? encodeURIComponent(imageUrl) : ""; // ✅ Кодируем картинку

  const socialLinks = [
    {
      name: "Telegram",
      href: `https://t.me/share/url?url=${encodedUrl}&text=${titleToShare}`, // ❌ Убрали image
      icon: "/social-icons/telegram.svg",
    },
    {
      name: "Twitter (X)",
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${titleToShare}`,
      icon: "/social-icons/x.svg",
    },
    {
      name: "WhatsApp",
      href: `https://api.whatsapp.com/send?text=${titleToShare} ${encodedUrl}`,
      icon: "/social-icons/whatsapp.svg",
    },
    {
      name: "VK",
      href: `https://vk.com/share.php?url=${encodedUrl}&title=${titleToShare}`,
      icon: "/social-icons/vk.svg",
    },
  ];
  

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-gray-900 text-white p-5 rounded-lg shadow-lg w-72">
        <h2 className="text-center font-semibold text-lg mb-3">Поделиться сюжетом</h2>
        <div className="grid grid-cols-3 gap-3">
          {socialLinks.map(({ name, href, icon }) => (
            <a
              key={name}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center bg-gray-800 p-3 rounded-lg transition hover:scale-105 hover:bg-gray-700"
            >
              <img src={icon} alt={name} className="w-8 h-8" />
            </a>
          ))}
        </div>
        <button onClick={onClose} className="mt-4 w-full py-2 bg-red-600 rounded-lg hover:bg-red-700">
          Закрыть
        </button>
      </div>
    </div>
  );
};

export default ShareButtons;
