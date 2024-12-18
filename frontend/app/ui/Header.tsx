import styles from "./header.module.css";
import TelegramWiget from "../components/TelegrammWiget";
function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.header__container}>
        <div className={styles.header__logo}>
          <span>МОШ БОМЖ</span>
        </div>
        <nav className={styles.header__nav}>
          <ul className={styles.header__nav__list}>
            <li className={styles.header__nav__list__item}>
              <a href="#" className={styles.header__nav__list__item__link}>
                Главная
              </a>
            </li>
            <li>
              <a href="#" className={styles.header__nav__list__item__link}>
                Блог
              </a>
            </li>
            <li>
              <a href="#" className={styles.header__nav__list__item__link}>
                Контакты
              </a>
            </li>
          </ul>
        </nav>
        <div className={styles.header__actions}>
          <TelegramWiget />
        </div>
      </div>
    </header>
  );
}

export default Header;
