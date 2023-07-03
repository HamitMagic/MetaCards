import React from 'react';
import classes from '../pages/pages.module.css';
import { DeckOfCards } from '../mobX/store';
import { observer } from 'mobx-react';



function SelectDeck({data}) {
    return (
        <div className={classes.selectDeck}>
            {Array.from(data).map((deck) => {
                return (
                    <img 
                        alt={deck.alt}
                        title={deck.alt}
                        width='100'
                        height='150'
                        onClick={() => {
                            DeckOfCards.setCards(deck.id);
                        }} 
                        key={deck.id} 
                        src={`${deck.link}cardBox.png`} 
                    />
                )
            })}
        </div>
    );
}

export default observer(SelectDeck);