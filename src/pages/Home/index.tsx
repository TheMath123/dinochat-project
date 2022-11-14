import { Chat } from '../../components/Chat';
import { socket } from '../../services/socket';
import styles from '../../styles/home.module.scss';

export default function Home() {
  const io = socket.connect();

  io.on('connection', socket => {
    console.log(`Connection ${socket.id}`);
  });

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Chat />
      </div>
    </div>
  );
}
