const { RACES } = require('../person/person.js');

describe('Game Races', () => {
    test('RACES object should be defined', () => {
        expect(RACES).toBeDefined();
    });

    test('Should have all 5 races', () => {
        expect(Object.keys(RACES)).toHaveLength(5);
    });

    test('Orc stats should be correct', () => {
        expect(RACES.orc).toEqual({
            health: 70,
            damage: 15
        });
    });

    test('Human stats should be correct', () => {
        expect(RACES.human).toEqual({
            health: 100,
            damage: 13
        });
    });

    test('All races should have health and damage properties', () => {
        Object.values(RACES).forEach(race => {
            expect(race).toHaveProperty('health');
            expect(race).toHaveProperty('damage');
            expect(typeof race.health).toBe('number');
            expect(typeof race.damage).toBe('number');
        });
    });
});