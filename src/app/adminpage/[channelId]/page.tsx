"use client";

import React, { useState, useEffect } from "react";
import { updateChannel } from "@/lib/api"; // Подключаем API метод

interface Channel {
  id: number;
  name: string;
  description: string;
  rss_url: string;
  url: string;
  contact_phone: string;
  contact_email: string;
  director: string;
}

interface ChannelEditModalProps {
  open: boolean;
  onClose: () => void;
  channel: Channel;
  onSave: (updatedChannel: Channel) => void;
}

const ChannelEditModal: React.FC<ChannelEditModalProps> = ({ open, onClose, channel, onSave }) => {
  const [formData, setFormData] = useState<Channel>({
    id: channel.id,
    name: channel.name || "",
    description: channel.description || "",
    rss_url: channel.rss_url || "",
    url: channel.url || "",
    contact_phone: channel.contact_phone || "",
    contact_email: channel.contact_email || "",
    director: channel.director || "",
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (open && channel) {
      setFormData({
        id: channel.id,
        name: channel.name || "",
        description: channel.description || "",
        rss_url: channel.rss_url || "",
        url: channel.url || "",
        contact_phone: channel.contact_phone || "",
        contact_email: channel.contact_email || "",
        director: channel.director || "",
      });
    }
  }, [open, channel]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    setError(null);

    try {
      const updatedChannel = await updateChannel(channel.id.toString(), formData); // channel.id передаем как строку
      onSave(updatedChannel); // Передаем обновленные данные в родительский компонент
      onClose(); // Закрываем окно
    } catch (err) {
      console.error("Ошибка при сохранении данных канала:", err);
      setError("Не удалось сохранить данные. Проверьте правильность введённых данных.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className={`fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 ${!open && 'hidden'}`}>
      <div className="bg-white w-96 rounded-lg p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 text-2xl"
        >
          &times;
        </button>
        <h2 className="text-xl font-semibold mb-4">Редактировать канал</h2>
        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

        <div className="space-y-4">
          <input
            type="text"
            name="name"
            value={formData.name || ""}
            onChange={handleChange}
            placeholder="Название"
            className="w-full px-4 py-2 border border-gray-300 rounded"
          />
          <textarea
            name="description"
            value={formData.description || ""}
            onChange={handleChange}
            placeholder="Описание"
            className="w-full px-4 py-2 border border-gray-300 rounded"
            rows={3}
          />
          <input
            type="text"
            name="rss_url"
            value={formData.rss_url || ""}
            onChange={handleChange}
            placeholder="RSS URL"
            className="w-full px-4 py-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="url"
            value={formData.url || ""}
            onChange={handleChange}
            placeholder="URL"
            className="w-full px-4 py-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="contact_phone"
            value={formData.contact_phone || ""}
            onChange={handleChange}
            placeholder="Телефон"
            className="w-full px-4 py-2 border border-gray-300 rounded"
          />
          <input
            type="email"
            name="contact_email"
            value={formData.contact_email || ""}
            onChange={handleChange}
            placeholder="Почта"
            className="w-full px-4 py-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="director"
            value={formData.director || ""}
            onChange={handleChange}
            placeholder="Руководитель"
            className="w-full px-4 py-2 border border-gray-300 rounded"
          />
        </div>

        <div className="mt-4 flex justify-center">
          <button
            onClick={handleSave}
            disabled={saving}
            className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
          >
            {saving ? "Сохранение..." : "Сохранить"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChannelEditModal;
