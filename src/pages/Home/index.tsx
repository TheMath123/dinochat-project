import { Chat } from '../../components/Chat';
import styles from '../../styles/home.module.scss';

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Chat />
      </div>
    </div>
  );
}
