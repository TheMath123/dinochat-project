import styles from '../styles/userioalert.module.scss';

type UserIOAlertProps = {
  message: string;
  color?: string;
  time: string;
};

export function UserIOAlert({
  message,
  color = '#b0b0b0',
  time,
}: UserIOAlertProps) {
  return (
    <div className={styles.container} style={{ background: color }}>
      <div className={styles.header}>
        <span className={styles.time}>{time}</span>
        <p className={styles.message}>{message}</p>
      </div>
    </div>
  );
}
