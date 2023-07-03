import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import useWebRTC, { LOCKAL_VIDEO } from '../hooks/useWebRTC';
import classes from '../pages/pages.module.css'
import { DeckOfCards, SelectedCards } from '../mobX/store';
import CardItemContainer from '../components/CardItemContainer';
import CardFooter from '../components/CardFooter';

function Video() {
    const {id: roomID} = useParams();
    const {clients, provideMediRef} = useWebRTC(roomID)
    // console.log(clients)

    useEffect(() => {
        DeckOfCards.setCards('wings');
    }, [])

    function toMain(e, card, src) {
        e.preventDefault();
        SelectedCards.addCard({...card, src, isShown: DeckOfCards.isShown})
        DeckOfCards.removeCard(card);
    }

    return (
        <>
            <div className={classes.main}>
                <div className={classes.container}>
                    {SelectedCards.cards && Array.from(SelectedCards.cards).map((card => {
                        return (
                            <CardItemContainer 
                                key={`${card.src}-${card.id}`} 
                                card={card} 
                            />
                        )
                    }))}
                </div>
                <CardFooter 
                    toMain={toMain}
                />
            </div>
            <div className={classes.video}>
                {Array.from(clients).map((clientID) => {
                    return (
                            <video 
                                width={clientID === LOCKAL_VIDEO ? '320' : '320'}
                                height={clientID === LOCKAL_VIDEO ? '240' : '240'}
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
        </>
    );
}

export default Video;