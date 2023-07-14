import { useCallback, useEffect, useRef } from "react";
import useStateWithCallBack from "./useStateWithCallBack";
import socket from "../socket";
import ACTIONS from "../socket/actions";

export const LOCAL_VIDEO = 'LOCAL_VIDEO';

export default function useWebRTC(roomID) {
    const [clients, updateClients] = useStateWithCallBack([]);
    const peerConnections = useRef({});
    const localMediaStream = useRef(null);
    const peerMediaElements = useRef({
        [LOCAL_VIDEO]: null,
    });
    const servers = {
        iceServers:[
            {
                urls:[
                    'stun:stun.l.google.com:19302',
                    'stun:stun1.l.google.com:19302', 
                    'stun:stun2.l.google.com:19302',
                    'stun:stun3.l.google.com:19302',
                    'stun:stun4.l.google.com:19302',
                    'stun:stun01.sipphone.com',
                    'stun:stun.ekiga.net',
                    'stun:stun.fwdnet.net',
                    'stun:stun.ideasip.com',
                    'stun:stun.iptel.org',
                    'stun:stun.rixtelecom.se',
                    'stun:stun.schlund.de',
                    'stun:stunserver.org',
                    'stun:stun.softjoys.com',
                ]
            }
        ]
    }
    
    const addNewClient = useCallback((newClient, cb) => {
        updateClients(list => {
            if (!Array.from(list).includes(newClient)) {
                console.log('added client')
                return [...list, newClient];
            }
            return list;
        }, cb);
        
      }, [clients, updateClients]);

    useEffect(() => {
        async function handleNewPeer({peerID, createOffer}) {
            if (peerID in peerConnections.current) {
                return console.warn(`Already connected to peer ${peerID}`);
            }
            console.log(peerID)
            peerConnections.current[peerID] = new RTCPeerConnection(servers);

            peerConnections.current[peerID].onicecandidate = event => {
                if (event.candidate) {
                    socket.emit(ACTIONS.RELAY_ICE, {
                        peerID,
                        iceCandidate: event.candidate,
                    });
                }
            }

            let tracksNumber = 0;
            peerConnections.current[peerID].ontrack = ({streams: [remoteStream]}) => {
                tracksNumber++

                if (tracksNumber === 2) { // video & audio tracks received
                    tracksNumber = 0;
                    addNewClient(peerID, () => {
                        if (peerMediaElements.current[peerID]) {
                            peerMediaElements.current[peerID].srcObject = remoteStream;
                        } else {
                            // FIX LONG RENDER IN CASE OF MANY CLIENTS
                            let settled = false;
                            const interval = setInterval(() => {
                                if (peerMediaElements.current[peerID]) {
                                    peerMediaElements.current[peerID].srcObject = remoteStream;
                                    settled = true;
                                }

                                if (settled) {
                                    clearInterval(interval);
                                }
                            }, 1000);
                        }
                    });
                }
            }

            localMediaStream.current.getTracks().forEach(track => {
                peerConnections.current[peerID].addTrack(track, localMediaStream.current);
            });

            if (createOffer) {
                const offer = await peerConnections.current[peerID].createOffer();

                await peerConnections.current[peerID].setLocalDescription(offer);

                socket.emit(ACTIONS.RELAY_SDP, {
                    peerID,
                    sessionDescription: offer,
                });
            }
        }

        socket.on(ACTIONS.ADD_PEER, handleNewPeer);

        return () => {
            socket.off(ACTIONS.ADD_PEER);
        }
    }, []);

    useEffect(() => {
        async function setRemoteMedia({peerID, sessionDescription: remoteDescription}) {
            await peerConnections.current[peerID]?.setRemoteDescription(
                new RTCSessionDescription(remoteDescription)
            );
        
            if (remoteDescription.type === 'offer') {
                const answer = await peerConnections.current[peerID].createAnswer();
        
                await peerConnections.current[peerID].setLocalDescription(answer);
        
                socket.emit(ACTIONS.RELAY_SDP, {
                    peerID,
                    sessionDescription: answer,
                });
            }
        }
    
        socket.on(ACTIONS.SESSION_DESCRIPTION, setRemoteMedia)
    
        return () => {
            socket.off(ACTIONS.SESSION_DESCRIPTION);
        }
    }, []);

    useEffect(() => {
        const handleRemovePeer = ({peerID}) => {
            if (peerConnections.current[peerID]) {
                peerConnections.current[peerID].close();
            }
    
            delete peerConnections.current[peerID];
            delete peerMediaElements.current[peerID];
    
            updateClients(list => list.filter(c => c !== peerID));
        };
    
        socket.on(ACTIONS.REMOVE_PEER, handleRemovePeer);
    
        return () => {
            socket.off(ACTIONS.REMOVE_PEER);
        }
    }, []);

    useEffect(() => {
        socket.on(ACTIONS.ICE_CANDIDATE, ({peerID, iceCandidate}) => {
            peerConnections.current[peerID]?.addIceCandidate(
                new RTCIceCandidate(iceCandidate)
            );
        });
    
        return () => {
            socket.off(ACTIONS.ICE_CANDIDATE);
        }
    }, []);

    useEffect(() => {
        async function startCapture() {
            localMediaStream.current = await navigator.mediaDevices.getUserMedia({
                audio: true,
                video: {
                    width: 640,
                    height: 360,
                }
            });
        
            addNewClient(LOCAL_VIDEO, () => {
                const localVideoElement = peerMediaElements.current[LOCAL_VIDEO];
        
                if (localVideoElement) {
                    localVideoElement.volume = 0;
                    localVideoElement.srcObject = localMediaStream.current;
                }
            });
        }
    
        startCapture()
            .then(() => socket.emit(ACTIONS.JOIN, {room: roomID}))
            .catch(e => console.error('Error getting userMedia:', e));
    
        return () => {
            localMediaStream.current.getTracks().forEach(track => track.stop());
            socket.emit(ACTIONS.LEAVE);
        };
    }, [roomID]);


    const provideMediRef = useCallback((id, node) => {
        peerMediaElements.current[id] = node;
    });

    return [clients, provideMediRef];
}