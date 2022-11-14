import { createContext, useState } from 'react';
import { IMessagesContextProps, IChildrenProps, Message } from '../@types';

export const MessagesContext = createContext({} as IMessagesContextProps);

type Messages = Message[];

export function MessagesProvide({ children }: IChildrenProps) {
  const [messages, setMessages] = useState<Messages>([]);

  function sendMessage(content: string) {
    const newMessage: Message = {
      author: null,
      content,
      time: new Date(Date.now()),
    };
    const list = [newMessage];
    list.concat(messages);
    setMessages(list);
  }

  function receiveMessage(message: Message) {
    messages.push({
      author: message.author,
      content: message.content,
      time: message.time,
    });
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
