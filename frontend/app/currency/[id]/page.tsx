"use client";
import React, { use,  useState, useEffect } from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { Line } from "react-chartjs-2";
import styles from "./CurrencyPage.module.css";

// Регистрация необходимых модулей для chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);


const CurrencyPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const [forecast, setForecast] = useState("");
  const [chartData, setChartData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { id } = use(params);

  useEffect(() => {
    // Логика получения данных графика
    const fetchChartData = async () => {
      setLoading(true);
      try {
        // Если это Bitcoin, используем CoinGecko
        if (id.toLowerCase() === "bitcoin") {
          const response = await fetch(
              `https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=30`
          );
          const data = await response.json();

          // Трансформируем данные для графика
          const transformedData = {
            labels: data.prices.map((entry: [number, number]) =>
                new Date(entry[0]).toLocaleDateString()
            ),
            datasets: [
              {
                label: "Изменение стоимости (USD)",
                data: data.prices.map((entry: [number, number]) => entry[1]),
                borderColor: "rgb(75, 192, 192)",
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                tension: 0.4,
              },
            ],
          };
          setChartData(transformedData);
        }
        // Для остальных валют используем ExchangeRate-API
        else {
          const response = await fetch(
              `https://open.er-api.com/v6/latest/USD`
          );
          const data = await response.json();

          // Находим необходимую валюту (id = код валюты, например, EUR)
          const currencyRate = data.rates[id.toUpperCase()];
          if (!currencyRate)
            throw new Error(`Курс для "${id}" не найден в данных API.`);

          // Пример изменения валюты за последние 30 суток (для генерации временного графика)
          const mockData = Array.from({ length: 30 }, (_, i) => ({
            date: new Date(Date.now() - i * 24 * 60 * 60 * 1000), // 30 дней назад
            value: currencyRate + Math.random() * 0.5 - 0.25, // Симулируем колебания
          }));

          const transformedData = {
            labels: mockData.map((entry) => entry.date.toLocaleDateString()),
            datasets: [
              {
                label: `Курс (${id.toUpperCase()}) к USD`,
                data: mockData.map((entry) => entry.value),
                borderColor: "rgb(54, 162, 235)",
                backgroundColor: "rgba(54, 162, 235, 0.2)",
                tension: 0.4,
              },
            ],
          };
          setChartData(transformedData);
        }
      } catch (error) {
        console.error("Ошибка загрузки данных графика:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchChartData();
  }, [id]);





  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await fetch("/api/forecasts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currency: (await params).id, forecast }),
      });
      alert("Прогноз отправлен!");
    } catch (error) {
      console.error("Ошибка отправки прогноза:", error);
    }
  };

  return (
      <div className={styles.container}>
        <h1 className={styles.title}>Прогноз для {id.toUpperCase()}</h1>

        {/* График изменения стоимости */}
        <div className={styles.chart}>
          {loading ? (
              <p>Загрузка данных...</p>
          ) : chartData ? (
              <Line
                  data={chartData}
                  options={{ responsive: true, plugins: { legend: { position: "top" } } }}
              />
          ) : (
              <p>Данные для графика недоступны</p>
          )}
        </div>

        {/* Форма прогнозов */}
        <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.label}>
            Ваш прогноз:
            <input
                type="number"
                className={styles.input}
                value={forecast}
                onChange={(e) => setForecast(e.target.value)}
                placeholder="Введите прогноз"
            />
          </label>
          <button type="submit" className={styles.button}>
            Отправить
          </button>
        </form>
      </div>
  );
};

export default CurrencyPage;
