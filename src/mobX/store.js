import { makeAutoObservable, configure } from "mobx";
import {WINGS} from '../data/wings/cards/data';
import {TARO} from '../data/taro/cards/data';
import {ISLAM_TODAY} from '../data/islamToday/cards/data';
import {FOOD_BODY} from '../data/food.body.emotions/foodBody/cards/data';
import {EMOTIONS} from '../data/food.body.emotions/emotions/cards/data';


configure({enforceActions: 'observed'})

class Cards {
    // id: isShown: src(добавляется)
    cards = [];
    isShown = false;

    constructor() {
        makeAutoObservable(this)
    }

    filterCards() {
        if (SelectedCards.cards.length) {
            return this.cards.filter(item => {
                return !SelectedCards.cards.some(selectedCard => {
                    return item.id === selectedCard.id && item.src === selectedCard.src;
                });
            });
        }
        return this.cards;
    }

    setIsShown() {
        this.isShown = !this.isShown;
        this.cards = this.cards.map(card => card.isShown = this.isShown);
    }

    setLink(str) {
        this.link = str;
    }

    setCards(str) {
        switch (str) {
            case 'taro':
                this.cards = TARO;
                this.cards.map(card => card.src = 'src/data/taro/cards/');
                this.cards = this.filterCards();
                break;
            case 'islamToday':
                this.cards = ISLAM_TODAY;
                this.cards.map(card => card.src = 'src/data/islamToday/cards/');
                this.cards = this.filterCards();
                break;
            case 'food body':
                this.cards = FOOD_BODY;
                this.cards.map(card => card.src = 'src/data/food.body.emotions/foodBody/cards/');
                this.cards = this.filterCards();
                break;
            case 'emotions':
                this.cards = EMOTIONS;
                this.cards.map(card => card.src = 'src/data/food.body.emotions/emotions/cards/');
                this.cards = this.filterCards();
                break;
            default:
                this.cards = WINGS;
                this.cards.map(card => card.src = 'src/data/wings/cards/');
                this.cards = this.filterCards();
        }
    }

    getCards() {
        return this.cards;
    }

    addCard(newCard) {
                if (this.cards[0].src === newCard.src) this.cards = [...this.cards, newCard];
    }

    removeCard(newCard) {
        this.cards = this.cards.filter(card => card.id !== newCard.id);
    }

    setIsShown() {
        this.isShown = !this.isShown;
    }

    getIsShown() {
        return this.isShown;
    }

    getCard(id) {
        const card = this.cards.filter((card) => card.id === id);
        return card;
    }
}

export const DeckOfCards = new Cards();

class SelectedCardItems {
    // id, src, isShown
    cards = [];

    constructor() {
        makeAutoObservable(this)
    }

    setCardIsShown(card) {
        this.cards = this.cards.map((cardItem) => {
            if (cardItem.id === card.id && cardItem.src === card.src) cardItem.isShown = !cardItem.isShown;
        })
    }

    removeCard(card) {
        this.cards = this.cards.filter((cardItem) => (cardItem.id !== card.id || cardItem.src !== card.src));
    }

    addCard(card) {
        this.cards = [...this.cards, card];
    }
}
export const SelectedCards = new SelectedCardItems();
