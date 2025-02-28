// src/components/screens/Home/Home.tsx

import React from 'react';
import styles from 'Home.module.css';

// Типизация пропсов
interface HomeProps {
  message: string;
}

const Home: React.FC<HomeProps> = ({ message }) => {
  return <div>{message}</div>;
};

export default Home;
