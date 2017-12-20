const expect = require('expect');
var { generateMessage, generateLocationMessage } = require('./message.js');


describe('generateMessage', () => {
    it('should generate correct message', () => {
        var from = 'John';
        var text = 'Some message';
        var mess = generateMessage(from , text);
        expect(typeof mess.createdAt).toBe('number'); 
        expect(mess.text).toBe(text);
        expect(mess.from).toBe(from);
    });
});

describe('generateLocationMessage', () => {
    it('should generate correct location object', () => {
        var from = 'John';
        var loc = generateLocationMessage(from , {latitude:15, longitude:19});
        expect(typeof loc.createdAt).toBe('number'); 
        expect(loc.url).toBe('https://www.google.com/maps?q=15,19');
        expect(loc.from).toBe(from);
    });
});