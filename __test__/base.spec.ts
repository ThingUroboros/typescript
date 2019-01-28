import { sampleFunction } from '../src';

describe('Tohle je jednoduchý test', () => {
    test('Kontroluji funkci sampleFunction ', () => {
        expect(sampleFunction('hello')).toEqual('hellohello');
    });
});
