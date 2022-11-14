import { createContext, useState } from 'react';
import { IMessagesContextProps, IChildrenProps, Message } from '../@types';

export const MessagesContext = createContext({} as IMessagesContextProps);

type Messages = Message[];

export function MessagesProvide({ children }: IChildrenProps) {
  const [messages, setMessages] = useState<Messages>([]);

  const sendMessage = (content: string) => {
    if (content.trim() !== '' || content.trim().length > 0) {
      const newMessage: Message = {
        author: null,
        content,
        time: new Date(Date.now()),
      };
      const list = [...messages, newMessage];
      setMessages(list);
    }
  };

  function receiveMessage(message: Message) {
    const newMessage: Message = {
      author: message.author,
      content: message.content,
      time: message.time,
    };
    const list = [...messages, newMessage];
    setMessages(list);
  }

  return (
    <MessagesContext.Provider
      value={{
        sendMessage,
        receiveMessage,
        messages,
      }}
    >
      {children}
    </MessagesContext.Provider>
  );
}
