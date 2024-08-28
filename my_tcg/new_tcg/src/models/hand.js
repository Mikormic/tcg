class Hand {
    constructor(config) {
        this.cards = config.cards || [];
        this.limit = typeof config.limit === 'number' ? config.limit : 7;
    }
    
    addCard(card) {
        if (this.cards.length < this.limit) {
            this.cards.push(card);
            return true;
        }
        return false;
    }
    
    removeCard(position) {
        if (position >= 0 && position < this.cards.length) {
            return this.cards.splice(position, 1)[0];
        }
        return false;
    }
    
    getAllCards() {
        return this.cards.slice();
    }
    
    getCardsCount() {
        return this.cards.length;
    }
}

module.exports = Hand;
