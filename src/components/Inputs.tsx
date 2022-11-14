import styles from '../styles/input.module.scss';

type InputProps = {
  handlerSendMessage: () => void;
  onChange: (value: string) => void;
};

export function Input({ handlerSendMessage, onChange }: InputProps) {
  return (
    <div className={styles.container}>
      <textarea
        className={styles.textArea}
        rows={1}
        onChange={e => onChange(e.currentTarget.value)}
      ></textarea>
      <button
        className={styles.sendButton}
        onClick={() => handlerSendMessage()}
      >
        Send
      </button>
    </div>
  );
}
