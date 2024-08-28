import ModelFactory from './factory';
const Pawn = require('./pawn');
const Board = require('./board');
const Hand = require('./hand');
const Cemetary = require('./cemetery');

export default class Player extends Pawn {

    constructor(config) {
        super(10, 10, 10);
        this.type = config.type;
        this.board = new Board({cards:[], limit: 7});
        this.hand = new Hand({cards:[]});
        this.cemetery = new Cemetary({ cards: [{face: "card-1"}, {face: "card-2"}] });
        this.deck = ModelFactory.get('deck', config.deck || []);
    }

    shuffle(type = 'deck') {
        if (type === 'deck') {
            return this.deck.shuffle();
        } else if (type === 'cemetery') {
            return this.cemetery.shuffle();
        }
        return false;
    }

    draw() {
        const drawnCard = this.deck.draw();
        if (drawnCard !== false) {
            this.hand.addCard(drawnCard);
            return drawnCard;
        }
        return false;
    }

    playCard(position) {
        const card = this.hand.removeCard(position);
        if (card !== false) {
            this.board.addCard(card);
            return true;
        }
        return false;
    }

    discard(position) {
        const card = this.hand.removeCard(position);
        if (card !== false) {
            this.cemetery.insertAt(card);
            return true;
        }
        return false;
    }

    attack(position, target) {
        // const card = this.board.cards[position];
        if (position >= 0 && position < this.board.getCardsCount()) {
            super.attack(target);
            if (this.life <= 0) {
                this.life = 0;
                this.board.removeCard(position);
            }
            return true;
        }
        return false;
    }
    
}
