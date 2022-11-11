import { Input } from '../../components/Inputs';
import styles from '../../styles/home.module.scss';

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <main className={styles.chat}></main>
        <Input onSubmit={() => null} />
      </div>
    </div>
  );
}
