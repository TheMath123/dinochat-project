import { io } from 'socket.io-client';

const socket = io(import.meta.env.VITE_API_URL, {
  reconnectionDelayMax: 1000,
});

socket.on('connect', () => {
  console.log('[IO] Connect - A new connection has been established');
});

export { socket };
