import { io } from 'socket.io-client';

const options = {
    'force new connection': true,
    reconnectionAttemps: 'Infinity',
    timeout: 10000,
    transports: ['websocket'],
}

const socket = io('ws://127.0.0.1:3001', options);

export default socket;