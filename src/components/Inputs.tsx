import { ChangeEvent, KeyboardEvent, useState } from 'react';
import styles from '../styles/input.module.scss';

type InputProps = {
  placeholder: string;
  labelButton: string;
  handlerSendMessage: () => void;
  onChange: (value: string) => void;
};

export function Input({
  placeholder,
  labelButton,
  handlerSendMessage,
  onChange,
}: InputProps) {
  const [content, setContent] = useState('');

  const handlerInputData = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.currentTarget.value);
    setContent(event.currentTarget.value);
  };

  const handlerKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handlerSendMessage();
      setContent('');
    }
  };

  return (
    <div className={styles.container}>
      <input
        className={styles.input}
        placeholder={placeholder}
        onChange={e => handlerInputData(e)}
        onKeyDownCapture={e => handlerKeyPress(e)}
        value={content}
      />
      <button
        disabled={content.trim().length <= 0}
        className={styles.sendButton}
        onClick={e => {
          e.preventDefault();
          handlerSendMessage();
          setContent('');
        }}
      >
        {labelButton}
      </button>
    </div>
  );
}
