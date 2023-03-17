import { io } from 'socket.io-client';

const socket = io(import.meta.env.VITE_API_URL ?? 'http://localhost:3100', {
  path: '/chat-connection/',
  reconnectionDelayMax: 10000,
  transports: ['websocket'],
});

export { socket };
