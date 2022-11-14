import { Manager } from 'socket.io-client';

const manager = new Manager('http://localhost:5555/connection', {
  reconnectionDelayMax: 1000,
});

const socket = manager.socket('/my-namespace');

export { socket };
