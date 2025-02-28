// pages/about.tsx

import React from 'react';

// Типизация для props, если они будут переданы через getServerSideProps
interface AboutUsProps {
  message: string;
}

const AboutUs = ({ message }: AboutUsProps) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-semibold mb-4">About Us</h1>
      <p className="text-lg text-center max-w-2xl">
        {message}
      </p>
    </div>
  );
};

// Функция для Server Side Rendering (SSR)
export const getServerSideProps = async () => {
  // Получаем данные с сервера (можно заменить на реальный API-запрос или логику)
  const message = 'We are a passionate team dedicated to building great software and delivering exceptional user experiences. Our mission is to create innovative solutions that make a positive impact on the world.';

  // Возвращаем данные через props
  return {
    props: {
      message,
    },
  };
};

export default AboutUs;
