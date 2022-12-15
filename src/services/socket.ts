import { io } from 'socket.io-client';

const socket = io(import.meta.env.VITE_API_URL ?? 'http://localhost:5555', {
  path: '/chat-connection/',
  reconnectionDelayMax: 10000,
  // withCredentials: true,
});

socket.on('connect', () => {
  console.log('[IO] Connect - A new connection has been established');
});

socket.on('connect', () => {
  console.log('[IO] Connect - A new connection has been established');
});

socket.on('connect_error', err => {
  console.error(`connect_error -> ${err.message}`);
  // console.error(err);
});

export { socket };
