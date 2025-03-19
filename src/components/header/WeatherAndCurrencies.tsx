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
    <div className="flex flex-wrap sm:flex-nowrap justify-between items-center px-4 sm:px-8 py-2">
      {/* Блок с погодой слева */}
      {error ? (
        <span className="text-sm text-red-500">{error}</span>
      ) : (
        <div className="flex items-center space-x-2 text-sm sm:text-base">
          {weather.icon && (
            <img
              src={weather.icon}
              alt="weather icon"
              className="w-6 h-6 mr-2 dark:invert"
            />
          )}
          <span className="text-gray-800 dark:text-white">
            {weather.city}: {weather.temperature}°C
          </span>
        </div>
      )}

      {/* Блок с курсами валют справа */}
      <div className="flex flex-wrap items-center space-x-4 sm:space-x-5 mt-2 sm:mt-0">
        {currencyRates.length === 0 ? (
          <span className="text-sm text-gray-500 dark:text-gray-300">Загрузка курсов...</span>
        ) : (
          currencyRates.slice(0, 3).map((rate) => (  // Ограничиваем отображение до 3 валют
            <div key={rate.currency} className="flex items-center space-x-2 text-sm sm:text-base text-gray-800 dark:text-white">
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
