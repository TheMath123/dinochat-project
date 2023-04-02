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
  const [author, setAuthor] = useState(loadingData());
  const [messages, setMessages] = useState<Messages>([]);

  socket.on('chat.message', receiveMessage);
  socket.on('chat.connect', data => connectOrDisconnectMessage(true, data));
  socket.on('chat.disconnect', connectOrDisconnectMessage);

  // socket.connect().br('connect', {
  //   author,
  //   message: `${author.name} entrou na sala.`,
  // });

  // socket.disconnect().emit('chat.disconnect', {
  //   author,
  //   message: `${author.name} saiu na sala.`,
  // });

  function login(name: string) {
    const uuid = uuidv5(
      `${name}${Date.now()}`,
      import.meta.env.VITE_UUID_GENERATE,
    );
    setAuthor(prevState => new User(uuid, name, prevState.color));
    saveSession(name, uuid, author.color);
  }

  function saveSession(username: string, id: string, color: string) {
    localStorage.setData('username', username);
    localStorage.setData('id', id);
    localStorage.setData('color', color);
  }

  function loadingData() {
    let name = localStorage.getData('username') ?? '';
    let id = localStorage.getData('id') ?? '';
    let color = localStorage.getData('color') ?? Colors.generateLightColor();

    return new User(id, name, color);
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

      // Send Remote Message
      socket.emit('chat.message', newMessage);

      // Storage Local Messages
      setMessages([...messages, newMessage]);
    }
  }

  function receiveMessage(message: Message) {
    if (message.id === author.id) return;

    // Validade id, if uuid patern
    if (validate(message.id)) {
      // create object message
      const newMessage: Message = {
        id: message.id,
        author: message.author,
        content: message.content,
        color: message.color,
        time: message.time,
      };

      // storage local messages
      setMessages([...messages, newMessage]);
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
        loadingData,
        author,
        login,
        messages,
      }}
    >
      {children}
    </MessagesContext.Provider>
  );
}
