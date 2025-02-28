'use client'; // Для клиентского компонента

import React, { useEffect, useState } from "react";
import { BsCurrencyDollar, BsCurrencyEuro, BsCurrencyRupee } from 'react-icons/bs'; // Иконки для валют

const WeatherAndCurrencies = () => {
  const [weather, setWeather] = useState({
    temperature: 0,
    city: "",
    icon: "",
  });
  const [currencyRates, setCurrencyRates] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Запрос к API для получения погоды
        const weatherResponse = await fetch("https://zn.by/api/v1/weather/current/");
        if (!weatherResponse.ok) {
          throw new Error(`Ошибка: ${weatherResponse.statusText}`);
        }
        const weatherData = await weatherResponse.json();
        setWeather({
          temperature: weatherData.temperature,
          city: weatherData.city,
          icon: weatherData.icon,
        });

        // Запрос к API для получения курсов валют
        const currencyResponse = await fetch("https://zn.by/api/v1/currency-rates/");
        if (!currencyResponse.ok) {
          throw new Error(`Ошибка: ${currencyResponse.statusText}`);
        }
        const currencyData = await currencyResponse.json();
        setCurrencyRates(currencyData);
      } catch (error) {
        setError(error instanceof Error ? error.message : "Ошибка загрузки данных");
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex items-center justify-between px-4 py-2 pl-20">
      {/* Блок с погодой слева */}
      {error ? (
        <span className="text-sm text-red-500">{error}</span>
      ) : (
        <div className="flex items-center">
          {weather.icon && <img src={weather.icon} alt="weather icon" className="w-6 h-6 mr-2" />}
          <span className="text-sm text-gray-800 dark:text-white">
            {weather.city}: {weather.temperature}°C
          </span>
        </div>
      )}

      {/* Блок с курсами валют справа */}
      <div className="current-rate flex items-center space-x-5 pr-20">
        {currencyRates.length === 0 ? (
          <span className="text-sm text-gray-500 dark:text-gray-300">Загрузка курсов...</span>
        ) : (
          currencyRates.map((rate) => (
            <div key={rate.currency} className="flex items-center space-x-2 text-sm text-gray-800 dark:text-white">
              {rate.currency === "USD" && <BsCurrencyDollar className="w-4 h-4" />}
              {rate.currency === "EUR" && <BsCurrencyEuro className="w-4 h-4" />}
              {rate.currency === "RUB" && <BsCurrencyRupee className="w-4 h-4" />}
              <span>{rate.value}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default WeatherAndCurrencies;
