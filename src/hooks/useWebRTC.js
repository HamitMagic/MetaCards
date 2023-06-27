import { useCallback, useEffect, useRef } from "react";
import useStateWithCallBack from "./useStateWithCallBack";
import socket from "../socket";
import ACTIONS from "../socket/actions";
import freeice from "freeice";
export const LOCKAL_VIDEO = 'LOCKAL_VIDEO';

export default function useWebRTC(roomID) {
    const [clients, setClients] = useStateWithCallBack([]);

    const peerConnections = useRef({});
    const lockalMediaStream = useRef(null);
    const peerMediaElements = useRef({
        [LOCKAL_VIDEO]: null,
    });
    
    const addNewClient = useCallback((newClient, cb) => {
        if (!Array.from(clients).includes(newClient)) {
            setClients(list => [...list, newClient], cb);
        }
    }, [clients, setClients]);

    useEffect(() => {
        async function handleNewPeer({peerID, createOffer}) {
            if (peerID in peerConnections.current) {
                return console.warn(`Already connected to peer ${peerID}`);
            }

            peerConnections.current[peerID] = new RTCPeerConnection({
                iceServers: freeice(),
            })

            peerConnections.current[peerID].onIceCandidate = e => {
                if (e.candidate) {
                    socket.emit(ACTIONS.RELAY_ICE, {
                        peerID,
                        iceCandidate: e.candidate,
                    })
                }
            }

            let tracksNumber = 0;
            peerConnections.current[peerID].ontrack = ({streams: [remoteStream]}) => {
                tracksNumber++;
                if (tracksNumber ===2) { //wait for video & audio
                    addNewClient(peerID, () => {
                        peerMediaElements.current[peerID].srcObject = remoteStream;
                    });
                }
            }

            lockalMediaStream.current.getTracks().forEach(track => {
                peerConnections.current[peerID].addTrack(track. lockalMediaStream.current)
            });

            if (createOffer) {
                const offer = await peerConnections.current[peerID].createOffer();
                await peerConnections.current[peerID].setLocalDescription(offer);
                socket.emit(ACTIONS.RELAY_SDP, {
                    peerID,
                    sessionDescription: offer,
                })
            }
        };

        socket.on(ACTIONS.ADD_PEER, handleNewPeer)
    }, []);

    useEffect(() => {
        async function setRemoteMedia({peerID, sessionDescription: remoteDescription}) {
            await peerConnections.current[peerID].setRemoteDescription(new RTCSessionDescription(sessionDescription));
            if (remoteDescription.types === 'offer') {
                const answer = await peerConnections.current[peerID].createAnswer();
                await peerConnections.current[peerID].setLocalDescription(answer);

                socket.emit(ACTIONS.RELAY_SDP, {
                    peerID,
                    sessionDescription: answer,
                });
            }
        }

        socket.on(ACTIONS.SESSION_DESCRIPTION, setRemoteMedia)
    });

    useEffect(() => {
        socket.on(ACTIONS.REMOVE_PEER, (peerID) => {
            if (peerConnections.current[peerID]) peerConnections.current[peerID].close();
            delete peerConnections.current[peerID];
            delete peerMediaElements.current[peerID];
            setClients(list => Array.from(list).filter(client => client !== peerID))
        })
    }, []);

    useEffect(() => {
        socket.on(ACTIONS.ICE_CANDIDATES, (peerID, iceCandidate) => {
            peerConnections.current[peerID].addIceCandidate(new RTCIceCandidate(iceCandidate))
        })
    }, []);

    useEffect(() => {
        async function startCapture() {
            lockalMediaStream.current = await navigator.mediaDevices.getUserMedia({
                audio: true,
                video: true,
            });

            addNewClient(LOCKAL_VIDEO, () => {
                const lockalVideoElement = peerMediaElements.current[LOCKAL_VIDEO];

                if (lockalVideoElement) {
                    lockalVideoElement.volume = 0;
                    lockalVideoElement.srcObject = lockalMediaStream.current;
                }
            });
        }

        startCapture()
            .then(() => socket.emit(ACTIONS.JOIN, {room: roomID}))
            .catch((err) => console.error(err));

        return () => {
            lockalMediaStream.current.getTracks().forEach(track => track.stop());
            socket.emit(ACTIONS.LEAVE);
        }
    }, [roomID]);


    const provideMediRef = useCallback((id, node) => {
        peerMediaElements.current[id] = node;
    });

    return {clients, provideMediRef};
}