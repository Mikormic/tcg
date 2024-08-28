class Deck {
    constructor(config) {
        this.cards = config.cards || [];
    }
    
    shuffle() {
        if (this.cards.length > 1) {
            for (let i = this.cards.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
            }
            return true;
        }
        return false;
    }    
    
    insertAt(card, position) {
        if (position !== undefined && position >= 0 && position <= this.cards.length) {
            this.cards.splice(position, 0, card);
        } else {
            this.cards.push(card);
        }
    }
    
    draw() {
        if (this.cards.length > 0) {
            return this.cards.shift();
        }
        return false;
    }
    
    getCardsCount() {
        return this.cards.length;
    }
}

module.exports = Deck;