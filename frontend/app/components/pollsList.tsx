"use client";
import React, { useState, useEffect } from "react";
import styles from "./pollsList.module.css";

const PollsList: React.FC = () => {
  const [bitcoinPrice, setBitcoinPrice] = useState<number | null>(null);
  const [currencyRates, setCurrencyRates] = useState<{
    EUR: number | null;
    GBP: number | null;
    JPY: number | null;
  }>({ EUR: null, GBP: null, JPY: null });

  const fetchData = async () => {
    try {
      const bitcoinRes = await fetch(
        "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd"
      );
      const currencyRes = await fetch("https://open.er-api.com/v6/latest/USD");

      const bitcoinData = await bitcoinRes.json();
      const currencyData = await currencyRes.json();

      setBitcoinPrice(bitcoinData?.bitcoin?.usd || null);
      setCurrencyRates({
        EUR: currencyData?.rates?.EUR || null,
        GBP: currencyData?.rates?.GBP || null,
        JPY: currencyData?.rates?.JPY || null,
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (
    !bitcoinPrice ||
    !currencyRates.EUR ||
    !currencyRates.GBP ||
    !currencyRates.JPY
  ) {
    return <p>Загрузка данных...</p>;
  }

  const data = [
    { label: "Bitcoin", value: `$${bitcoinPrice}` },
    { label: "EUR/USD", value: currencyRates.EUR.toFixed(2) },
    { label: "GBP/USD", value: currencyRates.GBP.toFixed(2) },
    { label: "JPY/USD", value: currencyRates.JPY.toFixed(2) },
  ];

  return (
    <ul className={styles.polls}>
      {data.map((item, index) => (
        <li key={index} className={styles.polls_item}>
          <span>{item.label}</span>
          <span>{item.value}</span>
        </li>
      ))}
    </ul>
  );
};

export default PollsList;
