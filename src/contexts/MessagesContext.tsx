import { createContext, useEffect, useState } from 'react';
import { IMessagesContextProps, IChildrenProps, Message } from '../@types';

export const MessagesContext = createContext({} as IMessagesContextProps);

type Messages = Message[];

export function MessagesProvide({ children }: IChildrenProps) {
  const [messages, setMessages] = useState<Messages>([]);

  useEffect(() => {
    console.log(messages);
  }, [messages]);

  function sendMessage(content: string) {
    const newMessage: Message = {
      author: null,
      content,
      time: new Date(Date.now()),
    };
    const list = [newMessage];
    list.concat(messages);
    console.log(list);
    setMessages(list);

    // messages.push({
    //   author: null,
    //   content,
    //   time: new Date(Date.now()),
    // });
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
