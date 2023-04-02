import { Chat } from '../../components/Chat';
import { Header } from '../../components/Header';
import styles from '../../styles/home.module.scss';

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Header />
        <Chat />
      </div>
    </div>
  );
}
