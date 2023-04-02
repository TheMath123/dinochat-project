import { useState } from 'react';
import { useMessages } from '../hooks/useMessages';
import { Input } from './Inputs';
import { ReceivedBalloon } from './ReceivedBalloon';
import { SenderBalloon } from './SenderBalloon';
import { DateHandler } from '../helpers/DateHandler';

import styles from '../styles/chat.module.scss';

export function Chat() {
  const { author, login, messages, sendMessage } = useMessages();
  const [contentMsg, setContentMsg] = useState('');
  const [userName, setUserName] = useState('');

  if (!author.name || author.name.length <= 1) {
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
          if (messageItem.author)
            return (
              <ReceivedBalloon
                key={index}
                message={messageItem.content}
                author={messageItem.author}
                color={messageItem.color}
                time={DateHandler.hourFormat(messageItem.time)}
              />
            );
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
