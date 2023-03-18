import { Colors } from '../helpers/Colors';
import styles from '../styles/received-balloon.module.scss';

type ReceivedBalloonProps = {
  author: string;
  message: string;
  color?: string;
  time: string;
};

export function ReceivedBalloon({
  author,
  message,
  color = '#d9d9d9',
  time,
}: ReceivedBalloonProps) {
  return (
    <div className={styles.container} style={{ background: color }}>
      <div className={styles.header}>
        <span className={styles.time}>{time}</span> -
        <h1 className={styles.author}>{author}</h1>
      </div>
      <p className={styles.message}>{message}</p>
    </div>
  );
}
