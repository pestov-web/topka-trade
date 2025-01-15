import styles from "./page.module.css";
import CurrencyList from "./components/CurrencyList";
import Hero from "@/app/components/Hero";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
          <Hero />
        <CurrencyList />
      </main>
    </div>
  );
}
