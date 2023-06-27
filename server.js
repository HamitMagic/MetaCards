import { createServer } from "http";
import { Server } from "socket.io";
const httpServer = createServer();
const io = new Server(httpServer)

import path from 'path';
import express from 'express';
const app = express();
import { version, validate } from 'uuid';

import ACTIONS from './src/socket/actions.js';
const PORT = process.env.PORT || 5050;

function getClientRooms() {
    const {rooms} = io.sockets.adapter;
    return Array.from(rooms.keys()).filter(roomID => validate(roomID) && version(roomID) === 4);
}

function shareRoomsInfo() {
    io.emit(ACTIONS.SHARE_ROOMS, {
        rooms: getClientRooms(),
    });
}

io.on('connection', socket => {
    shareRoomsInfo();

    socket.on(ACTIONS.JOIN, config => {
        const {room: roomID} = config;
        const {rooms: joinedRooms} = socket;

        if (Array.from(joinedRooms).includes(roomID)) {
            return console.warn(`Вы уже подключены к ${roomID} комнате`);
        }

        const clients = Array.from(io.sockets.adapter.rooms.get(roomID) || []);

        clients.forEach(clientID => {
            io.to(clientID).emit(ACTIONS.ADD_PEER, {
                peerID: socket.id,
                createOffer: false,
            });

            socket.emit(ACTIONS.ADD_PEER, {
                peerID: clientID,
                createOffer: true,
            });

            socket.join(roomID);
            shareRoomsInfo();
        })
    })

    function leaveRoom() {
        const {rooms} = socket;

        Array.from(rooms)
            .forEach(roomID => {
                const clients = Array.from(io.sockets.adapter.rooms.get(roomID) || []);
                
                clients.forEach(clientID => {
                    io.to(clientID).emit(ACTIONS.REMOVE_PEER, {
                        peerID: socket.id,
                    })

                    socket.emit(ACTIONS.REMOVE_PEER, {
                        peerID: clientID,
                    });
                });
                socket.leave(roomID);
            });
        shareRoomsInfo();
    }

    socket.on(ACTIONS.LEAVE, leaveRoom);
    socket.on('disconnect', leaveRoom);

    socket.on(ACTIONS.RELAY_SDP, ({peerID, sessionDescription}) => {
        io.to(peerID).emit(ACTIONS.SESSION_DESCRIPTION, {
            peerID: socket.id,
            sessionDescription,
        })
    });

    socket.on(ACTIONS.RELAY_ICE, ({peerID, iceCandidate}) => {
        io.to(peerID).emit(ACTIONS.ICE_CANDIDATES, {
            peerID: socket.id,
            iceCandidate,
        })
    });

})

httpServer.listen(PORT, () => {
    console.log('server began');
})