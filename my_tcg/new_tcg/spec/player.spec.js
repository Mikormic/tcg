import Player from '../src/models/player';
import Pawn from '../src/models/pawn';
const Board = require('../src/models/board');
const Hand = require('../src/models/hand');
const Cemetary = require('../src/models/cemetery');
const Deck = require('../src/models/deck');

describe('Player', () => {
    let player;

    beforeEach(() => {
        player = new Player({ type: 'human' });
    });

    it('should be an instance of Player and extend Pawn', () => {
        expect(player instanceof Player).toBe(true);
        expect(player instanceof Pawn).toBe(true);
    });

    it('should have properties: deck, board, hand, and cemetery', () => {
        expect(player.deck instanceof Deck).toBe(true);
        expect(player.board instanceof Board).toBe(true);
        expect(player.hand instanceof Hand).toBe(true);
        expect(player.cemetery instanceof Cemetary).toBe(true);
    });

    it('should be able to shuffle the deck', () => {
        const shuffled = player.shuffle('deck');
        expect(shuffled).toBe(true);
    });

    it('should be able to shuffle the cemetery', () => {
        const shuffled = player.shuffle('cemetery');
        expect(shuffled).toBe(true);
    });

    it('should not be able to shuffle an invalid type', () => {
        const shuffled = player.shuffle('invalidType');
        expect(shuffled).toBe(false);
    });

    it('should be able to draw a card from the deck', () => {
        const drawnCard = player.draw();
        expect(drawnCard).toBeTruthy();
        expect(player.hand.getCardsCount()).toBe(1);
    });

    it('should return false when drawing from an empty deck', () => {
        // Clear the deck
        player.deck.cards = [];
        const drawnCard = player.draw();
        expect(drawnCard).toBe(false);
    });

    it('should be able to play a card from the hand to the board', () => {
        player.hand.addCard('card1');
        const played = player.playCard(0);
        expect(played).toBe(true);
        expect(player.board.getCardsCount()).toBe(1);
        expect(player.hand.getCardsCount()).toBe(0);
    });

    it('should not be able to play an invalid position from the hand to the board', () => {
        const played = player.playCard(0);
        expect(played).toBe(false);
    });

    it('should be able to discard a card from the hand to the cemetery', () => {
        player.hand.addCard('card');
        const discarded = player.discard(0);
        expect(discarded).toBe(true);
        expect(player.cemetery.getCardsCount()).toBe(3);
        expect(player.hand.getCardsCount()).toBe(0);
    });

    it('should not be able to discard an invalid position from the hand to the cemetery', () => {
        const discarded = player.discard(0);
        expect(discarded).toBe(false);
    });

    // it('should be able to attack a target with a card from the board', () => {
    //     player.hand.addCard('attackCard');
    //     player.playCard(0); // Play the card to the board
    //     const target = new Player({ type: 'human' }); // Create a target Pawn
    //     const attacked = player.attack(0, target);
    //     expect(attacked).toBe(true);
    //     expect(target.Life).toBe(0); // Assuming the attackCard deals damage equal to its attack value
    //     expect(player.board.getCardsCount()).toBe(1);
    // });

    it('should not be able to attack with an invalid position from the board', () => {
        const target = new Pawn(10, 10, 10); // Create a target Pawn
        const attacked = player.attack(0, target);
        expect(attacked).toBe(false);
    });

});
