import { useState } from 'react';
import { useMessages } from '../hooks/useMessages';
import { Input } from './Inputs';
import { ReceivedBalloon } from './ReceivedBalloon';
import { SenderBalloon } from './SenderBalloon';
import { hourFormat } from '../helpers/DateHandler';

import styles from '../styles/chat.module.scss';

export function Chat() {
  const [contentMsg, setContentMsg] = useState<string>('');
  const { messages, sendMessage, uuid } = useMessages();

  return (
    <div className={styles.container}>
      <main className={styles.chat}>
        {messages.map((messageItem, index) => {
          if (messageItem.id !== uuid && messageItem.author) {
            return (
              <ReceivedBalloon
                key={index}
                message={messageItem.content}
                author={messageItem.author}
                time={hourFormat(messageItem.time)}
              />
            );
          }
          return (
            <SenderBalloon
              key={index}
              message={messageItem.content}
              time={hourFormat(messageItem.time)}
            />
          );
        })}
      </main>
      <Input
        handlerSendMessage={() => {
          sendMessage(contentMsg);
          setContentMsg('');
        }}
        onChange={setContentMsg}
      />
    </div>
  );
}
