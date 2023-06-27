import React, { useEffect, useState } from 'react';
import { DeckOfCards } from '../mobX/store';
import classes from './pages.module.css';
import {WINGS} from '../data/wings/cards/wings';
import CardItemContainer from '../components/CardItemContainer';
import CardFooter from '../components/CardFooter';
import { observer } from 'mobx-react';


function Home() {
    
    const [selectedCards, setSelectedCards] = useState([]);
    const [link, setLink] = useState('src/data/wings/cards/');
    
    useEffect(() => DeckOfCards.setCards(WINGS), [])

    function toMain(e, card) {
        e.preventDefault();
        setSelectedCards([...selectedCards, card]);
        DeckOfCards.setCards(DeckOfCards.cards.filter(cardItem => cardItem.id !== card.id));
    }

    function deleteFromMain(e, card) {
        e.preventDefault();
        setSelectedCards(selectedCards.filter(cardItem => cardItem.id !== card.id));
        DeckOfCards.setCards([...DeckOfCards.cards, card]);
    }    

    return (
        <div className={classes.main}>
            <div className={classes.container}>
                {selectedCards && Array.from(selectedCards).map((card => {
                    return (
                        <CardItemContainer 
                            key={`${link}-${card.id}`} 
                            link={link} 
                            card={card} 
                            cb={deleteFromMain}
                        />
                    )
                }))}
            </div>
            <CardFooter 
                toMain={toMain}
                link={link}
            />
        </div>
    );
}

export default observer(Home);