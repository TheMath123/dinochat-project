import styles from '../styles/sender-balloon.module.scss';

type SenderBalloonProps = {
  message: string;
  time: string;
};

export function SenderBalloon({ message, time }: SenderBalloonProps) {
  return (
    <div className={styles.container}>
      <p className={styles.message}>{message}</p>
      <span className={styles.time}>{time}</span>
    </div>
  );
}
