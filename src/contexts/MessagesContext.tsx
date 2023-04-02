import { createContext, useEffect, useState } from 'react';
import { MessagesContextProps, ChildrenProps, Message } from '../@types';
import { socket } from '../services/socket';
import { v5 as uuidv5, validate } from 'uuid';
import { Colors } from '../helpers/Colors';
import { LocalStorage } from '../helpers/LocalStorage';
import { User } from '../model/User';

export const MessagesContext = createContext({} as MessagesContextProps);

type Messages = Message[];

export function MessagesProvide({ children }: ChildrenProps) {
  const localStorage = new LocalStorage();
  const color = Colors.generateLightColor();
  const [author, setAuthor] = useState(new User('', '', color));
  const [messages, setMessages] = useState<Messages>([]);

  socket.on('chat.message', receiveMessage);
  socket.on('chat.connect', data => connectOrDisconnectMessage(true, data));
  socket.on('chat.disconnect', connectOrDisconnectMessage);

  // getCookie();

  // socket.connect().br('connect', {
  //   author,
  //   message: `${author.name} entrou na sala.`,
  // });

  // socket.disconnect().emit('chat.disconnect', {
  //   author,
  //   message: `${author.name} saiu na sala.`,
  // });

  function login(name: string) {
    updateAuthorName(name);
    updateAuthorId(uuidv5(name, import.meta.env.VITE_UUID_GENERATE));
    saveCookie();
  }

  function saveCookie() {
    console.log('Username', author.name);
    localStorage.setData('username', author.name);
    console.log('ID', author.id);
    localStorage.setData('id', author.id);
  }

  function getCookie() {
    let name = localStorage.getData('username') ?? '';
    let id = localStorage.getData('id') ?? '';

    if (name.length > 1 && name) {
      updateAuthorName(name);
    }

    if (id.length > 1 && id) {
      updateAuthorId(id);
    }
  }

  function sendMessage(content: string) {
    if (content.trim() !== '' || content.trim().length > 0) {
      // Create Object Message
      const newMessage: Message = {
        id: author.id,
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
    console.log(message);

    // Validade id, if uuid patern
    if (validate(message.id) && message.id !== author.id) {
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
      console.log('chat.connect', data);
    }
    console.log('chat.disconnect', data);
  }

  function updateAuthorName(newName: string) {
    setAuthor(prevState => {
      return new User(prevState.id, newName, prevState.color);
    });
  }

  function updateAuthorId(newId: string) {
    setAuthor(prevState => {
      return new User(newId, prevState.name, prevState.color);
    });
  }

  function updateAuthorColor(newColor: string) {
    setAuthor(prevState => {
      return new User(prevState.id, prevState.name, newColor);
    });
  }

  return (
    <MessagesContext.Provider
      value={{
        sendMessage,
        receiveMessage,
        author,
        login,
        messages,
      }}
    >
      {children}
    </MessagesContext.Provider>
  );
}
