import React, { useEffect, useState } from 'react';
import { DeckOfCards, SelectedCards } from '../mobX/store';
import classes from './pages.module.css';
import CardItemContainer from '../components/CardItemContainer';
import CardFooter from '../components/CardFooter';
import { observer } from 'mobx-react';


function Home() {
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
            }
            return state + 150;
        })
    }

    return (
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
    );
}

export default observer(Home);