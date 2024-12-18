import styles from "./page.module.css";
import PollsList from "./components/pollsList";
import TelegramWiget from "./components/TelegrammWiget";
import Footer from "./ui/footer";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <PollsList />
        <TelegramWiget />
      </main>
      <Footer />
    </div>
  );
}
