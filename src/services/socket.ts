import { io } from 'socket.io-client';

const socket = io(import.meta.env.VITE_API_URL ?? 'http://localhost:3100', {
  path: '/chat-connection/',
  reconnectionDelayMax: 10000,
  transports: ['websocket'],
});

socket.on('connect', () => {
  console.log('[IO] Connect - A new connection has been established');
});

socket.on('connect', () => {
  console.log('[IO] Connect - A new connection has been established');
});

socket.on('chat.message', message => {
  console.log('[IO] Message Recieve', message);
});

socket.on('connect_error', err => {
  console.error(`connect_error -> ${err.message}`);
  // console.error(err);
});

export { socket };
