import { io } from 'socket.io-client';

const socket = io('http://localhost:5555', {
  reconnectionDelayMax: 1000,
});

socket.on('connect', () => {
  console.log('[IO] Connect - A new connection has been established');
});

export { socket };
