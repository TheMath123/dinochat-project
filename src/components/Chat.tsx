import { useState } from 'react';
import { useMessages } from '../hooks/useMessages';
import { DateHandler } from '../helpers/DateHandler';
import { Input, Login, ReceivedBalloon, SenderBalloon, UserIOAlert } from '.';

import styles from '../styles/chat.module.scss';

export function Chat() {
  const { author, messages, sendMessage } = useMessages();
  const [contentMsg, setContentMsg] = useState('');

  if (!author.name || author.name.length <= 1) {
    return <Login />;
  }

  return (
    <div className={styles.container}>
      <main className={styles.chat}>
        {messages.map((messageItem, index) => {
          if (messageItem.id === author.id) {
            return (
              <SenderBalloon
                key={index}
                message={messageItem.content}
                time={DateHandler.hourFormat(messageItem.time)}
              />
            );
          }
          if (messageItem.author) {
            return (
              <ReceivedBalloon
                key={index}
                message={messageItem.content}
                author={messageItem.author}
                color={messageItem.color}
                time={DateHandler.hourFormat(messageItem.time)}
              />
            );
          }
          <UserIOAlert
            message={messageItem.content}
            time={DateHandler.hourFormat(messageItem.time)}
          />;
        })}
      </main>
      <Input
        placeholder="Type your message here"
        labelButton="Send"
        handlerSendMessage={() => {
          sendMessage(contentMsg);
          setContentMsg('');
        }}
        onChange={setContentMsg}
      />
    </div>
  );
}
