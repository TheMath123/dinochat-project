import { createContext, useState } from 'react';
import { IMessagesContextProps, IChildrenProps, Message } from '../@types';
import { socket } from '../services/socket';
import { v5 as uuidv5, validate } from 'uuid';

export const MessagesContext = createContext({} as IMessagesContextProps);

type Messages = Message[];

export function MessagesProvide({ children }: IChildrenProps) {
  const guestName = `Guest${Math.floor(Math.random() * 5000)}`;
  const [authorName, setAuthorName] = useState<string>(guestName);
  const [messages, setMessages] = useState<Messages>([]);
  const uuid = uuidv5(authorName, import.meta.env.VITE_UUID_GENERATE);

  socket.on('chat.message', receiveMessage);

  function sendMessage(content: string) {
    if (content.trim() !== '' || content.trim().length > 0) {
      // Create Object Message
      const newMessage: Message = {
        id: uuid,
        author: authorName,
        content,
        time: Date.now(),
      };
      const list = [...messages, newMessage];

      // Send Remote Message
      socket.emit('chat.message', newMessage);

      // Storage Local Messages
      setMessages(list);
    }
  }

  function receiveMessage(message: Message) {
    console.log('Message Receive: ', message);
    // Validade id, if uuid patern
    if (validate(message.id) && message.id !== uuid) {
      // create object message
      const newMessage: Message = {
        id: message.id,
        author: message.author,
        content: message.content,
        time: message.time,
      };
      // storage local messages
      const list = [...messages, newMessage];
      setMessages(list);
    }
  }

  function updateAuthorName(newName: string) {
    if (newName.trim()) {
      setAuthorName(newName);
    }
  }

  return (
    <MessagesContext.Provider
      value={{
        sendMessage,
        receiveMessage,
        updateAuthorName,
        messages,
        uuid,
      }}
    >
      {children}
    </MessagesContext.Provider>
  );
}
