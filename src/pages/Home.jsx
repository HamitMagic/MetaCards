import React, { useEffect, useState } from 'react';
import { DeckOfCards, SelectedCards } from '../mobX/store';
import classes from './pages.module.css';
import CardItemContainer from '../components/CardItemContainer';
import CardFooter from '../components/CardFooter';
import { observer } from 'mobx-react';


function Home() {
    
    useEffect(() => {
        DeckOfCards.setCards('wings');
    }, [])

    function toMain(e, card, src) {
        e.preventDefault();
        SelectedCards.addCard({...card, src, isShown: DeckOfCards.isShown})
        DeckOfCards.removeCard(card);
    }

    return (
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
    );
}

export default observer(Home);