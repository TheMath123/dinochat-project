import { useState } from 'react';
import { useMessages } from '../hooks/useMessages';
import { Input } from './Inputs';
import { ReceivedBalloon } from './ReceivedBalloon';
import { SenderBalloon } from './SenderBalloon';
import styles from '../styles/chat.module.scss';

export function Chat() {
  const [contentMsg, setContentMsg] = useState<string>('');
  const { messages, sendMessage } = useMessages();

  return (
    <div className={styles.container}>
      <main className={styles.chat}>
        {messages.map((messageItem, index) => {
          console.log('map rodando');
          if (messageItem.author && messageItem.author !== undefined) {
            return (
              <ReceivedBalloon
                key={index}
                message={messageItem.content}
                author={messageItem.author}
                time={`${messageItem.time.getHours()}:${messageItem.time.getMinutes()}`}
              />
            );
          }
          return (
            <SenderBalloon
              key={index}
              message={messageItem.content}
              time={`${messageItem.time.getHours()}:${messageItem.time.getMinutes()}`}
            />
          );
        })}
      </main>
      <Input
        handlerSendMessage={() => sendMessage(contentMsg)}
        onChange={setContentMsg}
      />
    </div>
  );
}
