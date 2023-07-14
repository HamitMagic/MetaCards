import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import classes from '../pages/pages.module.css'
import { DeckOfCards, SelectedCards } from '../mobX/store';
import CardItemContainer from '../components/CardItemContainer';
import CardFooter from '../components/CardFooter';
import { observer } from 'mobx-react';
import useWebRTC, { LOCAL_VIDEO } from '../hooks/useWebRTC';

function Video() {
    const {id: roomID} = useParams();
    const [clients, provideMediaRef] = useWebRTC(roomID)
    const [zIndex, setZindex] = useState(0);
    const [position, setPosition] = useState(-150);
    const [step, setStep] = useState(20);

    useEffect(() => {
        DeckOfCards.setCards('taro');
    }, [])

    function toMain(e, card) {
        e.preventDefault();
        SelectedCards.addCard({...card, isShown: DeckOfCards.isShown})
        DeckOfCards.removeCard(card);
        setZindex(zIndex + 1);
        setPosition((state) => {
            if (state > 1000) {
                setStep(step  + 20)
                return step;
            };
            return state + 150;
        })
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
                                zInd={zIndex}
                                setZind={setZindex}
                                position={position}
                            />
                        )
                    }))}
                </div>
                <CardFooter 
                    toMain={toMain}
                />
            </div>
            <div className={classes.video}>
                {Array.from(clients).map(clientID => (
                    <>
                        <video
                            key={clientID}
                            className={clientID === LOCAL_VIDEO ? classes.local : classes.remote}
                            width={clientID === LOCAL_VIDEO ? '96' : '320'}
                            height={clientID === LOCAL_VIDEO ? '54' : '180'}
                            autoPlay
                            playsInline
                            muted={clientID === LOCAL_VIDEO}
                            ref={(instance) => provideMediaRef(clientID, instance)}
                        />
                    </>
                ))}
                
            </div>
        </>
    );
}

export default observer(Video);