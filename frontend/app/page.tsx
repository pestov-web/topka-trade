import styles from "./page.module.css";
import PollsList from "./components/pollsList";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <PollsList />
      </main>
    </div>
  );
}
