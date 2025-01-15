import styles from "./Header.module.css";
import TelegramWidget from "../components/TelegrammWidget";
import Link from "next/link";
function Header() {
  const navList = [
    {
      id: 1,
      title: "Главная",
      link: "/",
    },
    {
      id: 2,
      title: "Блог",
      link: "/blog",
    },
    {
      id: 3,
      title: "Контакты",
      link: "/contacts",
    },
    {
      id: 4,
      title: "О нас",
      link: "/about",
    },
  ];
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <span>МОШ БОМЖ</span>
        </div>
        <nav className={styles.nav}>
          <ul className={styles.list}>
            {navList.map((item) => (
              <li key={item.id} className={styles.link}>
                <Link href={item.link}>{item.title}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className={styles.actions}>
          <TelegramWidget />
        </div>
      </div>
    </header>
  );
}

export default Header;
