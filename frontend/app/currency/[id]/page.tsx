"use client";
import React, { useState } from "react";
import { use } from "react";
import styles from "./CurrencyPage.module.css";

const CurrencyPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const [forecast, setForecast] = useState("");
  const { id } = use(params);
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
