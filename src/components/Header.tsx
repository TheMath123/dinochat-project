import { useMessages } from '../hooks/useMessages';
import styles from '../styles/header.module.scss';

export function Header() {
  const { author, logout } = useMessages();

  return author.name ? (
    <div className={styles.container}>
      <h1 className={styles.title}>
        Bem vindo,
        <span className={styles.name}> {author.name}</span>
      </h1>
      <button
        className={styles.logoutButton}
        title="Logout"
        aria-label="Logout"
        onClick={logout}
      >
        <img
          className={styles.imgLogout}
          src="icons/logout-icon.svg"
          alt="Logout"
        />
      </button>
    </div>
  ) : (
    <div></div>
  );
}
