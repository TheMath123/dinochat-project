import { ChangeEvent, useState } from 'react';
import styles from '../styles/input.module.scss';

type InputProps = {
  handlerSendMessage: () => void;
  onChange: (value: string) => void;
};

export function Input({ handlerSendMessage, onChange }: InputProps) {
  const [content, setContent] = useState('');

  const handlerTextArea = (event: ChangeEvent<HTMLTextAreaElement>) => {
    onChange(event.currentTarget.value);
    setContent(event.currentTarget.value);
  };

  return (
    <div className={styles.container}>
      <textarea
        className={styles.textArea}
        rows={2}
        onChange={e => handlerTextArea(e)}
        value={content}
      ></textarea>
      <button
        disabled={content.trim().length <= 0}
        className={styles.sendButton}
        onClick={e => {
          e.preventDefault();
          handlerSendMessage();
          setContent('');
        }}
      >
        Send
      </button>
    </div>
  );
}
