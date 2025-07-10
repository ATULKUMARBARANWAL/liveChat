import { io } from 'socket.io-client';

const socket = io('http://localhost:3000', {
  autoConnect: true,
  transports: ['websocket'], // optional, forces websocket only
});

export default socket;
