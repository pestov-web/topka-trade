import styles from "./header.module.css";
function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.header__container}>
        <div className={styles.header__logo}>
          <span>TOPKA TRADE</span>
        </div>
        <nav className={styles.header__nav}>
          <ul className={styles.header__nav__list}>
            <li className={styles.header__nav__list__item}>
              <a href="#" className={styles.header__nav__list__item__link}>
                Home
              </a>
            </li>
            <li>
              <a href="#" className={styles.header__nav__list__item__link}>
                About
              </a>
            </li>
            <li>
              <a href="#" className={styles.header__nav__list__item__link}>
                Contact
              </a>
            </li>
          </ul>
        </nav>
        <div className={styles.header__actions}>
          <a href="#" className={styles.header__actions__login}>
            Login
          </a>
          <a href="#" className={styles.header__actions__signup}>
            Sign Up
          </a>
        </div>
      </div>
    </header>
  );
}

export default Header;
