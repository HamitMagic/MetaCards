import React from 'react';
import { useParams } from 'react-router';
import useWebRTC, { LOCKAL_VIDEO } from '../hooks/useWebRTC';
import classes from '../pages/pages.module.css'

function Video() {
    const {id: roomID} = useParams();
    const {clients, provideMediRef} = useWebRTC(roomID)
    console.log(clients)

    return (
        <div className={classes.video}>
            {Array.from(clients).map((clientID) => {
                return (
                        <video 
                            key={clientID}
                            autoPlay
                            playsInline
                            muted={clientID === LOCKAL_VIDEO}
                            ref={
                                instance => provideMediRef(clientID, instance)
                            }
                        />
                )
            })}
        </div>
    );
}

export default Video;