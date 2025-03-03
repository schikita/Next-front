// hooks/useCategories.ts
import { useState, useEffect } from 'react';

interface Category {
  id: number;
  name: string;
  code_name: string;
}

const useCategories = (): {
  categories: Category[];
  loading: boolean;
  error: string | null;
} => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://zn.by/api/v1/categories/');
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        const data: Category[] = await response.json();
        setCategories(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories, loading, error };
};

export default useCategories;