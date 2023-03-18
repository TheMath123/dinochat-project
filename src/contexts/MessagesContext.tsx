import { createContext, useState } from 'react';
import {
  MessagesContextProps,
  ChildrenProps,
  Message,
  UserProps,
} from '../@types';
import { socket } from '../services/socket';
import { v5 as uuidv5, validate } from 'uuid';
import { Colors } from '../helpers/Colors';

export const MessagesContext = createContext({} as MessagesContextProps);

type Messages = Message[];

export function MessagesProvide({ children }: ChildrenProps) {
  const guestName = `Guest${Math.floor(Math.random() * 5000)}`;
  const [author, setAuthor] = useState<UserProps>({
    name: guestName,
    color: Colors.generateLightColor(),
  });
  const [messages, setMessages] = useState<Messages>([]);
  const uuid = uuidv5(author.name, import.meta.env.VITE_UUID_GENERATE);

  socket.on('chat.message', receiveMessage);
  socket.on('chat.connect', data => connectOrDisconnectMessage(true, data));
  socket.on('chat.disconnect', connectOrDisconnectMessage);

  socket
    .connect()
    .emit('chat.connect', { content: `${author.name} entrou na sala.` });

  // socket
  //   .disconnect()
  //   .emit('chat.disconnect', { content: `${author.name} saiu na sala.` });

  function sendMessage(content: string) {
    if (content.trim() !== '' || content.trim().length > 0) {
      // Create Object Message
      const newMessage: Message = {
        id: uuid,
        author: author.name,
        color: author.color,
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
    // Validade id, if uuid patern
    if (validate(message.id) && message.id !== uuid) {
      // create object message
      const newMessage: Message = {
        id: message.id,
        author: message.author,
        content: message.content,
        color: message.color,
        time: message.time,
      };
      // storage local messages
      const list = [...messages, newMessage];
      setMessages(list);
    }
  }

  function connectOrDisconnectMessage(connect: boolean = false, data: any) {
    if (connect) {
      // console.log('chat.connect', data);
    }
    // console.log('chat.disconnect', data);
  }

  function updateAuthorName(newName: string) {
    if (newName.trim()) {
      setAuthor({ name: newName });
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
