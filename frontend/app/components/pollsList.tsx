import styles from "./pollsList.module.css";
function PollsList() {
  return (
    <ul className={styles.polls}>
      <li className={styles.polls_item}>
        <span>Квадрат</span>
      </li>{" "}
      <li className={styles.polls_item}>
        <span>Квадрат</span>
      </li>{" "}
      <li className={styles.polls_item}>
        <span>Квадрат</span>
      </li>{" "}
      <li className={styles.polls_item}>
        <span>Квадрат</span>
      </li>{" "}
      <li className={styles.polls_item}>
        <span>Квадрат</span>
      </li>{" "}
      <li className={styles.polls_item}>
        <span>Квадрат</span>
      </li>{" "}
      <li className={styles.polls_item}>
        <span>Квадрат</span>
      </li>{" "}
      <li className={styles.polls_item}>
        <span>Квадрат</span>
      </li>
    </ul>
  );
}

export default PollsList;
