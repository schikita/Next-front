// src/pages/api/categories.ts

import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const categories = [
    { id: 1, name: "Технологии" },
    { id: 2, name: "Культура" },
    { id: 3, name: "Спорт" },
  ];
  res.status(200).json(categories); // Возвращаем JSON с категориями
}
