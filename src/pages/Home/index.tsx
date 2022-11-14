import { Chat } from '../../components/Chat';
import { useMessages } from '../../hooks/useMessages';
import styles from '../../styles/home.module.scss';

export default function Home() {
  const { messages } = useMessages();
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Chat />
        <button onClick={() => console.log(messages)}>Execute</button>
      </div>
    </div>
  );
}
