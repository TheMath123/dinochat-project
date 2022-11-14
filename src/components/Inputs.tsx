import styles from '../styles/input.module.scss';

type InputProps = {
  onClick: () => void;
  onChange: (value: string) => void;
};

export function Input({ onClick, onChange }: InputProps) {
  return (
    <div className={styles.container}>
      <textarea
        className={styles.textArea}
        rows={1}
        onChange={e => onChange(e.currentTarget.value)}
      ></textarea>
      <button
        className={styles.sendButton}
        onClick={e => {
          console.log('click');
          e.preventDefault();
          onClick();
        }}
      >
        Send
      </button>
    </div>
  );
}
