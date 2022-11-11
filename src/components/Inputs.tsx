import styles from '../styles/input.module.scss';

type InputProps = {
  onSubmit: () => void;
};

export function Input({ onSubmit }: InputProps) {
  return (
    <form className={styles.container} onSubmit={onSubmit}>
      <textarea className={styles.textArea}></textarea>
      <button className={styles.sendButton}>Send</button>
    </form>
  );
}
