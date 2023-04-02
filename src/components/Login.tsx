import { useState } from 'react';
import { useMessages } from '../hooks/useMessages';
import styles from '../styles/login.module.scss';

export function Login() {
  const { login } = useMessages();
  const [userName, setUserName] = useState('');
  return (
    <div className={styles.box}>
      <main className={styles.nameBox}>
        <input
          type="text"
          placeholder="You name"
          value={userName}
          onChange={e => setUserName(e.target.value)}
          onKeyDownCapture={e => {
            if (e.key === 'Enter') {
              login(userName);
            }
          }}
        />
        <button
          onClick={() => {
            if (userName.length >= 3) {
              login(userName);
            }
          }}
        >
          Save
        </button>
      </main>
    </div>
  );
}
