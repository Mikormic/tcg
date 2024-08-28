const Pawn = require('../src/models/pawn');

describe('Pawn', () => {
    let pawn;

    beforeEach(() => {
        pawn = new Pawn(100, 20, 10);
    });

    it('should be an instance of Pawn', () => {
        expect(pawn instanceof Pawn).toBe(true);
    });

    it('should have initial life, strength, and defense values', () => {
        expect(pawn.getLife()).toBe(100);
        expect(pawn.getStrength()).toBe(20);
        expect(pawn.getDef()).toBe(10);
    });

    it('should be able to attack another Pawn', () => {
        const target = new Pawn(80, 15, 8);
        const attacked = pawn.attack(target);
        expect(attacked).toBe(true);
        expect(target.getLife()).toBe(80 - 20 + 8);
    });

    it('should receive an attack and counter-attack', () => {
        const attacker = new Pawn(90, 18, 9);
        const counterAttacked = pawn.receiveAttack(attacker, false);
        expect(counterAttacked).toBe(true);
        expect(pawn.getLife()).toBe(100 - 18 + 10); 
        expect(attacker.getLife()).toBe(90 - 20 + 9); 
    });

    it('should receive an attack and not counter-attack when strikeBack is true', () => {
        const attacker = new Pawn(90, 18, 9);
        const counterAttacked = pawn.receiveAttack(attacker, true);
        expect(counterAttacked).toBe(true);
        expect(pawn.getLife()).toBe(100 - 18 + 10);
        expect(attacker.getLife()).toBe(90);
    });
});
