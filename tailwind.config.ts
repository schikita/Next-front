import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)", // переменная для фона
        foreground: "var(--foreground)", // переменная для переднего плана
      },
      // Добавляем поддержку темной темы с дополнительными переменными
      screens: {
        dark: { raw: "(prefers-color-scheme: dark)" }, // автоматически будет менять тему при изменении предпочтений пользователя
      },
    },
  },
  darkMode: 'class', // Включаем поддержку классов для переключения тем (переключаем через класс 'dark')
  plugins: [],
} satisfies Config;
