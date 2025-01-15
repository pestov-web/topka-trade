"use client";
import React, { useState, useEffect } from "react";
import styles from "./CurrencyList.module.css";
import Link from "next/link";

const UrrencyList: React.FC = () => {
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
    { label: "Bitcoin", value: `$${bitcoinPrice}`, id: "bitcoin" },
    { label: "EUR/USD", value: currencyRates.EUR.toFixed(2), id: "eur" },
    { label: "GBP/USD", value: currencyRates.GBP.toFixed(2), id: "gbp" },
    { label: "JPY/USD", value: currencyRates.JPY.toFixed(2), id: "jpy" },
  ];

  return (
      <div className={styles.container}>
        <ul className={styles.list}>
          {data.map((item) => (
              <li key={item.id} className={styles.listItem}>
                <div className={styles.itemContent}>
                  <span className={styles.label}>{item.label}</span>
                  <span className={styles.value}>{item.value}</span>
                </div>
                <Link href={`/currency/${item.id}`} className={styles.link}>
                  Прогнозировать
                </Link>
              </li>
          ))}
        </ul>
      </div>
  );
};

export default UrrencyList;
