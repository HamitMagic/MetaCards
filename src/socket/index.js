import { io } from 'socket.io-client';
import {CONSTS} from '../assets/consts';

const options = {
    'force new connection': true,
    reconnectionAttemps: 'Infinity',
    timeout: 10000,
    transports: ['websocket']
}

const socket = io(`${CONSTS.HOST}:5050`, options);

export default socket;